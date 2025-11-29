# 🔧 Talent Tutor - সম্পূর্ণ ফাংশন ডকুমেন্টেশন (বাংলায়)

## 📋 সূচিপত্র

1. [Authentication Functions](#-authentication-functions)
2. [Authorization Functions](#-authorization-functions)
3. [Credit System Functions](#-credit-system-functions)
4. [User Management Functions](#-user-management-functions)
5. [Tuition Management Functions](#-tuition-management-functions)
6. [Donation Functions](#-donation-functions)
7. [Translation Functions](#-translation-functions)
8. [Location Functions](#-location-functions)
9. [Utility Functions](#-utility-functions)
10. [Component Functions](#-component-functions)

---

## 🔐 Authentication Functions

**ফাইল**: `/utils/authService.ts`

### 1. `register()`

নতুন ইউজার রেজিস্ট্রেশন করে।

```typescript
export const register = async (data: RegisterData): Promise<AuthResponse>
```

**প্যারামিটার**:
```typescript
interface RegisterData {
  fullName: string;        // পূর্ণ নাম
  email: string;           // ইমেইল
  phone: string;           // ফোন নম্বর
  password: string;        // পাসওয়ার্ড
  address?: string;        // ঠিকানা (ঐচ্ছিক)
  role: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
  donorType?: 'zakat' | 'materials';  // যদি donor হয়
}
```

**রিটার্ন**:
```typescript
interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  message?: string;
}
```

**কীভাবে কাজ করে**:
```typescript
1. ইউজার ডেটা validate করে
2. Mock user object তৈরি করে
3. Role অনুযায়ী credits assign করে:
   - Teacher: 50 credits
   - Guardian: 100 credits
   - Admin: 999 credits
   - Student/Donor: 0 credits
4. LocalStorage এ user data সংরক্ষণ করে
5. Auth token তৈরি করে
6. Success response return করে
```

**উদাহরণ**:
```typescript
const result = await register({
  fullName: "করিম উদ্দিন",
  email: "karim@example.com",
  phone: "01712345678",
  password: "secure123",
  role: "teacher"
});

if (result.success) {
  console.log("Registration successful!");
  console.log("User:", result.user);
  console.log("Credits:", result.user.credits); // 50
}
```

---

### 2. `login()`

ইউজার লগইন করে।

```typescript
export const login = async (
  data: LoginData, 
  selectedRole?: string
): Promise<AuthResponse>
```

**প্যারামিটার**:
```typescript
interface LoginData {
  emailOrPhone: string;  // ইমেইল অথবা ফোন
  password: string;      // পাসওয়ার্ড
}
// selectedRole: optional role override
```

**প্রক্রিয়া**:
```typescript
1. Email/Phone দিয়ে user খোঁজে
2. Password verify করে (mock mode এ skip)
3. Demo user থাকলে সেটা load করে
4. না থাকলে নতুন mock user তৈরি করে
5. LocalStorage এ সংরক্ষণ করে
6. User object + token return করে
```

**উদাহরণ**:
```typescript
// ইমেইল দিয়ে লগইন
const result = await login({
  emailOrPhone: "karim@teacher.demo",
  password: "teacher123"
}, "teacher");

if (result.success) {
  console.log("Logged in as:", result.user.name);
  console.log("Role:", result.user.role);
}

// ফোন দিয়ে লগইন
const result2 = await login({
  emailOrPhone: "01712345678",
  password: "123456"
});
```

---

### 3. `getCurrentUser()`

বর্তমান লগইন করা ইউজার পায়।

```typescript
export const getCurrentUser = (): User | null
```

**রিটার্ন**: User object অথবা `null` (যদি লগইন না থাকে)

**প্রক্রিয়া**:
```typescript
1. LocalStorage থেকে 'currentUser' key check করে
2. Auth token verify করে
3. User object parse করে return করে
4. Error হলে null return করে
```

**উদাহরণ**:
```typescript
const currentUser = getCurrentUser();

if (currentUser) {
  console.log("User ID:", currentUser.id);
  console.log("Name:", currentUser.name);
  console.log("Role:", currentUser.role);
  console.log("Credits:", currentUser.credits);
} else {
  console.log("No user logged in");
}
```

---

### 4. `isAuthenticated()`

চেক করে ইউজার লগইন করা আছে কিনা।

```typescript
export const isAuthenticated = (): boolean
```

**রিটার্ন**: `true` যদি logged in, `false` যদি না

**প্রক্রিয়া**:
```typescript
1. Auth token check করে
2. Current user check করে
3. উভয় থাকলে true, না থাকলে false
```

**উদাহরণ**:
```typescript
if (isAuthenticated()) {
  // Show dashboard
  navigateTo('dashboard');
} else {
  // Show login page
  navigateTo('login');
}
```

---

### 5. `logout()`

ইউজার লগআউট করে।

```typescript
export const logout = async (): Promise<void>
```

**প্রক্রিয়া**:
```typescript
1. LocalStorage থেকে সব auth data মুছে ফেলে:
   - currentUser
   - auth_token
   - donor_user
   - donor_token
2. SessionStorage clear করে
3. অ্যাপ state রিসেট করে
```

**উদাহরণ**:
```typescript
await logout();
console.log("User logged out successfully");
// Redirect to home
setPage('home');
```

---

### 6. `updateUser()`

ইউজার প্রোফাইল আপডেট করে।

```typescript
export const updateUser = async (
  userId: string, 
  updates: Partial<User>
): Promise<AuthResponse>
```

**প্যারামিটার**:
```typescript
userId: string              // User ID
updates: Partial<User>      // যেকোনো user field update করা যাবে
```

**উদাহরণ**:
```typescript
// নাম ও address update
const result = await updateUser('user123', {
  name: 'নতুন নাম',
  address: 'ধানমন্ডি, ঢাকা',
  phone: '01812345678'
});

if (result.success) {
  console.log("Profile updated!");
}
```

---

### 7. `sendPasswordResetEmail()`

পাসওয়ার্ড রিসেট ইমেইল পাঠায়।

```typescript
export const sendPasswordResetEmail = async (
  email: string
): Promise<PasswordResetResponse>
```

**উদাহরণ**:
```typescript
const result = await sendPasswordResetEmail('user@example.com');
if (result.success) {
  alert('পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে!');
}
```

---

## 🛡️ Authorization Functions

**ফাইল**: `/utils/authGuard.ts`

### 1. `isProtectedPage()`

চেক করে পেজটি protected কিনা (login প্রয়োজন)।

```typescript
export function isProtectedPage(page: string): boolean
```

**উদাহরণ**:
```typescript
isProtectedPage('teacher-dashboard')  // true
isProtectedPage('home')               // false
isProtectedPage('blog')               // false
isProtectedPage('messages')           // true
```

---

### 2. `isPublicPage()`

চেক করে পেজটি public কিনা (login ছাড়া access)।

```typescript
export function isPublicPage(page: string): boolean
```

**উদাহরণ**:
```typescript
isPublicPage('home')          // true
isPublicPage('about')         // true
isPublicPage('find-teachers') // true
isPublicPage('settings')      // false
```

---

### 3. `canAccessPage()`

চেক করে ইউজার নির্দিষ্ট পেজ access করতে পারবে কিনা।

```typescript
export function canAccessPage(
  page: string, 
  userRole: UserRole
): boolean
```

**লজিক**:
```typescript
1. Public page হলে → সবাই access করতে পারবে
2. Dashboard page হলে → শুধু সেই role-এর user
3. Profile page হলে → owner + admin
4. Admin page হলে → শুধু admin
```

**উদাহরণ**:
```typescript
// Teacher trying to access guardian dashboard
canAccessPage('guardian-dashboard', 'teacher')  // false

// Teacher accessing own dashboard
canAccessPage('teacher-dashboard', 'teacher')   // true

// Admin accessing any dashboard
canAccessPage('guardian-dashboard', 'admin')    // true

// Anyone accessing public page
canAccessPage('home', 'student')                // true
```

---

### 4. `isMaintenanceModeActive()`

চেক করে maintenance mode চালু আছে কিনা।

```typescript
export function isMaintenanceModeActive(): boolean
```

**উদাহরণ**:
```typescript
if (isMaintenanceModeActive()) {
  return <MaintenancePage />;
}
```

---

### 5. `canBypassMaintenance()`

চেক করে ইউজার maintenance mode bypass করতে পারবে কিনা।

```typescript
export function canBypassMaintenance(userRole: UserRole): boolean
```

**যারা bypass করতে পারবে**:
- Admin

**উদাহরণ**:
```typescript
const canAccess = canBypassMaintenance('admin');  // true
const canAccess2 = canBypassMaintenance('teacher'); // false
```

---

## 💳 Credit System Functions

**ফাইল**: `/utils/creditSystem.ts`

### 1. `deductCredits()`

ইউজারের ক্রেডিট কেটে নেয়।

```typescript
export function deductCredits(
  userId: string,
  amount: number,
  description: string,
  relatedTo?: string
): Promise<boolean>
```

**প্যারামিটার**:
- `userId`: User ID
- `amount`: কতো credit কাটতে হবে
- `description`: কেন কাটা হচ্ছে (Bengali)
- `relatedTo`: (Optional) Related transaction/user ID

**প্রক্রিয়া**:
```typescript
1. Current balance চেক করে
2. যথেষ্ট credit আছে কিনা verify করে
3. Balance থেকে amount বিয়োগ করে
4. Transaction record তৈরি করে
5. LocalStorage update করে
6. Success/Failure return করে
```

**উদাহরণ**:
```typescript
// টিউশনে আবেদন (10 credits)
const success = await deductCredits(
  'user123',
  10,
  'টিউশন জবে আবেদন করা হয়েছে',
  'job456'
);

if (success) {
  console.log("Credits deducted successfully!");
} else {
  alert("যথেষ্ট ক্রেডিট নেই!");
}
```

---

### 2. `addCredits()`

ইউজারের ক্রেডিট যোগ করে।

```typescript
export function addCredits(
  userId: string,
  amount: number,
  type: 'earned' | 'purchased' | 'bonus',
  description: string
): Promise<boolean>
```

**ক্রেডিট টাইপ**:
- `earned`: কাজ করে earned (e.g., profile complete)
- `purchased`: টাকা দিয়ে কেনা
- `bonus`: বোনাস/রিফারাল

**উদাহরণ**:
```typescript
// প্রোফাইল কমপ্লিট করার জন্য বোনাস
await addCredits(
  'user123',
  10,
  'earned',
  'প্রোফাইল সম্পন্ন করা হয়েছে'
);

// ক্রেডিট প্যাকেজ কেনা
await addCredits(
  'user123',
  250,
  'purchased',
  'Basic প্যাকেজ কেনা হয়েছে (১,০০০ টাকা)'
);

// রেফারাল বোনাস
await addCredits(
  'user123',
  25,
  'bonus',
  'রেফারাল বোনাস'
);
```

---

### 3. `getBalance()`

ইউজারের বর্তমান credit balance পায়।

```typescript
export function getBalance(userId: string): number
```

**উদাহরণ**:
```typescript
const balance = getBalance('user123');
console.log(`আপনার ব্যালেন্স: ${balance} credits`);

if (balance < 10) {
  alert("ক্রেডিট কম! প্যাকেজ কিনুন।");
}
```

---

### 4. `getTransactions()`

ইউজারের সব credit transactions পায়।

```typescript
export function getTransactions(
  userId: string
): CreditTransaction[]
```

**রিটার্ন**:
```typescript
interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'purchased' | 'bonus';
  amount: number;
  balance: number;          // Transaction এর পর balance
  description: string;      // Bengali description
  descriptionEn: string;    // English description
  timestamp: Date;
  relatedTo?: string;
  packageId?: string;
}
```

**উদাহরণ**:
```typescript
const transactions = getTransactions('user123');

transactions.forEach(tx => {
  console.log(`${tx.timestamp}: ${tx.description} - ${tx.amount} credits`);
});
```

---

### 5. `purchasePackage()`

ক্রেডিট প্যাকেজ কেনে।

```typescript
export function purchasePackage(
  userId: string,
  packageId: string,
  paymentMethod: string
): Promise<PurchaseResult>
```

**প্যাকেজ ID**:
- `starter`: 100 credits (৫০০ টাকা)
- `basic`: 250 credits (১,০০০ টাকা)
- `standard`: 600 credits (২,০০০ টাকা)
- `premium`: 1500 credits (৪,০০০ টাকা)
- `enterprise`: 4000 credits (১০,০০০ টাকা)

**Payment Methods**:
- `bkash`, `nagad`, `rocket`, `card`, `bank`

**উদাহরণ**:
```typescript
const result = await purchasePackage(
  'user123',
  'standard',
  'bkash'
);

if (result.success) {
  console.log("Package purchased!");
  console.log("New balance:", result.newBalance);
  console.log("Bonus credits:", result.bonusCredits);
}
```

---

### 6. `getAllPackages()`

সব ক্রেডিট প্যাকেজের তালিকা পায়।

```typescript
export function getAllPackages(
  userType?: 'teacher' | 'guardian'
): CreditPackage[]
```

**উদাহরণ**:
```typescript
const packages = getAllPackages('teacher');

packages.forEach(pkg => {
  console.log(`${pkg.name}: ${pkg.credits} credits - ${pkg.price} টাকা`);
  if (pkg.bonus) {
    console.log(`Bonus: ${pkg.bonus}%`);
  }
});
```

---

### 7. `canAfford()`

চেক করে ইউজার কোনো action afford করতে পারবে কিনা।

```typescript
export function canAfford(
  userId: string,
  amount: number
): boolean
```

**উদাহরণ**:
```typescript
// টিউশনে আবেদন করার আগে
if (canAfford('user123', CREDIT_COSTS.APPLY_TO_TUITION)) {
  await applyToTuition(jobId);
} else {
  alert("যথেষ্ট ক্রেডিট নেই! ক্রেডিট কিনুন।");
}
```

---

## 👥 User Management Functions

**ফাইল**: `/utils/demoUsers.ts`

### 1. `getDemoUsers()`

সব demo users পায়।

```typescript
export function getDemoUsers(role?: UserRole): DemoUser[]
```

**উদাহরণ**:
```typescript
// সব demo users
const allUsers = getDemoUsers();

// শুধু teachers
const teachers = getDemoUsers('teacher');

// শুধু guardians
const guardians = getDemoUsers('guardian');
```

---

### 2. `getDemoUserByEmail()`

Email দিয়ে demo user খুঁজে।

```typescript
export function getDemoUserByEmail(email: string): DemoUser | null
```

**উদাহরণ**:
```typescript
const user = getDemoUserByEmail('karim@teacher.demo');
if (user) {
  console.log("Found:", user.name);
  console.log("Role:", user.role);
}
```

---

### 3. `createDemoAccounts()`

সব demo accounts তৈরি করে LocalStorage এ সেভ করে।

```typescript
export function createDemoAccounts(): void
```

**প্রক্রিয়া**:
```typescript
1. Teachers তৈরি করে (5)
2. Guardians তৈরি করে (3)
3. Students তৈরি করে (4)
4. Donors তৈরি করে (2)
5. Admin তৈরি করে (1)
6. LocalStorage এ save করে
```

**উদাহরণ**:
```typescript
// First time app load
if (!localStorage.getItem('demo_accounts_created')) {
  createDemoAccounts();
  localStorage.setItem('demo_accounts_created', 'true');
}
```

---

## 📚 Tuition Management Functions

**ফাইল**: `/utils/tuitionData.ts`

### 1. `getTuitionPosts()`

সব টিউশন পোস্ট পায়।

```typescript
export function getTuitionPosts(filters?: {
  subject?: string;
  class?: string;
  location?: string;
  status?: 'open' | 'closed';
}): TuitionPost[]
```

**উদাহরণ**:
```typescript
// সব পোস্ট
const allPosts = getTuitionPosts();

// ফিল্টার করে
const mathPosts = getTuitionPosts({
  subject: 'গণিত',
  class: 'দশম শ্রেণি'
});

// শুধু open posts
const openPosts = getTuitionPosts({
  status: 'open'
});
```

---

### 2. `createTuitionPost()`

নতুন টিউশন পোস্ট তৈরি করে।

```typescript
export function createTuitionPost(
  guardianId: string,
  postData: TuitionPostData
): Promise<TuitionPost>
```

**প্যারামিটার**:
```typescript
interface TuitionPostData {
  title: string;
  subject: string;
  class: string;
  medium: 'bangla' | 'english' | 'english-version';
  salary: number;
  location: {
    division: string;
    district: string;
    area: string;
  };
  requirements: string;
  schedule: string;
}
```

**প্রক্রিয়া**:
```typescript
1. Guardian থেকে 10 credits কাটে
2. Post object তৈরি করে
3. Database এ save করে (Mock)
4. Post ID return করে
```

**উদাহরণ**:
```typescript
const post = await createTuitionPost('guardian123', {
  title: 'দশম শ্রেণির গণিত শিক্ষক প্রয়োজন',
  subject: 'গণিত',
  class: 'দশম শ্রেণি',
  medium: 'bangla',
  salary: 5000,
  location: {
    division: 'ঢাকা',
    district: 'ঢাকা',
    area: 'ধানমন্ডি'
  },
  requirements: 'অভিজ্ঞ শিক্ষক প্রয়োজন',
  schedule: 'সপ্তাহে ৩ দিন'
});

console.log("Post created:", post.id);
```

---

### 3. `applyToTuition()`

শিক্ষক টিউশনে আবেদন করে।

```typescript
export function applyToTuition(
  teacherId: string,
  postId: string,
  proposal: string
): Promise<Application>
```

**প্রক্রিয়া**:
```typescript
1. Teacher থেকে 10 credits কাটে
2. Application object তৈরি করে
3. Post এর applications array তে add করে
4. Guardian কে notification পাঠায়
5. Application return করে
```

**উদাহরণ**:
```typescript
const application = await applyToTuition(
  'teacher123',
  'post456',
  'আমি ৮ বছরের অভিজ্ঞ গণিত শিক্ষক। আমি আপনার সন্তানকে ভালো ফলাফল দিতে পারব।'
);

if (application) {
  console.log("আবেদন সফল!");
}
```

---

### 4. `acceptApplication()`

অভিভাবক শিক্ষকের আবেদন accept করে।

```typescript
export function acceptApplication(
  postId: string,
  applicationId: string
): Promise<boolean>
```

**প্রক্রিয়া**:
```typescript
1. Application status 'accepted' করে
2. অন্য সব applications 'rejected' করে
3. Post status 'filled' করে
4. Teacher কে notification পাঠায়
5. Contract তৈরি করে
```

---

## ❤️ Donation Functions

**ফাইল**: `/utils/donationService.ts` (Virtual)

### 1. `createDonationRequest()`

শিক্ষার্থী সাহায্যের আবেদন করে।

```typescript
export function createDonationRequest(
  studentId: string,
  requestData: DonationRequestData
): Promise<DonationRequest>
```

**প্যারামিটার**:
```typescript
interface DonationRequestData {
  title: string;
  description: string;
  type: 'financial' | 'books' | 'uniform' | 'stationery';
  amount?: number;        // যদি financial হয়
  items?: string[];       // যদি material হয়
  urgency: 'low' | 'medium' | 'high';
  documents?: File[];     // Proof documents
}
```

**উদাহরণ**:
```typescript
const request = await createDonationRequest('student123', {
  title: 'পরীক্ষার খরচের জন্য সাহায্য',
  description: 'পরিবারের আর্থিক সমস্যার কারণে পরীক্ষার ফি দিতে পারছি না',
  type: 'financial',
  amount: 5000,
  urgency: 'high'
});
```

---

### 2. `makeDonation()`

দাতা দান করে।

```typescript
export function makeDonation(
  donorId: string,
  requestId: string,
  amount: number,
  paymentMethod: string
): Promise<Donation>
```

**প্রক্রিয়া**:
```typescript
1. Payment process করে (Mock)
2. Donation record তৈরি করে
3. Student এ donation link করে
4. Certificate generate করে
5. Donor ও Student কে notification পাঠায়
```

**উদাহরণ**:
```typescript
const donation = await makeDonation(
  'donor123',
  'request456',
  5000,
  'bkash'
);

if (donation.success) {
  console.log("দান সফল হয়েছে!");
  console.log("সার্টিফিকেট:", donation.certificate);
}
```

---

### 3. `calculateZakat()`

যাকাত হিসাব করে।

```typescript
export function calculateZakat(assets: ZakatAssets): ZakatResult
```

**প্যারামিটার**:
```typescript
interface ZakatAssets {
  cash: number;           // হাতে নগদ টাকা
  bankBalance: number;    // ব্যাংক ব্যালেন্স
  gold: number;           // সোনা (grams)
  silver: number;         // রূপা (grams)
  property: number;       // সম্পত্তির মূল্য
  business: number;       // ব্যবসায়িক সম্পদ
  investments: number;    // বিনিয়োগ
  debts: number;          // ঋণ (বাদ যাবে)
}
```

**ফর্মুলা**:
```typescript
Total Assets = cash + bank + gold + silver + property + business + investments
Zakatable Amount = Total Assets - debts
Zakat = Zakatable Amount × 2.5%
```

**উদাহরণ**:
```typescript
const result = calculateZakat({
  cash: 100000,
  bankBalance: 500000,
  gold: 50,    // 50 grams
  silver: 0,
  property: 2000000,
  business: 500000,
  investments: 300000,
  debts: 100000
});

console.log("মোট সম্পদ:", result.totalAssets);
console.log("যাকাতযোগ্য:", result.zakatableAmount);
console.log("যাকাত দিতে হবে:", result.zakatAmount);
```

---

## 🌐 Translation Functions

**ফাইল**: `/utils/translations.ts`, `/utils/languageContext.tsx`

### 1. `useLanguage()`

Language context hook.

```typescript
export function useLanguage(): {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
```

**উদাহরণ**:
```typescript
function MyComponent() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div>
      <p>Current language: {language}</p>
      <button onClick={() => setLanguage('bn')}>বাংলা</button>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

---

### 2. Translation Object Usage

প্রতিটি component এ নিজস্ব translation object থাকে।

```typescript
const content = {
  en: {
    title: 'Welcome',
    subtitle: 'Find the best tutors',
    button: 'Get Started'
  },
  bn: {
    title: 'স্বাগতম',
    subtitle: 'সেরা শিক্ষক খুঁজুন',
    button: 'শুরু করুন'
  }
};

function MyComponent({ language }) {
  const t = content[language];
  
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button>{t.button}</button>
    </div>
  );
}
```

---

## 📍 Location Functions

**ফাইল**: `/utils/bangladeshLocations.ts`

### 1. `getDivisions()`

সব বিভাগ পায়।

```typescript
export function getDivisions(): string[]
```

**রিটার্ন**:
```typescript
['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ']
```

---

### 2. `getDistricts()`

নির্দিষ্ট বিভাগের জেলা পায়।

```typescript
export function getDistricts(division: string): string[]
```

**উদাহরণ**:
```typescript
const dhakaDistricts = getDistricts('ঢাকা');
// ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল', ...]
```

---

### 3. `getAreas()`

নির্দিষ্ট জেলার এলাকা পায়।

```typescript
export function getAreas(district: string): string[]
```

**উদাহরণ**:
```typescript
const dhakaAreas = getAreas('ঢাকা');
// ['ধানমন্ডি', 'মিরপুর', 'গুলশান', 'বনানী', ...]
```

---

### 4. `getFullLocation()`

সম্পূর্ণ location string তৈরি করে।

```typescript
export function getFullLocation(
  area: string,
  district: string,
  division: string
): string
```

**উদাহরণ**:
```typescript
const location = getFullLocation('ধানমন্ডি', 'ঢাকা', 'ঢাকা');
// "ধানমন্ডি, ঢাকা, ঢাকা"
```

---

## 🔧 Utility Functions

### 1. `formatDate()`

তারিখ ফরম্যাট করে।

```typescript
export function formatDate(
  date: Date | string,
  language: Language
): string
```

**উদাহরণ**:
```typescript
formatDate(new Date(), 'bn');  // "২৮ নভেম্বর ২০২৫"
formatDate(new Date(), 'en');  // "November 28, 2025"
```

---

### 2. `formatCurrency()`

টাকা ফরম্যাট করে।

```typescript
export function formatCurrency(
  amount: number,
  language: Language
): string
```

**উদাহরণ**:
```typescript
formatCurrency(5000, 'bn');  // "৫,০০০ টাকা"
formatCurrency(5000, 'en');  // "৳5,000"
```

---

### 3. `generateId()`

Unique ID তৈরি করে।

```typescript
export function generateId(prefix?: string): string
```

**উদাহরণ**:
```typescript
generateId('user');     // "user_1638123456789_abc123"
generateId('post');     // "post_1638123456789_def456"
generateId();           // "1638123456789_ghi789"
```

---

### 4. `validateEmail()`

Email validate করে।

```typescript
export function validateEmail(email: string): boolean
```

**উদাহরণ**:
```typescript
validateEmail('test@example.com');  // true
validateEmail('invalid-email');     // false
```

---

### 5. `validatePhone()`

বাংলাদেশি ফোন নম্বর validate করে।

```typescript
export function validatePhone(phone: string): boolean
```

**ভ্যালিড ফরম্যাট**:
- `01712345678`
- `+8801712345678`
- `8801712345678`

**উদাহরণ**:
```typescript
validatePhone('01712345678');      // true
validatePhone('+8801712345678');   // true
validatePhone('12345');            // false
```

---

## 🎨 Component Helper Functions

### 1. Toast Notifications

```typescript
import { toast } from 'sonner@2.0.3';

// Success
toast.success('ক্রেডিট যোগ হয়েছে!');

// Error
toast.error('যথেষ্ট ক্রেডিট নেই!');

// Info
toast.info('নতুন বার্তা এসেছে');

// Warning
toast.warning('প্রোফাইল সম্পন্ন করুন');

// With custom duration
toast.success('সংরক্ষিত হয়েছে', {
  duration: 3000
});
```

---

### 2. Navigation Helper

```typescript
// Page navigation
setPage('teacher-dashboard');
setPage('home');
setPage('blog-detail', { id: 'blog123' });

// With state
setPage('find-teachers', { 
  filters: { subject: 'গণিত' } 
});
```

---

## 📊 Analytics Functions

### 1. `trackEvent()`

User action track করে।

```typescript
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
): void
```

**উদাহরণ**:
```typescript
trackEvent('tuition_applied', {
  postId: 'post123',
  teacherId: 'teacher456',
  creditsSpent: 10
});

trackEvent('credit_purchased', {
  package: 'standard',
  amount: 600,
  price: 2000
});
```

---

## 🔒 Security Functions

### 1. `sanitizeInput()`

User input sanitize করে।

```typescript
export function sanitizeInput(input: string): string
```

**উদাহরণ**:
```typescript
const clean = sanitizeInput('<script>alert("xss")</script>');
// Returns: "scriptalert("xss")/script"
```

---

### 2. `hashPassword()`

Password hash করে (mock mode এ শুধু encoding).

```typescript
export function hashPassword(password: string): string
```

---

## 📅 Date/Time Functions

### 1. `getRelativeTime()`

Relative time দেখায়।

```typescript
export function getRelativeTime(
  date: Date,
  language: Language
): string
```

**উদাহরণ**:
```typescript
getRelativeTime(new Date(Date.now() - 3600000), 'bn');
// "১ ঘণ্টা আগে"

getRelativeTime(new Date(Date.now() - 86400000), 'en');
// "1 day ago"
```

---

## 🎯 সারাংশ

এই ডকুমেন্টেশনে Talent Tutor প্ল্যাটফর্মের **সব গুরুত্বপূর্ণ ফাংশন** বিস্তারিতভাবে ব্যাখ্যা করা হয়েছে:

✅ **Authentication**: Login, Register, Logout
✅ **Authorization**: Page guards, Role checks  
✅ **Credit System**: Deduct, Add, Purchase
✅ **User Management**: Profile, Demo users
✅ **Tuition Management**: Create, Apply, Accept
✅ **Donation System**: Request, Donate, Calculate Zakat
✅ **Translation**: Multi-language support
✅ **Location**: Bangladesh divisions/districts
✅ **Utilities**: Date, Currency, Validation
✅ **Components**: Toast, Navigation, Events

প্রতিটি ফাংশনের জন্য:
- ফাংশন সিগনেচার
- প্যারামিটার ব্যাখ্যা
- রিটার্ন টাইপ
- কীভাবে কাজ করে
- উদাহরণ কোড

---

**শেষ আপডেট**: November 28, 2025
**ভার্সন**: 1.0.0
