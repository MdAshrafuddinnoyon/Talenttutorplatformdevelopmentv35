/**
 * Credit Handler - Centralized credit deduction with authentication
 * 
 * This utility integrates the credit system with authentication to handle
 * credit-based actions across the Talent Tutor platform.
 * 
 * Now integrated with Supabase backend for persistent storage.
 */

import { 
  getUserCredits, 
  getOrCreateUserCredits,
  deductCredits,
  CREDIT_COSTS,
  type CreditTransaction 
} from './creditSystem';
import { type User } from './authGuard';
import { toast } from 'sonner@2.0.3';
import { creditApi } from './apiClient';

export interface CreditActionResult {
  success: boolean;
  transaction?: CreditTransaction;
  error?: string;
  errorCode?: 'AUTH_REQUIRED' | 'INSUFFICIENT_CREDITS' | 'PROFILE_INCOMPLETE' | 'UNKNOWN_ERROR';
}

/**
 * Check if user has sufficient credits for an action
 */
export function checkCredits(
  user: User | null,
  requiredCredits: number
): { hasCredits: boolean; currentBalance: number } {
  if (!user) {
    return { hasCredits: false, currentBalance: 0 };
  }

  const currentBalance = user.credits || 0;
  return {
    hasCredits: currentBalance >= requiredCredits,
    currentBalance,
  };
}

/**
 * Deduct credits with authentication check
 */
