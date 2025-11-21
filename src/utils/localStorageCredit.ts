/**
 * LocalStorage-based Credit Management System
 * Manages credits, packages, and transactions locally
 */

import { TEACHER_PACKAGES, GUARDIAN_PACKAGES, CREDIT_COSTS, type CreditPackage, type CreditTransaction } from './creditSystem';

// Re-export for convenience
export { CREDIT_COSTS };

export interface UserCreditData {
  userId: string;
  userType: 'teacher' | 'guardian' | 'student' | 'admin';
  currentBalance: number;
  totalEarned: number;
  totalSpent: number;
  totalPurchased: number;
  transactions: CreditTransaction[];
  lastUpdated: string;
}

// Storage Keys
const CREDITS_KEY = 'talent_tutor_credits';
const PACKAGES_KEY = 'talent_tutor_packages';
const TRANSACTIONS_KEY = 'talent_tutor_transactions';

/**
 * Initialize default packages in localStorage
 */
export function initializeDefaultPackages(): void {
  try {
    const existingPackages = localStorage.getItem(PACKAGES_KEY);
    
    if (!existingPackages) {
      const allPackages = [...TEACHER_PACKAGES, ...GUARDIAN_PACKAGES];
      localStorage.setItem(PACKAGES_KEY, JSON.stringify(allPackages));
      console.log('Default packages initialized:', allPackages.length);
    }
  } catch (error) {
    console.error('Error initializing packages:', error);
  }
}

/**
 * Get all packages from localStorage
 */
export function getAllPackages(): CreditPackage[] {
  try {
    const packagesStr = localStorage.getItem(PACKAGES_KEY);
    
    if (!packagesStr) {
      initializeDefaultPackages();
      const newPackagesStr = localStorage.getItem(PACKAGES_KEY);
      return newPackagesStr ? JSON.parse(newPackagesStr) : [];
    }
    
    return JSON.parse(packagesStr);
  } catch (error) {
    console.error('Error getting packages:', error);
    return [...TEACHER_PACKAGES, ...GUARDIAN_PACKAGES];
  }
}

/**
 * Get packages by user type
 */
export function getPackagesByUserType(userType: 'teacher' | 'guardian'): CreditPackage[] {
  const allPackages = getAllPackages();
  return allPackages.filter(pkg => pkg.userType === userType);
}

/**
 * Get package by ID
 */
export function getPackageById(packageId: string): CreditPackage | null {
  const allPackages = getAllPackages();
  return allPackages.find(pkg => pkg.id === packageId) || null;
}

/**
 * Initialize user credits
 */
export function initializeUserCredits(
  userId: string,
  userType: 'teacher' | 'guardian' | 'student' | 'admin'
): UserCreditData {
  const signupBonus = getSignupBonus(userType);
  
  const userCredits: UserCreditData = {
    userId,
    userType,
    currentBalance: signupBonus,
    totalEarned: signupBonus,
    totalSpent: 0,
    totalPurchased: 0,
    transactions: signupBonus > 0 ? [{
      id: `txn-${Date.now()}-signup`,
      userId,
      type: 'earned',
      amount: signupBonus,
      balance: signupBonus,
      description: 'সাইনআপ বোনাস (ফ্রি ট্রায়াল)',
      descriptionEn: 'Signup Bonus (Free Trial)',
      timestamp: new Date(),
    }] : [],
    lastUpdated: new Date().toISOString(),
  };
  
  saveUserCredits(userCredits);
  return userCredits;
}

/**
 * Get user credits from localStorage
 */
export function getUserCredits(userId: string): UserCreditData | null {
  try {
    const creditsStr = localStorage.getItem(`${CREDITS_KEY}_${userId}`);
    
    if (!creditsStr) {
      return null;
    }
    
    return JSON.parse(creditsStr);
  } catch (error) {
    console.error('Error getting user credits:', error);
    return null;
  }
}

/**
 * Get or create user credits
 */
export function getOrCreateUserCredits(
  userId: string,
  userType: 'teacher' | 'guardian' | 'student' | 'admin'
): UserCreditData {
  let userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    userCredits = initializeUserCredits(userId, userType);
  }
  
  return userCredits;
}

/**
 * Save user credits to localStorage
 */
export function saveUserCredits(userCredits: UserCreditData): void {
  try {
    userCredits.lastUpdated = new Date().toISOString();
    localStorage.setItem(`${CREDITS_KEY}_${userCredits.userId}`, JSON.stringify(userCredits));
  } catch (error) {
    console.error('Error saving user credits:', error);
  }
}

