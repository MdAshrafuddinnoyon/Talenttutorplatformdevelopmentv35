// Comprehensive Credit System for Talent Tutor Platform
// Updated with Free Trial + Standard + Premium packages

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'purchased' | 'bonus' | 'admin_added' | 'admin_deducted';
  amount: number;
  balance: number;
  description: string;
  descriptionEn: string;
  timestamp: Date;
  relatedTo?: string; // user ID, transaction ID, or package ID
  packageId?: string;
  adminNote?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  nameEn: string;
  credits: number;
  price: number;
  bonus?: number;
  icon: string;
  color: string;
  popular?: boolean;
  isFree?: boolean;
  features: string[];
  featuresEn: string[];
  perCredit: string;
  userType: 'teacher' | 'guardian';
}

export interface UserCredits {
  userId: string;
  userType: 'teacher' | 'guardian' | 'student' | 'admin';
  currentBalance: number;
  totalEarned: number;
  totalSpent: number;
  totalPurchased: number;
  transactions: CreditTransaction[];
  lastUpdated: Date;
}

// Credit costs configuration
export const CREDIT_COSTS = {
  // Signup bonuses (FREE TRIAL)
  TEACHER_SIGNUP_BONUS: 50,
  GUARDIAN_SIGNUP_BONUS: 100,
  STUDENT_SIGNUP_BONUS: 0,
  
  // Teacher actions that cost credits
  APPLY_TO_TUITION: 10,
  VIEW_GUARDIAN_CONTACT: 5,
  SEND_PROPOSAL: 5,
  PRIORITY_LISTING: 15,
  FEATURED_PROFILE: 20,
  
  // Guardian actions that cost credits
  POST_TUITION: 10,
  VIEW_TEACHER_CONTACT: 5,
  SEND_INVITATION: 5,
  FEATURED_POST: 30,
  URGENT_POST: 20,
  
  // Video meetings
  VIDEO_MEETING_30MIN: 20, // Both parties
  
  // Actions that earn credits
  COMPLETE_PROFILE: 10,
  VERIFY_PHONE: 5,
  VERIFY_EMAIL: 5,
  VERIFY_NID: 15,
  VERIFY_EDUCATION: 20,
  FIRST_REVIEW: 10,
  REFERRAL_BONUS: 25,
  
  // Milestones (Teachers)
  FIRST_TUITION_CONFIRMED: 20,
  TEN_TUITIONS: 50,
  FIFTY_TUITIONS: 100,
  HUNDRED_TUITIONS: 200,
  
  // Milestones (Guardians)
  FIRST_TUITION_POSTED: 10,
  FIRST_TEACHER_HIRED: 15,
};

// Teacher Credit Packages (Free Trial + Standard + Premium)
export const TEACHER_PACKAGES: CreditPackage[] = [
  {
    id: 'teacher-free-trial',
    name: 'ফ্রি ট্রায়াল',
    nameEn: 'Free Trial',
    credits: 50,
    price: 0,
    icon: 'Gift',
    color: 'from-gray-500 to-slate-500',
    isFree: true,
    userType: 'teacher',
    features: [
      '৫০টি ফ্রি ক্রেডিট',
      'সাইনআপ বোনাস',
      '৫টি টিউশন আবেদন',
      'বেসিক প্রোফাইল',
      'কমিউনিটি সাপোর্ট',
      'স্ট্যান্ডার্ড লিস্টিং',
    ],
    featuresEn: [
      '50 free credits',
      'Signup bonus',
      '5 tuition applications',
      'Basic profile',
      'Community support',
      'Standard listing',
    ],
    perCredit: 'ফ্রি',
  },
  {
    id: 'teacher-standard',
    name: 'স্ট্যান্ডার্ড',
    nameEn: 'Standard',
    credits: 30,
    price: 200,
    bonus: 10,
    icon: 'Star',
    color: 'from-emerald-500 to-teal-500',
    popular: true,
    userType: 'teacher',
    features: [
      '৩০টি ক্রেডিট',
      '১০ বোনাস ক্রেডিট',
      '৪টি টিউশন আবেদন',
      'AI ম্যাচিং সিস্টেম',
      'প্রোফাইল হাইলাইট',
      'প্রায়োরিটি সাপোর্ট',
      'সাপ্তাহিক রিপোর্ট',
      'ইমেইল সাপোর্ট',
    ],
    featuresEn: [
      '30 credits',
      '10 bonus credits',
      '4 tuition applications',
      'AI Matching System',
      'Profile highlight',
      'Priority support',
      'Weekly report',
      'Email support',
    ],
    perCredit: '৫ টাকা/ক্রেডিট',
  },
  {
    id: 'teacher-premium',
    name: 'প্রিমিয়াম',
    nameEn: 'Premium',
    credits: 70,
    price: 500,
    bonus: 30,
    icon: 'Crown',
    color: 'from-purple-500 to-pink-500',
    userType: 'teacher',
    features: [
      '৭০টি ক্রেডিট',
      '৩০ বোনাস ক্রেডিট',
      '১০টি টিউশন আবেদন',
      'উন্নত AI ম্যাচিং সিস্টেম',
      'টপ র‍্যাংকিং',
      'প্রিমিয়াম ব্যাজ',
      'ডেডিকেটেড সাপোর্ট',
      'দৈনিক রিপোর্ট',
      'এক্সক্লুসিভ অফার',
    ],
    featuresEn: [
      '70 credits',
      '30 bonus credits',
      '10 tuition applications',
      'Advanced AI Matching System',
      'Top ranking',
      'Premium badge',
      'Dedicated support',
      'Daily report',
      'Exclusive offers',
    ],
    perCredit: '৫ টাকা/ক্রেডিট',
  },
];

