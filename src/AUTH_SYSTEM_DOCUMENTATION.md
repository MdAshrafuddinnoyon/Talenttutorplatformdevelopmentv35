# Authentication & Authorization System Documentation

## সমস্যা (Problem Identified)

আপনি যে সমস্যাটি report করেছেন:
- দাতা ড্যাশবোর্ডে নোটিফিকেশন বেল → "সব দেখুন" → notification এ ক্লিক করলে একটি **অপ্রয়োজনীয় লগইন dialog** আসছিল
- এই login dialog টি notification click করার সময় থাকার কথা নয়

## সমাধান (Solution Implemented)

### 1. **Authentication Guard Utility তৈরি করা হয়েছে** (`/utils/authGuard.ts`)

এই utility file এ রয়েছে:

#### **Public Pages** (লগইন ছাড়া access করা যাবে):
- `home`, `about`, `find-teachers`, `for-teachers`, `for-guardians`, `how-it-works`
- `blog`, `blog-detail`, `donation`, `donation-library`, `library`
- `subscription`, `contact`, `faq`, `help`, `privacy-policy`, `terms`
- `browse-tuitions`, `tuition-posts`
- **Profile View Pages**: `teacher-profile-view`, `guardian-profile-view` (যে কেউ profile দেখতে পারবে)

#### **Protected Pages** (লগইন প্রয়োজন):
- `teacher-dashboard`, `guardian-dashboard`, `student-dashboard`, `admin-dashboard`, `donor-dashboard`
- `teacher-profile`, `guardian-profile`, `student-profile`, `admin-profile`, `donor-profile`
- `notifications`, `messages`, `settings`, `credit-purchase`
- `blog-management`, `admin-user-management`, `admin-testing`

### 2. **Role-Based Access Control (RBAC)**

প্রতিটি user role এর জন্য specific pages access করতে পারবে:

```typescript
// Teacher
- teacher-dashboard, teacher-profile, notifications, messages, settings, credit-purchase

// Guardian  
- guardian-dashboard, guardian-profile, notifications, messages, settings, credit-purchase

// Student
- student-dashboard, student-profile, notifications, settings

// Admin
- admin-dashboard, admin-profile, admin-user-management, admin-testing
- blog-management, notifications, messages, settings

// Donor
- donor-dashboard, donor-profile, notifications, settings
```

### 3. **Action Permissions System**

বিভিন্ন actions এর জন্য permissions define করা হয়েছে:

#### **Profile দেখা** (View Profile):
- ✅ **কোনো authentication লাগবে না**
- যে কেউ শিক্ষক/অভিভাবকের profile দেখতে পারবে

#### **যোগাযোগ করা** (Contact):
- ❌ **Authentication প্রয়োজন**
- ❌ **Profile সম্পূর্ণ থাকতে হবে**
- ❌ **ক্রেডিট থাকতে হবে** (5 credits)

**শিক্ষক → অভিভাবক যোগাযোগ:**
```typescript
{
  requiresAuth: true,
  requiresProfileCompletion: true,
  requiresCredits: 5
}
```

**অভিভাবক → শিক্ষক যোগাযোগ:**
```typescript
{
  requiresAuth: true,
  requiresProfileCompletion: true,
  requiresCredits: 5
}
```

#### **ছাত্র (Student) Restrictions:**
- ✅ শিক্ষক profile **দেখতে পারবে**
- ❌ শিক্ষকের সাথে **যোগাযোগ করতে পারবে না**
- ❌ অভিভাবকের সাথে **যোগাযোগ করতে পারবে না**

#### **দাতা/যাকাত প্রদানকারী (Donor) Restrictions:**
- ✅ Profile **দেখতে পারবে**
- ❌ শিক্ষক/অভিভাবক/ছাত্রদের সাথে **যোগাযোগ করতে পারবে না**
- ✅ দান করতে পারবে (authentication প্রয়োজন)

#### **শিক্ষা উপকরণ প্রদানকারী (Education Material Donor):**
- ✅ Profile **দেখতে পারবে**
- ❌ যোগাযোগ করতে পারবে না
- ✅ বই/শিক্ষা উপকরণ দান করতে পারবে

### 4. **Navigation Guard Implementation**

`App.tsx` তে একটি `navigateToPage()` function যোগ করা হয়েছে:

