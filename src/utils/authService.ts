/**
 * Authentication Service - Flexible Auth with Mock Mode
 * Handles login, registration with both Mock and Supabase modes
 */

import { supabase } from './supabase/client';
import { API_BASE_URL, getApiHeaders } from './apiConfig';

const API_BASE = API_BASE_URL;

// ==================== MOCK MODE CONFIGURATION ====================
// Set to true to enable simple login without Supabase database verification
// This allows login with any email/password for testing purposes
const ENABLE_MOCK_MODE = true; // Change to false to use Supabase Auth

export interface LoginData {
  emailOrPhone: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  role: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
  donorType?: 'zakat' | 'materials';
}

export interface User {
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
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  message?: string;
}

// ==================== REGISTER ====================

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  // Check if mock mode is enabled
  if (ENABLE_MOCK_MODE) {
    console.log('🎭 Using Mock Authentication Mode');
    return mockRegister(data);
  }
  
  try {
    console.log('📝 Registration attempt with Supabase Auth:', data.email, data.role);
    
    // Step 1: Create auth user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.fullName,
          phone: data.phone,
          role: data.role,
          address: data.address || '',
          donorType: data.donorType || null
        }
      }
    });

    if (authError) {
      console.error('❌ Supabase Auth registration failed:', authError);
      
      // Handle rate limiting gracefully
      if (authError.message.includes('request this after')) {
        return {
          success: false,
          error: 'Please wait a moment before trying again. Supabase has rate limiting for security.'
        };
      }
      
      // Handle user already exists
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        return {
          success: false,
          error: 'This email is already registered. Please try logging in instead.'
        };
      }
      
      return {
        success: false,
        error: authError.message
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'Registration failed - no user created'
      };
    }

    console.log('✅ Supabase Auth user created:', authData.user.id);

    // Step 2: Create user profile in our backend
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          id: authData.user.id,
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          address: data.address || '',
          donorType: data.donorType
        })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Backend profile creation failed:', result.error);
        // Note: Auth user exists but profile failed - they can try logging in
        return {
          success: false,
          error: result.error || 'Profile creation failed'
        };
      }

      console.log('✅ User profile created in backend:', result.user);

      // Get session token
      const session = authData.session;
      const token = session?.access_token || '';

      // Store user data
      if (result.user && token) {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('auth_token', token);
        
        if (result.user.role === 'donor') {
          localStorage.setItem('donor_user', JSON.stringify(result.user));
          localStorage.setItem('donor_token', token);
        }
      }

      return {
        success: true,
        user: result.user,
        token: token,
        message: 'Registration successful'
      };
    } catch (backendError) {
      console.error('❌ Backend error:', backendError);
      
      // If backend fails but Supabase Auth succeeded, user can still login
      // Store the auth data so they can use the app
      if (authData.session) {
        const user: User = {
          id: authData.user.id,
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          address: data.address,
          donorType: data.donorType,
          credits: data.role === 'teacher' ? 50 : data.role === 'guardian' ? 100 : 0,
          status: 'active',
          isProfileComplete: false,
          isVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const token = authData.session.access_token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('auth_token', token);

        console.log('⚠️ Registered with fallback (backend unavailable)');
        
        return {
          success: true,
          user: user,
          token: token,
          message: 'Registration successful (offline mode)'
        };
      }
      
      return {
        success: false,
        error: 'Profile creation failed. Please try logging in.'
      };
    }
  } catch (error) {
    console.error('❌ Registration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    };
  }
};