// Guardian Credit Packages (Free Trial + Standard + Premium)
export const GUARDIAN_PACKAGES: CreditPackage[] = [
  {
    id: 'guardian-free-trial',
    name: 'ফ্রি ট্রায়াল',
    nameEn: 'Free Trial',
    credits: 100,
    price: 0,
    icon: 'Gift',
    color: 'from-gray-500 to-slate-500',
    isFree: true,
    userType: 'guardian',
    features: [
      '১০০টি ফ্রি ক্রেডিট',
      'সাইনআপ বোনাস',
      '১০টি টিউশন পোস্ট',
      'বেসিক সার্চ',
      'কমিউনিটি সাপোর্ট',
      'স্ট্যান্ডার্ড প্রোফাইল',
    ],
    featuresEn: [
      '100 free credits',
      'Signup bonus',
      '10 tuition posts',
      'Basic search',
      'Community support',
      'Standard profile',
    ],
    perCredit: 'ফ্রি',
  },
  {
    id: 'guardian-standard',
    name: 'স্ট্যান্ডার্ড',
    nameEn: 'Standard',
    credits: 30,
    price: 200,
    bonus: 10,
    icon: 'Star',
    color: 'from-emerald-500 to-teal-500',
    popular: true,
    userType: 'guardian',
    features: [
      '৩০টি ক্রেডিট',
      '১০ বোনাস ক্রেডিট',
      '৪টি টিউশন পোস্ট',
      'অ্যাডভান্স সার্চ',
      'প্রায়োরিটি সাপোর্ট',
      'AI ম্যাচিং',
      'সাপ্তাহিক রিপোর্ট',
    ],
    featuresEn: [
      '30 credits',
      '10 bonus credits',
      '4 tuition posts',
      'Advanced search',
      'Priority support',
      'AI matching',
      'Weekly report',
    ],
    perCredit: '৫ টাকা/ক্রেডিট',
  },
  {
    id: 'guardian-premium',
    name: 'প্রিমিয়াম',
    nameEn: 'Premium',
    credits: 150,
    price: 1000,
    bonus: 50,
    icon: 'Crown',
    color: 'from-purple-500 to-pink-500',
    userType: 'guardian',
    features: [
      '১৫০টি ক্রেডিট',
      '৫০ বোনাস ক্রেডিট',
      '২০টি টিউশন পোস্ট',
      'ডেডিকেটেড কনসালট্যান্ট',
      '৩টি সন্তান পর্যন্ত',
      'প্রিমিয়াম ম্যাচিং',
      'ফ্রি শিক্ষা উপকরণ',
      'কাস্টম রিপোর্ট',
    ],
    featuresEn: [
      '150 credits',
      '50 bonus credits',
      '20 tuition posts',
      'Dedicated consultant',
      'Up to 3 children',
      'Premium matching',
      'Free educational materials',
      'Custom reports',
    ],
    perCredit: '৫ টাকা/ক্রেডিট',
  },
];

// Combined packages
export const ALL_PACKAGES = [...TEACHER_PACKAGES, ...GUARDIAN_PACKAGES];

// Mock user credits database (will be replaced with actual backend)
let userCreditsDatabase: Record<string, UserCredits> = {};

// Initialize user credits
export function initializeUserCredits(
  userId: string,
  userType: 'teacher' | 'guardian' | 'student' | 'admin'
): UserCredits {
  const signupBonus = getSignupBonus(userType);
  const signupTransaction = createTransaction(
    userId,
    'earned',
    signupBonus,
    'সাইনআপ বোনাস (ফ্রি ট্রায়াল)',
    'Signup Bonus (Free Trial)',
    0
  );

  const userCredits: UserCredits = {
    userId,
    userType,
    currentBalance: signupBonus,
    totalEarned: signupBonus,
    totalSpent: 0,
    totalPurchased: 0,
    transactions: signupBonus > 0 ? [signupTransaction] : [],
    lastUpdated: new Date(),
  };

  userCreditsDatabase[userId] = userCredits;
  return userCredits;
}

