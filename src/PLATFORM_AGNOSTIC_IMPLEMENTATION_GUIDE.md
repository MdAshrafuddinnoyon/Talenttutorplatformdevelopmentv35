# 🔧 Talent Tutor - Platform-Agnostic Implementation Guide

> এই ডকুমেন্ট দিয়ে আপনি **যেকোনো প্ল্যাটফর্মে** (Flutter, React Native, Native, বা অন্য কোনো framework) Talent Tutor তৈরি করতে পারবেন।

---

## 📋 সূচিপত্র

1. [অ্যাপ্লিকেশন লজিক ওভারভিউ](#-অ্যাপ্লিকেশন-লজিক-ওভারভিউ)
2. [ডেটা মডেল](#-ডেটা-মডেল)
3. [Authentication System বিস্তারিত](#-authentication-system-বিস্তারিত)
4. [Credit System বিস্তারিত](#-credit-system-বিস্তারিত)
5. [Tuition Marketplace বিস্তারিত](#-tuition-marketplace-বিস্তারিত)
6. [Donation System বিস্তারিত](#-donation-system-বিস্তারিত)
7. [Messaging System বিস্তারিত](#-messaging-system-বিস্তারিত)
8. [Notification System বিস্তারিত](#-notification-system-বিস্তারিত)
9. [Payment System বিস্তারিত](#-payment-system-বিস্তারিত)
10. [Location System বিস্তারিত](#-location-system-বিস্তারিত)
11. [Review & Rating System বিস্তারিত](#-review--rating-system-বিস্তারিত)
12. [Business Rules & Validation](#-business-rules--validation)
13. [State Management Strategy](#-state-management-strategy)
14. [Error Handling](#-error-handling)
15. [API Contracts](#-api-contracts)

---

## 🎯 অ্যাপ্লিকেশন লজিক ওভারভিউ

### Core Concepts

```
User → Role → Dashboard → Actions → Credits → Transactions
```

#### User Flow চার্ট

```
Start
  ↓
Open App
  ↓
Is Authenticated? ─NO→ Show Login/Register
  ↓ YES                      ↓
Load User Data          User Selects Role
  ↓                          ↓
Check Role              Complete Registration
  ↓                          ↓
Route to Dashboard ←────────┘
  ↓
Teacher Dashboard
Guardian Dashboard
Student Dashboard
Donor Dashboard
Admin Dashboard
```

---

## 📦 ডেটা মডেল

### 1. User Model

```typescript
User {
  // Identity
  id: string (UUID)
  email: string (unique, required)
  phone: string (unique, optional)
  passwordHash: string (required, never send to client)
  
  // Role & Status
  role: enum ['teacher', 'guardian', 'student', 'donor', 'admin']
  status: enum ['pending', 'active', 'blocked']
  
  // Verification
  emailVerified: boolean (default: false)
  phoneVerified: boolean (default: false)
  
  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
  lastLoginAt: timestamp
}
```

**Validation Rules:**
```typescript
email: {
  required: true,
  format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxLength: 255
}

phone: {
  required: false,
  format: /^(?:\+880|880|0)1[3-9]\d{8}$/, // Bangladesh format
  unique: true
}

password: {
  required: true,
  minLength: 6,
  maxLength: 50,
  rules: [
    'At least one letter',
    'At least one number'
  ]
}

role: {
  required: true,
  allowedValues: ['teacher', 'guardian', 'student', 'donor', 'admin']
}
```

---

### 2. Profile Model

```typescript
UserProfile {
  id: string (UUID)
  userId: string (foreign key → User.id)
  
  // Basic Info
  fullName: string (required, 3-100 chars)
  bio: string (optional, max 500 chars)
  photoUrl: string (optional, valid URL)
  dateOfBirth: date (optional)
  gender: enum ['male', 'female', 'other']
  
  // Location
  address: string (optional)
  division: string (optional)
  district: string (optional)
  area: string (optional)
  
  // Profile Completion
  isProfileComplete: boolean (calculated)
  profileCompletionPercentage: number (0-100, calculated)
  
  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Profile Completion Calculation:**
```typescript
function calculateProfileCompletion(profile: UserProfile): number {
  const fields = [
    'fullName',      // 10%
    'bio',           // 10%
    'photoUrl',      // 15%
    'dateOfBirth',   // 10%
    'gender',        // 5%
    'address',       // 10%
    'division',      // 10%
    'district',      // 10%
    'area',          // 10%
    'phone',         // 10%
    'emailVerified'  // 10%
  ];
  
  let completed = 0;
  let total = 0;
  
  fields.forEach(field => {
    total += weights[field];
    if (profile[field] && profile[field] !== '') {
      completed += weights[field];
    }
  });
  
  return Math.round((completed / total) * 100);
}
```

---

### 3. Teacher Profile Model

```typescript
TeacherProfile {
  id: string (UUID)
  userId: string (foreign key → User.id)
  
  // Education & Experience
  subjects: string[] (array, required, min 1)
  education: string (required, max 200)
  institution: string (optional, max 200)
  experienceYears: number (required, min 0, max 50)
  
  // Rates
  hourlyRateMin: number (optional, min 0)
  hourlyRateMax: number (optional, min 0)
  
  // Preferences
  preferredClasses: string[] (array, optional)
  preferredMedium: enum ['bangla', 'english', 'english-version', 'any']
  
  // Stats
  rating: decimal (2 decimal places, 0-5)
  totalReviews: number (default 0)
  totalStudents: number (default 0)
  totalEarnings: decimal (2 decimal places, default 0)
  
  // Verification
  isVerified: boolean (default false)
  verifiedAt: timestamp (optional)
  
  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
}
```

**Business Rules:**
```typescript
subjects: {
  required: true,
  minItems: 1,
  maxItems: 10,
  allowedValues: [
    'গণিত', 'ইংরেজি', 'বাংলা', 'পদার্থবিজ্ঞান', 
    'রসায়ন', 'জীববিজ্ঞান', 'হিসাববিজ্ঞান', etc.
  ]
}

experienceYears: {
  required: true,
  min: 0,
  max: 50,
  type: 'integer'
}

hourlyRate: {
  min: 0,
  max: 100000,
  validate: (min, max) => min <= max
}
```

---

### 4. Credit Transaction Model

```typescript
CreditTransaction {
  id: string (UUID)
  userId: string (foreign key → User.id)
  
  // Transaction Details
  type: enum ['earned', 'spent', 'purchased', 'bonus', 'admin_added', 'admin_deducted']
  amount: number (can be negative for spent)
  
  // Balance Tracking
  balanceBefore: number (balance before transaction)
  balanceAfter: number (balance after transaction)
  
  // Description
  description: string (Bengali, required)
  descriptionEn: string (English, required)
  
  // Reference
  relatedTo: string (optional, UUID of related entity)
  relatedType: string (optional, 'tuition', 'application', 'package', etc.)
  packageId: string (optional, if purchased)
  
  // Admin Actions
  adminNote: string (optional, only for admin actions)
  adminUserId: string (optional, foreign key → User.id)
  
  // Timestamp
  createdAt: timestamp
}
```

**Transaction Logic:**
```typescript
function createTransaction(
  userId: string,
  type: TransactionType,
  amount: number,
  description: string,
  relatedTo?: string
): CreditTransaction {
  
  // 1. Get current balance
  const currentBalance = getCurrentBalance(userId);
  
  // 2. Validate
  if (type === 'spent' && currentBalance < Math.abs(amount)) {
    throw new Error('Insufficient credits');
  }
  
  // 3. Calculate new balance
  const newBalance = currentBalance + amount; // amount is negative for spent
  
  // 4. Create transaction
  const transaction = {
    id: generateUUID(),
    userId: userId,
    type: type,
    amount: amount,
    balanceBefore: currentBalance,
    balanceAfter: newBalance,
    description: description,
    relatedTo: relatedTo,
    createdAt: now()
  };
  
  // 5. Save transaction
  saveTransaction(transaction);
  
  return transaction;
}

function getCurrentBalance(userId: string): number {
  // Get last transaction's balanceAfter
  const lastTransaction = getLastTransaction(userId);
  return lastTransaction ? lastTransaction.balanceAfter : 0;
}
```

---

### 5. Tuition Post Model

```typescript
TuitionPost {
  id: string (UUID)
  guardianId: string (foreign key → User.id)
  
  // Basic Info
  title: string (required, 10-500 chars)
  description: string (optional, max 2000 chars)
  
  // Subject & Class
  subject: string (required)
  class: string (required)
  medium: enum ['bangla', 'english', 'english-version']
  
  // Location
  division: string (required)
  district: string (required)
  area: string (required)
  
  // Salary
  salaryMin: number (optional, min 0)
  salaryMax: number (optional, min 0)
  
  // Schedule
  schedule: string (optional, max 500 chars)
  duration: string (optional, e.g., '6 months')
  
  // Requirements
  requirements: string (optional, max 1000 chars)
  studentCount: number (default 1, min 1, max 10)
  
  // Priority
  urgency: enum ['low', 'medium', 'high']
  isFeatured: boolean (default false)
  isUrgent: boolean (default false)
  
  // Status
  status: enum ['open', 'closed', 'filled', 'cancelled']
  
  // Stats
  viewsCount: number (default 0)
  applicationsCount: number (default 0)
  
  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
  filledAt: timestamp (optional)
}
```

**Business Rules:**
```typescript
validation: {
  title: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  
  subject: {
    required: true,
    allowedValues: getSubjectsList()
  },
  
  class: {
    required: true,
    allowedValues: getClassesList()
  },
  
  location: {
    division: { required: true },
    district: { required: true },
    area: { required: true }
  },
  
  salary: {
    min: 0,
    validate: (min, max) => {
      if (max && min && max < min) {
        throw new Error('Max salary must be greater than min salary');
      }
    }
  }
}

creditCost: {
  POST_TUITION: 10,
  FEATURED_POST: 30,
  URGENT_POST: 20
}
```

---

### 6. Application Model

```typescript
Application {
  id: string (UUID)
  tuitionId: string (foreign key → TuitionPost.id)
  teacherId: string (foreign key → User.id)
  
  // Proposal
  proposal: string (required, min 50 chars, max 2000 chars)
  expectedSalary: number (optional, min 0)
  
  // Availability
  availability: string[] (optional, days of week)
  startDate: date (optional)
  
  // Status
  status: enum ['pending', 'accepted', 'rejected', 'withdrawn', 'expired']
  
  // Response
  responseMessage: string (optional, max 500 chars)
  respondedAt: timestamp (optional)
  
  // Timestamps
  appliedAt: timestamp
}
```

**Application Logic:**
```typescript
function applyToTuition(
  teacherId: string,
  tuitionId: string,
  proposal: string,
  expectedSalary?: number
): Application {
  
  // 1. Validate tuition exists and is open
  const tuition = getTuitionPost(tuitionId);
  if (!tuition) throw new Error('Tuition not found');
  if (tuition.status !== 'open') {
    throw new Error('Tuition is not accepting applications');
  }
  
  // 2. Check if already applied
  const existingApplication = getApplication(teacherId, tuitionId);
  if (existingApplication) {
    throw new Error('Already applied to this tuition');
  }
  
  // 3. Validate teacher credits
  const teacherBalance = getCurrentBalance(teacherId);
  if (teacherBalance < CREDIT_COSTS.APPLY_TO_TUITION) {
    throw new Error('Insufficient credits');
  }
  
  // 4. Deduct credits
  createTransaction(
    teacherId,
    'spent',
    -CREDIT_COSTS.APPLY_TO_TUITION,
    'টিউশন জবে আবেদন করা হয়েছে',
    tuitionId
  );
  
  // 5. Create application
  const application = {
    id: generateUUID(),
    tuitionId: tuitionId,
    teacherId: teacherId,
    proposal: proposal,
    expectedSalary: expectedSalary,
    status: 'pending',
    appliedAt: now()
  };
  
  saveApplication(application);
  
  // 6. Update tuition applications count
  incrementApplicationsCount(tuitionId);
  
  // 7. Send notification to guardian
  sendNotification(tuition.guardianId, {
    type: 'new_application',
    title: 'নতুন আবেদন',
    message: `আপনার টিউশন পোস্টে একটি নতুন আবেদন এসেছে`,
    link: `/applications/${application.id}`
  });
  
  return application;
}
```

---

### 7. Donation Request Model

```typescript
DonationRequest {
  id: string (UUID)
  studentId: string (foreign key → User.id)
  
  // Request Info
  title: string (required, 10-500 chars)
  description: string (required, 50-2000 chars)
  
  // Type
  type: enum ['financial', 'books', 'uniform', 'stationery', 'fees']
  
  // Amount (for financial)
  amountRequested: decimal (optional, min 0)
  amountReceived: decimal (default 0)
  
  // Items (for material)
  itemsRequested: string[] (optional)
  
  // Urgency
  urgency: enum ['low', 'medium', 'high', 'critical']
  
  // Status
  status: enum ['open', 'partial', 'fulfilled', 'closed']
  
  // Verification
  isVerified: boolean (default false)
  verifiedBy: string (optional, foreign key → User.id)
  verifiedAt: timestamp (optional)
  
  // Documents
  documentUrls: string[] (optional)
  
  // Timestamps
  createdAt: timestamp
  fulfilledAt: timestamp (optional)
}
```

---

## 🔐 Authentication System বিস্তারিত

### Registration Flow

```
User Enters Info
  ↓
Validate Input
  ↓
Check if User Exists
  ↓ NO
Hash Password
  ↓
Create User Record
  ↓
Create Profile Record
  ↓
Create Role-Specific Profile
  ↓
Give Signup Bonus Credits
  ↓
Generate JWT Token
  ↓
Send Verification Email/SMS
  ↓
Return User + Token
```

### Registration Function (Pseudocode)

```typescript
function register(data: RegisterData): AuthResponse {
  // 1. Validate Input
  validateEmail(data.email);
  validatePhone(data.phone);
  validatePassword(data.password);
  validateRole(data.role);
  
  // 2. Check if user exists
  const existingUser = findUserByEmailOrPhone(data.email, data.phone);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // 3. Hash password
  const passwordHash = hashPassword(data.password);
  
  // 4. Create user
  const user = createUser({
    email: data.email,
    phone: data.phone,
    passwordHash: passwordHash,
    role: data.role,
    status: 'active',
    emailVerified: false,
    phoneVerified: false,
    createdAt: now()
  });
  
  // 5. Create basic profile
  createUserProfile({
    userId: user.id,
    fullName: data.fullName
  });
  
  // 6. Create role-specific profile
  if (data.role === 'teacher') {
    createTeacherProfile({ userId: user.id });
  } else if (data.role === 'guardian') {
    createGuardianProfile({ userId: user.id });
  } else if (data.role === 'student') {
    createStudentProfile({ userId: user.id });
  } else if (data.role === 'donor') {
    createDonorProfile({ 
      userId: user.id,
      donorType: data.donorType || 'zakat'
    });
  }
  
  // 7. Give signup bonus credits
  const bonusCredits = getSignupBonus(data.role);
  if (bonusCredits > 0) {
    createTransaction(
      user.id,
      'bonus',
      bonusCredits,
      'সাইনআপ বোনাস ক্রেডিট'
    );
  }
  
  // 8. Generate JWT token
  const token = generateJWT({
    userId: user.id,
    role: user.role,
    email: user.email
  });
  
  // 9. Send verification email
  sendVerificationEmail(user.email, user.id);
  
  // 10. Return response
  return {
    success: true,
    user: user,
    token: token,
    message: 'Registration successful'
  };
}

// Helper: Get signup bonus based on role
function getSignupBonus(role: string): number {
  const bonuses = {
    'teacher': 50,
    'guardian': 100,
    'student': 0,
    'donor': 0,
    'admin': 999
  };
  return bonuses[role] || 0;
}
```

---

### Login Flow

```
User Enters Credentials
  ↓
Validate Input
  ↓
Find User by Email/Phone
  ↓
User Found? ─NO→ Return Error
  ↓ YES
Verify Password
  ↓
Password Valid? ─NO→ Return Error
  ↓ YES
Check Account Status
  ↓
Status = 'blocked'? ─YES→ Return Error
  ↓ NO
Update Last Login Time
  ↓
Generate JWT Token
  ↓
Load User Profile
  ↓
Return User + Token
```

### Login Function (Pseudocode)

```typescript
function login(data: LoginData): AuthResponse {
  // 1. Validate input
  if (!data.emailOrPhone || !data.password) {
    throw new Error('Email/Phone and password required');
  }
  
  // 2. Find user
  const user = findUserByEmailOrPhone(data.emailOrPhone);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // 3. Verify password
  const passwordValid = verifyPassword(data.password, user.passwordHash);
  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }
  
  // 4. Check account status
  if (user.status === 'blocked') {
    throw new Error('Account is blocked. Contact support.');
  }
  
  if (user.status === 'pending') {
    throw new Error('Account is pending approval');
  }
  
  // 5. Update last login
  updateUser(user.id, {
    lastLoginAt: now()
  });
  
  // 6. Generate JWT token
  const token = generateJWT({
    userId: user.id,
    role: user.role,
    email: user.email
  }, {
    expiresIn: '7d' // Token expires in 7 days
  });
  
  // 7. Load profile data
  const profile = getUserProfile(user.id);
  const roleProfile = getRoleProfile(user.id, user.role);
  
  // 8. Return response
  return {
    success: true,
    user: {
      ...user,
      profile: profile,
      roleProfile: roleProfile
    },
    token: token,
    message: 'Login successful'
  };
}
```

---

### JWT Token Structure

```typescript
JWT Payload {
  // Standard claims
  sub: string        // Subject (user ID)
  iat: number        // Issued at (timestamp)
  exp: number        // Expiration time (timestamp)
  
  // Custom claims
  userId: string
  role: string
  email: string
}

// Example
{
  "sub": "uuid-1234-5678",
  "iat": 1638360000,
  "exp": 1638964800,
  "userId": "uuid-1234-5678",
  "role": "teacher",
  "email": "teacher@example.com"
}
```

---

### Session Management

```typescript
// Store token in local storage (web) or secure storage (mobile)
function storeAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
  // or SecureStorage.set('auth_token', token);
}

// Get token
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
  // or SecureStorage.get('auth_token');
}

// Verify token validity
function isTokenValid(token: string): boolean {
  try {
    const decoded = decodeJWT(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
}

// Refresh token (if expired but within refresh window)
function refreshToken(oldToken: string): string {
  const decoded = decodeJWT(oldToken);
  return generateJWT({
    userId: decoded.userId,
    role: decoded.role,
    email: decoded.email
  });
}

// Logout
function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('current_user');
  // Clear all user data from storage
}
```

---

## 💳 Credit System বিস্তারিত

### Credit Constants

```typescript
CREDIT_COSTS = {
  // Teacher Actions
  APPLY_TO_TUITION: 10,
  VIEW_GUARDIAN_CONTACT: 5,
  SEND_PROPOSAL: 5,
  PRIORITY_LISTING: 15,
  FEATURED_PROFILE: 20,
  
  // Guardian Actions
  POST_TUITION: 10,
  VIEW_TEACHER_CONTACT: 5,
  SEND_INVITATION: 5,
  FEATURED_POST: 30,
  URGENT_POST: 20,
  
  // Bonus/Earnings
  SIGNUP_BONUS_TEACHER: 50,
  SIGNUP_BONUS_GUARDIAN: 100,
  COMPLETE_PROFILE: 10,
  VERIFY_PHONE: 5,
  VERIFY_EMAIL: 5,
  VERIFY_NID: 15,
  FIRST_REVIEW: 10,
  REFERRAL_BONUS: 25
};

CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 100,
    price: 500,
    bonus: 0,
    discount: 0
  },
  {
    id: 'basic',
    name: 'Basic',
    credits: 250,
    price: 1000,
    bonus: 25,  // 10% bonus
    discount: 17
  },
  {
    id: 'standard',
    name: 'Standard',
    credits: 600,
    price: 2000,
    bonus: 120,  // 20% bonus
    discount: 33
  },
  {
    id: 'premium',
    name: 'Premium',
    credits: 1500,
    price: 4000,
    bonus: 450,  // 30% bonus
    discount: 47
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 4000,
    price: 10000,
    bonus: 1600,  // 40% bonus
    discount: 56
  }
];
```

---

### Credit Operations

#### 1. Get Balance

```typescript
function getBalance(userId: string): number {
  // Method 1: Get last transaction's balance
  const lastTransaction = database.query(`
    SELECT balance_after 
    FROM credit_transactions 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `, [userId]);
  
  return lastTransaction ? lastTransaction.balance_after : 0;
  
  // Method 2: Calculate from all transactions
  // const transactions = getAllTransactions(userId);
  // return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}
```

---

#### 2. Deduct Credits

```typescript
function deductCredits(
  userId: string,
  amount: number,
  description: string,
  relatedTo?: string,
  relatedType?: string
): boolean {
  
  // 1. Get current balance
  const currentBalance = getBalance(userId);
  
  // 2. Check if sufficient credits
  if (currentBalance < amount) {
    throw new Error('Insufficient credits. Current balance: ' + currentBalance);
  }
  
  // 3. Calculate new balance
  const newBalance = currentBalance - amount;
  
  // 4. Create transaction record
  const transaction = {
    id: generateUUID(),
    userId: userId,
    type: 'spent',
    amount: -amount,  // Negative for deduction
    balanceBefore: currentBalance,
    balanceAfter: newBalance,
    description: description,
    descriptionEn: translateToEnglish(description),
    relatedTo: relatedTo,
    relatedType: relatedType,
    createdAt: now()
  };
  
  // 5. Save transaction
  database.insert('credit_transactions', transaction);
  
  // 6. Log activity
  logActivity(userId, 'credit_deducted', {
    amount: amount,
    newBalance: newBalance
  });
  
  return true;
}

// Usage Example
try {
  deductCredits(
    teacherId,
    CREDIT_COSTS.APPLY_TO_TUITION,
    'টিউশন জবে আবেদন করা হয়েছে',
    tuitionId,
    'tuition_application'
  );
  
  // Proceed with application
  createApplication(...);
  
} catch (error) {
  // Show error to user
  showError('যথেষ্ট ক্রেডিট নেই। দয়া করে ক্রেডিট কিনুন।');
}
```

---

#### 3. Add Credits

```typescript
function addCredits(
  userId: string,
  amount: number,
  type: 'earned' | 'purchased' | 'bonus' | 'admin_added',
  description: string,
  packageId?: string
): boolean {
  
  // 1. Get current balance
  const currentBalance = getBalance(userId);
  
  // 2. Calculate new balance
  const newBalance = currentBalance + amount;
  
  // 3. Create transaction
  const transaction = {
    id: generateUUID(),
    userId: userId,
    type: type,
    amount: amount,  // Positive for addition
    balanceBefore: currentBalance,
    balanceAfter: newBalance,
    description: description,
    descriptionEn: translateToEnglish(description),
    packageId: packageId,
    createdAt: now()
  };
  
  // 4. Save transaction
  database.insert('credit_transactions', transaction);
  
  // 5. Send notification
  sendNotification(userId, {
    type: 'credits_added',
    title: 'ক্রেডিট যোগ হয়েছে',
    message: `${amount} ক্রেডিট আপনার অ্যাকাউন্টে যোগ হয়েছে। নতুন ব্যালেন্স: ${newBalance}`
  });
  
  return true;
}
```

---

#### 4. Purchase Package

```typescript
function purchasePackage(
  userId: string,
  packageId: string,
  paymentMethod: string,
  transactionId: string
): PurchaseResult {
  
  // 1. Get package details
  const package = CREDIT_PACKAGES.find(p => p.id === packageId);
  if (!package) {
    throw new Error('Invalid package');
  }
  
  // 2. Calculate total credits (base + bonus)
  const totalCredits = package.credits + package.bonus;
  
  // 3. Create payment record
  const payment = {
    id: generateUUID(),
    userId: userId,
    packageId: packageId,
    amount: package.price,
    creditsAmount: package.credits,
    bonusCredits: package.bonus,
    paymentMethod: paymentMethod,
    transactionId: transactionId,
    status: 'completed',
    createdAt: now(),
    completedAt: now()
  };
  
  database.insert('payments', payment);
  
  // 4. Add credits
  addCredits(
    userId,
    totalCredits,
    'purchased',
    `${package.name} প্যাকেজ ক্রয় (${package.credits} + ${package.bonus} বোনাস)`,
    packageId
  );
  
  // 5. Generate receipt
  const receipt = generateReceipt(payment, package);
  
  // 6. Send email
  sendEmail(userId, {
    subject: 'ক্রেডিট প্যাকেজ ক্রয় সফল',
    template: 'credit_purchase',
    data: {
      package: package,
      credits: totalCredits,
      receipt: receipt
    }
  });
  
  // 7. Return result
  return {
    success: true,
    payment: payment,
    creditsAdded: totalCredits,
    newBalance: getBalance(userId),
    receipt: receipt
  };
}
```

---

#### 5. Transaction History

```typescript
function getTransactionHistory(
  userId: string,
  options?: {
    limit?: number,
    offset?: number,
    type?: TransactionType,
    startDate?: Date,
    endDate?: Date
  }
): Transaction[] {
  
  let query = `
    SELECT * FROM credit_transactions 
    WHERE user_id = ?
  `;
  
  const params = [userId];
  
  // Add filters
  if (options?.type) {
    query += ` AND type = ?`;
    params.push(options.type);
  }
  
  if (options?.startDate) {
    query += ` AND created_at >= ?`;
    params.push(options.startDate);
  }
  
  if (options?.endDate) {
    query += ` AND created_at <= ?`;
    params.push(options.endDate);
  }
  
  // Order by date descending
  query += ` ORDER BY created_at DESC`;
  
  // Pagination
  if (options?.limit) {
    query += ` LIMIT ?`;
    params.push(options.limit);
  }
  
  if (options?.offset) {
    query += ` OFFSET ?`;
    params.push(options.offset);
  }
  
  return database.query(query, params);
}

// Usage
const recentTransactions = getTransactionHistory(userId, {
  limit: 20,
  offset: 0
});

const spentTransactions = getTransactionHistory(userId, {
  type: 'spent',
  limit: 50
});

const lastMonthTransactions = getTransactionHistory(userId, {
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  endDate: new Date()
});
```

---

#### 6. Credit Analytics

```typescript
function getCreditAnalytics(userId: string): CreditAnalytics {
  const transactions = getTransactionHistory(userId);
  
  // Calculate totals
  let totalEarned = 0;
  let totalSpent = 0;
  let totalPurchased = 0;
  let totalBonus = 0;
  
  transactions.forEach(tx => {
    switch (tx.type) {
      case 'earned':
        totalEarned += tx.amount;
        break;
      case 'spent':
        totalSpent += Math.abs(tx.amount);
        break;
      case 'purchased':
        totalPurchased += tx.amount;
        break;
      case 'bonus':
        totalBonus += tx.amount;
        break;
    }
  });
  
  // Current balance
  const currentBalance = getBalance(userId);
  
  // Calculate average spent per transaction
  const spentTransactions = transactions.filter(tx => tx.type === 'spent');
  const averageSpent = spentTransactions.length > 0
    ? totalSpent / spentTransactions.length
    : 0;
  
  return {
    currentBalance: currentBalance,
    totalEarned: totalEarned,
    totalSpent: totalSpent,
    totalPurchased: totalPurchased,
    totalBonus: totalBonus,
    averageSpent: averageSpent,
    transactionCount: transactions.length
  };
}
```

---

## 📝 Tuition Marketplace বিস্তারিত

### 1. Create Tuition Post

```typescript
function createTuitionPost(
  guardianId: string,
  data: TuitionPostData
): TuitionPost {
  
  // 1. Validate guardian role
  const guardian = getUser(guardianId);
  if (guardian.role !== 'guardian') {
    throw new Error('Only guardians can post tuitions');
  }
  
  // 2. Validate input
  validateTuitionPostData(data);
  
  // 3. Check credits
  let totalCost = CREDIT_COSTS.POST_TUITION;
  
  if (data.isFeatured) {
    totalCost += CREDIT_COSTS.FEATURED_POST;
  }
  
  if (data.isUrgent) {
    totalCost += CREDIT_COSTS.URGENT_POST;
  }
  
  const balance = getBalance(guardianId);
  if (balance < totalCost) {
    throw new Error(`Insufficient credits. Required: ${totalCost}, Available: ${balance}`);
  }
  
  // 4. Create post
  const post = {
    id: generateUUID(),
    guardianId: guardianId,
    title: data.title,
    description: data.description,
    subject: data.subject,
    class: data.class,
    medium: data.medium,
    division: data.location.division,
    district: data.location.district,
    area: data.location.area,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    schedule: data.schedule,
    duration: data.duration,
    requirements: data.requirements,
    studentCount: data.studentCount || 1,
    urgency: data.urgency || 'medium',
    isFeatured: data.isFeatured || false,
    isUrgent: data.isUrgent || false,
    status: 'open',
    viewsCount: 0,
    applicationsCount: 0,
    createdAt: now()
  };
  
  database.insert('tuition_posts', post);
  
  // 5. Deduct credits
  deductCredits(
    guardianId,
    totalCost,
    'টিউশন পোস্ট করা হয়েছে',
    post.id,
    'tuition_post'
  );
  
  // 6. Send notification to matching teachers
  notifyMatchingTeachers(post);
  
  // 7. Return post
  return post;
}

// Validation function
function validateTuitionPostData(data: TuitionPostData) {
  // Title
  if (!data.title || data.title.length < 10) {
    throw new Error('Title must be at least 10 characters');
  }
  if (data.title.length > 500) {
    throw new Error('Title must not exceed 500 characters');
  }
  
  // Subject & Class
  if (!data.subject) {
    throw new Error('Subject is required');
  }
  if (!data.class) {
    throw new Error('Class is required');
  }
  
  // Location
  if (!data.location || !data.location.division || 
      !data.location.district || !data.location.area) {
    throw new Error('Complete location is required');
  }
  
  // Salary
  if (data.salaryMin && data.salaryMax && data.salaryMin > data.salaryMax) {
    throw new Error('Minimum salary cannot be greater than maximum salary');
  }
}
```

---

### 2. Browse Tuitions (Search & Filter)

```typescript
function browseTuitions(filters: TuitionFilters): TuitionPost[] {
  let query = `SELECT * FROM tuition_posts WHERE status = 'open'`;
  const params: any[] = [];
  
  // Subject filter
  if (filters.subject) {
    query += ` AND subject = ?`;
    params.push(filters.subject);
  }
  
  // Class filter
  if (filters.class) {
    query += ` AND class = ?`;
    params.push(filters.class);
  }
  
  // Medium filter
  if (filters.medium) {
    query += ` AND medium = ?`;
    params.push(filters.medium);
  }
  
  // Location filters
  if (filters.division) {
    query += ` AND division = ?`;
    params.push(filters.division);
  }
  
  if (filters.district) {
    query += ` AND district = ?`;
    params.push(filters.district);
  }
  
  if (filters.area) {
    query += ` AND area = ?`;
    params.push(filters.area);
  }
  
  // Salary range filter
  if (filters.salaryMin) {
    query += ` AND (salary_max IS NULL OR salary_max >= ?)`;
    params.push(filters.salaryMin);
  }
  
  if (filters.salaryMax) {
    query += ` AND (salary_min IS NULL OR salary_min <= ?)`;
    params.push(filters.salaryMax);
  }
  
  // Search query
  if (filters.searchQuery) {
    query += ` AND (
      title LIKE ? OR 
      description LIKE ? OR 
      requirements LIKE ?
    )`;
    const searchPattern = `%${filters.searchQuery}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  
  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        query += ` ORDER BY created_at DESC`;
        break;
      case 'salary_high':
        query += ` ORDER BY salary_max DESC NULLS LAST`;
        break;
      case 'salary_low':
        query += ` ORDER BY salary_min ASC NULLS LAST`;
        break;
      case 'urgent':
        query += ` ORDER BY is_urgent DESC, urgency DESC, created_at DESC`;
        break;
    }
  } else {
    // Default: Featured first, then urgent, then newest
    query += ` ORDER BY is_featured DESC, is_urgent DESC, created_at DESC`;
  }
  
  // Pagination
  if (filters.limit) {
    query += ` LIMIT ?`;
    params.push(filters.limit);
  }
  
  if (filters.offset) {
    query += ` OFFSET ?`;
    params.push(filters.offset);
  }
  
  return database.query(query, params);
}

// Usage
const tuitions = browseTuitions({
  subject: 'গণিত',
  class: 'দশম শ্রেণি',
  division: 'ঢাকা',
  salaryMin: 3000,
  salaryMax: 8000,
  sortBy: 'newest',
  limit: 20,
  offset: 0
});
```

---

### 3. Apply to Tuition

```typescript
function applyToTuition(
  teacherId: string,
  tuitionId: string,
  proposal: string,
  expectedSalary?: number
): Application {
  
  // 1. Validate teacher
  const teacher = getUser(teacherId);
  if (teacher.role !== 'teacher') {
    throw new Error('Only teachers can apply to tuitions');
  }
  
  // 2. Validate tuition
  const tuition = getTuitionPost(tuitionId);
  if (!tuition) {
    throw new Error('Tuition not found');
  }
  
  if (tuition.status !== 'open') {
    throw new Error('This tuition is not accepting applications');
  }
  
  // 3. Check if already applied
  const existingApplication = database.query(`
    SELECT id FROM applications 
    WHERE teacher_id = ? AND tuition_id = ?
  `, [teacherId, tuitionId]);
  
  if (existingApplication.length > 0) {
    throw new Error('You have already applied to this tuition');
  }
  
  // 4. Validate proposal
  if (!proposal || proposal.length < 50) {
    throw new Error('Proposal must be at least 50 characters');
  }
  
  if (proposal.length > 2000) {
    throw new Error('Proposal must not exceed 2000 characters');
  }
  
  // 5. Check credits
  const balance = getBalance(teacherId);
  if (balance < CREDIT_COSTS.APPLY_TO_TUITION) {
    throw new Error(`Insufficient credits. Required: ${CREDIT_COSTS.APPLY_TO_TUITION}, Available: ${balance}`);
  }
  
  // 6. Deduct credits
  deductCredits(
    teacherId,
    CREDIT_COSTS.APPLY_TO_TUITION,
    `টিউশন জবে আবেদন করা হয়েছে: "${tuition.title}"`,
    tuitionId,
    'tuition_application'
  );
  
  // 7. Create application
  const application = {
    id: generateUUID(),
    tuitionId: tuitionId,
    teacherId: teacherId,
    proposal: proposal,
    expectedSalary: expectedSalary,
    status: 'pending',
    appliedAt: now()
  };
  
  database.insert('applications', application);
  
  // 8. Update tuition applications count
  database.query(`
    UPDATE tuition_posts 
    SET applications_count = applications_count + 1 
    WHERE id = ?
  `, [tuitionId]);
  
  // 9. Send notification to guardian
  sendNotification(tuition.guardianId, {
    type: 'new_application',
    title: 'নতুন আবেদন পেয়েছেন',
    message: `আপনার "${tuition.title}" টিউশনে একটি নতুন আবেদন এসেছে`,
    link: `/applications/${application.id}`,
    icon: 'file-text'
  });
  
  // 10. Return application
  return application;
}
```

---

### 4. Accept/Reject Application

```typescript
function acceptApplication(
  guardianId: string,
  applicationId: string,
  message?: string
): Application {
  
  // 1. Get application
  const application = getApplication(applicationId);
  if (!application) {
    throw new Error('Application not found');
  }
  
  // 2. Get tuition
  const tuition = getTuitionPost(application.tuitionId);
  
  // 3. Verify guardian owns this tuition
  if (tuition.guardianId !== guardianId) {
    throw new Error('Unauthorized');
  }
  
  // 4. Check if tuition is still open
  if (tuition.status !== 'open') {
    throw new Error('This tuition is no longer accepting applications');
  }
  
  // 5. Update application status
  database.query(`
    UPDATE applications 
    SET status = 'accepted',
        response_message = ?,
        responded_at = ?
    WHERE id = ?
  `, [message, now(), applicationId]);
  
  // 6. Reject all other applications
  database.query(`
    UPDATE applications 
    SET status = 'rejected'
    WHERE tuition_id = ? AND id != ? AND status = 'pending'
  `, [application.tuitionId, applicationId]);
  
  // 7. Update tuition status
  database.query(`
    UPDATE tuition_posts 
    SET status = 'filled', filled_at = ?
    WHERE id = ?
  `, [now(), application.tuitionId]);
  
  // 8. Send notification to accepted teacher
  sendNotification(application.teacherId, {
    type: 'application_accepted',
    title: 'আপনার আবেদন গৃহীত হয়েছে!',
    message: `আপনার "${tuition.title}" টিউশনের আবেদন গৃহীত হয়েছে`,
    link: `/contracts/create/${applicationId}`,
    icon: 'check-circle'
  });
  
  // 9. Send notifications to rejected teachers
  const rejectedApplications = database.query(`
    SELECT teacher_id FROM applications 
    WHERE tuition_id = ? AND id != ? AND status = 'rejected'
  `, [application.tuitionId, applicationId]);
  
  rejectedApplications.forEach(app => {
    sendNotification(app.teacherId, {
      type: 'application_rejected',
      title: 'আবেদন প্রত্যাখ্যাত',
      message: `দুঃখিত, "${tuition.title}" টিউশনে আপনার আবেদন গৃহীত হয়নি`,
      icon: 'x-circle'
    });
  });
  
  // 10. Return updated application
  return getApplication(applicationId);
}

function rejectApplication(
  guardianId: string,
  applicationId: string,
  message?: string
): Application {
  
  // Similar to acceptApplication but simpler
  const application = getApplication(applicationId);
  const tuition = getTuitionPost(application.tuitionId);
  
  if (tuition.guardianId !== guardianId) {
    throw new Error('Unauthorized');
  }
  
  database.query(`
    UPDATE applications 
    SET status = 'rejected',
        response_message = ?,
        responded_at = ?
    WHERE id = ?
  `, [message, now(), applicationId]);
  
  sendNotification(application.teacherId, {
    type: 'application_rejected',
    title: 'আবেদন প্রত্যাখ্যাত',
    message: `দুঃখিত, "${tuition.title}" টিউশনে আপনার আবেদন গৃহীত হয়নি`,
    icon: 'x-circle'
  });
  
  return getApplication(applicationId);
}
```

---

## ❤️ Donation System বিস্তারিত

### 1. Create Donation Request (Student)

```typescript
function createDonationRequest(
  studentId: string,
  data: DonationRequestData
): DonationRequest {
  
  // 1. Validate student role
  const student = getUser(studentId);
  if (student.role !== 'student') {
    throw new Error('Only students can create donation requests');
  }
  
  // 2. Validate input
  if (!data.title || data.title.length < 10) {
    throw new Error('Title must be at least 10 characters');
  }
  
  if (!data.description || data.description.length < 50) {
    throw new Error('Description must be at least 50 characters');
  }
  
  if (!data.type) {
    throw new Error('Type is required');
  }
  
  // 3. Validate type-specific data
  if (data.type === 'financial') {
    if (!data.amountRequested || data.amountRequested <= 0) {
      throw new Error('Amount is required for financial requests');
    }
  } else {
    // For material donations
    if (!data.itemsRequested || data.itemsRequested.length === 0) {
      throw new Error('Items list is required for material requests');
    }
  }
  
  // 4. Check pending requests limit
  const pendingRequests = database.query(`
    SELECT COUNT(*) as count FROM donation_requests 
    WHERE student_id = ? AND status IN ('open', 'partial')
  `, [studentId]);
  
  if (pendingRequests[0].count >= 3) {
    throw new Error('You already have 3 pending requests. Please wait for them to be fulfilled.');
  }
  
  // 5. Create request
  const request = {
    id: generateUUID(),
    studentId: studentId,
    title: data.title,
    description: data.description,
    type: data.type,
    amountRequested: data.amountRequested,
    amountReceived: 0,
    itemsRequested: data.itemsRequested,
    urgency: data.urgency || 'medium',
    status: 'open',
    isVerified: false,
    documentUrls: data.documentUrls || [],
    createdAt: now()
  };
  
  database.insert('donation_requests', request);
  
  // 6. Send notification to admin for verification
  sendNotificationToAdmins({
    type: 'new_donation_request',
    title: 'নতুন দানের আবেদন',
    message: `${student.fullName} একটি দানের আবেদন করেছেন`,
    link: `/admin/donations/verify/${request.id}`
  });
  
  return request;
}
```

---

### 2. Make Donation (Donor)

```typescript
function makeDonation(
  donorId: string,
  requestId: string,
  amount: number,
  paymentMethod: string,
  transactionId: string,
  message?: string,
  anonymous?: boolean
): Donation {
  
  // 1. Validate donor
  const donor = getUser(donorId);
  if (donor.role !== 'donor') {
    throw new Error('Only donors can make donations');
  }
  
  // 2. Get donation request
  const request = getDonationRequest(requestId);
  if (!request) {
    throw new Error('Donation request not found');
  }
  
  // 3. Validate request is open
  if (request.status === 'fulfilled' || request.status === 'closed') {
    throw new Error('This request is no longer accepting donations');
  }
  
  // 4. Validate amount
  if (request.type === 'financial') {
    const remainingAmount = request.amountRequested - request.amountReceived;
    
    if (amount > remainingAmount) {
      throw new Error(`Amount exceeds remaining need. Remaining: ${remainingAmount} BDT`);
    }
    
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }
  
  // 5. Process payment (integrate with payment gateway)
  const paymentResult = processPayment({
    amount: amount,
    method: paymentMethod,
    transactionId: transactionId,
    purpose: 'donation',
    donorId: donorId,
    requestId: requestId
  });
  
  if (!paymentResult.success) {
    throw new Error('Payment failed: ' + paymentResult.error);
  }
  
  // 6. Create donation record
  const donation = {
    id: generateUUID(),
    donorId: donorId,
    requestId: requestId,
    donationType: request.type,
    amount: amount,
    paymentMethod: paymentMethod,
    transactionId: transactionId,
    isAnonymous: anonymous || false,
    message: message,
    status: 'completed',
    certificateGenerated: false,
    createdAt: now(),
    completedAt: now()
  };
  
  database.insert('donations', donation);
  
  // 7. Update donation request
  const newAmountReceived = request.amountReceived + amount;
  const newStatus = newAmountReceived >= request.amountRequested 
    ? 'fulfilled' 
    : 'partial';
  
  database.query(`
    UPDATE donation_requests 
    SET amount_received = ?,
        status = ?,
        fulfilled_at = ?
    WHERE id = ?
  `, [
    newAmountReceived,
    newStatus,
    newStatus === 'fulfilled' ? now() : null,
    requestId
  ]);
  
  // 8. Update donor stats
  database.query(`
    UPDATE donor_profiles 
    SET total_donated = total_donated + ?,
        total_students_helped = total_students_helped + 1
    WHERE user_id = ?
  `, [amount, donorId]);
  
  // 9. Generate certificate
  const certificate = generateDonationCertificate(donation, donor, request);
  
  database.query(`
    UPDATE donations 
    SET certificate_number = ?,
        certificate_generated = true
    WHERE id = ?
  `, [certificate.number, donation.id]);
  
  // 10. Send notifications
  if (!anonymous) {
    sendNotification(request.studentId, {
      type: 'donation_received',
      title: 'দান পেয়েছেন',
      message: `${donor.fullName} আপনার আবেদনে ${amount} টাকা দান করেছেন`,
      link: `/donations/received/${donation.id}`
    });
  } else {
    sendNotification(request.studentId, {
      type: 'donation_received',
      title: 'দান পেয়েছেন',
      message: `একজন গোপনীয় দাতা আপনার আবেদনে ${amount} টাকা দান করেছেন`
    });
  }
  
  // Send thank you email to donor
  sendEmail(donorId, {
    subject: 'দানের জন্য ধন্যবাদ',
    template: 'donation_thank_you',
    data: {
      donation: donation,
      certificate: certificate
    }
  });
  
  return donation;
}
```

---

### 3. Zakat Calculator

```typescript
interface ZakatAssets {
  cash: number;              // হাতে নগদ টাকা
  bankBalance: number;       // ব্যাংক ব্যালেন্স
  goldGrams: number;         // সোনা (গ্রাম)
  silverGrams: number;       // রূপা (গ্রাম)
  propertyValue: number;     // সম্পত্তির মূল্য
  businessAssets: number;    // ব্যবসায়িক সম্পদ
  investments: number;       // বিনিয়োগ
  debts: number;             // ঋণ
}

interface ZakatResult {
  totalAssets: number;
  zakatableAmount: number;
  zakatAmount: number;
  isEligible: boolean;
  nisab: number;
}

function calculateZakat(assets: ZakatAssets): ZakatResult {
  
  // 1. Constants
  const ZAKAT_RATE = 0.025;  // 2.5%
  
  // Current gold price per gram (update regularly)
  const GOLD_PRICE_PER_GRAM = 6500;  // BDT
  
  // Nisab threshold (87.48 grams of gold)
  const NISAB_GOLD_GRAMS = 87.48;
  const NISAB_AMOUNT = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
  
  // 2. Calculate gold and silver value
  const goldValue = assets.goldGrams * GOLD_PRICE_PER_GRAM;
  const silverValue = assets.silverGrams * (GOLD_PRICE_PER_GRAM * 0.1); // Silver is ~10% of gold price
  
  // 3. Calculate total assets
  const totalAssets = 
    assets.cash +
    assets.bankBalance +
    goldValue +
    silverValue +
    assets.propertyValue +
    assets.businessAssets +
    assets.investments;
  
  // 4. Subtract debts
  const zakatableAmount = Math.max(0, totalAssets - assets.debts);
  
  // 5. Check if eligible (must meet nisab)
  const isEligible = zakatableAmount >= NISAB_AMOUNT;
  
  // 6. Calculate zakat amount
  const zakatAmount = isEligible ? zakatableAmount * ZAKAT_RATE : 0;
  
  return {
    totalAssets: totalAssets,
    zakatableAmount: zakatableAmount,
    zakatAmount: Math.round(zakatAmount),  // Round to nearest taka
    isEligible: isEligible,
    nisab: NISAB_AMOUNT
  };
}

// Usage Example
const result = calculateZakat({
  cash: 50000,
  bankBalance: 300000,
  goldGrams: 100,
  silverGrams: 0,
  propertyValue: 2000000,
  businessAssets: 500000,
  investments: 200000,
  debts: 100000
});

console.log('Total Assets:', result.totalAssets);
console.log('Zakatable Amount:', result.zakatableAmount);
console.log('Zakat to Pay:', result.zakatAmount);
console.log('Eligible:', result.isEligible);

// Output:
// Total Assets: 3700000
// Zakatable Amount: 3600000
// Zakat to Pay: 90000
// Eligible: true
```

---

## 💬 Messaging System বিস্তারিত

### 1. Send Message

```typescript
function sendMessage(
  senderId: string,
  receiverId: string,
  content: string,
  messageType: 'text' | 'image' | 'file' = 'text',
  fileUrl?: string
): Message {
  
  // 1. Validate users exist
  const sender = getUser(senderId);
  const receiver = getUser(receiverId);
  
  if (!sender || !receiver) {
    throw new Error('Invalid user');
  }
  
  // 2. Validate content
  if (messageType === 'text') {
    if (!content || content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    
    if (content.length > 5000) {
      throw new Error('Message too long (max 5000 characters)');
    }
  } else {
    if (!fileUrl) {
      throw new Error('File URL required for non-text messages');
    }
  }
  
  // 3. Get or create conversation
  let conversation = getConversation(senderId, receiverId);
  
  if (!conversation) {
    conversation = createConversation(senderId, receiverId);
  }
  
  // 4. Create message
  const message = {
    id: generateUUID(),
    conversationId: conversation.id,
    senderId: senderId,
    receiverId: receiverId,
    content: content,
    messageType: messageType,
    fileUrl: fileUrl,
    isRead: false,
    createdAt: now()
  };
  
  database.insert('messages', message);
  
  // 5. Update conversation last message time
  database.query(`
    UPDATE conversations 
    SET last_message_at = ?
    WHERE id = ?
  `, [now(), conversation.id]);
  
  // 6. Send push notification to receiver
  sendPushNotification(receiverId, {
    title: sender.fullName,
    body: messageType === 'text' 
      ? content.substring(0, 100) 
      : `Sent a ${messageType}`,
    data: {
      type: 'new_message',
      messageId: message.id,
      conversationId: conversation.id
    }
  });
  
  // 7. Send in-app notification
  sendNotification(receiverId, {
    type: 'new_message',
    title: 'নতুন বার্তা',
    message: `${sender.fullName} আপনাকে একটি বার্তা পাঠিয়েছেন`,
    link: `/messages/${conversation.id}`
  });
  
  // 8. Emit real-time event (WebSocket)
  emitToUser(receiverId, 'new_message', message);
  
  return message;
}
```

---

### 2. Get Conversations

```typescript
function getConversations(userId: string): Conversation[] {
  const conversations = database.query(`
    SELECT 
      c.*,
      u.full_name as other_user_name,
      u.photo_url as other_user_photo,
      m.content as last_message,
      m.created_at as last_message_time,
      (SELECT COUNT(*) FROM messages 
       WHERE conversation_id = c.id 
       AND receiver_id = ? 
       AND is_read = false) as unread_count
    FROM conversations c
    JOIN users u ON (
      CASE 
        WHEN c.user1_id = ? THEN c.user2_id 
        ELSE c.user1_id 
      END = u.id
    )
    LEFT JOIN messages m ON m.id = (
      SELECT id FROM messages 
      WHERE conversation_id = c.id 
      ORDER BY created_at DESC 
      LIMIT 1
    )
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY c.last_message_at DESC
  `, [userId, userId, userId, userId]);
  
  return conversations;
}
```

---

### 3. Mark Messages as Read

```typescript
function markMessagesAsRead(
  userId: string,
  conversationId: string
): number {
  
  const result = database.query(`
    UPDATE messages 
    SET is_read = true, read_at = ?
    WHERE conversation_id = ? 
    AND receiver_id = ? 
    AND is_read = false
  `, [now(), conversationId, userId]);
  
  // Emit read receipts to sender
  emitToConversation(conversationId, 'messages_read', {
    conversationId: conversationId,
    readBy: userId,
    readAt: now()
  });
  
  return result.affectedRows;
}
```

---

## 🔔 Notification System বিস্তারিত

### Notification Types

```typescript
type NotificationType = 
  | 'new_application'
  | 'application_accepted'
  | 'application_rejected'
  | 'new_message'
  | 'credits_added'
  | 'credits_low'
  | 'donation_received'
  | 'contract_created'
  | 'contract_signed'
  | 'review_received'
  | 'system_announcement'
  | 'verification_approved'
  | 'account_blocked';
```

### Send Notification

```typescript
function sendNotification(
  userId: string,
  notification: NotificationData
): Notification {
  
  const notif = {
    id: generateUUID(),
    userId: userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    link: notification.link,
    icon: notification.icon || 'bell',
    isRead: false,
    createdAt: now()
  };
  
  database.insert('notifications', notif);
  
  // Send push notification
  sendPushNotification(userId, {
    title: notification.title,
    body: notification.message,
    data: {
      type: notification.type,
      link: notification.link
    }
  });
  
  // Emit real-time event
  emitToUser(userId, 'new_notification', notif);
  
  // Update unread count
  incrementUnreadCount(userId);
  
  return notif;
}
```

---

আমি এই ডকুমেন্ট আরো continue করব। এটি অনেক বড় হচ্ছে, তাই আমি আরেকটি পার্ট তৈরি করছি।

