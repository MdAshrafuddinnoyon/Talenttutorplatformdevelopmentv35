/**
 * Blog API Testing Script
 * Run this in browser console to verify blog API is working
 */

// Configuration
const projectId = 'wkdksiagjwrrocpqkbnh';
const publicKey = 'YOUR_ANON_KEY_HERE'; // Get from /utils/supabase/info.tsx

// Test Blog API
async function testBlogAPI() {
  console.log('🧪 Testing Blog API...\n');
  
  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicKey}`
  };

  // Test 1: Get All Posts
  console.log('📝 Test 1: Fetching all blog posts...');
  try {
    const response = await fetch(`${apiBase}/cms/posts`, { headers });
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Found', data.posts?.length || 0, 'posts');
      console.log('Posts:', data.posts);
    } else {
      console.error('❌ Failed:', response.status, data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n');

  // Test 2: Get Published Posts Only
  console.log('📰 Test 2: Fetching published posts...');
  try {
    const response = await fetch(`${apiBase}/cms/posts?status=published`, { headers });
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Found', data.posts?.length || 0, 'published posts');
    } else {
      console.error('❌ Failed:', response.status, data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n');

  // Test 3: Create Test Post (Admin only)
  console.log('➕ Test 3: Creating test post (requires admin auth)...');
  try {
    const testPost = {
      title: 'Test Blog Post - ' + new Date().toISOString(),
      titleEn: 'Test Blog Post',
      slug: 'test-post-' + Date.now(),
      excerpt: 'This is a test blog post created via API',
      content: 'This is the full content of the test blog post. Testing the blog API.',
      author: {
        id: 'admin-001',
        name: 'Admin User'
      },
      category: 'Test',
      tags: ['test', 'api', 'automation'],
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
      status: 'draft'
    };

    const response = await fetch(`${apiBase}/cms/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testPost)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Created post with ID:', data.post?.id);
      console.log('Post:', data.post);
      
      // Save ID for cleanup
      window.testPostId = data.post?.id;
    } else {
      console.error('❌ Failed:', response.status, data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n');

  // Test 4: Get Categories
  console.log('📁 Test 4: Fetching categories...');
  try {
    const response = await fetch(`${apiBase}/cms/categories`, { headers });
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Found', data.categories?.length || 0, 'categories');
    } else {
      console.error('❌ Failed:', response.status, data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n');

  // Test 5: Get Tags
  console.log('🏷️ Test 5: Fetching tags...');
  try {
    const response = await fetch(`${apiBase}/cms/tags`, { headers });
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Found', data.tags?.length || 0, 'tags');
    } else {
      console.error('❌ Failed:', response.status, data);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n=================\n');
  console.log('✅ Blog API Tests Complete!');
  console.log('\nTo clean up test post (if created), run:');
  console.log('await cleanupTestPost()');
}

// Cleanup function
async function cleanupTestPost() {
  if (!window.testPostId) {
    console.log('No test post to clean up');
    return;
  }

  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicKey}`
  };

  try {
    const response = await fetch(`${apiBase}/cms/posts/${window.testPostId}`, {
      method: 'DELETE',
      headers
    });

    if (response.ok) {
      console.log('✅ Test post deleted successfully');
      window.testPostId = null;
    } else {
      console.error('❌ Failed to delete test post');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Quick test function (read-only)
async function quickTestBlog() {
  console.log('🚀 Quick Blog API Test\n');
  
  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;
  const headers = {
    'Authorization': `Bearer ${publicKey}`
  };

  try {
    const response = await fetch(`${apiBase}/cms/posts`, { headers });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Blog API is working!');
      console.log(`📊 Found ${data.posts?.length || 0} total posts`);
      
      const published = data.posts?.filter(p => p.status === 'published').length || 0;
      const draft = data.posts?.filter(p => p.status === 'draft').length || 0;
      
      console.log(`   - ${published} published`);
      console.log(`   - ${draft} drafts`);
      
      if (data.posts?.length > 0) {
        console.log('\n📝 Latest post:');
        console.log(`   Title: ${data.posts[0].title}`);
        console.log(`   Status: ${data.posts[0].status}`);
        console.log(`   Created: ${data.posts[0].createdAt}`);
      }
    } else {
      console.error('❌ Blog API Error:', response.status);
      const data = await response.json();
      console.error('Details:', data);
    }
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
  }
}

// Export functions
window.testBlogAPI = testBlogAPI;
window.quickTestBlog = quickTestBlog;
window.cleanupTestPost = cleanupTestPost;

console.log('📚 Blog API Test Functions Loaded!');
console.log('\nAvailable commands:');
console.log('  quickTestBlog()    - Quick read-only test');
console.log('  testBlogAPI()      - Full test suite (includes write test)');
console.log('  cleanupTestPost()  - Delete test post created by testBlogAPI()');
console.log('\n💡 Run: quickTestBlog()');
