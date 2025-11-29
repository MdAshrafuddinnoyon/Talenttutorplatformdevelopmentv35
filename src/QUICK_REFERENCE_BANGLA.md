# ⚡ Talent Tutor - Quick Reference Guide (বাংলায়)

এই গাইডে দ্রুত রেফারেন্সের জন্য সব গুরুত্বপূর্ণ তথ্য সংক্ষেপে দেওয়া হয়েছে।

---

## 📦 প্রজেক্ট ইনফো

```bash
নাম:        Talent Tutor
ভার্সন:     1.0.0
Node.js:    20.12.1
Vite:       5.4.8
React:      18.3.1
মোড:        Pure Frontend (No Supabase)
ভাষা:       বাংলা + ইংরেজি
```

---

## 🚀 দ্রুত শুরু

```bash
# ইনস্টল
npm install

# রান করুন
npm run dev

# বিল্ড
npm run build

# প্রিভিউ
npm run preview
```

**ব্রাউজার**: http://localhost:5173

---

## 📁 ফাইল স্ট্রাকচার (সংক্ষেপ)

```
talent-tutor/
├── App.tsx                 # Main app
├── main.tsx                # Entry point
├── pages/                  # 30+ pages
├── components/             # 100+ components
├── utils/                  # Services & utilities
└── styles/                 # CSS files
```

---

## 🔐 ডেমো একাউন্ট (15টি)

### শিক্ষক (5)
```
karim@teacher.demo      / teacher123
fatema@teacher.demo     / teacher123
rahim@teacher.demo      / teacher123
salma@teacher.demo      / teacher123
hasan@teacher.demo      / teacher123
```

### অভিভাবক (3)
```
rahman@guardian.demo    / guardian123
ayesha@guardian.demo    / guardian123
kamal@guardian.demo     / guardian123
```

### শিক্ষার্থী (4)
```
rahim@student.demo      / student123
mim@student.demo        / student123
sajid@student.demo      / student123
rupa@student.demo       / student123
```

### দাতা (2)
```
hasan@donor.demo        / donor123
salma@donor.demo        / donor123
```

### এডমিন (1)
```
admin@talenttutor.com   / admin123
```

---

## 💳 ক্রেডিট খরচ

### শিক্ষক
```
টিউশনে আবেদন:          10 credits
অভিভাবকের যোগাযোগ:      5 credits
প্রপোজাল পাঠানো:         5 credits
ফিচার্ড প্রোফাইল:        20 credits
```

### অভিভাবক
```
টিউশন পোস্ট:            10 credits
শিক্ষকের যোগাযোগ:        5 credits
আমন্ত্রণ পাঠানো:          5 credits
ফিচার্ড পোস্ট:           30 credits
```

### ফ্রি ক্রেডিট
```
শিক্ষক সাইনআপ:          50 credits
অভিভাবক সাইনআপ:        100 credits
প্রোফাইল সম্পন্ন:         10 credits
```

---

## 📦 ক্রেডিট প্যাকেজ

| প্যাকেজ | ক্রেডিট | মূল্য | বোনাস |
|---------|---------|-------|--------|
| Starter | 100 | ৫০০ | - |
| Basic | 250 | ১,০০০ | 10% |
| Standard | 600 | ২,০০০ | 20% |
| Premium | 1,500 | ৪,০০০ | 30% |
| Enterprise | 4,000 | ১০,০০০ | 40% |

---

## 🎭 ইউজার রোল

### Teacher (শিক্ষক)
- টিউশন খুঁজুন
- আবেদন করুন
- চুক্তি ম্যানেজ করুন
- আয় দেখুন

### Guardian (অভিভাবক)
- টিউশন পোস্ট করুন
- শিক্ষক খুঁজুন
- আবেদন দেখুন
- চুক্তি তৈরি করুন

### Student (শিক্ষার্থী)
- সাহায্য চান
- দান পান
- প্রোগ্রেস দেখুন

### Donor (দাতা)
- দান করুন
- ইমপ্যাক্ট দেখুন
- সার্টিফিকেট পান

### Admin (এডমিন)
- সম্পূর্ণ কন্ট্রোল
- ইউজার ম্যানেজমেন্ট
- এনালিটিক্স
- সিস্টেম সেটিংস

---

## 📄 গুরুত্বপূর্ণ পেজ

### পাবলিক
```typescript
/                   → HomePage
/find-teachers      → FindTeachersPage
/browse-tuitions    → BrowseTuitionsPage
/blog               → BlogPage
/donation           → DonationPage
/about              → AboutPage
/contact            → ContactPage
```

### প্রোটেক্টেড (Login প্রয়োজন)
```typescript
/teacher-dashboard      → TeacherDashboard
/guardian-dashboard     → GuardianDashboard
/student-dashboard      → StudentDashboard
/donor-dashboard        → DonorDashboard
/admin-dashboard        → AdminDashboard
/messages               → MessagesPage
/notifications          → NotificationsPage
/settings               → SettingsPage
```

---

## 🔧 মূল ফাংশন (দ্রুত রেফারেন্স)

