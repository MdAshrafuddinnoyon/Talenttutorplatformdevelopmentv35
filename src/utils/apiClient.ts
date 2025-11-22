/**
 * API Client Utility for Talent Tutor
 * 
 * Provides centralized API calling functions for all backend endpoints.
 * Currently running in Pure Frontend Mode (Mock Data).
 */

// import { projectId, publicAnonKey } from './supabase/info';

// In pure frontend mode, we don't hit the backend
const MOCK_MODE = true;

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic API call function - MOCK IMPLEMENTATION
 */
async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  console.log(`[Mock API] ${method} ${endpoint}`, body);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock success
  return { success: true, data: {} as T };
}

// ==================== AUTH APIS ====================

export const authApi = {
  async register(data: any) { return apiCall('/auth/register', 'POST', data); },
  async login(data: any) { return apiCall('/auth/login', 'POST', data); },
  async getUserById(userId: string) { return apiCall(`/users/${userId}`); },
  async updateUser(userId: string, updates: any) { return apiCall(`/users/${userId}`, 'PUT', updates); },
  async getAllUsers(role?: string) { return apiCall(`/users${role ? `?role=${role}` : ''}`); },
};

// ==================== DONOR APIS ====================

export const donorApi = {
  async getAvailableApplications(donorId: string) { 
    return { 
      success: true, 
      data: [
        { id: 'app1', studentName: 'Rahim', class: '10', amount: 5000, description: 'Need help for exam fees' },
        { id: 'app2', studentName: 'Karim', class: '8', amount: 3000, description: 'Books required' }
      ] 
    }; 
  },
  async getProfile(donorId: string) { return apiCall(`/donor/${donorId}`); },
  async getDonations(donorId: string) { 
    return { 
      success: true, 
      data: [
        { id: 'don1', amount: 1000, date: '2023-10-01', studentName: 'Rahim' }
      ] 
    }; 
  },
  async getImpact(donorId: string) { 
    return { 
      success: true, 
      data: { totalDonated: 5000, studentsHelped: 2 } 
    }; 
  },
  async updateProfile(donorId: string, data: any) { return apiCall(`/donor/${donorId}`, 'PUT', data); },
};

// ==================== STUDENT APIS ====================

export const studentApi = {
  async createApplication(data: any) { return apiCall('/student/application/create', 'POST', data); },
  async getApplications(studentId: string) { 
    return { 
      success: true, 
      data: [
        { id: 'app1', status: 'pending', amount: 5000, description: 'Exam fees', createdAt: new Date().toISOString() }
      ] 
    }; 
  },
  async getReceivedDonations(studentId: string) { return apiCall(`/student/${studentId}/received-donations`); },
  async getApplicationDetails(applicationId: string) { return apiCall(`/student/application/${applicationId}`); },
};

// ==================== DONATION APIS ====================

export const donationApi = {
  async createForStudent(data: any) { return apiCall('/donation/create-for-student', 'POST', data); },
  async getStats() { 
    return { 
      success: true, 
      data: { totalDonations: 500000, totalStudents: 150, activeDonors: 50 } 
    }; 
  },
};

// ==================== ADMIN APIS ====================

export const adminApi = {
  async getAllApplications() { 
    return { 
      success: true, 
      data: [] 
    }; 
  },
  async updateApplicationStatus(applicationId: string, data: any) { return apiCall(`/student/application/${applicationId}/status`, 'PUT', data); },
  async routeApplicationToDonors(applicationId: string) { return apiCall(`/application/${applicationId}/route-to-donors`, 'POST'); },
};

// ==================== TICKET APIS ====================

export const ticketApi = {
  async create(data: any) { return apiCall('/ticket/create', 'POST', data); },
  async getUserTickets(userId: string) { return { success: true, data: [] }; },
  async getDetails(ticketId: string) { return apiCall(`/ticket/${ticketId}`); },
  async addReply(ticketId: string, data: any) { return apiCall(`/ticket/${ticketId}/reply`, 'POST', data); },
};

// ==================== NOTIFICATION APIS ====================

export const notificationApi = {
  async send(data: any) { return apiCall('/notifications/send', 'POST', data); },
  async getUserNotifications(userId: string) { 
    return { 
      success: true, 
      data: [
        { id: 'notif1', title: 'Welcome', message: 'Welcome to Talent Tutor!', read: false, createdAt: new Date().toISOString() }
      ] 
    }; 
  },
  async markAsRead(notificationId: string) { return apiCall(`/notifications/${notificationId}/read`, 'PUT'); },
  async markAllAsRead(userId: string) { return apiCall(`/notifications/user/${userId}/read-all`, 'PUT'); },
};

// ==================== EMAIL APIS ====================

export const emailApi = {
  async send(data: any) { return apiCall('/email/send', 'POST', data); },
};

// ==================== PAYMENT APIS ====================

export const paymentApi = {
  async createIntent(data: any) { return apiCall('/payment/create-intent', 'POST', data); },
  async confirmPayment(paymentId: string, data: any) { return apiCall(`/payment/${paymentId}/confirm`, 'POST', data); },
};

// ==================== ANALYTICS APIS ====================

export const analyticsApi = {
  async getPlatformStats() { return { success: true, data: {} }; },
  async getDonorAnalytics(donorId: string) { return { success: true, data: {} }; },
};

// ==================== ACTIVITY LOG APIS ====================

export const activityApi = {
  async log(data: any) { return apiCall('/activity/log', 'POST', data); },
  async getUserActivities(userId: string) { return { success: true, data: [] }; },
};

// ==================== CREDIT MANAGEMENT APIS ====================

export const creditApi = {
  async initialize(userId: string, userType: string) { return apiCall('/credits/initialize', 'POST', { userId, userType }); },
  async getUserCredits(userId: string) { return { success: true, data: { balance: 50 } }; },
  async deduct(data: any) { return apiCall('/credits/deduct', 'POST', data); },
  async add(data: any) { return apiCall('/credits/add', 'POST', data); },
  async getTransactions(userId: string, limit: number = 50, offset: number = 0) { return { success: true, data: [] }; },
  async purchasePackage(data: any) { return apiCall('/credits/purchase-package', 'POST', data); },
  async getAllCredits() { return { success: true, data: [] }; },
  async adminSetCredits(userId: string, newBalance: number, adminNote?: string) { return apiCall(`/admin/credits/${userId}`, 'PUT', { newBalance, adminNote }); },
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