/**
 * API Client Utility for Talent Tutor
 * 
 * Provides centralized API calling functions for all backend endpoints
 */

import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic API call function
 */
async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'API call failed' };
    }

    if (data.error) {
      return { success: false, error: data.error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('API call error:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// ==================== AUTH APIS ====================

export const authApi = {
  /**
   * Register new user
   */
  async register(data: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    role: 'teacher' | 'guardian' | 'student' | 'donor';
    address?: string;
    donorType?: 'zakat' | 'materials';
  }) {
    return apiCall('/auth/register', 'POST', data);
  },

  /**
   * Login user
   */
  async login(data: {
    emailOrPhone: string;
    password: string;
  }) {
    return apiCall('/auth/login', 'POST', data);
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    return apiCall(`/users/${userId}`);
  },

  /**
   * Update user profile
   */
  async updateUser(userId: string, updates: any) {
    return apiCall(`/users/${userId}`, 'PUT', updates);
  },

  /**
   * Get all users (admin only)
   */
  async getAllUsers(role?: string) {
    const query = role ? `?role=${role}` : '';
    return apiCall(`/users${query}`);
  },
};

// ==================== DONOR APIS ====================

export const donorApi = {
  /**
   * Get available applications for donor (filtered by donor type)
   */
  async getAvailableApplications(donorId: string) {
    return apiCall(`/donor/${donorId}/available-applications`);
  },

  /**
   * Get donor profile
   */
  async getProfile(donorId: string) {
    return apiCall(`/donor/${donorId}`);
  },

  /**
   * Get donor donations history
   */
  async getDonations(donorId: string) {
    return apiCall(`/donor/${donorId}/donations`);
  },

  /**
   * Get donor impact metrics
   */
  async getImpact(donorId: string) {
    return apiCall(`/donor/${donorId}/impact`);
  },

  /**
   * Update donor profile
   */
  async updateProfile(donorId: string, data: any) {
    return apiCall(`/donor/${donorId}`, 'PUT', data);
  },
};

// ==================== STUDENT APIS ====================

export const studentApi = {
  /**
   * Create student application
   */
  async createApplication(data: any) {
    return apiCall('/student/application/create', 'POST', data);
  },

  /**
   * Get student's applications
   */
  async getApplications(studentId: string) {
    return apiCall(`/student/${studentId}/applications`);
  },

  /**
   * Get student's received donations
   */
  async getReceivedDonations(studentId: string) {
    return apiCall(`/student/${studentId}/received-donations`);
  },

  /**
   * Get application details
   */
  async getApplicationDetails(applicationId: string) {
    return apiCall(`/student/application/${applicationId}`);
  },
};

// ==================== DONATION APIS ====================

export const donationApi = {
  /**
   * Create donation for specific student
   */
  async createForStudent(data: {
    donorId: string;
    applicationId: string;
    amount?: number;
    items?: string[];
    paymentMethod?: string;
    transactionId?: string;
    anonymous?: boolean;
    message?: string;
  }) {
    return apiCall('/donation/create-for-student', 'POST', data);
  },

  /**
   * Get donation statistics
   */
  async getStats() {
    return apiCall('/donations/stats');
  },
};

// ==================== ADMIN APIS ====================

export const adminApi = {
  /**
   * Get all student applications
   */
  async getAllApplications() {
    return apiCall('/students/applications');
  },

  /**
   * Update application status
   */
  async updateApplicationStatus(applicationId: string, data: {
    status: string;
    adminComment?: string;
    assignedTeacherId?: string;
    assignedTeacherName?: string;
  }) {
    return apiCall(`/student/application/${applicationId}/status`, 'PUT', data);
  },

  /**
   * Route application to donors
   */
  async routeApplicationToDonors(applicationId: string) {
    return apiCall(`/application/${applicationId}/route-to-donors`, 'POST');
  },
};

// ==================== TICKET APIS ====================

export const ticketApi = {
  /**
   * Create support ticket
   */
  async create(data: {
    userId: string;
    userName: string;
    userRole: string;
    category: string;
    priority: string;
    subject: string;
    description: string;
    attachments?: string[];
  }) {
    return apiCall('/ticket/create', 'POST', data);
  },

  /**
   * Get user's tickets
   */
  async getUserTickets(userId: string) {
    return apiCall(`/tickets/user/${userId}`);
  },

  /**
   * Get ticket details
   */
  async getDetails(ticketId: string) {
    return apiCall(`/ticket/${ticketId}`);
  },

  /**
   * Add reply to ticket
   */
  async addReply(ticketId: string, data: {
    userId: string;
    userName: string;
    userRole: string;
    message: string;
  }) {
    return apiCall(`/ticket/${ticketId}/reply`, 'POST', data);
  },
};

// ==================== NOTIFICATION APIS ====================

export const notificationApi = {
  /**
   * Send notification to user
   */
  async send(data: {
    userId: string;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    link?: string;
    priority?: 'low' | 'normal' | 'high' | 'urgent';
  }) {
    return apiCall('/notifications/send', 'POST', data);
  },

  /**
   * Get user notifications
   */
  async getUserNotifications(userId: string) {
    return apiCall(`/notifications/user/${userId}`);
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string) {
    return apiCall(`/notifications/${notificationId}/read`, 'PUT');
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string) {
    return apiCall(`/notifications/user/${userId}/read-all`, 'PUT');
  },
};

// ==================== EMAIL APIS ====================

export const emailApi = {
  /**
   * Send email
   */
  async send(data: {
    to: string;
    subject: string;
    htmlContent?: string;
    textContent?: string;
    template?: string;
    templateData?: any;
  }) {
    return apiCall('/email/send', 'POST', data);
  },
};

// ==================== PAYMENT APIS ====================

export const paymentApi = {
  /**
   * Create payment intent
   */
  async createIntent(data: {
    amount: number;
    currency?: string;
    donorId: string;
    donationType?: string;
    description?: string;
    metadata?: any;
  }) {
    return apiCall('/payment/create-intent', 'POST', data);
  },

  /**
   * Confirm payment
   */
  async confirmPayment(paymentId: string, data: {
    paymentMethod: string;
    transactionId?: string;
  }) {
    return apiCall(`/payment/${paymentId}/confirm`, 'POST', data);
  },
};

// ==================== ANALYTICS APIS ====================

export const analyticsApi = {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    return apiCall('/analytics/platform-stats');
  },

  /**
   * Get donor analytics
   */
  async getDonorAnalytics(donorId: string) {
    return apiCall(`/analytics/donor/${donorId}`);
  },
};

// ==================== ACTIVITY LOG APIS ====================

export const activityApi = {
  /**
   * Log user activity
   */
  async log(data: {
    userId: string;
    userRole?: string;
    action: string;
    details?: string;
    metadata?: any;
  }) {
    return apiCall('/activity/log', 'POST', data);
  },

  /**
   * Get user activity log
   */
  async getUserActivities(userId: string) {
    return apiCall(`/activity/user/${userId}`);
  },
};

// ==================== CREDIT MANAGEMENT APIS ====================

export const creditApi = {
  /**
   * Initialize user credits (on signup)
   */
  async initialize(userId: string, userType: 'teacher' | 'guardian' | 'student' | 'admin') {
    return apiCall('/credits/initialize', 'POST', { userId, userType });
  },

  /**
   * Get user credits
   */
  async getUserCredits(userId: string) {
    return apiCall(`/credits/${userId}`);
  },

  /**
   * Deduct credits from user
   */
  async deduct(data: {
    userId: string;
    amount: number;
    description: string;
    descriptionEn?: string;
    relatedTo?: string;
  }) {
    return apiCall('/credits/deduct', 'POST', data);
  },

  /**
   * Add credits to user
   */
  async add(data: {
    userId: string;
    amount: number;
    type: 'purchased' | 'bonus' | 'earned' | 'admin_added';
    description: string;
    descriptionEn?: string;
    packageId?: string;
    adminNote?: string;
  }) {
    return apiCall('/credits/add', 'POST', data);
  },

  /**
   * Get user transaction history
   */
  async getTransactions(userId: string, limit: number = 50, offset: number = 0) {
    return apiCall(`/credits/transactions/${userId}?limit=${limit}&offset=${offset}`);
  },

  /**
   * Purchase credit package
   */
  async purchasePackage(data: {
    userId: string;
    packageId: string;
    paymentMethod: string;
    transactionRef?: string;
  }) {
    return apiCall('/credits/purchase-package', 'POST', data);
  },

  /**
   * Admin: Get all user credits
   */
  async getAllCredits() {
    return apiCall('/admin/credits/all');
  },

  /**
   * Admin: Set user credits (override)
   */
  async adminSetCredits(userId: string, newBalance: number, adminNote?: string) {
    return apiCall(`/admin/credits/${userId}`, 'PUT', { newBalance, adminNote });
  },
};

// Export all
export default {
  authApi,
  donorApi,
  studentApi,
  donationApi,
  adminApi,
  ticketApi,
  notificationApi,
  emailApi,
  paymentApi,
  analyticsApi,
  activityApi,
  creditApi,
};
