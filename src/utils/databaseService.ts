/**
 * Database Service - Real-time Database Integration for Talent Tutor
 * Connects frontend with Supabase backend
 */

import { API_BASE_URL, getApiHeaders } from './apiConfig';
import { checkServerHealth, runServerDiagnostics } from './serverHealthCheck';
import { tuitionPosts as fallbackTuitionPosts } from './tuitionData';

// Use centralized API configuration
const API_BASE = API_BASE_URL;
const API_BASE_AUTH = API_BASE_URL; // Now both use same base

// API Headers - use centralized function
const getHeaders = () => getApiHeaders();

// Run diagnostics on first import (helps debug connection issues)
// Disabled by default to reduce console noise - enable only for debugging
let diagnosticsRun = true; // Set to false to enable diagnostics
if (!diagnosticsRun) {
  diagnosticsRun = true;
  runServerDiagnostics().catch(err => {
    console.error('Diagnostics error:', err);
  });
}

// ==================== TUITION POSTS ====================

export interface TuitionPost {
  id: string;
  title: string;
  location: string;
  subjects: string[];
  classes: string[];
  medium: string;
  budget: {
    min: number;
    max: number;
  };
  description: string;
  urgent: boolean;
  status: 'open' | 'in-progress' | 'closed';
  guardianId: string;
  guardianName: string;
  guardianPhone?: string;
  applicants: number;
  createdAt: string;
  updatedAt: string;
}

