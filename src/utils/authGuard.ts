/**
 * Authentication and Authorization Guard Utility
 * 
 * This utility provides centralized authentication and authorization logic
 * for the Talent Tutor platform.
 */

export type UserRole = 'teacher' | 'guardian' | 'student' | 'admin' | 'donor' | null;

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  isProfileComplete?: boolean;
  credits?: number;
  isVerified?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

/**
 * Pages that can be accessed without authentication
 */
export const PUBLIC_PAGES = [
  'home',
  'about',
  'find-teachers',
  'for-teachers',
  'for-guardians',
  'how-it-works',
  'blog',
  'blog-detail',
  'share-story',
  'partners',
  'donation',
  'donation-library',
  'library',
  'subscription',
  'contact',
  'faq',
  'help',
  'help-center',
  'privacy-policy',
  'terms',
  'browse-tuitions',
  'tuition-posts',
  // Profile view pages (anyone can view profiles)
  'teacher-profile-view',
  'guardian-profile-view',
];

/**
 * Pages that require authentication
 */
export const PROTECTED_PAGES = [
  'teacher-dashboard',
  'guardian-dashboard',
  'student-dashboard',
  'admin-dashboard',
  'donor-dashboard',
  'teacher-profile',
  'guardian-profile',
  'student-profile',
  'admin-profile',
  'donor-profile',
  'notifications',
  'messages',
  'settings',
  'credit-purchase',
  'blog-management',
  'admin-user-management',
  'admin-testing',
];

/**
 * Check if a page requires authentication
 */
export function isProtectedPage(page: string): boolean {
  // Check if page starts with protected prefix (for dynamic pages)
  if (page.startsWith('blog-detail-')) {
    return false; // Blog details are public
  }
  
  return PROTECTED_PAGES.includes(page);
}

/**
 * Check if a page is accessible without login
 */
export function isPublicPage(page: string): boolean {
  if (page.startsWith('blog-detail-')) {
    return true;
  }
  
  return PUBLIC_PAGES.includes(page);
}

/**
 * Check if user can access a specific page based on their role
 */
export function canAccessPage(page: string, userRole: UserRole): boolean {
  // Public pages are accessible to everyone
  if (isPublicPage(page)) {
    return true;
  }
  
  // If not authenticated, cannot access protected pages
  if (!userRole) {
    return false;
  }
  
  // Role-based page access
  const rolePageMap: Record<NonNullable<UserRole>, string[]> = {
    teacher: [
      'teacher-dashboard',
      'teacher-profile',
      'notifications',
      'messages',
      'settings',
      'credit-purchase',
    ],
    guardian: [
      'guardian-dashboard',
      'guardian-profile',
      'notifications',
      'messages',
      'settings',
      'credit-purchase',
    ],
    student: [
      'student-dashboard',
      'student-profile',
      'notifications',
      'settings',
    ],
    admin: [
      'admin-dashboard',
      'admin-profile',
      'admin-user-management',
      'admin-testing',
      'blog-management',
      'notifications',
      'messages',
      'settings',
    ],
    donor: [
      'donor-dashboard',
      'donor-profile',
      'notifications',
      'settings',
    ],
  };
  
  const allowedPages = rolePageMap[userRole] || [];
  return allowedPages.includes(page);
}

/**
 * Check if user can perform a specific action
 */
export interface ActionPermission {
  action: 'contact' | 'message' | 'apply' | 'donate' | 'post_tuition' | 'view_profile' | 'edit_profile';
  targetRole?: UserRole;
  requiresAuth: boolean;
  requiresProfileCompletion?: boolean;
  requiresCredits?: number;
  requiresVerification?: boolean;
}

/**
 * Define action permissions for each role
 */