// ==================== MOCK LOGIN (Development Mode) ====================
const mockLogin = async (data: LoginData, selectedRole?: string): Promise<AuthResponse> => {
  try {
    console.log('🔐 Mock Login (Development Mode):', data.emailOrPhone);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate a mock user ID
    const userId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Extract name from email
    const emailName = data.emailOrPhone.split('@')[0];
    const name = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    
    // Determine role from selectedRole or default to 'teacher'
    const role = (selectedRole as any) || 'teacher';
    
    // Assign credits based on role
    let credits = 0;
    if (role === 'teacher') credits = 50;
    else if (role === 'guardian') credits = 100;
    else if (role === 'student') credits = 0;
    else if (role === 'donor') credits = 0;
    else if (role === 'admin') credits = 999;
    
    // Create mock user
    const user: User = {
      id: userId,
      name: name,
      email: data.emailOrPhone.includes('@') ? data.emailOrPhone : `${data.emailOrPhone}@example.com`,
      phone: data.emailOrPhone.includes('@') ? '01700000000' : data.emailOrPhone,
      role: role,
      credits: credits,
      status: 'active',
      isProfileComplete: false,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Generate mock token
    const token = `mock_token_${userId}`;
    
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    
    if (user.role === 'donor') {
      localStorage.setItem('donor_user', JSON.stringify(user));
      localStorage.setItem('donor_token', token);
    }
    
    console.log('✅ Mock login successful:', user);
    
    return {
      success: true,
      user: user,
      token: token,
      message: 'Mock login successful (Development Mode)'
    };
  } catch (error) {
    console.error('❌ Mock login error:', error);
    return {
      success: false,
      error: 'Mock login failed'
    };
  }
};

// ==================== MOCK REGISTER (Development Mode) ====================
const mockRegister = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    console.log('📝 Mock Registration (Development Mode):', data.email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate a mock user ID
    const userId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Assign credits based on role
    let credits = 0;
    if (data.role === 'teacher') credits = 50;
    else if (data.role === 'guardian') credits = 100;
    else if (data.role === 'student') credits = 0;
    else if (data.role === 'donor') credits = 0;
    else if (data.role === 'admin') credits = 999;
    
    // Create mock user
    const user: User = {
      id: userId,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      address: data.address,
      donorType: data.donorType,
      credits: credits,
      status: 'active',
      isProfileComplete: false,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Generate mock token
    const token = `mock_token_${userId}`;
    
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    
    if (user.role === 'donor') {
      localStorage.setItem('donor_user', JSON.stringify(user));
      localStorage.setItem('donor_token', token);
    }
    
    console.log('✅ Mock registration successful:', user);
    
    return {
      success: true,
      user: user,
      token: token,
      message: 'Mock registration successful (Development Mode)'
    };
  } catch (error) {
    console.error('❌ Mock registration error:', error);
    return {
      success: false,
      error: 'Mock registration failed'
    };
  }
};

// ==================== LOGIN ====================

export const login = async (data: LoginData, selectedRole?: string): Promise<AuthResponse> => {
  // Check if mock mode is enabled
  if (ENABLE_MOCK_MODE) {
    console.log('🎭 Using Mock Authentication Mode');
    return mockLogin(data, selectedRole);
  }
  
  try {
    console.log('🔐 Login attempt with Supabase Auth:', data.emailOrPhone);
    
    // Determine if input is email or phone
    const isEmail = data.emailOrPhone.includes('@');
    
    if (!isEmail) {
      // Phone login - need to get email first from backend
      console.log('📱 Phone login detected, fetching user email...');
      try {
        const response = await fetch(`${API_BASE}/auth/get-email-by-phone`, {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({ phone: data.emailOrPhone })
        });

        const result = await response.json();
        
        if (!response.ok || !result.email) {
          return {
            success: false,
            error: 'Phone number not found'
          };
        }

        // Use the retrieved email for Supabase Auth
        data.emailOrPhone = result.email;
      } catch (error) {
        console.error('❌ Phone lookup failed:', error);
        
        // If backend is down, inform user to use email
        if (error instanceof TypeError && error.message.includes('fetch')) {
          return {
            success: false,
            error: 'Server unavailable. Please use your email address to login instead of phone number.'
          };
        }
        
        return {
          success: false,
          error: 'Phone number not found. Please use your email address or register first.'
        };
      }
    }

    // Step 1: Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.emailOrPhone,
      password: data.password
    });

    if (authError) {
      console.error('❌ Supabase Auth login failed:', authError);
      
      // Provide user-friendly error messages
      let errorMessage = authError.message;
      
      if (authError.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (authError.message.includes('Email not confirmed')) {
        errorMessage = 'Please confirm your email address before logging in.';
      } else if (authError.message.includes('request this after')) {
        errorMessage = 'Please wait a moment before trying again.';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }

    if (!authData.user || !authData.session) {
      return {
        success: false,
        error: 'Login failed - no session created'
      };
    }

    console.log('✅ Supabase Auth login successful:', authData.user.id);

    // Step 2: Get user profile from backend
    try {
      const response = await fetch(`${API_BASE}/users/${authData.user.id}`, {
        headers: {
          ...getApiHeaders(),
          'Authorization': `Bearer ${authData.session.access_token}`
        }
      });

      const result = await response.json();

      if (!response.ok || !result.user) {
        console.error('❌ Failed to fetch user profile:', result.error);
        return {
          success: false,
          error: 'Failed to load user profile'
        };
      }

      console.log('✅ User profile loaded:', result.user.name, result.user.role);

      const user = result.user;
      const token = authData.session.access_token;

      // Store auth data
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('auth_token', token);
      
      // Backward compatibility for donors
      if (user.role === 'donor') {
        localStorage.setItem('donor_user', JSON.stringify(user));
        localStorage.setItem('donor_token', token);
      }

      return {
        success: true,
        user: user,
        token: token
      };
    } catch (backendError) {
      console.error('❌ Backend profile fetch error:', backendError);
      console.log('⚠️ Using fallback: Supabase Auth user metadata');
      
      // Fallback: Use metadata from auth user
      const user: User = {
        id: authData.user.id,
        name: authData.user.user_metadata?.name || 'User',
        email: authData.user.email || '',
        phone: authData.user.user_metadata?.phone || '',
        role: authData.user.user_metadata?.role || 'student',
        address: authData.user.user_metadata?.address,
        donorType: authData.user.user_metadata?.donorType,
        credits: authData.user.user_metadata?.role === 'teacher' ? 50 : 
                 authData.user.user_metadata?.role === 'guardian' ? 100 : 0,
        status: 'active',
        isProfileComplete: false,
        isVerified: authData.user.email_confirmed_at ? true : false,
        createdAt: authData.user.created_at || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const token = authData.session.access_token;

      // Store fallback data
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('auth_token', token);
      
      if (user.role === 'donor') {
        localStorage.setItem('donor_user', JSON.stringify(user));
        localStorage.setItem('donor_token', token);
      }

      console.log('✅ Login successful (offline mode)');

      return {
        success: true,
        user: user,
        token: token
      };
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};

// ==================== GET USER ====================

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      headers: {
        ...getApiHeaders(),
        'Authorization': session?.access_token ? `Bearer ${session.access_token}` : ''
      }
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.user || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// ==================== UPDATE USER ====================

export const updateUser = async (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PUT',
      headers: {
        ...getApiHeaders(),
        'Authorization': session?.access_token ? `Bearer ${session.access_token}` : ''
      },
      body: JSON.stringify(updates)
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Update failed'
      };
    }

    // Update stored user data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedUser = { ...user, ...result.user };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      if (updatedUser.role === 'donor') {
        localStorage.setItem('donor_user', JSON.stringify(updatedUser));
      }
    }

    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
};

