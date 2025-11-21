/**
 * Data Routes for Talent Tutor Backend
 * Tuition Posts, Teachers, Blog, Library APIs
 */

import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// ==================== TUITION POSTS ====================

// Get all tuition posts
app.get("/tuition-posts", async (c) => {
  try {
    const urgent = c.req.query('urgent');
    const status = c.req.query('status');
    
    const postsKey = 'tuition:posts:all';
    const postIds = await kv.get(postsKey) || [];
    
    const posts = await Promise.all(
      postIds.map(async (id: string) => await kv.get(`tuition:post:${id}`))
    );

    let filteredPosts = posts.filter(p => p !== null);

    if (urgent === 'true') {
      filteredPosts = filteredPosts.filter(p => p.urgent === true);
    }

    if (status) {
      filteredPosts = filteredPosts.filter(p => p.status === status);
    }

    // Sort by createdAt (newest first)
    filteredPosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ success: true, posts: filteredPosts });
  } catch (error) {
    console.error('Get tuition posts error:', error);
    
    // If table doesn't exist, return empty array instead of error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || 
        errorMessage.includes('schema cache') || 
        errorMessage.includes('not find') ||
        errorMessage.includes('relation')) {
      console.log('⚠️ Database table not initialized. Returning empty tuition posts.');
      return c.json({ 
        success: true, 
        posts: [], 
        warning: 'Database table kv_store_5b21d3ea not found. Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard.' 
      });
    }
    
    return c.json({ error: 'Failed to get tuition posts', details: errorMessage }, 500);
  }
});

// Create tuition post
app.post("/tuition-posts", async (c) => {
  try {
    const postData = await c.req.json();
    const postId = `tuition-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const post = {
      id: postId,
      ...postData,
      status: postData.status || 'open',
      applicants: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`tuition:post:${postId}`, post);
    
    // Add to all posts list
    const postsKey = 'tuition:posts:all';
    const posts = await kv.get(postsKey) || [];
    posts.push(postId);
    await kv.set(postsKey, posts);

    // Add to guardian's posts
    if (postData.guardianId) {
      const guardianPostsKey = `tuition:guardian:${postData.guardianId}`;
      const guardianPosts = await kv.get(guardianPostsKey) || [];
      guardianPosts.push(postId);
      await kv.set(guardianPostsKey, guardianPosts);
    }

    return c.json({ success: true, post });
  } catch (error) {
    console.error('Create tuition post error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      return c.json({ 
        error: 'Database table not found',
        warning: 'Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard'
      }, 503);
    }
    return c.json({ error: 'Failed to create tuition post' }, 500);
  }
});

// Update tuition post
app.put("/tuition-posts/:postId", async (c) => {
  try {
    const postId = c.req.param('postId');
    const updates = await c.req.json();
    
    const existingPost = await kv.get(`tuition:post:${postId}`);
    if (!existingPost) {
      return c.json({ error: 'Post not found' }, 404);
    }

    const updatedPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`tuition:post:${postId}`, updatedPost);

    return c.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Update tuition post error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      return c.json({ 
        error: 'Database table not found',
        warning: 'Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard'
      }, 503);
    }
    return c.json({ error: 'Failed to update tuition post' }, 500);
  }
});

// Delete tuition post
app.delete("/tuition-posts/:postId", async (c) => {
  try {
    const postId = c.req.param('postId');
    
    const post = await kv.get(`tuition:post:${postId}`);
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    // Soft delete
    post.status = 'deleted';
    await kv.set(`tuition:post:${postId}`, post);

    return c.json({ success: true });
  } catch (error) {
    console.error('Delete tuition post error:', error);
    return c.json({ error: 'Failed to delete tuition post' }, 500);
  }
});

// ==================== TEACHERS ====================

// Get all teachers
app.get("/teachers", async (c) => {
  try {
    const subject = c.req.query('subject');
    const district = c.req.query('district');
    
    const users = await kv.getByPrefix('user:');
    
    let teachers = users
      .filter(u => u.value && u.value.role === 'teacher')
      .map(u => u.value);

    if (subject) {
      teachers = teachers.filter(t => 
        t.subjects && t.subjects.some((s: string) => s.includes(subject))
      );
    }

    if (district) {
      teachers = teachers.filter(t => 
        t.location && t.location.district === district
      );
    }

    // Remove passwords
    teachers = teachers.map(({ password, ...teacher }) => teacher);

    return c.json({ success: true, teachers });
  } catch (error) {
    console.error('Get teachers error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      return c.json({ success: true, teachers: [], warning: 'Database not initialized' });
    }
    return c.json({ error: 'Failed to get teachers', details: errorMessage }, 500);
  }
});

// Get teacher by ID
app.get("/teachers/:teacherId", async (c) => {
  try {
    const teacherId = c.req.param('teacherId');
    const teacher = await kv.get(`user:${teacherId}`);
    
    if (!teacher || teacher.role !== 'teacher') {
      return c.json({ error: 'Teacher not found' }, 404);
    }

    const { password, ...teacherWithoutPassword } = teacher;
    return c.json({ success: true, teacher: teacherWithoutPassword });
  } catch (error) {
    console.error('Get teacher error:', error);
    return c.json({ error: 'Failed to get teacher' }, 500);
  }
});

// Update teacher
app.put("/teachers/:teacherId", async (c) => {
  try {
    const teacherId = c.req.param('teacherId');
    const updates = await c.req.json();
    
    const existingTeacher = await kv.get(`user:${teacherId}`);
    if (!existingTeacher || existingTeacher.role !== 'teacher') {
      return c.json({ error: 'Teacher not found' }, 404);
    }

    const updatedTeacher = {
      ...existingTeacher,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${teacherId}`, updatedTeacher);

    const { password, ...teacherWithoutPassword } = updatedTeacher;
    return c.json({ success: true, teacher: teacherWithoutPassword });
  } catch (error) {
    console.error('Update teacher error:', error);
    return c.json({ error: 'Failed to update teacher' }, 500);
  }
});