// Get user credits
export function getUserCredits(userId: string): UserCredits | null {
  return userCreditsDatabase[userId] || null;
}

// Get or create user credits
export function getOrCreateUserCredits(
  userId: string,
  userType: 'teacher' | 'guardian' | 'student' | 'admin'
): UserCredits {
  let userCredits = getUserCredits(userId);
  if (!userCredits) {
    userCredits = initializeUserCredits(userId, userType);
  }
  return userCredits;
}

// Add credits (purchase, bonus, admin)
export function addCredits(
  userId: string,
  amount: number,
  type: 'purchased' | 'bonus' | 'earned' | 'admin_added',
  description: string,
  descriptionEn: string,
  packageId?: string,
  adminNote?: string
): CreditTransaction {
  const userCredits = getUserCredits(userId);
  if (!userCredits) throw new Error('User credits not found');

  const transaction = createTransaction(
    userId,
    type,
    amount,
    description,
    descriptionEn,
    userCredits.currentBalance,
    packageId,
    adminNote
  );

  userCredits.currentBalance += amount;
  userCredits.totalEarned += amount;
  if (type === 'purchased') {
    userCredits.totalPurchased += amount;
  }
  userCredits.transactions.unshift(transaction);
  userCredits.lastUpdated = new Date();

  return transaction;
}

// Deduct credits
export function deductCredits(
  userId: string,
  amount: number,
  description: string,
  descriptionEn: string,
  relatedTo?: string
): CreditTransaction {
  const userCredits = getUserCredits(userId);
  if (!userCredits) throw new Error('User credits not found');
  if (userCredits.currentBalance < amount) {
    throw new Error('Insufficient credits');
  }

  const transaction = createTransaction(
    userId,
    'spent',
    amount,
    description,
    descriptionEn,
    userCredits.currentBalance,
    relatedTo
  );

  userCredits.currentBalance -= amount;
  userCredits.totalSpent += amount;
  userCredits.transactions.unshift(transaction);
  userCredits.lastUpdated = new Date();

  return transaction;
}

// Admin: Set user credits (override)
export function adminSetCredits(
  userId: string,
  newBalance: number,
  adminNote: string
): void {
  const userCredits = getUserCredits(userId);
  if (!userCredits) throw new Error('User credits not found');

  const difference = newBalance - userCredits.currentBalance;
  const type = difference > 0 ? 'admin_added' : 'admin_deducted';
  const amount = Math.abs(difference);

  if (difference !== 0) {
    const transaction = createTransaction(
      userId,
      type,
      amount,
      `অ্যাডমিন দ্বারা ${difference > 0 ? 'যোগ' : 'বাদ'} করা হয়েছে`,
      `${difference > 0 ? 'Added' : 'Deducted'} by Admin`,
      userCredits.currentBalance,
      undefined,
      adminNote
    );

    userCredits.currentBalance = newBalance;
    if (difference > 0) {
      userCredits.totalEarned += amount;
    } else {
      userCredits.totalSpent += amount;
    }
    userCredits.transactions.unshift(transaction);
    userCredits.lastUpdated = new Date();
  }
}

