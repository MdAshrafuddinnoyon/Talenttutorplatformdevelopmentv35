/**
 * Server Health Check Utility
 * Tests if the backend server is accessible
 */

import { API_BASE_URL } from './apiConfig';
import { projectId, publicAnonKey } from './supabase/info';

export interface HealthCheckResult {
  healthy: boolean;
  message: string;
  url?: string;
  error?: string;
  details?: any;
}

/**
 * Check if the backend server is healthy
 */
export async function checkServerHealth(): Promise<HealthCheckResult> {
  try {
    console.log('🔍 Testing server health...');
    console.log('📍 Project ID:', projectId);
    console.log('🌐 API Base URL:', API_BASE_URL);
    
    const healthUrl = `${API_BASE_URL}/health`;
    console.log('🎯 Health check URL:', healthUrl);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📊 Response OK:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text');
      console.error('❌ Server responded with error:', errorText);
      
      return {
        healthy: false,
        message: `Server returned ${response.status}: ${response.statusText}`,
        url: healthUrl,
        error: errorText
      };
    }
    
    const data = await response.json();
    console.log('✅ Server response:', data);
    
    return {
      healthy: true,
      message: 'Server is running and accessible',
      url: healthUrl,
      details: data
    };
    
  } catch (error) {
    console.error('❌ Server health check failed:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        healthy: false,
        message: 'Cannot connect to server - Edge Function may not be deployed',
        error: 'Network error: Failed to fetch. This usually means:\n' +
               '1. Edge Function is not deployed\n' +
               '2. Wrong URL or project ID\n' +
               '3. CORS issue\n' +
               '4. Network connectivity problem',
        details: {
          projectId,
          expectedUrl: API_BASE_URL,
          note: 'Please deploy the Edge Function from /supabase/functions/server/'
        }
      };
    }
    
    return {
      healthy: false,
      message: 'Server health check failed',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Test tuition posts endpoint specifically
 */
export async function testTuitionPostsEndpoint(): Promise<HealthCheckResult> {
  try {
    console.log('🔍 Testing tuition posts endpoint...');
    
    const url = `${API_BASE_URL}/tuition-posts`;
    console.log('🎯 URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      return {
        healthy: false,
        message: `Tuition posts endpoint returned ${response.status}`,
        url,
        details: errorData
      };
    }
    
    const data = await response.json();
    console.log('✅ Tuition posts response:', data);
    
    return {
      healthy: true,
      message: `Tuition posts endpoint working (${data.posts?.length || 0} posts found)`,
      url,
      details: data
    };
    
  } catch (error) {
    console.error('❌ Tuition posts test failed:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        healthy: false,
        message: 'Cannot connect to tuition posts endpoint',
        error: 'TypeError: Failed to fetch - Edge Function not accessible',
        details: {
          url: `${API_BASE_URL}/tuition-posts`,
          suggestion: 'Deploy Edge Function or check network connectivity'
        }
      };
    }
    
    return {
      healthy: false,
      message: 'Tuition posts endpoint test failed',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Run complete diagnostics
 */
export async function runServerDiagnostics(): Promise<{
  health: HealthCheckResult;
  tuitionPosts: HealthCheckResult;
  summary: string;
}> {
  console.log('');
  console.log('='.repeat(80));
  console.log('🔬 RUNNING SERVER DIAGNOSTICS');
  console.log('='.repeat(80));
  console.log('');
  
  const health = await checkServerHealth();
  const tuitionPosts = await testTuitionPostsEndpoint();
  
  let summary = '';
  
  if (health.healthy && tuitionPosts.healthy) {
    summary = '✅ All systems operational';
  } else if (!health.healthy) {
    summary = '❌ Server not accessible - Edge Function may not be deployed';
  } else if (!tuitionPosts.healthy) {
    summary = '⚠️ Server running but tuition posts endpoint has issues';
  }
  
  console.log('');
  console.log('='.repeat(80));
  console.log('📊 DIAGNOSTICS SUMMARY:', summary);
  console.log('='.repeat(80));
  console.log('');
  
  return { health, tuitionPosts, summary };
}
