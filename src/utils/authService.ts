/**
 * Authentication Service - Pure Mock Implementation
 * Handles login, registration without Supabase backend
 */

import { API_BASE_URL, getApiHeaders } from './apiConfig';

const API_BASE = API_BASE_URL;

// ==================== MOCK MODE CONFIGURATION ====================
const ENABLE_MOCK_MODE = true;

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

// ==================== HELPER: MOCK DELAY ====================
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== HELPER: CREATE MOCK USER ====================
const createMockUser = (data: Partial<RegisterData> & { role: string, emailOrPhone?: string }): User => {
  const userId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  let email = data.email || '';
  if (!email && data.emailOrPhone && data.emailOrPhone.includes('@')) {
    email = data.emailOrPhone;
  } else if (!email) {
    email = `user_${userId}@example.com`;
  }
  
  let credits = 0;
  if (data.role === 'teacher') credits = 50;
  else if (data.role === 'guardian') credits = 100;
  else if (data.role === 'admin') credits = 999;

  return {
    id: userId,
    name: data.fullName || 'Mock User',
    email: email,
    phone: data.phone || '01700000000',
    role: data.role as any,
    address: data.address,
    donorType: data.donorType,
    credits: credits,
    status: 'active',
    isProfileComplete: true,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// ==================== REGISTER ====================

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  console.log('📝 Mock Registration:', data.email);
  await delay(800);
  
  const user = createMockUser(data);
  const token = `mock_token_${user.id}`;
  
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('auth_token', token);
  
  if (user.role === 'donor') {
    localStorage.setItem('donor_user', JSON.stringify(user));
    localStorage.setItem('donor_token', token);
  }
  
  return {
    success: true,
    user: user,
    token: token,
    message: 'Registration successful (Mock)'
  };
};

// ==================== LOGIN ====================

export const login = async (data: LoginData, selectedRole?: string): Promise<AuthResponse> => {
  console.log('🔐 Mock Login:', data.emailOrPhone);
  await delay(500);
  
  // Default role logic
  const role = selectedRole || 'teacher';
  
  const user = createMockUser({ 
    fullName: 'Mock User', 
    role: role, 
    emailOrPhone: data.emailOrPhone 
  });
  
  const token = `mock_token_${user.id}`;

  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('auth_token', token);
  
  if (user.role === 'donor') {
    localStorage.setItem('donor_user', JSON.stringify(user));
    localStorage.setItem('donor_token', token);
  }

  return {
    success: true,
    user: user,
    token: token
  };
};

// ==================== GET USER ====================

export const getUser = async (userId: string): Promise<User | null> => {
  const storedUser = getCurrentUser();
  if (storedUser && storedUser.id === userId) {
    return storedUser;
  }
  
  // Return a generic mock user if not found in local storage
  return createMockUser({ role: 'student' });
};

// ==================== UPDATE USER ====================

export const updateUser = async (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
  await delay(300);
  
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    if (updatedUser.role === 'donor') {
      localStorage.setItem('donor_user', JSON.stringify(updatedUser));
    }
    
    return {
      success: true,
      user: updatedUser
    };
  }
  
  return {
    success: false,
    error: 'User not found'
  };
};

// ==================== LOGOUT ====================

export const logout = async (): Promise<void> => {
  console.log('👋 Logging out');
  
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

    // Legacy support
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
  return { access_token: 'mock_token' };
};

// ==================== REFRESH SESSION ====================

export const refreshSession = async (): Promise<boolean> => {
  return true;
};

// ==================== PASSWORD RESET ====================

export interface PasswordResetResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const sendPasswordResetEmail = async (email: string): Promise<PasswordResetResponse> => {
  console.log('📧 Mock password reset email sent to:', email);
  await delay(500);
  return {
    success: true,
    message: 'Password reset email sent successfully (Mock)'
  };
};

export const updatePasswordWithToken = async (newPassword: string): Promise<PasswordResetResponse> => {
  console.log('🔑 Mock password update');
  await delay(500);
  return {
    success: true,
    message: 'Password updated successfully (Mock)'
  };
};