export const ACTION_PERMISSIONS: Record<string, ActionPermission> = {
  // Anyone can view profiles (no auth required)
  view_teacher_profile: {
    action: 'view_profile',
    targetRole: 'teacher',
    requiresAuth: false,
  },
  view_guardian_profile: {
    action: 'view_profile',
    targetRole: 'guardian',
    requiresAuth: false,
  },
  
  // Contact requires authentication
  contact_teacher: {
    action: 'contact',
    targetRole: 'teacher',
    requiresAuth: true,
    requiresProfileCompletion: true,
    requiresCredits: 5,
  },
  contact_guardian: {
    action: 'contact',
    targetRole: 'guardian',
    requiresAuth: true,
    requiresProfileCompletion: true,
    requiresCredits: 5,
  },
  
  // Messaging requires authentication and profile completion
  send_message: {
    action: 'message',
    requiresAuth: true,
    requiresProfileCompletion: true,
  },
  
  // Apply to tuition requires authentication for teachers
  apply_to_tuition: {
    action: 'apply',
    requiresAuth: true,
    requiresProfileCompletion: true,
    requiresCredits: 10,
  },
  
  // Post tuition requires authentication for guardians
  post_tuition: {
    action: 'post_tuition',
    requiresAuth: true,
    requiresProfileCompletion: true,
    requiresCredits: 5,
  },
  
  // Donation requires authentication
  make_donation: {
    action: 'donate',
    requiresAuth: true,
  },
};

/**
 * Check if user can perform an action
 */
export function canPerformAction(
  actionKey: string,
  user: User | null
): { allowed: boolean; reason?: string } {
  const permission = ACTION_PERMISSIONS[actionKey];
  
  if (!permission) {
    return { allowed: false, reason: 'Unknown action' };
  }
  
  // Check authentication
  if (permission.requiresAuth && !user) {
    return { allowed: false, reason: 'auth_required' };
  }
  
  // Check profile completion
  if (permission.requiresProfileCompletion && !user?.isProfileComplete) {
    return { allowed: false, reason: 'profile_incomplete' };
  }
  
  // Check credits
  if (permission.requiresCredits && (user?.credits || 0) < permission.requiresCredits) {
    return { allowed: false, reason: 'insufficient_credits' };
  }
  
  // Check verification
  if (permission.requiresVerification && !user?.isVerified) {
    return { allowed: false, reason: 'verification_required' };
  }
  
  return { allowed: true };
}

/**
 * Get redirect page for user based on role
 */
export function getDefaultPageForRole(role: UserRole): string {
  switch (role) {
    case 'teacher':
      return 'teacher-dashboard';
    case 'guardian':
      return 'guardian-dashboard';
    case 'student':
      return 'student-dashboard';
    case 'admin':
      return 'admin-dashboard';
    case 'donor':
      return 'donor-dashboard';
    default:
      return 'home';
  }
}

/**
 * Get user-friendly error messages for Bengali and English
 */
export function getActionErrorMessage(reason: string, language: 'bn' | 'en'): string {
  const messages: Record<string, { bn: string; en: string }> = {
    auth_required: {
      bn: 'এই কাজটি করতে আপনাকে লগইন করতে হবে',
      en: 'You need to login to perform this action',
    },
    profile_incomplete: {
      bn: 'প্রথমে আপনার প্রোফাইল সম্পূর্ণ করুন',
      en: 'Please complete your profile first',
    },
    insufficient_credits: {
      bn: 'আপনার পর্যাপ্ত ক্রেডিট নেই',
      en: 'You do not have sufficient credits',
    },
    verification_required: {
      bn: 'প্রথমে আপনার অ্যাকাউন্ট যাচাই করুন',
      en: 'Please verify your account first',
    },
    role_restricted: {
      bn: 'আপনার এই কাজটি করার অনুমতি নেই',
      en: 'You do not have permission to perform this action',
    },
  };
  
  return messages[reason]?.[language] || messages.auth_required[language];
}

/**
 * Role-specific contact restrictions
 */
