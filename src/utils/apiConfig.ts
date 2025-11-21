/**
 * API Configuration - Centralized API URL Management
 * 
 * এই ফাইলটি সব API calls এর জন্য সঠিক URL generate করে।
 * একবার এখানে পরিবর্তন করলে সমস্ত অ্যাপ্লিকেশনে আপডেট হবে।
 */

import { projectId, publicAnonKey } from './supabase/info';

/**
 * Supabase Edge Function Configuration
 * 
 * Edge Function Structure:
 * - Function Name: server (from /supabase/functions/server/)
 * - Full Path: /functions/v1/server/
 * - Route Prefix: /make-server-5b21d3ea/ (defined in server routes)
 * 
 * The edge function is deployed as "server" and all routes are prefixed with /make-server-5b21d3ea/
 */
const EDGE_FUNCTION_NAME = 'server';
const SERVER_ROUTE_PREFIX = 'make-server-5b21d3ea';

/**
 * Base API URL for all server requests
 * 
 * Format: https://projectId.supabase.co/functions/v1/server/make-server-5b21d3ea
 * Note: Routes in the server are prefixed with /make-server-5b21d3ea/
 */
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/${EDGE_FUNCTION_NAME}/${SERVER_ROUTE_PREFIX}`;

/**
 * Get full API endpoint URL
 * 
 * @param endpoint - The endpoint path (e.g., '/auth/login', '/users')
 * @returns Full URL for the API endpoint
 * 
 * @example
 * ```ts
 * const loginUrl = getApiUrl('/auth/login');
 * // Returns: https://projectId.supabase.co/functions/v1/server/make-server-5b21d3ea/auth/login
 * ```
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Get default headers for API requests
 * 
 * @param includeAuth - Whether to include Authorization header (default: true)
 * @returns Headers object
 */
export function getApiHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  return headers;
}

/**
 * Make API request with proper error handling
 * 
 * @param endpoint - The endpoint path
 * @param options - Fetch options
 * @returns Response data
 * 
 * @example
 * ```ts
 * const data = await apiRequest('/auth/login', {
 *   method: 'POST',
 *   body: JSON.stringify({ email, password })
 * });
 * ```
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  const headers = {
    ...getApiHeaders(),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Legacy API base for backward compatibility
 * @deprecated Use API_BASE_URL instead
 */
export const API_BASE = API_BASE_URL;

// Export project info for convenience
export { projectId, publicAnonKey };