export function deductCreditsWithAuth(
  user: User | null,
  amount: number,
  description: string,
  descriptionEn: string,
  relatedTo?: string
): CreditActionResult {
  // Check authentication
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
      errorCode: 'AUTH_REQUIRED',
    };
  }

  // Check profile completion
  if (!user.isProfileComplete) {
    return {
      success: false,
      error: 'Profile incomplete',
      errorCode: 'PROFILE_INCOMPLETE',
    };
  }

  // Check credits
  const { hasCredits, currentBalance } = checkCredits(user, amount);
  if (!hasCredits) {
    return {
      success: false,
      error: `Insufficient credits. Required: ${amount}, Available: ${currentBalance}`,
      errorCode: 'INSUFFICIENT_CREDITS',
    };
  }

  try {
    const transaction = deductCredits(user.id, amount, description, descriptionEn, relatedTo);
    
    // Update user credits in memory
    if (user.credits !== undefined) {
      user.credits -= amount;
    }

    return {
      success: true,
      transaction,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Handle Apply to Tuition action with credit deduction
 */
export function handleApplyToTuition(
  user: User | null,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditActionResult {
  const description = language === 'bn'
    ? `টিউশনে আবেদন করা হয়েছে (${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট)`
    : `Applied to Tuition (${CREDIT_COSTS.APPLY_TO_TUITION} credits)`;

  return deductCreditsWithAuth(
    user,
    CREDIT_COSTS.APPLY_TO_TUITION,
    description,
    'Applied to Tuition',
    tuitionId
  );
}

/**
 * Handle Contact Teacher action with credit deduction
 */
export function handleContactTeacher(
  user: User | null,
  teacherId: string,
  language: 'bn' | 'en' = 'bn'
): CreditActionResult {
  const description = language === 'bn'
    ? `শিক্ষকের সাথে যোগাযোগ (${CREDIT_COSTS.VIEW_TEACHER_CONTACT} ক্রেডিট)`
    : `Contacted Teacher (${CREDIT_COSTS.VIEW_TEACHER_CONTACT} credits)`;

  return deductCreditsWithAuth(
    user,
    CREDIT_COSTS.VIEW_TEACHER_CONTACT,
    description,
    'Contacted Teacher',
    teacherId
  );
}

/**
 * Handle Contact Guardian action with credit deduction
 */
export function handleContactGuardian(
  user: User | null,
  guardianId: string,
  language: 'bn' | 'en' = 'bn'
): CreditActionResult {
  const description = language === 'bn'
    ? `অভিভাবকের সাথে যোগাযোগ (${CREDIT_COSTS.VIEW_GUARDIAN_CONTACT} ক্রেডিট)`
    : `Contacted Guardian (${CREDIT_COSTS.VIEW_GUARDIAN_CONTACT} credits)`;

  return deductCreditsWithAuth(
    user,
    CREDIT_COSTS.VIEW_GUARDIAN_CONTACT,
    description,
    'Contacted Guardian',
    guardianId
  );
}

/**
 * Handle Post Tuition action with credit deduction
 */
export function handlePostTuition(
  user: User | null,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditActionResult {
  const description = language === 'bn'
    ? `টিউশন পোস্ট করা হয়েছে (${CREDIT_COSTS.POST_TUITION} ক্রেডিট)`
    : `Posted Tuition (${CREDIT_COSTS.POST_TUITION} credits)`;

  return deductCreditsWithAuth(
    user,
    CREDIT_COSTS.POST_TUITION,
    description,
    'Posted Tuition',
    tuitionId
  );
}

/**
 * Show toast notification based on credit action result
 */
export function showCreditActionToast(
  result: CreditActionResult,
  language: 'bn' | 'en' = 'bn'
): void {
  if (result.success) {
    const message = language === 'bn'
      ? `সফল! ${Math.abs(result.transaction?.amount || 0)} ক্রেডিট ব্যবহার করা হয়েছে।`
      : `Success! ${Math.abs(result.transaction?.amount || 0)} credits deducted.`;
    
    toast.success(message);
  } else {
    let message = '';
    
    switch (result.errorCode) {
      case 'AUTH_REQUIRED':
        message = language === 'bn'
          ? 'এই কাজটি করতে আপনাকে লগইন করতে হবে'
          : 'Please login to perform this action';
        break;
      case 'INSUFFICIENT_CREDITS':
        message = language === 'bn'
          ? 'পর্যাপ্ত ক্রেডিট নেই। দয়া করে ক্রেডিট কিনুন।'
          : 'Insufficient credits. Please purchase credits.';
        break;
      case 'PROFILE_INCOMPLETE':
        message = language === 'bn'
          ? 'প্রথমে আপনার প্রোফাইল সম্পূর্ণ করুন'
          : 'Please complete your profile first';
        break;
      default:
        message = result.error || (language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
    }
    
    toast.error(message);
  }
}

/**
 * Get error message for credit action
 */
export function getCreditActionErrorMessage(
  errorCode: CreditActionResult['errorCode'],
  language: 'bn' | 'en' = 'bn'
): string {
  const messages: Record<string, { bn: string; en: string }> = {
    AUTH_REQUIRED: {
      bn: 'এই কাজটি করতে আপনাকে লগইন করতে হবে',
      en: 'Please login to perform this action',
    },
    INSUFFICIENT_CREDITS: {
      bn: 'পর্যাপ্ত ক্রেডিট নেই। দয়া করে ক্রেডিট কিনুন।',
      en: 'Insufficient credits. Please purchase credits.',
    },
    PROFILE_INCOMPLETE: {
      bn: 'প্রথমে আপনার প্রোফাইল সম্পূর্ণ করুন',
      en: 'Please complete your profile first',
    },
    UNKNOWN_ERROR: {
      bn: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।',
      en: 'An error occurred. Please try again.',
    },
  };

  return messages[errorCode || 'UNKNOWN_ERROR']?.[language] || messages.UNKNOWN_ERROR[language];
}

/**
 * Initialize user credits if not exists
 */
export function ensureUserCredits(user: User): void {
  if (!user || !user.role) return;
  
  try {
    const userType = user.role === 'teacher' || user.role === 'guardian' || user.role === 'student' || user.role === 'admin'
      ? user.role
      : 'student';
    
    getOrCreateUserCredits(user.id, userType);
  } catch (error) {
    console.error('Error initializing user credits:', error);
  }
}

/**
 * Sync user credits from database to User object
 */
export function syncUserCredits(user: User): User {
  if (!user || !user.role) return user;

  try {
    const userType = user.role === 'teacher' || user.role === 'guardian' || user.role === 'student' || user.role === 'admin'
      ? user.role
      : 'student';
    
    const userCredits = getOrCreateUserCredits(user.id, userType);
    
    return {
      ...user,
      credits: userCredits.currentBalance,
    };
  } catch (error) {
    console.error('Error syncing user credits:', error);
    return user;
  }
}

// ==================== BACKEND-INTEGRATED FUNCTIONS ====================

/**
 * Initialize user credits in backend (called on signup)
 */
export async function initializeUserCreditsBackend(
  userId: string,
  userType: 'teacher' | 'guardian' | 'student' | 'admin'
): Promise<{ success: boolean; credits?: any; error?: string }> {
  try {
    const result = await creditApi.initialize(userId, userType);
    
    if (result.success && result.data) {
      return {
        success: true,
        credits: result.data.credits,
      };
    }
    
    return {
      success: false,
      error: result.error || 'Failed to initialize credits',
    };
  } catch (error) {
    console.error('Initialize credits backend error:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}

/**
 * Get user credits from backend
 */
export async function getUserCreditsBackend(
  userId: string
): Promise<{ success: boolean; credits?: any; error?: string }> {
  try {
    const result = await creditApi.getUserCredits(userId);
    
    if (result.success && result.data) {
      return {
        success: true,
        credits: result.data.credits,
      };
    }
    
    return {
      success: false,
      error: result.error || 'Credits not found',
    };
  } catch (error) {
    console.error('Get credits backend error:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}

/**
 * Deduct credits with backend integration
 */
export async function deductCreditsBackend(
  userId: string,
  amount: number,
  description: string,
  descriptionEn: string,
  relatedTo?: string
): Promise<CreditActionResult> {
  try {
    const result = await creditApi.deduct({
      userId,
      amount,
      description,
      descriptionEn,
      relatedTo,
    });
    
    if (result.success && result.data) {
      return {
        success: true,
        transaction: result.data.transaction,
      };
    }
    
    // Handle specific error cases
    if (result.error?.includes('Insufficient credits')) {
      return {
        success: false,
        error: result.error,
        errorCode: 'INSUFFICIENT_CREDITS',
      };
    }
    
    return {
      success: false,
      error: result.error || 'Failed to deduct credits',
      errorCode: 'UNKNOWN_ERROR',
    };
  } catch (error) {
    console.error('Deduct credits backend error:', error);
    return {
      success: false,
      error: 'Network error',
      errorCode: 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Handle Apply to Tuition with backend integration
 */
export async function handleApplyToTuitionBackend(
  user: User | null,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): Promise<CreditActionResult> {
  // Check authentication
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
      errorCode: 'AUTH_REQUIRED',
    };
  }

  // Check profile completion
  if (!user.isProfileComplete) {
    return {
      success: false,
      error: 'Profile incomplete',
      errorCode: 'PROFILE_INCOMPLETE',
    };
  }

  const description = language === 'bn'
    ? `টিউশনে আবেদন করা হয়েছে (${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট)`
    : `Applied to Tuition (${CREDIT_COSTS.APPLY_TO_TUITION} credits)`;

  return await deductCreditsBackend(
    user.id,
    CREDIT_COSTS.APPLY_TO_TUITION,
    description,
    'Applied to Tuition',
    tuitionId
  );
}

/**
 * Handle Contact Teacher with backend integration
 */
export async function handleContactTeacherBackend(
  user: User | null,
  teacherId: string,
  language: 'bn' | 'en' = 'bn'
): Promise<CreditActionResult> {
  // Check authentication
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
      errorCode: 'AUTH_REQUIRED',
    };
  }

  // Check profile completion
  if (!user.isProfileComplete) {
    return {
      success: false,
      error: 'Profile incomplete',
      errorCode: 'PROFILE_INCOMPLETE',
    };
  }

  const description = language === 'bn'
    ? `শিক্ষকের সাথে যোগাযোগ (${CREDIT_COSTS.VIEW_TEACHER_CONTACT} ক্রেডিট)`
    : `Contacted Teacher (${CREDIT_COSTS.VIEW_TEACHER_CONTACT} credits)`;

  return await deductCreditsBackend(
    user.id,
    CREDIT_COSTS.VIEW_TEACHER_CONTACT,
    description,
    'Contacted Teacher',
    teacherId
  );
}

/**
 * Handle Contact Guardian with backend integration
 */
export async function handleContactGuardianBackend(
  user: User | null,
  guardianId: string,
  language: 'bn' | 'en' = 'bn'
): Promise<CreditActionResult> {
  // Check authentication
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
      errorCode: 'AUTH_REQUIRED',
    };
  }

  // Check profile completion
  if (!user.isProfileComplete) {
    return {
      success: false,
      error: 'Profile incomplete',
      errorCode: 'PROFILE_INCOMPLETE',
    };
  }

  const description = language === 'bn'
    ? `অভিভাবকের সাথে যোগাযোগ (${CREDIT_COSTS.VIEW_GUARDIAN_CONTACT} ক্রেডিট)`
    : `Contacted Guardian (${CREDIT_COSTS.VIEW_GUARDIAN_CONTACT} credits)`;

  return await deductCreditsBackend(
    user.id,
    CREDIT_COSTS.VIEW_GUARDIAN_CONTACT,
    description,
    'Contacted Guardian',
    guardianId
  );
}

/**
 * Handle Post Tuition with backend integration
 */
export async function handlePostTuitionBackend(
  user: User | null,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): Promise<CreditActionResult> {
  // Check authentication
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated',
      errorCode: 'AUTH_REQUIRED',
    };
  }

  // Check profile completion
  if (!user.isProfileComplete) {
    return {
      success: false,
      error: 'Profile incomplete',
      errorCode: 'PROFILE_INCOMPLETE',
    };
  }

  const description = language === 'bn'
    ? `টিউশন পোস্ট করা হয়েছে (${CREDIT_COSTS.POST_TUITION} ক্রেডিট)`
    : `Posted Tuition (${CREDIT_COSTS.POST_TUITION} credits)`;

  return await deductCreditsBackend(
    user.id,
    CREDIT_COSTS.POST_TUITION,
    description,
    'Posted Tuition',
    tuitionId
  );
}

/**
 * Purchase credit package with backend integration
 */
export async function purchaseCreditPackageBackend(
  userId: string,
  packageId: string,
  paymentMethod: string,
  transactionRef?: string
): Promise<{ success: boolean; credits?: any; error?: string }> {
  try {
    const result = await creditApi.purchasePackage({
      userId,
      packageId,
      paymentMethod,
      transactionRef,
    });
    
    if (result.success && result.data) {
      return {
        success: true,
        credits: result.data.credits,
      };
    }
    
    return {
      success: false,
      error: result.error || 'Failed to purchase package',
    };
  } catch (error) {
    console.error('Purchase package backend error:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}