```typescript
const navigateToPage = (page: Page) => {
  // Check if page is protected
  if (isProtectedPage(page)) {
    // If user is not authenticated
    if (!isAuthenticated || !userType) {
      toast.error('এই পেজ দেখতে আপনাকে লগইন করতে হবে');
      return;
    }
    
    // Check if user role can access this specific page
    if (!canAccessPage(page, userType)) {
      toast.error('আপনার এই পেজে প্রবেশের অনুমতি নেই');
      return;
    }
  }
  
  // Navigation allowed
  setCurrentPage(page);
};
```

### 5. **NotificationCenter & NotificationsPage Fix**

Notification click handling এ unnecessary login dialog trigger remove করা হয়েছে।

**আগে (Before):**
```typescript
// Direct navigation যা protected pages এ login dialog trigger করত
setPage(notification.link);
```

**এখন (After):**
```typescript
// Simply navigate - authentication guard handles access control
// No unnecessary login dialog
setPage(notification.link);
```

## Error Messages (ব্যবহারকারী-বান্ধব বার্তা)

System এখন proper Bengali/English error messages দেখাবে:

| Reason | Bengali | English |
|--------|---------|---------|
| `auth_required` | এই কাজটি করতে আপনাকে লগইন করতে হবে | You need to login to perform this action |
| `profile_incomplete` | প্রথমে আপনার প্রোফাইল সম্পূর্ণ করুন | Please complete your profile first |
| `insufficient_credits` | আপনার পর্যাপ্ত ক্রেডিট নেই | You do not have sufficient credits |
| `verification_required` | প্রথমে আপনার অ্যাকাউন্ট যাচাই করুন | Please verify your account first |
| `role_restricted` | আপনার এই কাজটি করার অনুমতি নেই | You do not have permission |

## Helper Functions

### `canContactUser()`
Check করে একজন user অন্য user কে contact করতে পারবে কিনা:

```typescript
const result = canContactUser(
  currentUserRole,  // 'teacher' | 'guardian' | 'student' | 'donor' | 'admin'
  targetUserRole,   // যাকে contact করতে চাচ্ছে
  currentUser       // User object with profile and credit info
);

if (!result.allowed) {
  toast.error(getActionErrorMessage(result.reason, language));
}
```

### `canPerformAction()`
যে কোনো action এর জন্য permission check করে:

```typescript
const result = canPerformAction('contact_teacher', currentUser);

if (!result.allowed) {
  toast.error(getActionErrorMessage(result.reason, language));
}
```

## উদাহরণ Implementation

### Example 1: Teacher Profile Page এ Contact Button

```typescript
import { canContactUser, getActionErrorMessage } from '../utils/authGuard';

// Contact button click handler
const handleContact = () => {
  const permission = canContactUser(
    currentUserRole,
    'teacher',
    currentUser
  );
  
  if (!permission.allowed) {
    toast.error(getActionErrorMessage(permission.reason!, language));
    
    // Redirect based on reason
    if (permission.reason === 'auth_required') {
      // Show login dialog
      setShowAuthDialog(true);
    } else if (permission.reason === 'profile_incomplete') {
      // Navigate to profile completion
      setPage('guardian-profile'); // or teacher-profile
    } else if (permission.reason === 'insufficient_credits') {
      // Navigate to credit purchase
      setPage('credit-purchase');
    }
    
    return;
  }
  
  // Permission granted - proceed with contact
  openChatDialog();
};
```

### Example 2: FindTeachersPage তে Teacher Card

```typescript
// View Profile button - সবাই দেখতে পারবে
<Button onClick={() => setPage(`teacher-profile-view-${teacher.id}`)}>
  প্রোফাইল দেখুন
</Button>

// Contact button - শুধু authorized users
<Button onClick={handleContactTeacher}>
  যোগাযোগ করুন
</Button>

const handleContactTeacher = () => {
  const permission = canContactUser(userRole, 'teacher', currentUser);
  
  if (!permission.allowed) {
    if (permission.reason === 'auth_required') {
      toast.error('লগইন করে যোগাযোগ করুন');
      setShowAuthDialog(true);
    } else if (permission.reason === 'role_restricted') {
      toast.error('ছাত্ররা সরাসরি শিক্ষকদের সাথে যোগাযোগ করতে পারবে না');
    } else {
      toast.error(getActionErrorMessage(permission.reason!, language));
    }
    return;
  }
  
  // Open contact dialog
  openContactDialog(teacher);
};
```

## পরবর্তী Steps (Next Steps)

### ✅ সম্পন্ন (Completed):
1. ✅ `authGuard.ts` utility তৈরি
2. ✅ `navigateToPage()` function App.tsx এ যোগ
3. ✅ NotificationCenter & NotificationsPage fix
4. ✅ Documentation তৈরি

