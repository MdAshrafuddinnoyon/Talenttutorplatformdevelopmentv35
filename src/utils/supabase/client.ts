/**
 * Supabase Client - Browser-side client for Talent Tutor
 * This creates a singleton Supabase client instance for the frontend
 */

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Supabase URL
const supabaseUrl = `https://${projectId}.supabase.co`;

// Create singleton client instance
let supabaseClient: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Supabase client instance
 * This ensures we only create one client throughout the app
 */
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, publicAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'talent-tutor-auth',
        storage: window.localStorage,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseClient;
};

/**
 * Export the client for direct use
 */
export const supabase = getSupabaseClient();

/**
 * Database types for Talent Tutor
 */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          role: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
          address?: string;
          donorType?: 'zakat' | 'materials';
          credits: number;
          status: string;
          isProfileComplete: boolean;
          isVerified: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
}
