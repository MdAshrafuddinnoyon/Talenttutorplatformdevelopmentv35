# Student Profile Management - Implementation Guide

## Overview
এই গাইডে নতুন তিনটি ফিচার যুক্ত করার সম্পূর্ণ বিবরণ দেওয়া হয়েছে:
1. ডকুমেন্ট আপলোড (Supabase Storage)
2. প্রোফাইল সম্পূর্ণতার রিপোর্ট
3. SMS/Email নোটিফিকেশন সিস্টেম

---

## নতুন Components

### 1. StudentProfileCompletionReport
**Path**: `/components/StudentProfileCompletionReport.tsx`

**Purpose**: ছাত্রদের প্রোফাইল সম্পূর্ণতার বিস্তারিত রিপোর্ট দেখায়

**Usage**:
```tsx
import { StudentProfileCompletionReport } from '../components/StudentProfileCompletionReport';

// StudentDashboard বা StudentProfile পেজে যুক্ত করুন:
<StudentProfileCompletionReport 
  studentId={currentUser?.id} 
  language={language} 
/>
```

**Features**:
- সামগ্রিক সম্পূর্ণতার শতাংশ
- বিভাগ অনুযায়ী বিস্তারিত (Personal, Educational, Family, Documents, Additional)
- অনুপস্থিত ফিল্ড ও ডকুমেন্টের তালিকা
- টাইমলাইন (Last Updated, Submitted, Reviewed)
- এডমিন মন্তব্য
- রিপোর্ট ডাউনলোড (.txt ফরম্যাট)

---

### 2. AdminProfileCompletionDashboard
**Path**: `/components/AdminProfileCompletionDashboard.tsx`

**Purpose**: সব ছাত্রদের প্রোফাইলের সামগ্রিক সারসংক্ষেপ দেখায়

**Usage**:
```tsx
import { AdminProfileCompletionDashboard } from '../components/AdminProfileCompletionDashboard';

// AdminDashboard পেজে যুক্ত করুন (একটি নতুন ট্যাব হিসেবে):
<TabsContent value="profile-analytics">
  <AdminProfileCompletionDashboard language={language} />
</TabsContent>
```

**Features**:
- মোট প্রোফাইলের সংখ্যা
- স্ট্যাটাস অনুযায়ী বিভাজন (Draft, Pending, Approved, Needs Update, Rejected)
- সম্পূর্ণতার অনুপাত (Complete, Almost Complete, Partial, Minimal)
- ভিজুয়াল চার্ট ও প্রগ্রেস বার
- রিয়েল-টাইম আপডেট

---

### 3. NotificationHistory
**Path**: `/components/NotificationHistory.tsx`

**Purpose**: ইউজারের সব নোটিফিকেশনের ইতিহাস দেখায়

**Usage**:
```tsx
import { NotificationHistory } from '../components/NotificationHistory';

// StudentDashboard বা NotificationsPage এ যুক্ত করুন:
<NotificationHistory 
  userId={currentUser?.id} 
  language={language} 
  limit={50}
/>
```

**Features**:
- সব নোটিফিকেশন দেখা (Email, SMS, Both)
- নোটিফিকেশন টাইপ (Profile Approved, Profile Needs Update, Application Status, General)
- পাঠানোর স্ট্যাটাস (Sent, Pending, Failed)
- বিস্তারিত তথ্য ও তারিখ
- স্ক্রলেবল লিস্ট

---

### 4. SendNotificationDialog
**Path**: `/components/SendNotificationDialog.tsx`

**Purpose**: এডমিন কাস্টম নোটিফিকেশন পাঠাতে পারবে

**Usage**:
```tsx
import { SendNotificationDialog } from '../components/SendNotificationDialog';

const [notifDialogOpen, setNotifDialogOpen] = useState(false);

// AdminDashboard এ একটি বাটন যুক্ত করুন:
<Button onClick={() => setNotifDialogOpen(true)}>
  <Bell className="w-4 h-4 mr-2" />
  নোটিফিকেশন পাঠান
</Button>

<SendNotificationDialog
  open={notifDialogOpen}
  onOpenChange={setNotifDialogOpen}
  userId="student-001"
  userName="রিয়া খাতুন"
  userEmail="student1@talenttutor.com"
  userPhone="01744444441"
  language={language}
  onSuccess={() => {
    toast.success('নোটিফিকেশন পাঠানো হয়েছে');
  }}
/>
```

**Features**:
- নোটিফিকেশন টাইপ সিলেক্ট
- চ্যানেল সিলেক্ট (Email, SMS, Both)
- কাস্টম সাবজেক্ট ও মেসেজ
- রিসিপিয়েন্ট তথ্য প্রদর্শন

---

## Server Endpoints

### Document Upload Endpoints

#### 1. Upload Document
```
POST /make-server-5b21d3ea/student-profile/upload-document
```

**Purpose**: ডকুমেন্ট Supabase Storage এ আপলোড করে