### 🔄 বাকি কাজ (Remaining Work):

#### High Priority:
1. **FindTeachersPage** - Contact button এ auth guard implement করতে হবে
2. **TeacherProfilePage** - View/Contact distinction করতে হবে
3. **GuardianProfilePage** - View/Contact distinction করতে হবে
4. **ChatDialog** - Opening এর আগে permission check
5. **VideoMeetingDialog** - Permission check করতে হবে
6. **ApplyTuitionDialog** - শিক্ষকদের জন্য credit check

#### Medium Priority:
7. **PostTuitionDialog** - অভিভাবকদের জন্য credit check
8. **DonationPage** - Donor authentication flow
9. **All Dashboards** - Role-specific action restrictions
10. **MessagesPage** - Message send করার আগে permission check

#### Low Priority:
11. **Settings Page** - Profile completion requirements
12. **Credit Purchase Page** - User-specific recommendations

## Testing Checklist

### Test Cases:

#### 1. **Notification System:**
- [ ] দাতা dashboard → নোটিফিকেশন bell → সব দেখুন → notification click
- [ ] ✅ Expected: কোনো অপ্রয়োজনীয় login dialog আসবে না
- [ ] ✅ Expected: Public page হলে সরাসরি navigate করবে
- [ ] ✅ Expected: Protected page হলে appropriate error message দেখাবে

#### 2. **Teacher Profile View:**
- [ ] Non-logged user → Teacher profile দেখতে পারবে
- [ ] Non-logged user → Contact button click → login dialog আসবে
- [ ] Logged student → Teacher profile দেখতে পারবে
- [ ] Logged student → Contact button click → "role_restricted" message আসবে
- [ ] Logged guardian (no credits) → Contact button click → "insufficient_credits" message
- [ ] Logged guardian (with credits) → Contact successful

#### 3. **Guardian Profile View:**
- [ ] Non-logged user → Guardian profile দেখতে পারবে
- [ ] Teacher (no credits) → Contact button → "insufficient_credits" message
- [ ] Teacher (with credits + complete profile) → Contact successful

#### 4. **Student Dashboard:**
- [ ] Student → শিক্ষক profile দেখতে পারবে
- [ ] Student → শিক্ষকের সাথে যোগাযোগ button disabled/error message
- [ ] Student → Notification দেখতে পারবে
- [ ] Student → Messages page access করতে পারবে না (receive only)

#### 5. **Donor Dashboard:**
- [ ] Donor → দান করতে পারবে
- [ ] Donor → শিক্ষক/অভিভাবকের সাথে যোগাযোগ করতে পারবে না
- [ ] Donor → Notification দেখতে পারবে
- [ ] Donor → Profile update করতে পারবে

## Integration Guide

### Component এ AuthGuard ব্যবহার:

```typescript
import { 
  canContactUser, 
  canPerformAction, 
  getActionErrorMessage 
} from '../utils/authGuard';

// In your component
const YourComponent = ({ currentUser, currentUserRole, language }) => {
  const handleProtectedAction = (action: string, targetRole?: string) => {
    // For contact actions
    if (action === 'contact') {
      const permission = canContactUser(
        currentUserRole,
        targetRole as any,
        currentUser
      );
      
      if (!permission.allowed) {
        toast.error(getActionErrorMessage(permission.reason!, language));
        return;
      }
    }
    
    // For other actions
    const permission = canPerformAction(action, currentUser);
    
    if (!permission.allowed) {
      toast.error(getActionErrorMessage(permission.reason!, language));
      return;
    }
    
    // Proceed with action
    executeAction();
  };
  
  return (
    <Button onClick={() => handleProtectedAction('contact', 'teacher')}>
      যোগাযোগ করুন
    </Button>
  );
};
```

## সারসংক্ষেপ (Summary)

### যা করা হয়েছে:
1. ✅ **Global Authentication System** তৈরি
2. ✅ **Role-Based Access Control** implement
3. ✅ **Action Permission System** তৈরি
4. ✅ Notification click এর সমস্যা fix
5. ✅ Public vs Protected page distinction
6. ✅ Comprehensive documentation

### যা করতে হবে:
1. 🔄 সব pages এ `authGuard` integrate করতে হবে
2. 🔄 Contact/Message buttons এ permission check করতে হবে
3. 🔄 Credit-based actions এ validation করতে হবে
4. 🔄 Testing করতে হবে

---

**Last Updated:** November 3, 2025  
**Status:** ✅ Core System Ready, Integration Pending
