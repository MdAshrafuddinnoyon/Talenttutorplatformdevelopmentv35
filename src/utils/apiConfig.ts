/**
 * API Configuration - Centralized API URL Management
 * 
 * এই ফাইলটি সব API calls এর জন্য সঠিক URL generate করে।
 * একবার এখানে পরিবর্তন করলে সমস্ত অ্যাপ্লিকেশনে আপডেট হবে।
 */

// Placeholder values for Mock Mode
export const projectId = "mock-project-id";
export const publicAnonKey = "mock-anon-key";

/**
 * Supabase Edge Function Configuration
 */
const EDGE_FUNCTION_NAME = 'server';
const SERVER_ROUTE_PREFIX = 'make-server-5b21d3ea';

/**
 * Base API URL for all server requests
 */
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/${EDGE_FUNCTION_NAME}/${SERVER_ROUTE_PREFIX}`;

/**
 * Get full API endpoint URL
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Get default headers for API requests
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
 */
export const API_BASE = API_BASE_URL;