**Request**:
```json
{
  "studentId": "student-001",
  "documentType": "studentIdCard",
  "fileData": "data:image/jpeg;base64,...",
  "fileName": "id-card.jpg",
  "mimeType": "image/jpeg"
}
```

**Response**:
```json
{
  "success": true,
  "document": {
    "studentId": "student-001",
    "documentType": "studentIdCard",
    "fileName": "id-card.jpg",
    "filePath": "student-001/studentIdCard/1234567890-id-card.jpg",
    "signedUrl": "https://...",
    "uploadedAt": "2025-11-03T...",
    "mimeType": "image/jpeg",
    "fileSize": 123456
  }
}
```

#### 2. Get Document
```
GET /make-server-5b21d3ea/student-profile/:studentId/document/:documentType
```

#### 3. Get All Documents
```
GET /make-server-5b21d3ea/student-profile/:studentId/documents
```

---

### Completion Report Endpoints

#### 1. Get Profile Completion Report
```
GET /make-server-5b21d3ea/student-profile/:studentId/completion-report
```

**Response**: 
- `overall`: Overall completion percentage
- `sections`: Section-wise breakdown (personal, educational, family, documents, additional)
- `missingFields`: List of missing fields per section
- `missingDocuments`: List of missing documents
- Timeline info (lastUpdated, submittedAt, reviewedAt)
- Admin notes

#### 2. Get All Profiles Completion Summary
```
GET /make-server-5b21d3ea/student-profiles/completion-summary
```

**Response**:
```json
{
  "total": 15,
  "byStatus": {
    "draft": 2,
    "pending_approval": 5,
    "approved": 6,
    "needs_update": 1,
    "rejected": 1
  },
  "completionRanges": {
    "complete": 6,
    "almostComplete": 4,
    "partial": 3,
    "minimal": 2
  }
}
```

---

### Notification Endpoints

#### 1. Send Notification
```
POST /make-server-5b21d3ea/notifications/send
```

**Request**:
```json
{
  "userId": "student-001",
  "type": "profile_approved",
  "channel": "both",
  "subject": "প্রোফাইল অনুমোদিত",
  "message": "অভিনন্দন! আপনার প্রোফাইল অনুমোদিত হয়েছে।",
  "data": {}
}
```

#### 2. Get User Notifications
```
GET /make-server-5b21d3ea/notifications/user/:userId?limit=50
```

#### 3. Send Approval Notification (Automatic)
```
POST /make-server-5b21d3ea/student-profile/:studentId/notify-approval
```

**Request**:
```json
{
  "adminNotes": "সব ডকুমেন্ট সঠিক পাওয়া গেছে।"
}
```

#### 4. Send Update Request Notification (Automatic)
```
POST /make-server-5b21d3ea/student-profile/:studentId/notify-update-needed
```

---

## Integration Steps

### Step 1: StudentDashboard এ যুক্ত করা

**File**: `/pages/StudentDashboard.tsx`

```tsx
import { StudentProfileCompletionReport } from '../components/StudentProfileCompletionReport';
import { NotificationHistory } from '../components/NotificationHistory';

// Dashboard এ নতুন ট্যাব যুক্ত করুন:
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
    <TabsTrigger value="profile-report">প্রোফাইল রিপোর্ট</TabsTrigger>
    <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
    {/* অন্যান্য ট্যাব */}
  </TabsList>
  
  <TabsContent value="profile-report">
    <StudentProfileCompletionReport 
      studentId={currentUser?.id} 
      language={language} 
    />
  </TabsContent>
  
  <TabsContent value="notifications">
    <NotificationHistory 
      userId={currentUser?.id} 
      language={language} 
      limit={50}
    />
  </TabsContent>
  
  {/* অন্যান্য TabsContent */}
</Tabs>
```

---

### Step 2: AdminDashboard এ যুক্ত করা

**File**: `/pages/AdminDashboard.tsx`

```tsx
import { AdminProfileCompletionDashboard } from '../components/AdminProfileCompletionDashboard';
import { SendNotificationDialog } from '../components/SendNotificationDialog';

// নতুন ট্যাব যুক্ত করুন:
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
    <TabsTrigger value="student-profiles">ছাত্র প্রোফাইল</TabsTrigger>
    <TabsTrigger value="profile-analytics">
      <BarChart3 className="w-4 h-4 mr-2" />
      প্রোফাইল অ্যানালিটিক্স
    </TabsTrigger>
    {/* অন্যান্য ট্যাব */}
  </TabsList>
  
  <TabsContent value="student-profiles">
    <AdminStudentProfileManager language={language} />
  </TabsContent>
  
  <TabsContent value="profile-analytics">
    <AdminProfileCompletionDashboard language={language} />
  </TabsContent>
  
  {/* অন্যান্য TabsContent */}
</Tabs>
```

---

### Step 3: Notification Dialog যুক্ত করা

