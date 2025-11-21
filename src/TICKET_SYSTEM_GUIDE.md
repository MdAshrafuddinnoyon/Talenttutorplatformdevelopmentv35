# 🎫 টিকেট সিস্টেম গাইড | Ticket System Guide

## 📋 সূচিপত্র | Table of Contents

1. [Overview (সংক্ষিপ্ত বিবরণ)](#overview)
2. [Features (ফিচারসমূহ)](#features)
3. [Components (কম্পোনেন্টসমূহ)](#components)
4. [API Endpoints](#api-endpoints)
5. [Usage Guide (ব্যবহারের নির্দেশিকা)](#usage-guide)
6. [Multi-Language Support](#multi-language-support)
7. [Testing (পরীক্ষা)](#testing)

---

## Overview

Talent Tutor প্ল্যাটফর্মে একটি সম্পূর্ণ টিকেট সিস্টেম রয়েছে যা সব ধরনের ইউজার (শিক্ষক, অভিভাবক, ছাত্র, দাতা) এবং এডমিন ব্যবহার করতে পারেন। এটি বাংলা ও ইংরেজি উভয় ভাষায় সম্পূর্ণ সাপোর্ট প্রদান করে।

The Talent Tutor platform has a comprehensive ticket system that all user types (teachers, guardians, students, donors) and admins can use. It provides full support in both Bengali and English languages.

---

## Features

### ✨ মূল ফিচারসমূহ | Key Features

#### 🌐 সব ইউজারের জন্য | For All Users:
- ✅ নতুন সাপোর্ট টিকেট তৈরি করুন
- ✅ টিকেটের ক্যাটাগরি নির্বাচন করুন (টেকনিক্যাল, একাউন্ট, পেমেন্ট, ইত্যাদি)
- ✅ অগ্রাধিকার সেট করুন (নিম্ন, মাধ্যম, উচ্চ, জরুরী)
- ✅ নিজের টিকেট দেখুন এবং ট্র্যাক করুন
- ✅ টিকেটে রিপ্লাই করুন
- ✅ রিয়েল-টাইম আপডেট পান
- ✅ ফিল্টার এবং সার্চ করুন

#### 👑 এডমিনের জন্য | For Admins:
- ✅ সব টিকেট দেখুন এবং পরিচালনা করুন
- ✅ টিকেটের স্ট্যাটাস পরিবর্তন করুন (Open → In Progress → Resolved → Closed)
- ✅ ইউজার রোল অনুযায়ী ফিল্টার করুন
- ✅ ক্যাটাগরি অনুযায়ী ফিল্টার করুন
- ✅ স্ট্যাটাস অনুযায়ী ফিল্টার করুন
- ✅ টিকেট স্ট্যাটিস্টিক্স দেখুন

### 🌍 Multi-Language Support

- **বাংলা (Bengali)**: সম্পূর্ণ বাংলা ইন্টারফেস এবং কন্টেন্ট
- **English**: Complete English interface and content
- সব টেক্সট, বোতাম, মেসেজ, এরর দুই ভাষায় অনুবাদিত

### 📊 টিকেট ক্যাটাগরি | Ticket Categories

1. **Technical Issue (টেকনিক্যাল সমস্যা)** - সিস্টেম বা টেকনিক্যাল সমস্যা
2. **Account Issue (অ্যাকাউন্ট সমস্যা)** - লগইন, রেজিস্ট্রেশন সমস্যা
3. **Payment Issue (পেমেন্ট সমস্যা)** - পেমেন্ট সংক্রান্ত সমস্যা
4. **Credit Issue (ক্রেডিট সমস্যা)** - ক্রেডিট বা পয়েন্ট সমস্যা
5. **Tuition Related (টিউশন সংক্রান্ত)** - টিউশন পোস্ট, আবেদন সংক্রান্ত
6. **Donation Related (দান সংক্রান্ত)** - দান এবং যাকাত সংক্রান্ত
7. **Contract Related (চুক্তি সংক্রান্ত)** - শিক্ষক চুক্তি সংক্রান্ত
8. **General Question (সাধারণ প্রশ্ন)** - সাধারণ জিজ্ঞাসা
9. **Feature Request (নতুন ফিচার অনুরোধ)** - নতুন ফিচারের জন্য অনুরোধ
10. **Bug Report (বাগ রিপোর্ট)** - বাগ বা সমস্যা রিপোর্ট
11. **Other (অন্যান্য)** - অন্যান্য বিষয়

### 🎯 Priority Levels (অগ্রাধিকার স্তর)

- **Low (নিম্ন)** - সাধারণ প্রশ্ন, দেরিতে সমাধান করা যায়
- **Medium (মাধ্যম)** - স্বাভাবিক সমস্যা
- **High (উচ্চ)** - গুরুত্বপূর্ণ সমস্যা, দ্রুত সমাধান প্রয়োজন
- **Urgent (জরুরী)** - জরুরী সমস্যা, তাৎক্ষণিক সমাধান প্রয়োজন

### 📈 Ticket Status (টিকেট স্ট্যাটাস)

1. **Open (খোলা)** - নতুন টিকেট তৈরি হয়েছে
2. **In Progress (প্রগতিশীল)** - টিকেটের কাজ চলছে
3. **Resolved (সমাধান)** - সমস্যা সমাধান হয়েছে
4. **Closed (বন্ধ)** - টিকেট সম্পূর্ণভাবে বন্ধ করা হয়েছে

---

## Components

### 1. UniversalTicketSystem.tsx
**পাথ**: `/components/UniversalTicketSystem.tsx`

**বৈশিষ্ট্য**:
- সব ইউজার টাইপের জন্য comprehensive টিকেট সিস্টেম
- Multi-language support (বাংলা ও ইংরেজি)
- Tabs: My Tickets & Create Ticket
- Search এবং Filter functionality
- Real-time statistics
- Responsive design

**Props**:
```typescript
interface UniversalTicketSystemProps {
  open: boolean;                    // Dialog open/close state
  onOpenChange: (open: boolean) => void;  // Dialog state handler
  language: 'bn' | 'en';            // Language preference
  userId: string;                   // Current user ID
  userName: string;                 // Current user name
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
  embedded?: boolean;               // Embedded mode (without dialog)
}
```

**Usage Example**:
```tsx
import { UniversalTicketSystem } from './components/UniversalTicketSystem';

// In your component
const [showTickets, setShowTickets] = useState(false);

<UniversalTicketSystem
  open={showTickets}
  onOpenChange={setShowTickets}
  language="bn"
  userId={currentUser.id}
  userName={currentUser.name}
  userRole={currentUser.role}
/>
```

### 2. AdminTicketManager.tsx
**পাথ**: `/components/AdminTicketManager.tsx`

**বৈশিষ্ট্য**:
- Admin-এর জন্য specialized টিকেট ম্যানেজমেন্ট
- সব ইউজারের টিকেট দেখুন
- Status update করুন
- User role এবং status দ্বারা filter করুন
- Detailed conversation view

**Props**:
```typescript
interface AdminTicketManagerProps {
  language: 'bn' | 'en';
}
```

**Usage Example**:
```tsx
import { AdminTicketManager } from './components/AdminTicketManager';

<AdminTicketManager language="bn" />
```

### 3. TicketSystem.tsx (Legacy - Compatibility)
**পাথ**: `/components/TicketSystem.tsx`

পুরাতন component যা backward compatibility-এর জন্য রাখা হয়েছে। নতুন implementation-এ `UniversalTicketSystem` ব্যবহার করুন।

---

## API Endpoints

### 🔐 Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-5b21d3ea
```

### 📡 Endpoints

#### 1. Create Ticket (টিকেট তৈরি)
```http
POST /ticket/create
Content-Type: application/json
Authorization: Bearer {publicAnonKey}

{
  "userId": "user-123",
  "userName": "John Doe",
  "userRole": "teacher",
  "category": "technical",
  "priority": "high",
  "subject": "Login problem",
  "description": "Unable to login to my account"
}

Response:
{
  "success": true,
  "ticket": {
    "id": "ticket-...",
    "ticketNumber": "TKT12345678",
    "userId": "user-123",
    "userName": "John Doe",
    "userRole": "teacher",
    "category": "technical",
    "priority": "high",
    "subject": "Login problem",
    "description": "Unable to login to my account",
    "status": "open",
    "responses": [],
    "createdAt": "2024-11-03T10:00:00.000Z",
    "updatedAt": "2024-11-03T10:00:00.000Z"
  }
}
```

#### 2. Get User Tickets (ইউজারের টিকেট)
```http
GET /tickets/user/{userId}
Authorization: Bearer {publicAnonKey}

Response:
{
  "success": true,
  "tickets": [...]
}
```

#### 3. Get All Tickets (সব টিকেট - Admin Only)
```http
GET /tickets?status=open&userRole=teacher
Authorization: Bearer {publicAnonKey}

Query Parameters:
- status: open | inProgress | resolved | closed (optional)
- userRole: teacher | guardian | student | donor (optional)

Response:
{
  "success": true,
  "tickets": [...]
}
```

#### 4. Add Reply (রিপ্লাই যুক্ত করুন)
```http
POST /ticket/{ticketId}/reply
Content-Type: application/json
Authorization: Bearer {publicAnonKey}

{
  "userId": "user-123",
  "userName": "John Doe",
  "userRole": "teacher",
  "message": "Thank you for your help!"
}

Response:
{
  "success": true,
  "ticket": {
    ...ticket with updated responses
  }
}
```

#### 5. Update Ticket Status (স্ট্যাটাস আপডেট - Admin Only)
```http
PUT /tickets/{ticketId}
Content-Type: application/json
Authorization: Bearer {publicAnonKey}

{
  "status": "resolved"
}

Response:
{
  "success": true,
  "ticket": {...}
}
```

---

## Usage Guide

### 🎓 শিক্ষকদের জন্য | For Teachers

#### নতুন টিকেট তৈরি করুন:
1. Dashboard-এ যান
2. "Support Ticket" বা "সাপোর্ট টিকেট" বাটনে ক্লিক করুন
3. "Create Ticket" ট্যাব সিলেক্ট করুন
4. ক্যাটাগরি এবং অগ্রাধিকার নির্বাচন করুন
5. বিষয় এবং বিস্তারিত লিখুন
6. "Submit Ticket" বা "টিকেট জমা দিন" ক্লিক করুন

#### আপনার টিকেট দেখুন:
1. "My Tickets" ট্যাব সিলেক্ট করুন
2. Status এবং Category দ্বারা filter করুন
3. টিকেটে ক্লিক করে details দেখুন
4. প্রয়োজনে reply করুন

### 👨‍👩‍👧 অভিভাবকদের জন্য | For Guardians

একই প্রক্রিয়া শিক্ষকদের মতো। Guardian Dashboard থেকে টিকেট সিস্টেম access করুন।

### 🎒 ছাত্রদের জন্য | For Students

Student Dashboard থেকে টিকেট তৈরি এবং পরিচালনা করুন। যদি আপনার কোনো সমস্যা থাকে, টিকেট তৈরি করুন এবং admin সাহায্য করবে।

### 🤝 দাতাদের জন্য | For Donors

Donor Dashboard থেকে দান সংক্রান্ত যেকোনো প্রশ্ন বা সমস্যার জন্য টিকেট তৈরি করুন।

### 👑 এডমিনদের জন্য | For Admins

#### সব টিকেট পরিচালনা:
1. Admin Dashboard → Support Tickets section যান
2. সব ইউজারের টিকেট দেখুন
3. Status, User Role, Category দ্বারা filter করুন
4. টিকেটে ক্লিক করে details দেখুন
5. Reply করুন
6. Status update করুন (Open → In Progress → Resolved → Closed)

#### Best Practices:
- জরুরী টিকেট প্রথমে সমাধান করুন
- প্রতিটি reply-তে সহায়ক তথ্য দিন
- সমস্যা সমাধান হলে status "Resolved" করুন
- ইউজার confirmation পেলে "Closed" করুন

---

## Multi-Language Support

### ভাষা পরিবর্তন | Language Switching

প্রতিটি component language prop গ্রহণ করে:

```tsx
// বাংলা
<UniversalTicketSystem language="bn" {...otherProps} />

// English
<UniversalTicketSystem language="en" {...otherProps} />
```

### Translation Structure

সব translation `translations` object-এ সংরক্ষিত:

```typescript
const translations = {
  bn: {
    title: 'সাপোর্ট টিকেট সিস্টেম',
    // ... more Bengali translations
  },
  en: {
    title: 'Support Ticket System',
    // ... more English translations
  }
};
```

### Adding New Translations

নতুন text যুক্ত করতে:

1. `translations` object-এ নতুন key যুক্ত করুন
2. উভয় ভাষায় (bn এবং en) translation দিন
3. Component-এ `t.yourNewKey` ব্যবহার করুন

Example:
```typescript
const translations = {
  bn: {
    // ... existing translations
    newFeature: 'নতুন ফিচার',
  },
  en: {
    // ... existing translations
    newFeature: 'New Feature',
  }
};

// Usage
<Button>{t.newFeature}</Button>
```

---

## Testing

### 🧪 Manual Testing

#### Test User Credentials

**Teacher Account:**
```
Email: teacher@test.com
Password: teacher123
```

**Guardian Account:**
```
Email: guardian@test.com
Password: guardian123
```

**Student Account:**
```
Email: student@test.com
Password: student123
```

**Donor Account:**
```
Email: donor@test.com
Password: donor123
```

**Admin Account:**
```
Email: admin@talent.com
Password: admin123
```

### 📝 Test Scenarios

#### Scenario 1: Create a Ticket (Teacher)
1. Login as teacher
2. Navigate to Dashboard
3. Click "Support Ticket"
4. Create ticket with:
   - Category: Technical Issue
   - Priority: High
   - Subject: "Cannot access profile"
   - Description: "Getting error when trying to edit my profile"
5. Verify ticket is created with ticket number
6. Check ticket appears in "My Tickets"

#### Scenario 2: Admin Response
1. Login as admin
2. Go to Admin Dashboard → Support Tickets
3. Find the teacher's ticket
4. Update status to "In Progress"
5. Add reply: "We are looking into this issue"
6. Verify reply appears in ticket

#### Scenario 3: User Reply
1. Login as teacher
2. Open "My Tickets"
3. Click on the ticket
4. See admin's reply
5. Add your reply: "Thank you!"
6. Verify conversation thread

#### Scenario 4: Resolve Ticket
1. Login as admin
2. Find the ticket
3. Add final reply: "Issue has been fixed"
4. Update status to "Resolved"
5. Verify status change

#### Scenario 5: Multi-Language
1. Test in Bengali (language="bn")
2. Verify all text is in Bengali
3. Switch to English (language="en")
4. Verify all text is in English
5. Create tickets in both languages

### 🔍 Testing Checklist

- [ ] Ticket creation works for all user types
- [ ] Tickets appear in user's "My Tickets"
- [ ] Admin can see all tickets
- [ ] Reply functionality works
- [ ] Status updates work (admin only)
- [ ] Filters work (status, category, user role)
- [ ] Search functionality works
- [ ] Multi-language support works
- [ ] Ticket numbers are unique
- [ ] Timestamps are correct
- [ ] Responsive design works on mobile
- [ ] Loading states display correctly
- [ ] Error messages display correctly
- [ ] Toast notifications work

---

## 🎨 UI/UX Features

### Design Elements

1. **Color Coding**:
   - Open tickets: Green
   - In Progress: Blue
   - Resolved: Purple
   - Closed: Gray
   - Low priority: Gray
   - Medium priority: Blue
   - High priority: Orange
   - Urgent priority: Red

2. **Icons**:
   - Each status has unique icon
   - Visual feedback for user actions
   - Intuitive navigation

3. **Responsive Layout**:
   - Mobile-friendly design
   - Tablet optimization
   - Desktop full features

4. **Real-time Updates**:
   - Auto-refresh on reply
   - Status change notifications
   - Toast messages for success/error

---

## 🚀 Advanced Features

### Future Enhancements

1. **File Attachments**:
   - Upload screenshots
   - Attach documents
   - Image preview

2. **Email Notifications**:
   - Email when ticket created
   - Email when admin replies
   - Email when status changes

3. **Ticket Assignment**:
   - Assign to specific admin
   - Department-based routing
   - Auto-assignment based on category

4. **SLA Tracking**:
   - Response time tracking
   - Resolution time tracking
   - Priority-based SLA

5. **Analytics**:
   - Ticket trends
   - Category statistics
   - Response time reports
   - User satisfaction ratings

6. **Chat Integration**:
   - Real-time chat option
   - Video call for urgent issues
   - Screen sharing support

---

## 📚 Additional Resources

### Related Documentation
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [USER_GUIDE.md](./USER_GUIDE.md) - General user guide
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Developer documentation

### Support
যদি আপনার কোনো সমস্যা হয় বা প্রশ্ন থাকে, টিকেট তৈরি করুন অথবা admin@talenttutor.com-এ email করুন।

If you encounter any issues or have questions, create a ticket or email admin@talenttutor.com.

---

## 📄 License

© 2024 Talent Tutor. All rights reserved.