/**
 * Add credits to user
 */
export function addCredits(
  userId: string,
  amount: number,
  type: 'purchased' | 'bonus' | 'earned' | 'admin_added',
  description: string,
  descriptionEn: string,
  packageId?: string
): CreditTransaction {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    throw new Error('User credits not found. Initialize first.');
  }
  
  const transaction: CreditTransaction = {
    id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    amount: Math.abs(amount),
    balance: userCredits.currentBalance + Math.abs(amount),
    description,
    descriptionEn,
    timestamp: new Date(),
    packageId,
  };
  
  userCredits.currentBalance += Math.abs(amount);
  userCredits.totalEarned += Math.abs(amount);
  
  if (type === 'purchased') {
    userCredits.totalPurchased += Math.abs(amount);
  }
  
  userCredits.transactions.unshift(transaction);
  saveUserCredits(userCredits);
  
  return transaction;
}

/**
 * Deduct credits from user
 */
export function deductCredits(
  userId: string,
  amount: number,
  description: string,
  descriptionEn: string,
  relatedTo?: string
): CreditTransaction {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    throw new Error('User credits not found. Initialize first.');
  }
  
  if (userCredits.currentBalance < amount) {
    throw new Error(`Insufficient credits. Required: ${amount}, Available: ${userCredits.currentBalance}`);
  }
  
  const transaction: CreditTransaction = {
    id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type: 'spent',
    amount: -Math.abs(amount),
    balance: userCredits.currentBalance - Math.abs(amount),
    description,
    descriptionEn,
    timestamp: new Date(),
    relatedTo,
  };
  
  userCredits.currentBalance -= Math.abs(amount);
  userCredits.totalSpent += Math.abs(amount);
  userCredits.transactions.unshift(transaction);
  
  saveUserCredits(userCredits);
  
  return transaction;
}

/**
 * Purchase package
 */
export function purchasePackage(
  userId: string,
  packageId: string,
  language: 'bn' | 'en' = 'bn'
): { transaction: CreditTransaction; totalCredits: number } {
  const pkg = getPackageById(packageId);
  
  if (!pkg) {
    throw new Error('Package not found');
  }
  
  if (pkg.isFree) {
    throw new Error('Free package cannot be purchased');
  }
  
  const totalCredits = pkg.credits + (pkg.bonus || 0);
  const description = language === 'bn'
    ? `${pkg.name} প্যাকেজ ক্রয় (+${totalCredits} ক্রেডিট)`
    : `${pkg.nameEn} Package Purchase (+${totalCredits} Credits)`;
  
  const transaction = addCredits(
    userId,
    totalCredits,
    'purchased',
    description,
    `${pkg.nameEn} Package Purchase (+${totalCredits} Credits)`,
    packageId
  );
  
  return { transaction, totalCredits };
}

/**
 * Check if user has sufficient credits
 */
export function hasEnoughCredits(userId: string, requiredAmount: number): boolean {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    return false;
  }
  
  return userCredits.currentBalance >= requiredAmount;
}

/**
 * Get current balance
 */
export function getCurrentBalance(userId: string): number {
  const userCredits = getUserCredits(userId);
  return userCredits?.currentBalance || 0;
}

/**
 * Apply to tuition (Teacher action)
 */
export function applyToTuition(
  teacherId: string,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? `টিউশনে আবেদন করা হয়েছে (-${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট)`
    : `Applied to Tuition (-${CREDIT_COSTS.APPLY_TO_TUITION} credits)`;
  
  return deductCredits(
    teacherId,
    CREDIT_COSTS.APPLY_TO_TUITION,
    description,
    'Applied to Tuition',
    tuitionId
  );
}

/**
 * Post tuition (Guardian action)
 */
export function postTuition(
  guardianId: string,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? `টিউশন পোস্ট করা হয়েছে (-${CREDIT_COSTS.POST_TUITION} ক্রেডিট)`
    : `Posted Tuition (-${CREDIT_COSTS.POST_TUITION} credits)`;
  
  return deductCredits(
    guardianId,
    CREDIT_COSTS.POST_TUITION,
    description,
    'Posted Tuition',
    tuitionId
  );
}

/**
 * Hire teacher (Guardian action)
 */