export function canContactUser(
  currentUserRole: UserRole,
  targetUserRole: UserRole,
  currentUser: User | null
): { allowed: boolean; reason?: string } {
  // Not logged in
  if (!currentUserRole || !currentUser) {
    return { allowed: false, reason: 'auth_required' };
  }
  
  // Students cannot contact anyone
  if (currentUserRole === 'student') {
    return { allowed: false, reason: 'role_restricted' };
  }
  
  // Teachers can contact guardians (requires credits and profile completion)
  if (currentUserRole === 'teacher' && targetUserRole === 'guardian') {
    if (!currentUser.isProfileComplete) {
      return { allowed: false, reason: 'profile_incomplete' };
    }
    if ((currentUser.credits || 0) < 5) {
      return { allowed: false, reason: 'insufficient_credits' };
    }
    return { allowed: true };
  }
  
  // Guardians can contact teachers (requires credits and profile completion)
  if (currentUserRole === 'guardian' && targetUserRole === 'teacher') {
    if (!currentUser.isProfileComplete) {
      return { allowed: false, reason: 'profile_incomplete' };
    }
    if ((currentUser.credits || 0) < 5) {
      return { allowed: false, reason: 'insufficient_credits' };
    }
    return { allowed: true };
  }
  
  // Donors cannot contact teachers/guardians/students
  if (currentUserRole === 'donor') {
    return { allowed: false, reason: 'role_restricted' };
  }
  
  // Admin can contact everyone
  if (currentUserRole === 'admin') {
    return { allowed: true };
  }
  
  return { allowed: false, reason: 'role_restricted' };
}

/**
 * Check if maintenance mode is active
 */
export function isMaintenanceModeActive(): boolean {
  try {
    const settings = localStorage.getItem('platformSettings');
    if (settings) {
      const parsed = JSON.parse(settings);
      return parsed.maintenanceMode === true;
    }
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
  }
  return false;
}

/**
 * Check if user can bypass maintenance mode (admins only)
 */
export function canBypassMaintenance(userRole: UserRole): boolean {
  return userRole === 'admin';
}

/**
 * Get accessible pages for a specific role
 */
export function getAccessiblePagesForRole(role: UserRole): string[] {
  // Public pages accessible to everyone
  const publicPages = [...PUBLIC_PAGES];
  
  if (!role) {
    return publicPages;
  }
  
  // Role-specific pages
  const rolePageMap: Record<NonNullable<UserRole>, string[]> = {
    teacher: [
      ...publicPages,
      'teacher-dashboard',
      'teacher-profile',
      'browse-tuitions',
      'notifications',
      'messages',
      'settings',
      'credit-purchase',
    ],
    guardian: [
      ...publicPages,
      'guardian-dashboard',
      'guardian-profile',
      'find-teachers',
      'notifications',
      'messages',
      'settings',
      'credit-purchase',
    ],
    student: [
      ...publicPages,
      'student-dashboard',
      'student-profile',
      'donation-page',
      'notifications',
      'settings',
    ],
    admin: [
      // Admins can access all pages
      ...publicPages,
      ...PROTECTED_PAGES,
    ],
    donor: [
      ...publicPages,
      'donor-dashboard',
      'donor-profile',
      'donation-page',
      'donation-library',
      'notifications',
      'settings',
    ],
  };
  
  return rolePageMap[role] || publicPages;
}

/**
 * Check if a specific page is accessible for a user role
 * Returns detailed information about access
 */
export function checkPageAccess(
  page: string, 
  userRole: UserRole,
  isAuthenticated: boolean
): {
  allowed: boolean;
  reason?: 'public' | 'authenticated' | 'role_match' | 'not_found' | 'auth_required' | 'role_mismatch';
} {
  // Public pages are always accessible
  if (isPublicPage(page)) {
    return { allowed: true, reason: 'public' };
  }
  
  // Protected pages require authentication
  if (isProtectedPage(page)) {
    if (!isAuthenticated || !userRole) {
      return { allowed: false, reason: 'auth_required' };
    }
    
    // Check role-based access
    const accessiblePages = getAccessiblePagesForRole(userRole);
    if (accessiblePages.includes(page)) {
      return { allowed: true, reason: 'role_match' };
    }
    
    return { allowed: false, reason: 'role_mismatch' };
  }
  
  // Unknown page
  return { allowed: false, reason: 'not_found' };
}

/**
 * Get the appropriate redirect page when access is denied
 */
export function getRedirectPageOnDenial(
  userRole: UserRole,
  isAuthenticated: boolean,
  denialReason: string
): string {
  // If not authenticated, redirect to login
  if (!isAuthenticated || denialReason === 'auth_required') {
    return 'login';
  }
  
  // If authenticated but wrong role, redirect to their dashboard
  if (denialReason === 'role_mismatch' && userRole) {
    return getDefaultPageForRole(userRole);
  }
  
  // Default to home
  return 'home';
}
