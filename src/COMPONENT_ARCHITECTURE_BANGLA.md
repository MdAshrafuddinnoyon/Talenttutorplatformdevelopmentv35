# 🧩 Talent Tutor - Component Architecture (বাংলায়)

## 📋 সূচিপত্র

1. [কম্পোনেন্ট ওভারভিউ](#-কম্পোনেন্ট-ওভারভিউ)
2. [পেজ কম্পোনেন্ট](#-পেজ-কম্পোনেন্ট)
3. [লেআউট কম্পোনেন্ট](#-লেআউট-কম্পোনেন্ট)
4. [ফিচার কম্পোনেন্ট](#-ফিচার-কম্পোনেন্ট)
5. [UI কম্পোনেন্ট](#-ui-কম্পোনেন্ট)
6. [কম্পোনেন্ট প্রপস](#-কম্পোনেন্ট-প্রপস)
7. [স্টেট ম্যানেজমেন্ট](#-স্টেট-ম্যানেজমেন্ট)
8. [কম্পোনেন্ট হায়ারার্কি](#-কম্পোনেন্ট-হায়ারার্কি)

---

## 🎯 কম্পোনেন্ট ওভারভিউ

Talent Tutor প্ল্যাটফর্মে **মোট ১০০+ কম্পোনেন্ট** রয়েছে যা ৪ ক্যাটাগরিতে বিভক্ত:

### কম্পোনেন্ট ক্যাটাগরি:

```
📁 components/ (100+)
│
├── 📄 Pages (30)          → পূর্ণ পেজ কম্পোনেন্ট
├── 📄 Layout (10)         → Header, Footer, Sidebar
├── 📄 Features (40)       → Business logic components
└── 📄 UI (42)             → Reusable UI elements (Shadcn)
```

---

## 📄 পেজ কম্পোনেন্ট

**Location**: `/pages/*.tsx`

### 1. **HomePage** (`/pages/HomePage.tsx`)

**উদ্দেশ্য**: মূল landing page

**Props Interface**:
```typescript
interface HomePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
  userRole?: UserRole | null;
  currentUser?: User | null;
}
```

**ব্যবহৃত Components**:
```typescript
- Header
- HeroSection
- LatestTuitionPosts
- BenefitsSection
- WhyChooseUs
- HowItWorksSection
- PopularSubjects
- BlogStoriesSection
- TestimonialsSection
- Footer
- UnifiedAuthDialog
- AIMatchmaker
```

**State Management**:
```typescript
const [authDialogOpen, setAuthDialogOpen] = useState(false);
const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
```

**Key Functions**:
```typescript
// Auth dialog খোলা
const openAuthDialog = (mode: 'login' | 'register') => {
  setAuthMode(mode);
  setAuthDialogOpen(true);
};

// Page navigation intercept (auth check)
const handleSetPage = (page: string) => {
  if (isProtectedPage(page) && !isAuthenticated) {
    openAuthDialog('login');
  } else {
    setPage(page);
  }
};
```

---

### 2. **TeacherDashboard** (`/pages/TeacherDashboard.tsx`)

**উদ্দেশ্য**: শিক্ষক ড্যাশবোর্ড

**Props**:
```typescript
interface TeacherDashboardProps {
  language: 'bn' | 'en';
  onLogout: () => void;
  setPage: (page: string) => void;
  setLanguage: (lang: 'bn' | 'en') => void;
  currentUser?: User | null;
}
```

**Sections (Tabs)**:
```typescript
type DashboardSection = 
  | 'overview'        // ওভারভিউ
  | 'browse-jobs'     // জব খুঁজুন
  | 'applied-jobs'    // আবেদনকৃত জব
  | 'saved-jobs'      // সেভ করা জব
  | 'contracts'       // চুক্তি
  | 'earnings'        // আয়
  | 'reviews'         // রিভিউ
  | 'profile'         // প্রোফাইল
  | 'settings';       // সেটিংস
```

**State**:
```typescript
const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
const [stats, setStats] = useState({
  totalApplications: 0,
  activeContracts: 0,
  totalEarnings: 0,
  rating: 0
});
```

**Components Used**:
```typescript
- DashboardSidebar
- CreditBalance
- QuickActions
- TeacherAppliedJobs
- TeacherSavedJobs
- ContractManagementSection
- ReviewsSection
- ModernUserProfile
- SettingsPage
```

---

### 3. **GuardianDashboard** (`/pages/GuardianDashboard.tsx`)

**উদ্দেশ্য**: অভিভাবক ড্যাশবোর্ড

**Sections**:
```typescript
type GuardianSection = 
  | 'overview'          // ওভারভিউ
  | 'post-tuition'      // টিউশন পোস্ট করুন
  | 'my-posts'          // আমার পোস্ট
  | 'find-teachers'     // শিক্ষক খুঁজুন
  | 'applications'      // আবেদন
  | 'contracts'         // চুক্তি
  | 'payments'          // পেমেন্ট
  | 'profile';          // প্রোফাইল
```

**Key Components**:
```typescript
- PostTuitionDialog      // নতুন টিউশন পোস্ট
- TuitionPostApplications // আবেদন দেখা
- AITeacherFinderMap     // শিক্ষক খুঁজুন (ম্যাপ)
- ContractManagementSection
- PaymentHistorySection
```

---

### 4. **StudentDashboard** (`/pages/StudentDashboard.tsx`)

**উদ্দেশ্য**: শিক্ষার্থী ড্যাশবোর্ড

**Sections**:
```typescript
type StudentSection = 
  | 'overview'          // ওভারভিউ
  | 'request-help'      // সাহায্য চান
  | 'my-requests'       // আমার আবেদন
  | 'received-help'     // প্রাপ্ত সাহায্য
  | 'library'           // লাইব্রেরি
  | 'progress';         // প্রগ্রেস রিপোর্ট
```

**Key Components**:
```typescript
- StudentRequestManager       // সাহায্যের আবেদন
- StudentReceivedDonations   // প্রাপ্ত দান
- DonationLibrary            // বই লাইব্রেরি
- StudentProfileCompletion   // প্রোফাইল সম্পন্ন করুন
```

---

### 5. **DonorDashboard** (`/pages/DonorDashboard.tsx`)

**উদ্দেশ্য**: দাতা ড্যাশবোর্ড

**Sections**:
```typescript
type DonorSection = 
  | 'overview'          // ওভারভিউ
  | 'donate'            // দান করুন
  | 'requests'          // আবেদন দেখুন
  | 'my-donations'      // আমার দান
  | 'impact'            // প্রভাব
  | 'certificates';     // সার্টিফিকেট
```

**Key Components**:
```typescript
- DonorRequestInbox          // আবেদন inbox
- DonorPaymentDialog         // দান করুন
- DonorImpactMetrics         // Impact analytics
- DonationCertificate        // সার্টিফিকেট
- MonthlyDonationReport      // মাসিক রিপোর্ট
```

---

### 6. **AdminDashboard** (`/pages/AdminDashboard.tsx`)

**উদ্দেশ্য**: এডমিন প্যানেল - সম্পূর্ণ সিস্টেম ম্যানেজমেন্ট

**Sections (20+)**:
```typescript
type AdminSection = 
  | 'dashboard'              // মূল ড্যাশবোর্ড
  | 'users'                  // ইউজার ম্যানেজমেন্ট
  | 'teachers'               // শিক্ষক ম্যানেজমেন্ট
  | 'guardians'              // অভিভাবক ম্যানেজমেন্ট
  | 'students'               // শিক্ষার্থী ম্যানেজমেন্ট
  | 'donors'                 // দাতা ম্যানেজমেন্ট
  | 'tuitions'               // টিউশন পোস্ট
  | 'applications'           // আবেদন
  | 'donations'              // দান ম্যানেজমেন্ট
  | 'credits'                // ক্রেডিট ম্যানেজমেন্ট
  | 'payments'               // পেমেন্ট
  | 'blog'                   // ব্লগ ম্যানেজমেন্ট
  | 'reviews'                // রিভিউ মডারেশন
  | 'tickets'                // টিকেট সাপোর্ট
  | 'analytics'              // এনালিটিক্স
  | 'settings'               // সিস্টেম সেটিংস
  | 'maintenance'            // মেইনটেনেন্স মোড
  | 'notices'                // নোটিশ ম্যানেজমেন্ট
  | 'api-keys'               // API Key ম্যানেজমেন্ট
  | 'testing';               // টেস্টিং টুলস
```

**Key Admin Components**:
```typescript
- AnalyticsDashboard              // বিস্তারিত analytics
- ConsolidatedUserManagement      // ইউজার ম্যানেজমেন্ট
- AdminCreditPackageManager       // ক্রেডিট প্যাকেজ
- AdminPaymentDashboard           // পেমেন্ট ট্র্যাকিং
- AdminDonationRequestManager     // দান আবেদন
- AdminReviewManager              // রিভিউ মডারেশন
- AdminTicketManager              // টিকেট সিস্টেম
- AdminAPIKeyManager              // API কী ম্যানেজমেন্ট
- AdminNoticeViewer               // নোটিশ বোর্ড
```

**Powerful Features**:
```typescript
// ইউজার ম্যানেজমেন্ট
- Create/Edit/Delete users
- Approve/Block accounts
- Manual credit add/deduct
- View user analytics

// কন্টেন্ট ম্যানেজমেন্ট
- Create/Edit/Delete blog posts
- Moderate reviews
- Manage tuition posts

// সিস্টেম কন্ট্রোল
- Enable/Disable maintenance mode
- Send global announcements
- Configure system settings
- API key management

// এনালিটিক্স
- User growth charts
- Revenue analytics
- Credit usage stats
- Donation metrics
```

---

## 🏗️ লেআউট কম্পোনেন্ট

### 1. **Header** (`/components/Header.tsx`)

**উদ্দেশ্য**: Main navigation bar

**Features**:
```typescript
- Logo/Brand
- Navigation menu
- Language switcher
- Auth buttons (Login/Register)
- User menu (if logged in)
- Notification bell
- Credit balance display
- Mobile responsive menu
```

**Props**:
```typescript
interface HeaderProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: UserRole | null;
  currentUser?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}
```

**Navigation Items**:
```typescript
const navItems = [
  { label: 'হোম', page: 'home' },
  { label: 'শিক্ষক খুঁজুন', page: 'find-teachers' },
  { label: 'টিউশন ব্রাউজ', page: 'browse-tuitions' },
  { label: 'ব্লগ', page: 'blog' },
  { label: 'দান করুন', page: 'donation' },
  { label: 'যোগাযোগ', page: 'contact' },
];
```

---

### 2. **Footer** (`/components/Footer.tsx`)

**উদ্দেশ্য**: Footer with links & info

**Sections**:
```typescript
- About us
- Quick links
- Resources
- Contact info
- Social media
- Copyright
- Language selector
```

---

### 3. **DashboardSidebar** (`/components/DashboardSidebar.tsx`)

**উদ্দেশ্য**: Dashboard navigation sidebar

**Props**:
```typescript
interface DashboardSidebarProps {
  role: UserRole;
  activeSection: string;
  setActiveSection: (section: string) => void;
  language: 'bn' | 'en';
  onLogout: () => void;
}
```

**Dynamic Menu Based on Role**:
```typescript
// Teacher menu
const teacherMenu = [
  { id: 'overview', icon: LayoutDashboard, label: 'ওভারভিউ' },
  { id: 'browse-jobs', icon: Search, label: 'জব খুঁজুন' },
  { id: 'applied-jobs', icon: FileText, label: 'আবেদনকৃত' },
  { id: 'contracts', icon: FileCheck, label: 'চুক্তি' },
  { id: 'earnings', icon: DollarSign, label: 'আয়' },
];

// Guardian menu
const guardianMenu = [
  { id: 'overview', icon: LayoutDashboard, label: 'ওভারভিউ' },
  { id: 'post-tuition', icon: Plus, label: 'পোস্ট করুন' },
  { id: 'my-posts', icon: FileText, label: 'আমার পোস্ট' },
  { id: 'find-teachers', icon: Search, label: 'শিক্ষক খুঁজুন' },
];

// Admin menu (20+ items)
const adminMenu = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'ড্যাশবোর্ড' },
  { id: 'users', icon: Users, label: 'ইউজার' },
  { id: 'analytics', icon: BarChart3, label: 'এনালিটিক্স' },
  // ... 17 more items
];
```

---

### 4. **MobileNav** (`/components/MobileNav.tsx`)

**উদ্দেশ্য**: Mobile bottom navigation

**Features**:
```typescript
- Fixed bottom bar
- 4-5 main items
- Active state indicator
- Icon + label
- Responsive to role
```

---

## 🎨 ফিচার কম্পোনেন্ট

### 1. **UnifiedAuthDialog** (`/components/UnifiedAuthDialog.tsx`)

**উদ্দেশ্য**: Login/Registration modal

**Props**:
```typescript
interface UnifiedAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: 'login' | 'register';
  onSuccess?: (user: User) => void;
  language: 'bn' | 'en';
}
```

**Features**:
```typescript
- Tab switching (Login ↔ Register)
- Role selection (Teacher, Guardian, Student, Donor)
- Email/Phone input
- Password input
- Remember me
- Forgot password link
- Social login buttons (optional)
- Form validation
- Error handling
- Success callback
```

**State**:
```typescript
const [mode, setMode] = useState<'login' | 'register'>('login');
const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
const [formData, setFormData] = useState({
  email: '',
  phone: '',
  password: '',
  fullName: ''
});
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
```

**Form Submission**:
```typescript
const handleSubmit = async () => {
  setLoading(true);
  
  try {
    if (mode === 'login') {
      const result = await login(formData, selectedRole);
      if (result.success) {
        onSuccess?.(result.user);
        onOpenChange(false);
      }
    } else {
      const result = await register({
        ...formData,
        role: selectedRole
      });
      if (result.success) {
        onSuccess?.(result.user);
        onOpenChange(false);
      }
    }
  } catch (error) {
    setErrors({ general: error.message });
  } finally {
    setLoading(false);
  }
};
```

---

### 2. **CreditBalance** (`/components/CreditBalance.tsx`)

**উদ্দেশ্য**: Credit balance display widget

**Props**:
```typescript
interface CreditBalanceProps {
  userId: string;
  showDetails?: boolean;
  onPurchaseClick?: () => void;
  language: 'bn' | 'en';
}
```

**Display**:
```typescript
<div className="credit-widget">
  <div className="balance">
    <Coins className="icon" />
    <span className="amount">{balance}</span>
    <span className="label">ক্রেডিট</span>
  </div>
  
  {showDetails && (
    <div className="details">
      <p>মোট আয়: {totalEarned}</p>
      <p>মোট খরচ: {totalSpent}</p>
    </div>
  )}
  
  <Button onClick={onPurchaseClick}>
    ক্রেডিট কিনুন
  </Button>
</div>
```

---

### 3. **AIMatchmaker** (`/components/AIMatchmaker.tsx`)

**উদ্দেশ্য**: AI-powered teacher matching

**Props**:
```typescript
interface AIMatchmakerProps {
  requirements: {
    subject: string;
    class: string;
    location: string;
    budget?: number;
    experience?: string;
  };
  onMatch: (teachers: Teacher[]) => void;
  language: 'bn' | 'en';
}
```

**Matching Algorithm**:
```typescript
function matchTeachers(requirements: Requirements): Teacher[] {
  let teachers = getAllTeachers();
  let scores = [];
  
  teachers.forEach(teacher => {
    let score = 0;
    
    // Subject matching (40%)
    if (teacher.subjects.includes(requirements.subject)) {
      score += 40;
    }
    
    // Location matching (30%)
    const distance = calculateDistance(
      teacher.location, 
      requirements.location
    );
    if (distance < 5) score += 30;
    else if (distance < 10) score += 20;
    
    // Experience matching (20%)
    if (teacher.experience >= requirements.experience) {
      score += 20;
    }
    
    // Rating (10%)
    score += (teacher.rating / 5) * 10;
    
    scores.push({ teacher, score });
  });
  
  // Sort by score
  scores.sort((a, b) => b.score - a.score);
  
  // Return top 10
  return scores.slice(0, 10).map(s => s.teacher);
}
```

---

### 4. **PostTuitionDialog** (`/components/PostTuitionDialog.tsx`)

**উদ্দেশ্য**: Create new tuition post

**Form Fields**:
```typescript
interface TuitionFormData {
  title: string;              // শিরোনাম
  subject: string;            // বিষয়
  class: string;              // শ্রেণি
  medium: string;             // মাধ্যম
  location: {
    division: string;
    district: string;
    area: string;
  };
  salary: number;             // বেতন
  schedule: string;           // সময়সূচি
  requirements: string;       // প্রয়োজনীয়তা
  duration: string;           // মেয়াদ
  urgency: 'low' | 'medium' | 'high';
}
```

**Submission Flow**:
```typescript
const handleSubmit = async () => {
  // 1. Validate form
  if (!validateForm()) return;
  
  // 2. Check credits (10 credits required)
  if (!canAfford(currentUser.id, 10)) {
    toast.error('যথেষ্ট ক্রেডিট নেই!');
    return;
  }
  
  // 3. Deduct credits
  await deductCredits(currentUser.id, 10, 'টিউশন পোস্ট করা');
  
  // 4. Create post
  const post = await createTuitionPost(currentUser.id, formData);
  
  // 5. Success feedback
  toast.success('টিউশন পোস্ট সফল!');
  onSuccess?.(post);
};
```

---

### 5. **ApplyTuitionDialog** (`/components/ApplyTuitionDialog.tsx`)

**উদ্দেশ্য**: Teacher applies to tuition

**Form**:
```typescript
interface ApplicationData {
  postId: string;
  teacherId: string;
  proposal: string;          // প্রস্তাব (500+ chars)
  expectedSalary: number;    // প্রত্যাশিত বেতন
  availability: string[];    // সপ্তাহের দিন
  startDate: Date;           // শুরুর তারিখ
}
```

**Cost**: 10 credits

---

### 6. **ZakatCalculator** (`/components/ZakatCalculator.tsx`)

**উদ্দেশ্য**: Calculate zakat amount

**Form Fields**:
```typescript
interface ZakatAssets {
  cash: number;              // হাতে নগদ
  bankBalance: number;       // ব্যাংক
  gold: number;              // সোনা (grams)
  silver: number;            // রূপা (grams)
  property: number;          // সম্পত্তি
  business: number;          // ব্যবসা
  investments: number;       // বিনিয়োগ
  debts: number;             // ঋণ
}
```

**Calculation Display**:
```typescript
<div className="calculation-result">
  <div className="row">
    <span>মোট সম্পদ:</span>
    <span>{formatCurrency(totalAssets)}</span>
  </div>
  <div className="row">
    <span>ঋণ (বিয়োগ):</span>
    <span>-{formatCurrency(debts)}</span>
  </div>
  <div className="row total">
    <span>যাকাতযোগ্য সম্পদ:</span>
    <span>{formatCurrency(zakatableAmount)}</span>
  </div>
  <div className="row zakat">
    <span>যাকাত (২.৫%):</span>
    <span className="highlight">
      {formatCurrency(zakatAmount)}
    </span>
  </div>
</div>
```

---

### 7. **ChatDialog** (`/components/ChatDialog.tsx`)

**উদ্দেশ্য**: One-on-one messaging

**Props**:
```typescript
interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  otherUser: User;
  currentUser: User;
  language: 'bn' | 'en';
}
```

**Features**:
```typescript
- Real-time messages (mock)
- Message history
- File attachments
- Emoji support
- Read receipts
- Typing indicators
- Message search
```

**State**:
```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [inputMessage, setInputMessage] = useState('');
const [isTyping, setIsTyping] = useState(false);
const messagesEndRef = useRef<HTMLDivElement>(null);
```

**Send Message**:
```typescript
const sendMessage = async () => {
  if (!inputMessage.trim()) return;
  
  const newMessage: Message = {
    id: generateId('msg'),
    senderId: currentUser.id,
    receiverId: otherUser.id,
    content: inputMessage,
    timestamp: new Date(),
    read: false
  };
  
  setMessages([...messages, newMessage]);
  setInputMessage('');
  
  // Scroll to bottom
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  // Mock: Save to localStorage or send to API
  await saveMessage(newMessage);
};
```

---

### 8. **PaymentGatewayDialog** (`/components/PaymentGatewayDialog.tsx`)

**উদ্দেশ্য**: Payment processing

**Payment Methods**:
```typescript
type PaymentMethod = 
  | 'bkash'
  | 'nagad'
  | 'rocket'
  | 'card'
  | 'bank';
```

**Flow**:
```typescript
1. Select payment method
2. Enter amount
3. Enter payment details
4. Confirm payment
5. Process (mock)
6. Show success/receipt
```

---

## 🎨 UI কম্পোনেন্ট (Shadcn)

**Location**: `/components/ui/*.tsx`

### Component List (42):

```typescript
1. accordion.tsx          // Expandable sections
2. alert-dialog.tsx       // Confirmation dialogs
3. alert.tsx              // Alert messages
4. aspect-ratio.tsx       // Image containers
5. avatar.tsx             // User avatars
6. badge.tsx              // Status badges
7. breadcrumb.tsx         // Navigation breadcrumbs
8. button.tsx             // Buttons (primary, secondary, etc.)
9. calendar.tsx           // Date picker
10. card.tsx              // Card containers
11. carousel.tsx          // Image/content carousels
12. chart.tsx             // Chart wrapper
13. checkbox.tsx          // Checkboxes
14. collapsible.tsx       // Collapsible sections
15. command.tsx           // Command palette
16. context-menu.tsx      // Right-click menu
17. dialog.tsx            // Modal dialogs
18. drawer.tsx            // Side drawer
19. dropdown-menu.tsx     // Dropdown menus
20. form.tsx              // Form wrapper
21. gradient-button.tsx   // Custom gradient button
22. hover-card.tsx        // Hover tooltips
23. input-otp.tsx         // OTP input
24. input.tsx             // Text inputs
25. label.tsx             // Form labels
26. menubar.tsx           // Menu bar
27. navigation-menu.tsx   // Navigation menu
28. pagination.tsx        // Pagination
29. popover.tsx           // Popover tooltips
30. profile-avatar.tsx    // Custom profile avatar
31. progress.tsx          // Progress bars
32. radio-group.tsx       // Radio buttons
33. resizable.tsx         // Resizable panels
34. scroll-area.tsx       // Scrollable areas
35. select.tsx            // Select dropdowns
36. separator.tsx         // Horizontal/vertical lines
37. sheet.tsx             // Side sheet
38. sidebar.tsx           // Sidebar component
39. skeleton.tsx          // Loading skeletons
40. slider.tsx            // Range sliders
41. sonner.tsx            // Toast notifications
42. switch.tsx            // Toggle switches
43. table.tsx             // Data tables
44. tabs.tsx              // Tabbed interface
45. textarea.tsx          // Multi-line text input
46. toggle-group.tsx      // Toggle button group
47. toggle.tsx            // Toggle button
48. tooltip.tsx           // Tooltips
```

### Example Usage:

#### Button Component
```typescript
import { Button } from './components/ui/button';

<Button variant="default">ক্লিক করুন</Button>
<Button variant="outline">আউটলাইন</Button>
<Button variant="ghost">ঘোস্ট</Button>
<Button variant="destructive">মুছে ফেলুন</Button>
<Button size="sm">ছোট</Button>
<Button size="lg">বড়</Button>
```

#### Dialog Component
```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>শিরোনাম</DialogTitle>
      <DialogDescription>বিবরণ</DialogDescription>
    </DialogHeader>
    
    {/* Content */}
    
    <DialogFooter>
      <Button onClick={handleSave}>সংরক্ষণ</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 🔄 স্টেট ম্যানেজমেন্ট

### App-Level State (`/App.tsx`)

```typescript
interface AppState {
  // Navigation
  currentPage: string;
  pageParams: Record<string, any>;
  
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  userRole: UserRole | null;
  
  // UI
  language: Language;
  announcement: Announcement | null;
  
  // System
  maintenanceMode: boolean;
}
```

### useState Examples:

```typescript
// Page state
const [currentPage, setCurrentPage] = useState<string>('home');

// Auth state
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState<User | null>(null);

// Language state
const [language, setLanguage] = useState<Language>('en');

// Dialog state
const [dialogOpen, setDialogOpen] = useState(false);

// Form state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});

// Loading state
const [loading, setLoading] = useState(false);

// Error state
const [error, setError] = useState<string | null>(null);
```

### useEffect Examples:

```typescript
// Load user on mount
useEffect(() => {
  const user = getCurrentUser();
  if (user) {
    setCurrentUser(user);
    setIsAuthenticated(true);
  }
}, []);

// Auto-save form
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(formData));
  }, 1000);
  
  return () => clearTimeout(timer);
}, [formData]);

// Scroll to top on page change
useEffect(() => {
  window.scrollTo(0, 0);
}, [currentPage]);
```

---

## 🏛️ কম্পোনেন্ট হায়ারার্কি

### HomePage Hierarchy:

```
HomePage
├── Header
│   ├── TalentTutorLogo
│   ├── Navigation Menu
│   ├── LanguageSwitcher
│   ├── CreditBalance (if auth)
│   └── UserMenu (if auth)
│
├── HeroSection
│   ├── Heading
│   ├── Subtitle
│   ├── CTA Buttons
│   └── Background Animation
│
├── LatestTuitionPosts
│   └── TuitionCard (multiple)
│       ├── Badge (subject/class)
│       ├── Title
│       ├── Location
│       ├── Salary
│       └── Apply Button
│
├── BenefitsSection
│   └── BenefitCard (multiple)
│
├── HowItWorksSection
│   └── StepCard (multiple)
│
├── TestimonialsSection
│   └── TestimonialCard (multiple)
│
└── Footer
    ├── About
    ├── Links
    ├── Contact
    └── Copyright
```

### Dashboard Hierarchy:

```
TeacherDashboard
├── Header (compact)
├── DashboardSidebar
│   ├── Profile Section
│   ├── Navigation Menu
│   └── Logout Button
│
├── Main Content Area
│   ├── Section Header
│   │   ├── Title
│   │   ├── Breadcrumb
│   │   └── Actions
│   │
│   └── Dynamic Section (based on activeSection)
│       ├── OverviewSection
│       │   ├── StatsCards
│       │   ├── RecentActivity
│       │   └── QuickActions
│       │
│       ├── BrowseJobsSection
│       │   ├── Filters
│       │   └── JobsList
│       │       └── JobCard (multiple)
│       │
│       ├── AppliedJobsSection
│       │   └── ApplicationCard (multiple)
│       │
│       └── ...other sections
│
└── MobileNav (mobile only)
```

---

## 🎯 Best Practices

### Component Organization:

```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. State
  const [value, setValue] = useState('');
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 7. Render helpers
  const renderContent = () => {
    // ...
  };
  
  // 8. JSX
  return (
    <div>
      {/* Content */}
    </div>
  );
}
```

### Props Naming:

```typescript
// Event handlers: on[Action]
onLogin
onClick
onChange
onSubmit

// State setters: set[State]
setPage
setLanguage
setUser

// Boolean props: is/has/should
isAuthenticated
hasPermission
shouldShow

// Data props: noun
user
language
posts
```

---

## 📚 সারাংশ

এই ডকুমেন্টে Talent Tutor এর **সম্পূর্ণ Component Architecture** বিস্তারিতভাবে ব্যাখ্যা করা হয়েছে:

✅ **30+ Pages** - হোম থেকে ড্যাশবোর্ড পর্যন্ত
✅ **100+ Components** - Features + UI
✅ **42 UI Components** - Shadcn library
✅ **Props & State** - সব component এর structure
✅ **Hierarchy** - Component relationships
✅ **Best Practices** - Code organization

প্রতিটি কম্পোনেন্টের জন্য দেওয়া হয়েছে:
- উদ্দেশ্য ও ফিচার
- Props interface
- State management
- Key functions
- Usage examples

---

**শেষ আপডেট**: November 28, 2025
**ভার্সন**: 1.0.0