export function hireTeacher(
  guardianId: string,
  teacherId: string,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const hireCost = CREDIT_COSTS.SEND_INVITATION; // 5 credits for hiring
  const description = language === 'bn'
    ? `শিক্ষক নিয়োগ প্রদান (-${hireCost} ক্রেডিট)`
    : `Hired Teacher (-${hireCost} credits)`;
  
  return deductCredits(
    guardianId,
    hireCost,
    description,
    'Hired Teacher',
    `${teacherId}_${tuitionId}`
  );
}

/**
 * Contact teacher (Guardian action)
 */
export function contactTeacher(
  guardianId: string,
  teacherId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? `শিক্ষকের সাথে যোগাযোগ (-${CREDIT_COSTS.VIEW_TEACHER_CONTACT} ক্রেডিট)`
    : `Contacted Teacher (-${CREDIT_COSTS.VIEW_TEACHER_CONTACT} credits)`;
  
  return deductCredits(
    guardianId,
    CREDIT_COSTS.VIEW_TEACHER_CONTACT,
    description,
    'Contacted Teacher',
    teacherId
  );
}

/**
 * Get signup bonus based on user type
 */
function getSignupBonus(userType: 'teacher' | 'guardian' | 'student' | 'admin'): number {
  switch (userType) {
    case 'teacher':
      return CREDIT_COSTS.TEACHER_SIGNUP_BONUS; // 50
    case 'guardian':
      return CREDIT_COSTS.GUARDIAN_SIGNUP_BONUS; // 100
    case 'student':
      return CREDIT_COSTS.STUDENT_SIGNUP_BONUS; // 0
    default:
      return 0;
  }
}

/**
 * Get all users with credits (for admin)
 */
export function getAllUsersWithCredits(): UserCreditData[] {
  const users: UserCreditData[] = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(CREDITS_KEY)) {
        const value = localStorage.getItem(key);
        if (value) {
          users.push(JSON.parse(value));
        }
      }
    }
  } catch (error) {
    console.error('Error getting all users credits:', error);
  }
  
  return users;
}

/**
 * Admin: Set user credits
 */
export function adminSetCredits(
  userId: string,
  newBalance: number,
  adminNote: string
): void {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    throw new Error('User credits not found');
  }
  
  const difference = newBalance - userCredits.currentBalance;
  
  if (difference !== 0) {
    const type = difference > 0 ? 'admin_added' : 'admin_deducted';
    const amount = Math.abs(difference);
    
    const transaction: CreditTransaction = {
      id: `txn-${Date.now()}-admin`,
      userId,
      type: type as any,
      amount: difference > 0 ? amount : -amount,
      balance: newBalance,
      description: `অ্যাডমিন দ্বারা ${difference > 0 ? 'যোগ' : 'বাদ'} করা হয়েছে`,
      descriptionEn: `${difference > 0 ? 'Added' : 'Deducted'} by Admin`,
      timestamp: new Date(),
      adminNote,
    };
    
    userCredits.currentBalance = newBalance;
    
    if (difference > 0) {
      userCredits.totalEarned += amount;
    } else {
      userCredits.totalSpent += amount;
    }
    
    userCredits.transactions.unshift(transaction);
    saveUserCredits(userCredits);
  }
}

/**
 * Format credits for display
 */
export function formatCredits(credits: number, language: 'bn' | 'en'): string {
  if (language === 'bn') {
    return `${credits.toLocaleString('bn-BD')} ক্রেডিট`;
  }
  return `${credits} Credits`;
}

/**
 * Get credit statistics for a user
 */
export function getUserCreditStats(userId: string): {
  balance: number;
  earned: number;
  spent: number;
  purchased: number;
  transactionCount: number;
} {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    return {
      balance: 0,
      earned: 0,
      spent: 0,
      purchased: 0,
      transactionCount: 0,
    };
  }
  
  return {
    balance: userCredits.currentBalance,
    earned: userCredits.totalEarned,
    spent: userCredits.totalSpent,
    purchased: userCredits.totalPurchased,
    transactionCount: userCredits.transactions.length,
  };
}

/**
 * Export credit history
 */
export function exportCreditHistory(userId: string): string {
  const userCredits = getUserCredits(userId);
  
  if (!userCredits) {
    return '';
  }
  
  let csv = 'Date,Type,Amount,Balance,Description\n';
  
  userCredits.transactions.forEach(txn => {
    const date = new Date(txn.timestamp).toLocaleString();
    csv += `${date},${txn.type},${txn.amount},${txn.balance},"${txn.description}"\n`;
  });
  
  return csv;
}

// Initialize packages on module load
if (typeof window !== 'undefined') {
  initializeDefaultPackages();
}
