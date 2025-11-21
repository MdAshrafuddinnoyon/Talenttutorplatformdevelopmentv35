import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;

export interface PaymentData {
  userId: string;
  amount: number;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'bank';
  purpose: 'credit_purchase' | 'donation' | 'subscription' | 'tuition_payment';
  description?: string;
  metadata?: {
    packageId?: string;
    donationType?: string;
    isAnonymous?: boolean;
    donorName?: string;
    [key: string]: any;
  };
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  purpose: string;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionRef: string;
  metadata: any;
  createdAt: string;
  completedAt?: string;
  donationId?: string;
}

/**
 * Process a payment
 */
export async function processPayment(paymentData: PaymentData): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Payment processing failed' };
    }

    return { success: true, payment: data.payment };
  } catch (error) {
    console.error('Process payment error:', error);
    return { success: false, error: 'Failed to process payment' };
  }
}

/**
 * Get user payment history
 */
export async function getUserPayments(
  userId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<{ success: boolean; payments?: Payment[]; total?: number; error?: string }> {
  try {
    const params = new URLSearchParams({
      limit: (options.limit || 50).toString(),
      offset: (options.offset || 0).toString(),
    });

    const response = await fetch(`${API_BASE_URL}/payments/user/${userId}?${params}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to get payments' };
    }

    return { 
      success: true, 
      payments: data.payments, 
      total: data.total 
    };
  } catch (error) {
    console.error('Get user payments error:', error);
    return { success: false, error: 'Failed to get payment history' };
  }
}

/**
 * Get payment by ID
 */
export async function getPaymentById(paymentId: string): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Payment not found' };
    }

    return { success: true, payment: data.payment };
  } catch (error) {
    console.error('Get payment error:', error);
    return { success: false, error: 'Failed to get payment' };
  }
}

/**
 * Admin: Get all payments
 */
export async function getAllPayments(
  options: { limit?: number; offset?: number; purpose?: string } = {}
): Promise<{ success: boolean; payments?: Payment[]; stats?: any; total?: number; error?: string }> {
  try {
    const params = new URLSearchParams({
      limit: (options.limit || 100).toString(),
      offset: (options.offset || 0).toString(),
    });

    if (options.purpose) {
      params.append('purpose', options.purpose);
    }

    const response = await fetch(`${API_BASE_URL}/admin/payments/all?${params}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to get payments' };
    }

    return { 
      success: true, 
      payments: data.payments,
      stats: data.stats,
      total: data.total 
    };
  } catch (error) {
    console.error('Get all payments error:', error);
    return { success: false, error: 'Failed to get all payments' };
  }
}

/**
 * Admin: Get payment statistics
 */
export async function getPaymentStats(
  period: number = 30
): Promise<{ success: boolean; stats?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/payments/stats?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to get statistics' };
    }

    return { success: true, stats: data.stats };
  } catch (error) {
    console.error('Get payment stats error:', error);
    return { success: false, error: 'Failed to get payment statistics' };
  }
}

/**
 * Admin: Update payment status
 */
export async function updatePaymentStatus(
  paymentId: string,
  status: 'pending' | 'completed' | 'failed' | 'refunded',
  adminNote?: string
): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/payments/${paymentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ status, adminNote }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to update status' };
    }

    return { success: true, payment: data.payment };
  } catch (error) {
    console.error('Update payment status error:', error);
    return { success: false, error: 'Failed to update payment status' };
  }
}

/**
 * Format payment method name for display
 */
export function formatPaymentMethod(method: string, language: 'bn' | 'en' = 'bn'): string {
  const methods: Record<string, { bn: string; en: string }> = {
    bkash: { bn: 'বিকাশ', en: 'bKash' },
    nagad: { bn: 'নগদ', en: 'Nagad' },
    rocket: { bn: 'রকেট', en: 'Rocket' },
    card: { bn: 'কার্ড', en: 'Card' },
    bank: { bn: 'ব্যাংক', en: 'Bank' },
  };

  return methods[method.toLowerCase()]?.[language] || method;
}

/**
 * Format payment purpose for display
 */
export function formatPaymentPurpose(purpose: string, language: 'bn' | 'en' = 'bn'): string {
  const purposes: Record<string, { bn: string; en: string }> = {
    credit_purchase: { bn: 'ক্রেডিট ক্রয়', en: 'Credit Purchase' },
    donation: { bn: 'দান', en: 'Donation' },
    subscription: { bn: 'সাবস্ক্রিপশন', en: 'Subscription' },
    tuition_payment: { bn: 'টিউশন পেমেন্ট', en: 'Tuition Payment' },
  };

  return purposes[purpose]?.[language] || purpose;
}

/**
 * Format payment status for display
 */
export function formatPaymentStatus(status: string, language: 'bn' | 'en' = 'bn'): string {
  const statuses: Record<string, { bn: string; en: string }> = {
    pending: { bn: 'অপেক্ষমাণ', en: 'Pending' },
    completed: { bn: 'সম্পন্ন', en: 'Completed' },
    failed: { bn: 'ব্যর্থ', en: 'Failed' },
    refunded: { bn: 'ফেরত', en: 'Refunded' },
  };

  return statuses[status]?.[language] || status;
}

/**
 * Get payment status color
 */
export function getPaymentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    failed: 'bg-red-100 text-red-800 border-red-200',
    refunded: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}