// Purchase package
export function purchasePackage(
  userId: string,
  packageId: string,
  language: 'bn' | 'en' = 'bn'
): { transaction: CreditTransaction; totalCredits: number } {
  const pkg = ALL_PACKAGES.find(p => p.id === packageId);
  if (!pkg) throw new Error('Package not found');

  // Free packages don't need purchase
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

// Apply to tuition (teacher)
export function applyToTuition(
  teacherId: string,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? 'টিউশনে আবেদন করা হয়েছে'
    : 'Applied to Tuition';

  return deductCredits(
    teacherId,
    CREDIT_COSTS.APPLY_TO_TUITION,
    description,
    'Applied to Tuition',
    tuitionId
  );
}

// Contact teacher (guardian)
export function contactTeacher(
  guardianId: string,
  teacherId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? 'শিক্ষকের সাথে যোগাযোগ করা হয়েছে'
    : 'Contacted Teacher';

  return deductCredits(
    guardianId,
    CREDIT_COSTS.VIEW_TEACHER_CONTACT,
    description,
    'Contacted Teacher',
    teacherId
  );
}

// Contact guardian (teacher)
export function contactGuardian(
  teacherId: string,
  guardianId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? 'অভিভাবকের সাথে যোগাযোগ করা হয়েছে'
    : 'Contacted Guardian';

  return deductCredits(
    teacherId,
    CREDIT_COSTS.VIEW_GUARDIAN_CONTACT,
    description,
    'Contacted Guardian',
    guardianId
  );
}

// Post tuition (guardian)
export function postTuition(
  guardianId: string,
  tuitionId: string,
  language: 'bn' | 'en' = 'bn'
): CreditTransaction {
  const description = language === 'bn'
    ? 'টিউশন পোস্ট করা হয়েছে'
    : 'Posted Tuition';

  return deductCredits(
    guardianId,
    CREDIT_COSTS.POST_TUITION,
    description,
    'Posted Tuition',
    tuitionId
  );
}

// Video meeting (both parties)
export function scheduleVideoMeeting(
  userId1: string,
  userId2: string,
  language: 'bn' | 'en' = 'bn'
): { transaction1: CreditTransaction; transaction2: CreditTransaction } {
  const description = language === 'bn'
    ? 'ভিডিও মিটিং (৩০ মিনিট)'
    : 'Video Meeting (30 min)';

  const transaction1 = deductCredits(
    userId1,
    CREDIT_COSTS.VIDEO_MEETING_30MIN,
    description,
    'Video Meeting (30 min)',
    userId2
  );

  const transaction2 = deductCredits(
    userId2,
    CREDIT_COSTS.VIDEO_MEETING_30MIN,
    description,
    'Video Meeting (30 min)',
    userId1
  );

  return { transaction1, transaction2 };
}

// Helper functions
export function calculateCreditBalance(transactions: CreditTransaction[]): number {
  return transactions.reduce((total, txn) => total + txn.amount, 0);
}

export function getSignupBonus(userType: 'teacher' | 'guardian' | 'student' | 'admin'): number {
  switch (userType) {
    case 'teacher':
      return CREDIT_COSTS.TEACHER_SIGNUP_BONUS;
    case 'guardian':
      return CREDIT_COSTS.GUARDIAN_SIGNUP_BONUS;
    case 'student':
      return CREDIT_COSTS.STUDENT_SIGNUP_BONUS;
    default:
      return 0;
  }
}

export function canAffordAction(currentBalance: number, actionCost: number): boolean {
  return currentBalance >= actionCost;
}

export function formatCredits(credits: number, language: 'bn' | 'en'): string {
  if (language === 'bn') {
    return `${credits.toLocaleString('bn-BD')} ক্রেডিট`;
  }
  return `${credits} Credits`;
}

export function getCreditPackageDiscount(pkg: CreditPackage): number {
  const totalCredits = pkg.credits + (pkg.bonus || 0);
  const pricePerCredit = pkg.price / totalCredits;
  const regularPrice = 10; // 10 taka per credit
  return Math.round(((regularPrice - pricePerCredit) / regularPrice) * 100);
}

export function getPackagesByUserType(userType: 'teacher' | 'guardian'): CreditPackage[] {
  return userType === 'teacher' ? TEACHER_PACKAGES : GUARDIAN_PACKAGES;
}

export function getPackageById(packageId: string): CreditPackage | undefined {
  return ALL_PACKAGES.find(pkg => pkg.id === packageId);
}

// Transaction creators
export function createTransaction(
  userId: string,
  type: 'earned' | 'spent' | 'purchased' | 'bonus' | 'admin_added' | 'admin_deducted',
  amount: number,
  description: string,
  descriptionEn: string,
  currentBalance: number,
  relatedTo?: string,
  adminNote?: string
): CreditTransaction {
  const isDeduction = type === 'spent' || type === 'admin_deducted';
  const finalAmount = isDeduction ? -Math.abs(amount) : Math.abs(amount);
  
  return {
    id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    amount: finalAmount,
    balance: currentBalance + finalAmount,
    description,
    descriptionEn,
    timestamp: new Date(),
    relatedTo,
    packageId: type === 'purchased' ? relatedTo : undefined,
    adminNote,
  };
}

// Get all users with credits (for admin panel)
export function getAllUserCredits(): UserCredits[] {
  return Object.values(userCreditsDatabase);
}

// Export for external access
export function getCreditsDatabase(): Record<string, UserCredits> {
  return userCreditsDatabase;
}

export function setCreditsDatabase(database: Record<string, UserCredits>): void {
  userCreditsDatabase = database;
}

// Initialize some mock data
export function initializeMockData(): void {
  // Teacher 1 - Free trial
  initializeUserCredits('teacher-001', 'teacher');
  
  // Guardian 1 - Free trial
  initializeUserCredits('guardian-001', 'guardian');
  
  // Teacher 2 with purchase
  initializeUserCredits('teacher-002', 'teacher');
  purchasePackage('teacher-002', 'teacher-standard', 'bn');
  
  // Guardian 2 with purchase
  initializeUserCredits('guardian-002', 'guardian');
  purchasePackage('guardian-002', 'guardian-standard', 'bn');
}

// Auto-initialize on import
initializeMockData();