### Authentication
```typescript
// লগইন
await login({ emailOrPhone, password }, role)

// রেজিস্টার
await register({ fullName, email, phone, password, role })

// লগআউট
await logout()

// কারেন��ট ইউজার
const user = getCurrentUser()

// চেক করুন logged in কিনা
if (isAuthenticated()) { ... }
```

### Credits
```typescript
// ব্যালেন্স পাওয়া
const balance = getBalance(userId)

// ক্রেডিট কাটা
await deductCredits(userId, 10, 'টিউশনে আবেদন')

// ক্রেডিট যোগ করা
await addCredits(userId, 50, 'earned', 'প্রোফাইল সম্পন্ন')

// প্যাকেজ কেনা
await purchasePackage(userId, 'standard', 'bkash')

// চেক করুন afford করতে পারবে কিনা
if (canAfford(userId, 10)) { ... }
```

### Authorization
```typescript
// Public page check
if (isPublicPage('home')) { ... }

// Protected page check
if (isProtectedPage('dashboard')) { ... }

// Access check
if (canAccessPage(page, userRole)) { ... }
```

### Location
```typescript
// বিভাগ
const divisions = getDivisions()

// জেলা
const districts = getDistricts('ঢাকা')

// এলাকা
const areas = getAreas('ঢাকা')
```

### Tuition
```typescript
// পোস্ট তৈরি
await createTuitionPost(guardianId, postData)

// আবেদন করা
await applyToTuition(teacherId, postId, proposal)

// আবেদন accept
await acceptApplication(postId, applicationId)
```

### Language
```typescript
// ভাষা পরিবর্তন
setLanguage('bn')  // বাংলা
setLanguage('en')  // English

// Current language
const { language } = useLanguage()
```

---

## 🎨 UI Components (Shadcn)

### Buttons
```typescript
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Dialog
```typescript
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Card
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

### Toast
```typescript
import { toast } from 'sonner@2.0.3';

toast.success('সফল!');
toast.error('ভুল হয়েছে!');
toast.info('তথ্য');
toast.warning('সতর্কতা');
```

### Form
```typescript
<form onSubmit={handleSubmit}>
  <div>
    <Label htmlFor="name">নাম</Label>
    <Input 
      id="name" 
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <Button type="submit">জমা দিন</Button>
</form>
```

---

## 🔄 State Management

### useState
```typescript
const [value, setValue] = useState(initialValue)
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### useEffect
```typescript
// Run once on mount
useEffect(() => {
  // ...
}, [])

// Run when dependency changes
useEffect(() => {
  // ...
}, [dependency])

// Cleanup
useEffect(() => {
  // ...
  return () => {
    // cleanup
  }
}, [])
```

---

## 🌐 Translation Template

```typescript
const content = {
  en: {
    title: 'English Title',
    button: 'Click Me',
    message: 'Hello World'
  },
  bn: {
    title: 'বাংলা শিরোনাম',
    button: 'ক্লিক করুন',
    message: 'হ্যালো ওয়ার্ল্ড'
  }
};

function MyComponent({ language }) {
  const t = content[language];
  return <h1>{t.title}</h1>;
}
```

---

## 📍 Location Data

### বিভাগ (8)
```
ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা
বরিশাল, সিলেট, রংপুর, ময়মনসিংহ
```

### জেলা (ঢাকা বিভাগ)
```
ঢাকা, গাজীপুর, নারায়ণগঞ্জ, টাঙ্গাইল
মানিকগঞ্জ, মুন্সিগঞ্জ, ফরিদপুর, গোপালগঞ্জ
মাদারীপুর, রাজবাড়ী, শরীয়তপুর, কিশোরগঞ্জ
নরসিংদী
```

### এলাকা (ঢাকা শহর)
```
ধানমন্ডি, মিরপুর, গুলশান, বনানী
উত্তরা, মোহাম্মদপুর, বাড়ীধারা, ক্যান্টনমেন্ট
মতিঝিল, কাওরানবাজার, নিউমার্কেট, বায়তুল মোকাররম
রমনা, শাহবাগ, নীলক্ষেত, পল্টন
```

---

## 💾 LocalStorage Keys

```typescript
'currentUser'              // Current logged in user
'auth_token'               // Auth token
'app_language'             // Selected language
'demo_accounts_created'    // Demo accounts initialized
'user_credits_{userId}'    // User credit data
'tuition_posts'            // Tuition posts
'applications'             // Job applications
'donations'                // Donation records
```

---

## 🎯 যাকাত হিসাব

### ফর্মুলা
```
মোট সম্পদ = নগদ + ব্যাংক + সোনা + রূপা + সম্পত্তি + ব্যবসা + বিনিয়োগ
যাকাতযোগ্য = মোট সম্পদ - ঋণ
যাকাত = যাকাতযোগ্য × ২.৫%
```

### নিসাব
```
সোনা: ৭.৫ তোলা (৮৭.৪৮ গ্রাম)
রূপা: ৫২.৫ তোলা (৬১২.৩৬ গ্রাম)
```

---

## 🔍 Search & Filter

### শিক্ষক খুঁজুন
```typescript
filters = {
  subject: 'গণিত',
  class: 'দশম শ্রেণি',
  location: 'ধানমন্ডি',
  experience: '৫+ বছর',
  rating: 4.5,
  salary: { min: 3000, max: 8000 }
}
```

### টিউশন খুঁজুন
```typescript
filters = {
  subject: 'পদার্থবিজ্ঞান',
  class: 'একাদশ শ্রেণি',
  medium: 'english-version',
  location: 'গুলশান',
  salary: { min: 5000, max: 10000 }
}
```

---

## 📊 স্ট্যাটাস টাইপ

### Tuition Post Status
```typescript
'open'      // খোলা
'closed'    // বন্ধ
'filled'    // পূরণ হয়েছে
```

### Application Status
```typescript
'pending'   // অপেক্ষমান
'accepted'  // গৃহীত
'rejected'  // প্রত্যাখ্যাত
'withdrawn' // প্রত্যাহার
```

### User Status
```typescript
'active'    // সক্রিয়
'pending'   // অপেক্ষমান
'blocked'   // ব্লক
```

### Donation Request Status
```typescript
'open'      // খোলা
'fulfilled' // পূরণ হয়েছে
'closed'    // বন্ধ
```

---

## 🚨 Error Handling

```typescript
try {
  await someFunction();
} catch (error) {
  console.error('Error:', error);
  toast.error('একটি সমস্যা হয়েছে!');
}
```

---

## 🎨 Tailwind Utilities (Custom)

### Colors
```css
bg-gradient-to-r from-blue-500 to-purple-600
text-primary
border-secondary
```

### Glass Effect
```css
bg-white/10 backdrop-blur-lg
border border-white/20
```

### Shadows
```css
shadow-sm
shadow-md
shadow-lg
shadow-xl
```

---

## 📱 Responsive Classes

```css
/* Mobile First */
sm:    // ≥640px
md:    // ≥768px
lg:    // ≥1024px
xl:    // ≥1280px
2xl:   // ≥1536px