AdminDashboard বা AdminStudentProfileManager এ:

```tsx
const [notifDialogOpen, setNotifDialogOpen] = useState(false);
const [selectedUserForNotif, setSelectedUserForNotif] = useState<any>(null);

// ইউজার টেবিলে একটি বাটন যুক্ত করুন:
<Button 
  size="sm" 
  variant="outline"
  onClick={() => {
    setSelectedUserForNotif(user);
    setNotifDialogOpen(true);
  }}
>
  <Bell className="w-4 h-4 mr-1" />
  নোটিফিকেশন পাঠান
</Button>

// Dialog render করুন:
<SendNotificationDialog
  open={notifDialogOpen}
  onOpenChange={setNotifDialogOpen}
  userId={selectedUserForNotif?.id}
  userName={selectedUserForNotif?.name}
  userEmail={selectedUserForNotif?.email}
  userPhone={selectedUserForNotif?.phone}
  language={language}
  onSuccess={() => {
    toast.success('নোটিফিকেশন পাঠানো হয়েছে');
    setNotifDialogOpen(false);
  }}
/>
```

---

## Updated Components

### StudentProfileCompletion
**File**: `/components/StudentProfileCompletion.tsx`

**Changes**:
- `handleDocumentUpload` ফাংশন আপডেট হয়েছে
- এখন ডকুমেন্ট Supabase Storage এ আপলোড হয়
- Signed URL সংরক্ষণ করা হয়
- ব্যর্থ হলে base64 তে fallback

---

### AdminStudentProfileManager
**File**: `/components/AdminStudentProfileManager.tsx`

**Changes**:
- `handleApproveProfile` এ automatic notification পাঠানো হয়
- `handleRequestUpdate` এ automatic notification পাঠানো হয়
- প্রোফাইল approve/update করার সাথে সাথে ইউজার notification পায়

---

## Supabase Storage Setup

### Bucket Creation
Server startup এ automatically bucket তৈরি হয়:
- **Bucket Name**: `make-5b21d3ea-student-documents`
- **Access**: Private
- **File Size Limit**: 5MB

### File Structure
```
make-5b21d3ea-student-documents/
  └── {studentId}/
      ├── studentIdCard/
      │   └── {timestamp}-{filename}
      ├── schoolCertificate/
      │   └── {timestamp}-{filename}
      ├── birthCertificate/
      │   └── {timestamp}-{filename}
      ├── guardianNIDCopy/
      │   └── {timestamp}-{filename}
      └── studentPhoto/
          └── {timestamp}-{filename}
```

---

## Testing Instructions

### 1. Document Upload Test

1. Login as student: `student1@talenttutor.com` / `Student@123`
2. Go to Profile Completion
3. Upload documents (each should be < 5MB)
4. Check console for upload success
5. Verify document appears in profile

### 2. Completion Report Test

1. Login as student
2. Navigate to "Profile Report" tab
3. Check overall completion percentage
4. Verify section-wise breakdown
5. Check missing fields/documents list
6. Download report and verify content

### 3. Notification Test

1. Login as admin: `admin1@talenttutor.com` / `Admin@123`
2. Go to Student Profile Management
3. Approve a profile
4. Check if notification was sent (check server logs)
5. Login as student
6. Check Notification History tab
7. Verify notification received

### 4. Admin Analytics Test

1. Login as admin
2. Go to "Profile Analytics" tab
3. Check total profiles count
4. Verify status breakdown
5. Check completion ranges
6. Click refresh to update data

---

## Multilingual Support

সব components বাংলা (bn) এবং ইংরেজি (en) সাপোর্ট করে:

```tsx
// Language toggle করুন:
<Button onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}>
  {language === 'bn' ? 'English' : 'বাংলা'}
</Button>
```

---

## Error Handling

### Common Errors

1. **"Failed to upload document"**
   - চেক করুন: File size < 5MB
   - চেক করুন: Valid file format (image/pdf)
   - Check server logs for Supabase errors

2. **"Failed to load report"**
   - চেক করুন: Valid studentId
   - চেক করুন: Profile exists
   - Check server connectivity

3. **"Failed to send notification"**
   - চেক করুন: Valid userId
   - চেক করুন: User has email/phone
   - Check server logs

---

## Next Steps

1. **Real SMS/Email Integration**:
   - Integrate with SMS gateway (BulkSMS BD, SSL Wireless)
   - Integrate with Email service (SendGrid, AWS SES)

2. **Enhanced Reporting**:
   - PDF report generation
   - Excel export
   - Charts and graphs

3. **Document Verification**:
   - OCR for data extraction
   - Document authenticity check
   - Auto-fill from documents

4. **Push Notifications**:
   - Browser push notifications
   - Mobile app notifications
   - Real-time updates

---

## Support

সমস্যা বা প্রশ্নের জন্য:
- [Student Profile Features Documentation](./STUDENT_PROFILE_FEATURES.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
