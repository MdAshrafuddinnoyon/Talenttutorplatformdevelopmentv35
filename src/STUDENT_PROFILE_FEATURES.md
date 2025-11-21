# Student Profile Management Features

## Overview
This document describes the new features added to the Talent Tutor platform for student profile management, including document upload, profile completion reports, and SMS/Email notifications.

---

## 1. Document Upload System

### Features
- **Supabase Storage Integration**: Documents are uploaded to Supabase Storage (bucket: `make-5b21d3ea-student-documents`)
- **Secure Storage**: All documents are stored in private buckets with signed URLs
- **File Size Limit**: Maximum 5MB per file
- **Supported Document Types**:
  - Student ID Card
  - School Certificate
  - Birth Certificate
  - Guardian NID Copy
  - Student Photo
  - Family Photo
  - Income Proof (optional)

### Components
- **StudentProfileCompletion**: Updated to upload documents to Supabase Storage
- Documents are automatically uploaded when selected
- Fallback to base64 storage if Supabase Storage fails

### API Endpoints

#### Upload Document
```
POST /make-server-5b21d3ea/student-profile/upload-document
```

**Request Body:**
```json
{
  "studentId": "student-001",
  "documentType": "studentIdCard",
  "fileData": "base64_encoded_file_data",
  "fileName": "id-card.jpg",
  "mimeType": "image/jpeg"
}
```

**Response:**
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

#### Get Document
```
GET /make-server-5b21d3ea/student-profile/:studentId/document/:documentType
```

#### Get All Documents for a Student
```
GET /make-server-5b21d3ea/student-profile/:studentId/documents
```

---

## 2. Profile Completion Report

### Features
- **Overall Completion Percentage**: Shows total profile completion (0-100%)
- **Section-wise Breakdown**:
  - Personal Information (30%)
  - Educational Information (20%)
  - Family Information (20%)
  - Documents (25%)
  - Additional Information (5%)
- **Missing Fields/Documents**: Lists what's missing for each section
- **Timeline**: Shows last updated, submitted, and reviewed dates
- **Admin Notes**: Displays feedback from admin
- **Download Report**: Export report as text file

### Components

#### StudentProfileCompletionReport
```tsx
import { StudentProfileCompletionReport } from './components/StudentProfileCompletionReport';

<StudentProfileCompletionReport 
  studentId="student-001" 
  language="bn" 
/>
```

#### AdminProfileCompletionDashboard
Shows aggregate statistics for all student profiles:
- Total profiles count
- Breakdown by status (draft, pending, approved, etc.)
- Breakdown by completion ranges (complete, almost complete, partial, minimal)

```tsx
import { AdminProfileCompletionDashboard } from './components/AdminProfileCompletionDashboard';

<AdminProfileCompletionDashboard language="bn" />
```

### API Endpoints

#### Get Profile Completion Report
```
GET /make-server-5b21d3ea/student-profile/:studentId/completion-report
```

**Response:**
```json
{
  "success": true,
  "report": {
    "studentId": "student-001",
    "studentName": "রিয়া খাতুন",
    "status": "pending_approval",
    "overall": {
      "percentage": 85,
      "completed": 20,
      "total": 24
    },
    "sections": {
      "personal": {
        "percentage": 100,
        "completed": 6,
        "total": 6,
        "missingFields": []
      },
      "educational": {
        "percentage": 83,
        "completed": 5,
        "total": 6,
        "missingFields": ["version"]
      },
      "family": {
        "percentage": 100,
        "completed": 6,
        "total": 6,
        "missingFields": []
      },
      "documents": {
        "percentage": 60,
        "completed": 3,
        "total": 5,
        "missingDocuments": ["familyPhoto", "incomeProof"]
      },
      "additional": {
        "percentage": 100,
        "completed": 2,
        "total": 2,
        "missingFields": []
      }
    },
    "lastUpdated": "2025-11-03T...",
    "submittedAt": "2025-11-03T...",
    "reviewedAt": null,
    "adminNotes": ""
  }
}
```

#### Get All Profiles Completion Summary
```
GET /make-server-5b21d3ea/student-profiles/completion-summary
```

**Response:**
```json
{
  "success": true,
  "summary": {
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
}
```

---

## 3. SMS/Email Notification System

### Features
- **Multi-Channel Support**: Send via Email, SMS, or Both
- **Notification Types**:
  - Profile Approved
  - Profile Needs Update
  - Application Status
  - General
- **Automatic Notifications**: Sent when admin approves/requests update
- **Notification History**: View all sent notifications
- **Manual Sending**: Admin can send custom notifications