// ==================== LOGOUT ====================

export const logout = async (): Promise<void> => {
  console.log('👋 Logging out');
  
  try {
    // Sign out from Supabase Auth
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Supabase signOut error:', error);
  }
  
  // Clear all stored auth data
  localStorage.removeItem('currentUser');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('donor_user');
  localStorage.removeItem('donor_token');
  sessionStorage.clear();
};

// ==================== GET CURRENT USER FROM STORAGE ====================

export const getCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('auth_token');

    if (storedUser && authToken) {
      return JSON.parse(storedUser);
    }

    // Try legacy donor_user for backward compatibility
    const storedDonorUser = localStorage.getItem('donor_user');
    if (storedDonorUser) {
      return JSON.parse(storedDonorUser);
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// ==================== CHECK IF AUTHENTICATED ====================

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem('auth_token');
  const currentUser = getCurrentUser();
  return !!(authToken && currentUser);
};

// ==================== GET CURRENT SESSION ====================

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Session check error:', error);
    return null;
  }
};

// ==================== REFRESH SESSION ====================

export const refreshSession = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error || !session) {
      console.error('Session refresh failed:', error);
      return false;
    }

    // Update stored token
    localStorage.setItem('auth_token', session.access_token);
    
    return true;
  } catch (error) {
    console.error('Session refresh error:', error);
    return false;
  }
};

// ==================== PASSWORD RESET ====================

export interface PasswordResetResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Send password reset email
 * @param email - User's email address
 * @returns Promise with success status and message
 */
export const sendPasswordResetEmail = async (email: string): Promise<PasswordResetResponse> => {
  try {
    console.log('📧 Sending password reset email to:', email);
    
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Valid email address is required'
      };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      console.error('❌ Password reset email failed:', error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log('✅ Password reset email sent successfully');
    return {
      success: true,
      message: 'Password reset email sent successfully. Please check your inbox.'
    };
  } catch (error) {
    console.error('❌ Password reset error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send reset email'
    };
  }
};

/**
 * Update password with reset token (for when user clicks email link)
 * @param newPassword - New password
 * @returns Promise with success status
 */
export const updatePasswordWithToken = async (newPassword: string): Promise<PasswordResetResponse> => {
  try {
    console.log('🔑 Updating password...');
    
    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('❌ Password update failed:', error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log('✅ Password updated successfully');
    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error) {
    console.error('❌ Password update error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update password'
    };
  }
};
