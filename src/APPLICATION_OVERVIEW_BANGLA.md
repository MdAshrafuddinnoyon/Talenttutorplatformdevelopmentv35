# 🎓 Talent Tutor - সম্পূর্ণ অ্যাপ্লিকেশন ওভারভিউ (বাংলায়)

## 📋 সূচিপত্র
1. [প্রজেক্ট পরিচিতি](#-প্রজেক্ট-পরিচিতি)
2. [আর্কিটেকচার ওভারভিউ](#-আর্কিটেকচার-ওভারভিউ)
3. [ফাইল স্ট্রাকচার](#-ফাইল-স্ট্রাকচার)
4. [মূল ফিচারসমূহ](#-মূল-ফিচারসমূহ)
5. [ইউজার রোল ও ড্যাশবোর্ড](#-ইউজার-রোল-ও-ড্যাশবোর্ড)
6. [ক্রেডিট সিস্টেম](#-ক্রেডিট-সিস্টেম)
7. [ডোনেশন সিস্টেম](#-ডোনেশন-সিস্টেম)
8. [প্রযুক্তিগত বিবরণ](#-প্রযুক্তিগত-বিবরণ)
9. [ডেটা ফ্লো](#-ডেটা-ফ্লো)
10. [বর্তমান সমস্যা ও সমাধান](#-বর্তমান-সমস্যা-ও-সমাধান)

---

## 🌟 প্রজেক্ট পরিচিতি

**Talent Tutor** হলো একটি সম্পূর্ণ **টিউশন মার্কেটপ্লেস প্ল্যাটফর্ম** যা Upwork-স্টাইল ফিচারের সাথে বাংলাদেশের যাকাত/দান ব্যবস্থা একসাথে ইন্টিগ্রেট করে।

### 🎯 মূল উদ্দেশ্য:
- শিক্ষকদের টিউশন খুঁজতে সাহায্য করা
- অভিভাবকদের যোগ্য শিক্ষক খুঁজতে সাহায্য করা
- অসহায় শিক্ষার্থীদের জন্য দান/যাকাত ব্যবস্থা
- স্বচ্ছ এবং নিরাপদ লেনদেন

### 📊 প্রজেক্ট স্ট্যাটাস:
- **ভার্সন**: 1.0.0
- **মোড**: Pure Frontend (Supabase ছাড়া)
- **ভাষা**: দ্বিভাষিক (বাংলা + ইংরেজি)
- **Node.js**: 20.12.1
- **Vite**: 5.4.8 (ডাউনগ্রেড করা হয়েছে সামঞ্জস্যতার জন্য)

---

## 🏗️ আর্কিটেকচার ওভারভিউ

### সিস্টেম আর্কিটেকচার

```
┌──────────────────────────────────────────────────────────────┐
│                    TALENT TUTOR PLATFORM                      │
│                  (React + TypeScript + Vite)                  │
└──────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌──────────────┐   ┌──────────────┐
│   Frontend    │   │   Utils      │   │   Data       │
│   (React)     │   │   (Services) │   │   (Mock)     │
└───────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        ├─ Pages (30+)      ├─ authService     ├─ demoUsers
        ├─ Components (100+)├─ creditSystem   ├─ teachersData
        └─ UI Library       ├─ authGuard      ├─ tuitionData
                           ├─ translations   ├─ blogData
                           └─ bangladeshLoc  └─ subjectsData
```

### প্রধান লেয়ারসমূহ:

#### 1. **Presentation Layer** (UI)
   - React Components
   - Tailwind CSS Styling
   - Motion Animations
   - Responsive Design

#### 2. **Business Logic Layer**
   - Authentication Service
   - Credit Management
   - Authorization Guards
   - Translation System

#### 3. **Data Layer** (Mock/Local Storage)
   - LocalStorage (User Data)
   - Demo Users Database
   - Mock API Responses
   - Static Content Data

---

## 📁 ফাইল স্ট্রাকচার

### রুট ডিরেক্টরি
```
talent-tutor/
│
├── 📄 App.tsx                    # মূল অ্যাপ্লিকেশন (Routing + State)
├── 📄 main.tsx                   # React Entry Point
├── 📄 package.json               # Dependencies
├── 📄 vite.config.ts             # Vite Configuration
├── 📄 tsconfig.json              # TypeScript Config
│
├── 📁 pages/                     # সব পেজ কম্পোনেন্ট (30+)
│   ├── HomePage.tsx              # হোম পেজ
│   ├── TeacherDashboard.tsx      # শিক্ষক ড্যাশবোর্ড
│   ├── GuardianDashboard.tsx     # অভিভাবক ড্যাশবোর্ড
│   ├── StudentDashboard.tsx      # শিক্ষার্থী ড্যাশবোর্ড
│   ├── DonorDashboard.tsx        # দাতা ড্যাশবোর্ড
│   ├── AdminDashboard.tsx        # এডমিন ড্যাশবোর্ড
│   ├── FindTeachersPage.tsx      # শিক্ষক খুঁজুন
│   ├── BrowseTuitionsPage.tsx    # টিউশন ব্রাউজ করুন
│   ├── DonationPage.tsx          # ডোনেশন পেজ
│   ├── BlogPage.tsx              # ব্লগ পেজ
│   └── ... (আরও 20+ পেজ)
│
├── 📁 components/                # রিইউজেবল কম্পোনেন্ট (100+)
│   ├── Header.tsx                # হেডার (নেভিগেশন)
│   ├── Footer.tsx                # ফুটার
│   ├── UnifiedAuthDialog.tsx     # লগইন/রেজিস্ট্রেশন ডায়ালগ
│   ├── CreditBalance.tsx         # ক্রেডিট ব্যালেন্স ডিসপ্লে
│   ├── DashboardSidebar.tsx      # ড্যাশবোর্ড সাইডবার
│   ├── AIMatchmaker.tsx          # AI ম্যাচমেকিং
│   ├── ZakatCalculator.tsx       # যাকাত ক্যালকুলেটর
│   ├── ui/                       # Shadcn UI Components (42)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── card.tsx
│   │   └── ... (আরও 39টি)
│   └── ... (আরও 60+ কম্পোনেন্ট)
│
├── 📁 utils/                     # Utility Functions
│   ├── authService.ts            # Authentication (Mock)
│   ├── authGuard.ts              # Authorization Guards
│   ├── creditSystem.ts           # Credit Management
│   ├── translations.ts           # Translation Data
│   ├── languageContext.tsx       # Language Context
│   ├── demoUsers.ts              # Demo User Data
│   ├── teachersData.ts           # Teachers Database
│   ├── tuitionData.ts            # Tuition Posts Data
│   ├── blogData.ts               # Blog Posts Data
│   ├── subjectsData.ts           # Subjects & Classes
│   ├── bangladeshLocations.ts    # BD Location Data
│   └── ... (আরও 10+ utilities)
│
├── 📁 styles/                    # CSS Files
│   ├── globals.css               # Global Styles + Tailwind
│   └── responsive-optimized.css  # Responsive Styles
│
└── 📁 public/                    # Static Assets
    ├── favicon.svg
    ├── robots.txt
    └── sitemap.xml
```

---

## ✨ মূল ফিচারসমূহ

### 1. 🔐 **Authentication System**

#### লগইন/রেজিস্ট্রেশন
- **Mock Mode**: Pure Frontend (Supabase ছাড়া)
- **ইউজার টাইপ**: Teacher, Guardian, Student, Admin, Donor
- **ডেমো একাউন্ট**: 15+ প্রি-মেইড একাউন্ট

**ফাইল**: `/utils/authService.ts`

```typescript
// লগইন ফাংশন
export const login = async (data: LoginData, selectedRole?: string)
// রেজিস্ট্রেশন ফাংশন
export const register = async (data: RegisterData)
// কারেন্ট ইউজার পাওয়া
export const getCurrentUser = (): User | null
// লগআউট
export const logout = async (): Promise<void>
```

**ফিচার**:
- ✅ Email/Phone দিয়ে লগইন
- ✅ Role-based Registration
- ✅ Auto Demo User Creation
- ✅ LocalStorage Persistence
- ✅ Token-based Auth (Mock)

---

### 2. 🎭 **User Roles & Dashboards**

#### 5 ধরনের ইউজার রোল:

##### A. **Teacher (শিক্ষক)**
**Dashboard**: `/pages/TeacherDashboard.tsx`
- টিউশন জবে আবেদন করা
- প্রোফাইল ম্যানেজমেন্ট
- ক্রেডিট ব্যালেন্স দেখা
- নোটিফিকেশন দেখা
- মেসেজিং

**মূল ফাংশন**:
- `applyToJob()`: টিউশনে আবেদন (খরচ: 10 credits)
- `viewGuardianContact()`: অভিভাবকের যোগাযোগ দেখা (খরচ: 5 credits)
- `sendProposal()`: প্রপোজাল পাঠানো (খরচ: 5 credits)

##### B. **Guardian (অভিভাবক)**
**Dashboard**: `/pages/GuardianDashboard.tsx`
- টিউশন জব পোস্ট করা
- শিক্ষক খুঁজা
- আবেদন ম্যানেজ করা
- ক্রেডিট ক্রয়

**মূল ফাংশন**:
- `postTuition()`: টিউশন পোস্ট (খরচ: 10 credits)
- `viewTeacherContact()`: শিক্ষকের যোগাযোগ (খরচ: 5 credits)
- `sendInvitation()`: শিক্ষককে আমন্ত্রণ (খরচ: 5 credits)

##### C. **Student (শিক্ষার্থী)**
**Dashboard**: `/pages/StudentDashboard.tsx`
- সাহায্যের আবেদন জমা দেওয়া
- প্রাপ্ত দান দেখা
- প্রোগ্রেস রিপোর্ট
- লাইব্রেরি এক্সেস

##### D. **Donor (দাতা)**
**Dashboard**: `/pages/DonorDashboard.tsx`
- যাকাত/দান করা
- শিক্ষার্থীদের আবেদন দেখা
- দানের ইতিহাস
- ইমপ্যাক্ট মেট্রিক্স

**দাতার ধরন**:
- **Zakat Donor**: আর্থিক সাহায্য (টাকা)
- **Material Donor**: বই, ইউনিফর্ম ইত্যাদি

##### E. **Admin (এডমিন)**
**Dashboard**: `/pages/AdminDashboard.tsx`
- সম্পূর্ণ সিস্টেম ম্যানেজমেন্ট
- ইউজার ম্যানেজমেন্ট
- ব্লগ ম্যানেজমেন্ট
- ক্রেডিট ম্যানেজমেন্ট
- এনালিটিক্স

---

### 3. 💳 **Credit System (ক্রেডিট সিস্টেম)**

**ফাইল**: `/utils/creditSystem.ts`

#### ক্রেডিট খরচ:

```typescript
// শিক্ষকদের জন্য
APPLY_TO_TUITION: 10 credits
VIEW_GUARDIAN_CONTACT: 5 credits
SEND_PROPOSAL: 5 credits
PRIORITY_LISTING: 15 credits
FEATURED_PROFILE: 20 credits

// অভিভাবকদের জন্য
POST_TUITION: 10 credits
VIEW_TEACHER_CONTACT: 5 credits
SEND_INVITATION: 5 credits
FEATURED_POST: 30 credits
URGENT_POST: 20 credits
```

#### ফ্রি ক্রেডিট (সাইনআপ বোনাস):
- শিক্ষক: **50 credits**
- অভিভাবক: **100 credits**
- এডমিন: **999 credits**

#### ক্রেডিট প্যাকেজ:

| প্যাকেজ | ক্রেডিট | মূল্য (BDT) | বোনাস |
|---------|---------|------------|--------|
| **Starter** | 100 | ৫০০ | - |
| **Basic** | 250 | ১,০০০ | 10% |
| **Standard** | 600 | ২,০০০ | 20% |
| **Premium** | 1,500 | ৪,০০০ | 30% |
| **Enterprise** | 4,000 | ১০,০০০ | 40% |

#### মূল ফাংশনসমূহ:

```typescript
// ক্রেডিট কেটে নেওয়া
export function deductCredits(
  userId: string, 
  amount: number, 
  description: string
): Promise<boolean>

// ক্রেডিট যোগ করা
export function addCredits(
  userId: string, 
  amount: number, 
  type: 'earned' | 'purchased' | 'bonus'
): Promise<boolean>

// ব্যালেন্স পাওয়া
export function getBalance(userId: string): number

// ট্রানজ্যাকশন হিস্ট্রি
export function getTransactions(userId: string): CreditTransaction[]
```

---

### 4. ❤️ **Donation System (দান ব্যবস্থা)**

**পেজ**: `/pages/DonationPage.tsx`, `/pages/DonationLibrary.tsx`

#### দানের ধরন:

##### A. **আর্থিক দান (Zakat)**
- টাকা স্থানান্তর
- পেমেন্ট মেথড: bKash, Nagad, Rocket, Card, Bank
- স্বয়ংক্রিয় রসিদ জেনারেশন

##### B. **বস্তুগত দান (Materials)**
- বই (Books)
- ইউনিফর্ম (Uniforms)
- শিক্ষা উপকরণ (Stationery)

#### যাকাত ক্যালকুলেটর
**কম্পোনেন্ট**: `/components/ZakatCalculator.tsx`

```typescript
// যাকাত গণনা: সম্পদের 2.5%
const zakatAmount = totalAssets * 0.025
```

#### দান প্রক্রিয়া:
```
1. Student Request → 2. Donor Reviews → 3. Donation → 4. Confirmation → 5. Certificate
```

---

### 5. 🗺️ **Location System (Bangladesh)**

**ফাইল**: `/utils/bangladeshLocations.ts`

#### বিভাগ-ভিত্তিক ডেটা:

```typescript
export const divisions = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 
  'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
];

export const districts = {
  'ঢাকা': ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', ...],
  'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', ...],
  // ... বাকি জেলা
};

export const areas = {
  'ঢাকা': ['ধানমন্ডি', 'মিরপুর', 'গুলশান', ...],
  // ... বাকি এলাকা
};
```

#### লোকেশন পিকার কম্পোনেন্ট:
- `BangladeshLocationSelector.tsx`
- `GoogleMapLocationPicker.tsx`
- `ModernLocationPicker.tsx`

---

### 6. 🌐 **Multi-Language System**

**ফাইল**: `/utils/translations.ts`, `/utils/languageContext.tsx`

#### সাপোর্টেড ভাষা:
- 🇧🇩 বাংলা (bn)
- 🇬🇧 English (en)

#### Translation Structure:

```typescript
export const commonTranslations = {
  en: {
    home: 'Home',
    about: 'About',
    login: 'Login',
    // ... 200+ keys
  },
  bn: {
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    login: 'লগইন',
    // ... 200+ keys
  }
};
```

#### ভাষা পরিবর্তন:

```typescript
// Context Provider
<LanguageProvider initialLanguage="en">
  <App />
</LanguageProvider>

// Component তে ব্যবহার
const { language, setLanguage } = useLanguage();
setLanguage('bn'); // বাংলা সেট করুন
```

#### ফন্ট সিস্টেম:
- **বাংলা**: Noto Serif Bengali
- **ইংরেজি**: Libre Franklin

CSS:
```css
:root {
  --font-bengali: "Noto Serif Bengali", serif;
  --font-english: "Libre Franklin", sans-serif;
}
```

---

### 7. 📝 **Blog & Content System**

**পেজ**: `/pages/BlogPage.tsx`, `/pages/BlogManagementPage.tsx`

#### ব্লগ ফিচার:
- Success Stories
- Tips & Tricks
- Platform Updates
- Educational Content

#### এডমিন ব্লগ ম্যানেজমেন্ট:
```typescript
// CRUD Operations
createBlogPost(post: BlogPost)
updateBlogPost(id: string, updates: Partial<BlogPost>)
deleteBlogPost(id: string)
publishBlogPost(id: string)
```

---

### 8. 📊 **AI & Advanced Features**

#### A. **AI Matchmaker**
**কম্পোনেন্ট**: `/components/AIMatchmaker.tsx`

```typescript
// শিক্ষক ম্যাচিং এলগোরিদম
function matchTeachers(requirements: JobRequirements): Teacher[] {
  // 1. Subject matching
  // 2. Location proximity
  // 3. Experience level
  // 4. Rating & reviews
  // 5. Availability
}
```

#### B. **AI Teacher Finder Map**
**কম্পোনেন্ট**: `/components/AITeacherFinderMap.tsx`
- Google Maps Integration
- Location-based teacher search
- Radius filtering

---

### 9. 💬 **Messaging & Chat System**

**কম্পোনেন্ট**:
- `ChatDialog.tsx`: One-on-one chat
- `RealtimeMessenger.tsx`: Real-time messaging
- `ContractMessagingSystem.tsx`: Contract-specific chat

#### ফিচার:
- Real-time messaging (মক মোডে সিমুলেটেড)
- File sharing
- Message notifications
- Read receipts

---

### 10. 📋 **Ticket & Support System**

**কম্পোনেন্ট**: `/components/TicketSystem.tsx`

#### টিকেট ক্যাটাগরি:
- Technical Issues
- Payment Problems
- Account Issues
- Feature Requests
- General Inquiry

#### টিকেট স্ট্যাটাস:
```typescript
type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
```

---

## 🔄 ডেটা ফ্লো

### 1. **Authentication Flow**

```
User Login Request
    ↓
authService.login()
    ↓
Create Mock User / Retrieve Demo User
    ↓
Store in LocalStorage
    ↓
Update App State
    ↓
Redirect to Dashboard
```

### 2. **Credit Transaction Flow**

```
User Action (e.g., Apply to Job)
    ↓
Check Credit Balance
    ↓
Deduct Credits
    ↓
Create Transaction Record
    ↓
Update LocalStorage
    ↓
Show Success/Error
```

### 3. **Donation Flow**

```
Student Creates Request
    ↓
Donor Reviews Requests
    ↓
Donor Makes Donation
    ↓
Payment Processing (Mock)
    ↓
Generate Certificate
    ↓
Update Student & Donor Records
```

---

## 🎨 UI/UX ডিজাইন সিস্টেম

### ডিজাইন টোকেন:

```css
/* Color Scheme */
--primary: 222.2 47.4% 11.2%
--primary-foreground: 210 40% 98%
--secondary: 210 40% 96.1%
--accent: 210 40% 96.1%

/* Typography */
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
```

### গ্লাস-মরফিজম স্টাইল:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 🔧 প্রযুক্তিগত বিবরণ

### Frontend Stack:

| প্রযুক্তি | ভার্সন | উদ্দেশ্য |
|----------|--------|---------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.6.2 | Type Safety |
| **Vite** | 5.4.8 | Build Tool |
| **Tailwind CSS** | 3.4.14 | Styling |
| **Motion** | 11.0.0 | Animations |
| **Lucide React** | 0.445.0 | Icons |
| **Recharts** | 2.12.7 | Charts |
| **React Router** | 6.26.1 | Routing |

### Key Libraries:

```json
{
  "ui": "@radix-ui/react-*", // 42 UI components
  "forms": "react-hook-form@7.55.0",
  "notifications": "sonner@2.0.3",
  "dates": "date-fns@4.1.0",
  "carousel": "embla-carousel-react@8.3.0"
}
```

---

## 🗄️ ডেটা স্ট্রাকচার

### User Object:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
  address?: string;
  donorType?: 'zakat' | 'materials';
  credits: number;
  status: 'active' | 'pending' | 'blocked';
  isProfileComplete: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Tuition Post:

```typescript
interface TuitionPost {
  id: string;
  guardianId: string;
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
  createdAt: string;
  status: 'open' | 'closed' | 'filled';
  applications: Application[];
}
```

### Demo Users:

```typescript
// Teachers: 5
// Guardians: 3
// Students: 4
// Donors: 2
// Admin: 1
// Total: 15 demo accounts
```

---

## 🚨 বর্তমান সমস্যা ও সমাধান

### সমস্যা #1: Node.js ভার্সন সামঞ্জস্যতা

**সমস্যা**:
```
Vite 7.x requires Node.js 22+
আপনার Node.js: 20.12.1
```

**সমাধান**:
```bash
# Vite ডাউনগ্রেড করা হয়েছে 5.4.8 এ
npm uninstall vite
npm install vite@5.4.8 --save-dev

# অথবা
npm run dev  # এটি স্বয়ংক্রিয়ভাবে ডাউনগ্রেড করবে
```

**package.json এ স্ক্রিপ্ট**:
```json
{
  "scripts": {
    "dev": "npm uninstall vite && npm install vite@5.4.8 --save-dev && vite"
  }
}
```

### সমস্যা #2: SWC Plugin

**সমস্যা**: 
```
@vitejs/plugin-react-swc unsupported in environment
```

**সমাধান**:
```typescript
// vite.config.ts
import react from '@vitejs/plugin-react'  // Standard plugin
// import react from '@vitejs/plugin-react-swc'  // ❌ Not used
```

### সমস্যা #3: Google Maps API

**সমাধান**:
```bash
# .env ফাইল
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

## 📦 ইনস্টলেশন ও রান করা

### 1. প্রজেক্ট সেটআপ:

```bash
# Clone repository
git clone <repo-url>
cd talent-tutor

# Install dependencies
npm install

# Setup environment
cp .env.example .env
```

### 2. ডেভেলপমেন্ট সার্ভার চালু:

```bash
npm run dev
# অথবা
npm run dev -- --host  # Network access এর জন্য
```

### 3. বিল্ড করা:

```bash
npm run build
# Output: dist/ folder
```

### 4. প্রিভিউ:

```bash
npm run preview
```

---

## 🧪 টেস্টিং

### ডেমো একাউন্ট (15টি):

#### Teachers (5):
```
Email: karim@teacher.demo
Password: teacher123

Email: fatema@teacher.demo
Password: teacher123
```

#### Guardians (3):
```
Email: rahman@guardian.demo
Password: guardian123
```

#### Students (4):
```
Email: rahim@student.demo
Password: student123
```

#### Donors (2):
```
Email: hasan@donor.demo
Password: donor123
```

#### Admin (1):
```
Email: admin@talenttutor.com
Password: admin123
```

### টেস্টিং পেজ:
- `/pages/AdminTestingPage.tsx` - Admin testing tools
- `/pages/LoginTestingPage.tsx` - Login debugging

---

## 🔐 অথরাইজেশন গার্ড

### Page Protection:

```typescript
// Public Pages (Login ছাড়া এক্সেস)
const PUBLIC_PAGES = [
  'home', 'about', 'find-teachers', 'blog', 
  'donation', 'contact', 'faq', etc.
];

// Protected Pages (Login প্রয়োজন)
const PROTECTED_PAGES = [
  'teacher-dashboard', 'guardian-dashboard', 
  'admin-dashboard', 'messages', 'settings', etc.
];
```

### Role-Based Access:

```typescript
// Check if user can access page
function canAccessPage(
  page: string, 
  userRole: UserRole
): boolean {
  // Dashboard access চেক
  if (page.includes('-dashboard')) {
    return page.startsWith(userRole);
  }
  // Profile access চেক
  if (page.includes('-profile')) {
    return page.startsWith(userRole) || userRole === 'admin';
  }
  return true;
}
```

---

## 📚 গুরুত্বপূর্ণ ফাইল রেফারেন্স

### Core Files:

| ফাইল | উদ্দেশ্য |
|------|---------|
| `/App.tsx` | Main routing & state management |
| `/main.tsx` | React entry point |
| `/utils/authService.ts` | Authentication logic |
| `/utils/authGuard.ts` | Authorization & guards |
| `/utils/creditSystem.ts` | Credit management |
| `/utils/translations.ts` | Translation data |
| `/utils/demoUsers.ts` | Demo user database |

### Key Components:

| কম্পোনেন্ট | উদ্দেশ্য |
|-----------|---------|
| `Header.tsx` | Main navigation |
| `UnifiedAuthDialog.tsx` | Login/Register |
| `DashboardSidebar.tsx` | Dashboard navigation |
| `CreditBalance.tsx` | Credit display |
| `AIMatchmaker.tsx` | Teacher matching |
| `ZakatCalculator.tsx` | Zakat calculation |

---

## 📈 Future Enhancements

### Phase 1 (Current):
- ✅ Frontend Complete
- ✅ Mock Data
- ✅ Demo Accounts
- ✅ UI/UX Polish

### Phase 2 (Planned):
- ⏳ Supabase Integration
- ⏳ Real Database
- ⏳ Real-time Chat
- ⏳ Payment Gateway

### Phase 3 (Future):
- 📅 Mobile App
- 📅 Push Notifications
- 📅 Video Calling
- 📅 Advanced Analytics

---

## 🤝 অবদান রাখা

### Development Workflow:

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# ... code ...

# 3. Test locally
npm run dev

# 4. Build & verify
npm run build

# 5. Commit & push
git add .
git commit -m "Add: new feature"
git push origin feature/new-feature

# 6. Create Pull Request
```

---

## 📞 সাপোর্ট

### যোগাযোগ:
- **Email**: info@websearchbd.com
- **Support**: support@talenttutor.com
- **Website**: https://talenttutor.com

### ডকুমেন্টেশন:
- `/README.md` - English documentation
- `/README_BN.md` - বাংলা ডকুমেন্টেশন
- `/SETUP_LOCAL.md` - লোকাল সেটআপ গাইড
- `/docs/` - Detailed guides

---

## 📄 লাইসেন্স

MIT License - Web Search BD © 2025

---

## 🙏 ধন্যবাদ

Talent Tutor প্ল্যাটফর্ম ব্যবহার করার জন্য ধন্যবাদ! আশা করি এই ওভারভিউ আপনার প্রজেক্ট বুঝতে সাহায্য করবে।

---

**শেষ আপডেট**: November 28, 2025
**ভার্সন**: 1.0.0
**স্ট্যাটাস**: Production Ready (Frontend)