### Components

#### NotificationHistory
Shows all notifications sent to a user:

```tsx
import { NotificationHistory } from './components/NotificationHistory';

<NotificationHistory 
  userId="student-001" 
  language="bn" 
  limit={50} 
/>
```

#### SendNotificationDialog
Dialog for sending custom notifications:

```tsx
import { SendNotificationDialog } from './components/SendNotificationDialog';

<SendNotificationDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  userId="student-001"
  userName="রিয়া খাতুন"
  userEmail="student1@talenttutor.com"
  userPhone="01744444441"
  language="bn"
  onSuccess={() => {
    // Callback after successful send
  }}
/>
```

### API Endpoints

#### Send Notification
```
POST /make-server-5b21d3ea/notifications/send
```

**Request Body:**
```json
{
  "userId": "student-001",
  "type": "profile_approved",
  "channel": "both",
  "subject": "প্রোফাইল অনুমোদিত - Talent Tutor",
  "message": "অভিনন্দন! আপনার প্রোফাইল অনুমোদিত হয়েছে।",
  "data": {
    "profileStatus": "approved",
    "approvedAt": "2025-11-03T..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "notification": {
    "id": "notification-1234567890-abc123",
    "userId": "student-001",
    "userName": "রিয়া খাতুন",
    "userEmail": "student1@talenttutor.com",
    "userPhone": "01744444441",
    "type": "profile_approved",
    "channel": "both",
    "subject": "প্রোফাইল অনুমোদিত - Talent Tutor",
    "message": "অভিনন্দন! আপনার প্রোফাইল অনুমোদিত হয়েছে।",
    "data": {...},
    "status": "sent",
    "sentAt": "2025-11-03T...",
    "createdAt": "2025-11-03T..."
  }
}
```

#### Get User Notifications
```
GET /make-server-5b21d3ea/notifications/user/:userId?limit=50
```

#### Send Approval Notification (Automatic)
```
POST /make-server-5b21d3ea/student-profile/:studentId/notify-approval
```

**Request Body:**
```json
{
  "adminNotes": "সব ডকুমেন্ট সঠিক পাওয়া গেছে।"
}
```

#### Send Update Request Notification (Automatic)
```
POST /make-server-5b21d3ea/student-profile/:studentId/notify-update-needed
```

**Request Body:**
```json
{
  "adminNotes": "দয়া করে জন্ম নিবন্ধন কপি আপলোড করুন।"
}
```

---

## Integration in Admin Dashboard

### Updated Components

#### AdminStudentProfileManager
Now includes automatic notification sending when:
- Profile is approved → Sends approval notification
- Profile needs update → Sends update request notification

### Usage in Student Dashboard

Students can:
1. View their profile completion report
2. See missing fields and documents
3. View notification history
4. Track profile status changes

---

## Multilingual Support

All components support both Bangla (bn) and English (en):
- UI labels and messages
- Notification content
- Report text
- Date formatting

---

## Storage Architecture

### Supabase Storage Bucket
- **Bucket Name**: `make-5b21d3ea-student-documents`
- **Access**: Private (requires signed URLs)
- **File Size Limit**: 5MB per file
- **File Structure**: `{studentId}/{documentType}/{timestamp}-{filename}`

### Data Storage (KV Store)
- Profile data: `student-profile:{studentId}`
- Document metadata: `document:{studentId}:{documentType}`
- Notifications: `notification:{notificationId}`
- User notifications list: `notifications:user:{userId}`

---

## Testing

### Test Student Credentials
```
Email: student1@talenttutor.com
Phone: 01744444441
Password: Student@123
```

### Test Flow
1. Login as student
2. Complete profile with document uploads
3. Submit for review
4. Login as admin (admin1@talenttutor.com / Admin@123)
5. Review profile, view completion report
6. Approve or request update
7. Student receives notification
8. Check notification history

---

## Future Enhancements

1. **Real SMS/Email Integration**
   - Integrate with SMS gateway (e.g., BulkSMS BD, SSL Wireless)
   - Integrate with Email service (e.g., SendGrid, AWS SES)

2. **Document Verification**
   - OCR for automatic data extraction
   - Document authenticity checking

3. **Advanced Reporting**
   - PDF report generation
   - Analytics dashboard
   - Export to Excel

4. **Push Notifications**
   - Browser push notifications
   - Mobile app notifications

---

## Support

For questions or issues, please refer to:
- [API Documentation](./API_DOCUMENTATION.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [User Guide](./USER_GUIDE.md)