// ==================== LIBRARY ITEMS ====================

// Get all library items
app.get("/library-items", async (c) => {
  try {
    const type = c.req.query('type');
    const status = c.req.query('status');
    
    const itemsKey = 'library:items:all';
    const itemIds = await kv.get(itemsKey) || [];
    
    const items = await Promise.all(
      itemIds.map(async (id: string) => await kv.get(`library:item:${id}`))
    );

    let filteredItems = items.filter(i => i !== null);

    if (type) {
      filteredItems = filteredItems.filter(i => i.type === type);
    }

    if (status) {
      filteredItems = filteredItems.filter(i => i.status === status);
    }

    // Sort by createdAt (newest first)
    filteredItems.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ success: true, items: filteredItems });
  } catch (error) {
    console.error('Get library items error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      return c.json({ success: true, items: [], warning: 'Database not initialized' });
    }
    return c.json({ error: 'Failed to get library items', details: errorMessage }, 500);
  }
});

// Create library item
app.post("/library-items", async (c) => {
  try {
    const itemData = await c.req.json();
    const itemId = `library-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const item = {
      id: itemId,
      ...itemData,
      status: itemData.status || 'available',
      requestedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`library:item:${itemId}`, item);
    
    // Add to all items list
    const itemsKey = 'library:items:all';
    const items = await kv.get(itemsKey) || [];
    items.push(itemId);
    await kv.set(itemsKey, items);

    return c.json({ success: true, item });
  } catch (error) {
    console.error('Create library item error:', error);
    return c.json({ error: 'Failed to create library item' }, 500);
  }
});

// Update library item
app.put("/library-items/:itemId", async (c) => {
  try {
    const itemId = c.req.param('itemId');
    const updates = await c.req.json();
    
    const existingItem = await kv.get(`library:item:${itemId}`);
    if (!existingItem) {
      return c.json({ error: 'Item not found' }, 404);
    }

    const updatedItem = {
      ...existingItem,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`library:item:${itemId}`, updatedItem);

    return c.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('Update library item error:', error);
    return c.json({ error: 'Failed to update library item' }, 500);
  }
});

// Request library item
app.post("/library-items/:itemId/request", async (c) => {
  try {
    const itemId = c.req.param('itemId');
    const { studentId } = await c.req.json();
    
    const item = await kv.get(`library:item:${itemId}`);
    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }

    if (!item.requestedBy) {
      item.requestedBy = [];
    }

    if (!item.requestedBy.includes(studentId)) {
      item.requestedBy.push(studentId);
      item.updatedAt = new Date().toISOString();
      await kv.set(`library:item:${itemId}`, item);
    }

    return c.json({ success: true, item });
  } catch (error) {
    console.error('Request library item error:', error);
    return c.json({ error: 'Failed to request library item' }, 500);
  }
});

// ==================== ADMIN STATISTICS ====================

// Get admin dashboard stats
app.get("/admin/stats", async (c) => {
  try {
    // Get all users
    const users = await kv.getByPrefix('user:');
    const userList = users
      .filter(u => u.value && u.value.id)
      .map(u => u.value);

    const totalUsers = userList.length;
    const totalTeachers = userList.filter(u => u.role === 'teacher').length;
    const totalGuardians = userList.filter(u => u.role === 'guardian').length;
    const totalStudents = userList.filter(u => u.role === 'student').length;
    const totalDonors = userList.filter(u => u.role === 'donor').length;

    // Get tuition posts
    const tuitionPostsKey = 'tuition:posts:all';
    const tuitionPostIds = await kv.get(tuitionPostsKey) || [];
    const tuitionPosts = await Promise.all(
      tuitionPostIds.map(async (id: string) => await kv.get(`tuition:post:${id}`))
    );
    
    const activeTuitionPosts = tuitionPosts.filter(p => p && p.status === 'open').length;
    const urgentTuitionPosts = tuitionPosts.filter(p => p && p.urgent === true && p.status === 'open').length;

    // Get blog posts
    const blogPostsKey = 'cms:posts:all';
    const blogPostIds = await kv.get(blogPostsKey) || [];
    const totalBlogPosts = blogPostIds.length;

    // Get library items
    const libraryItemsKey = 'library:items:all';
    const libraryItemIds = await kv.get(libraryItemsKey) || [];
    const totalLibraryItems = libraryItemIds.length;

    const stats = {
      totalUsers,
      totalTeachers,
      totalGuardians,
      totalStudents,
      totalDonors,
      activeTuitionPosts,
      urgentTuitionPosts,
      totalBlogPosts,
      totalLibraryItems,
      totalRevenue: 0, // Placeholder for future implementation
      monthlyRevenue: 0 // Placeholder for future implementation
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.error('Get admin stats error:', error);
    return c.json({ error: 'Failed to get admin stats' }, 500);
  }
});

export default app;