/* Example */
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## 🔗 Navigation Helper

```typescript
// Simple navigation
setPage('home')

// With params
setPage('blog-detail', { id: 'blog123' })

// Programmatic navigation in component
const handleClick = () => {
  setPage('teacher-dashboard');
};
```

---

## 🛠️ Debugging

### Check Current User
```typescript
console.log('User:', getCurrentUser());
console.log('Authenticated:', isAuthenticated());
```

### Check Credits
```typescript
console.log('Balance:', getBalance(userId));
console.log('Transactions:', getTransactions(userId));
```

### LocalStorage Inspect
```typescript
// Browser Console
localStorage.getItem('currentUser')
localStorage.getItem('auth_token')
localStorage.getItem('app_language')
```

---

## 📝 Component Template

```typescript
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface MyComponentProps {
  language: 'bn' | 'en';
  onAction?: () => void;
}

const content = {
  en: { title: 'Title' },
  bn: { title: 'শিরোনাম' }
};

export function MyComponent({ language, onAction }: MyComponentProps) {
  const t = content[language];
  const [value, setValue] = useState('');
  
  const handleSubmit = () => {
    // Logic here
    onAction?.();
  };
  
  return (
    <Card>
      <h2>{t.title}</h2>
      <Button onClick={handleSubmit}>Submit</Button>
    </Card>
  );
}
```

---

## 🔧 Utility Functions Template

```typescript
// Format currency
export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString('bn-BD')}`;
}

// Format date
export function formatDate(date: Date, lang: Language): string {
  return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-US').format(date);
}

// Generate ID
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Validate email
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (BD)
export function validatePhone(phone: string): boolean {
  return /^(?:\+880|880|0)1[3-9]\d{8}$/.test(phone);
}
```

---

## 📚 সংক্ষিপ্ত সারাংশ

### যা আছে ✅
- ✅ 15 Demo Accounts
- ✅ 5 User Roles
- ✅ 30+ Pages
- ✅ 100+ Components
- ✅ Credit System
- ✅ Donation System
- ✅ Multi-language
- ✅ Pure Frontend (works offline)

### যা নেই ❌
- ❌ Real Database (Supabase)
- ❌ Real Payment Gateway
- ❌ Real-time Chat
- ❌ Email Sending
- ❌ SMS Sending

### পরবর্তী ধাপ 🚀
1. Supabase Integration
2. Payment Gateway
3. Email Service
4. SMS Service
5. Mobile App

---

## 📞 সাহায্য

### ডকুমেন্ট
- `/APPLICATION_OVERVIEW_BANGLA.md` - সম্পূর্ণ ওভারভিউ
- `/FUNCTIONS_DOCUMENTATION_BANGLA.md` - ফাংশন ডকুমেন্টেশন
- `/COMPONENT_ARCHITECTURE_BANGLA.md` - কম্পোনেন্ট আর্কিটেকচার
- `/SETUP_LOCAL.md` - লোকাল সেটআপ

### যোগাযোগ
- Email: info@websearchbd.com
- Support: support@talenttutor.com

---

**এই Quick Reference Guide দিয়ে আপনি দ্রুত যেকোনো তথ্য খুঁজে পাবেন!** 🚀

**শেষ আপডেট**: November 28, 2025