export const tuitionPostsAPI = {
  // Get all tuition posts
  getAll: async (filters?: { urgent?: boolean; status?: string }): Promise<TuitionPost[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.urgent !== undefined) params.append('urgent', String(filters.urgent));
      if (filters?.status) params.append('status', filters.status);
      
      const url = `${API_BASE}/tuition-posts?${params}`;
      
      const response = await fetch(url, {
        headers: getHeaders()
      });
      
      if (!response.ok) {
        // Server responded but with error - use fallback data
        throw new Error(`Server returned ${response.status}`);
      }
      
      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      // Silently use fallback data when server is not available
      // This is expected behavior during development or when Edge Function is not deployed
      
      // Convert fallback data format to match API response format
      const fallbackData = fallbackTuitionPosts.map(post => ({
        id: post.id,
        title: post.title,
        location: post.location,
        subjects: post.subjects,
        classes: [post.studentClass],
        medium: post.mode || 'বাংলা মাধ্যম',
        budget: post.budget,
        description: post.description,
        urgent: post.urgent,
        status: 'open' as const,
        guardianId: post.parent.id || post.parent.name,
        guardianName: post.parent.name,
        postedDate: post.postedDate,
        applicants: post.applicants,
        featured: post.featured,
        schedule: post.schedule,
        duration: post.duration,
        requirements: post.requirements || [],
        preferences: post.preferences,
        startDate: post.startDate
      }));
      
      // Apply filters if provided
      let filteredData = fallbackData;
      if (filters?.urgent !== undefined) {
        filteredData = filteredData.filter(post => post.urgent === filters.urgent);
      }
      if (filters?.status) {
        filteredData = filteredData.filter(post => post.status === filters.status);
      }
      
      return filteredData;
    }
  },

  // Get urgent posts only
  getUrgent: async (): Promise<TuitionPost[]> => {
    return tuitionPostsAPI.getAll({ urgent: true, status: 'open' });
  },

  // Create new tuition post
  create: async (postData: Partial<TuitionPost>): Promise<TuitionPost | null> => {
    try {
      const response = await fetch(`${API_BASE}/tuition-posts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) throw new Error('Failed to create tuition post');
      
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error creating tuition post:', error);
      return null;
    }
  },

  // Update tuition post
  update: async (postId: string, updates: Partial<TuitionPost>): Promise<TuitionPost | null> => {
    try {
      const response = await fetch(`${API_BASE}/tuition-posts/${postId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update tuition post');
      
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error updating tuition post:', error);
      return null;
    }
  },

  // Delete tuition post
  delete: async (postId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/tuition-posts/${postId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting tuition post:', error);
      return false;
    }
  }
};

// ==================== TEACHERS ====================

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'teacher';
  subjects: string[];
  classes: string[];
  medium: string[];
  experience: string;
  education: string;
  location: {
    district: string;
    area: string;
    coordinates?: { lat: number; lng: number };
  };
  hourlyRate: number;
  bio: string;
  photo?: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  credits: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const teachersAPI = {
  // Get all teachers
  getAll: async (filters?: { subject?: string; district?: string }): Promise<Teacher[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.subject) params.append('subject', filters.subject);
      if (filters?.district) params.append('district', filters.district);
      
      const response = await fetch(`${API_BASE}/teachers?${params}`, {
        headers: getHeaders()
      });
      
      if (!response.ok) throw new Error('Failed to fetch teachers');
      
      const data = await response.json();
      return data.teachers || [];
    } catch (error) {
      // Silently fail and return empty array - UI will use fallback data
      return [];
    }
  },

  // Get teacher by ID
  getById: async (teacherId: string): Promise<Teacher | null> => {
    try {
      const response = await fetch(`${API_BASE}/teachers/${teacherId}`, {
        headers: getHeaders()
      });
      
      if (!response.ok) throw new Error('Failed to fetch teacher');
      
      const data = await response.json();
      return data.teacher;
    } catch (error) {
      // Silently fail and return null - UI will handle fallback
      return null;
    }
  },

  // Update teacher profile
  update: async (teacherId: string, updates: Partial<Teacher>): Promise<Teacher | null> => {
    try {
      const response = await fetch(`${API_BASE}/teachers/${teacherId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update teacher');
      
      const data = await response.json();
      return data.teacher;
    } catch (error) {
      console.error('Error updating teacher:', error);
      return null;
    }
  }
};

// ==================== BLOG POSTS ====================

export interface BlogPost {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    photo?: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
}

export const blogAPI = {
  // Get all blog posts
  getAll: async (filters?: { status?: string; category?: string }): Promise<BlogPost[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.category) params.append('category', filters.category);
      
      const response = await fetch(`${API_BASE_AUTH}/cms/posts?${params}`, {
        headers: getHeaders()
      });
      
      if (!response.ok) {
        // CMS is optional, silently return empty array
        console.info(`Blog API not available (${response.status}), using static content`);
        return [];
      }
      
      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      // CMS is optional - this is expected when server is not running
      console.info('Blog posts API not available, using static content');
      return [];
    }
  },

  // Get published posts
  getPublished: async (): Promise<BlogPost[]> => {
    return blogAPI.getAll({ status: 'published' });
  },

  // Create blog post
  create: async (postData: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`${API_BASE_AUTH}/cms/posts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) throw new Error('Failed to create blog post');
      
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
  },

  // Update blog post
  update: async (postId: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`${API_BASE_AUTH}/cms/posts/${postId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update blog post');
      
      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  },

  // Delete blog post
  delete: async (postId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_AUTH}/cms/posts/${postId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }
};

// ==================== DONATION LIBRARY ====================

export interface LibraryItem {
  id: string;
  type: 'book' | 'equipment' | 'other';
  title: string;
  description: string;
  quantity: number;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  category: string;
  images: string[];
  donorId: string;
  donorName: string;
  location: string;
  status: 'available' | 'reserved' | 'donated';
  requestedBy?: string[];
  createdAt: string;
  updatedAt: string;
}

export const libraryAPI = {
  // Get all library items
  getAll: async (filters?: { type?: string; status?: string }): Promise<LibraryItem[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.status) params.append('status', filters.status);
      
      const response = await fetch(`${API_BASE}/library-items?${params}`, {
        headers: getHeaders()
      });
      
      if (!response.ok) throw new Error('Failed to fetch library items');
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching library items:', error);
      return [];
    }
  },

  // Get available items
  getAvailable: async (): Promise<LibraryItem[]> => {
    return libraryAPI.getAll({ status: 'available' });
  },

  // Create library item
  create: async (itemData: Partial<LibraryItem>): Promise<LibraryItem | null> => {
    try {
      const response = await fetch(`${API_BASE}/library-items`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(itemData)
      });
      
      if (!response.ok) throw new Error('Failed to create library item');
      
      const data = await response.json();
      return data.item;
    } catch (error) {
      console.error('Error creating library item:', error);
      return null;
    }
  },

  // Update library item
  update: async (itemId: string, updates: Partial<LibraryItem>): Promise<LibraryItem | null> => {
    try {
      const response = await fetch(`${API_BASE}/library-items/${itemId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update library item');
      
      const data = await response.json();
      return data.item;
    } catch (error) {
      console.error('Error updating library item:', error);
      return null;
    }
  },

  // Request library item
  requestItem: async (itemId: string, studentId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/library-items/${itemId}/request`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ studentId })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error requesting library item:', error);
      return false;
    }
  }
};

// ==================== ADMIN STATS ====================

export interface AdminStats {
  totalUsers: number;
  totalTeachers: number;
  totalGuardians: number;
  totalStudents: number;
  totalDonors: number;
  activeTuitionPosts: number;
  urgentTuitionPosts: number;
  totalBlogPosts: number;
  totalLibraryItems: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export const adminAPI = {
  // Get dashboard statistics
  getStats: async (): Promise<AdminStats | null> => {
    try {
      const response = await fetch(`${API_BASE}/admin/stats`, {
        headers: getHeaders()
      });
      
      if (!response.ok) throw new Error('Failed to fetch admin stats');
      
      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return null;
    }
  }
};

// ==================== REAL-TIME SYNC ====================

/**
 * Subscribe to real-time updates for a specific data type
 * Uses polling for now, can be upgraded to WebSocket later
 */
export class RealtimeSync {
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  subscribe(
    dataType: 'tuition-posts' | 'blog-posts' | 'library-items' | 'teachers',
    callback: (data: any[]) => void,
    pollInterval: number = 5000
  ) {
    // Clear existing interval if any
    this.unsubscribe(dataType);

    // Initial fetch
    this.fetchData(dataType, callback);

    // Set up polling
    const interval = setInterval(() => {
      this.fetchData(dataType, callback);
    }, pollInterval);

    this.intervals.set(dataType, interval);
  }

  unsubscribe(dataType: string) {
    const interval = this.intervals.get(dataType);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(dataType);
    }
  }

  unsubscribeAll() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
  }

  private async fetchData(dataType: string, callback: (data: any[]) => void) {
    try {
      let data: any[] = [];

      switch (dataType) {
        case 'tuition-posts':
          data = await tuitionPostsAPI.getAll();
          break;
        case 'blog-posts':
          data = await blogAPI.getPublished();
          break;
        case 'library-items':
          data = await libraryAPI.getAvailable();
          break;
        case 'teachers':
          data = await teachersAPI.getAll();
          break;
      }

      callback(data);
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
    }
  }
}

// Export singleton instance
export const realtimeSync = new RealtimeSync();
