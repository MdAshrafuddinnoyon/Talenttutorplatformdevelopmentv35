# 📡 Talent Tutor API Documentation

Complete API reference for Talent Tutor backend server.

## 🔗 Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-5b21d3ea
```

## 🔐 Authentication

All requests require Authorization header:

```
Authorization: Bearer {publicAnonKey}
```

---

## 📚 Table of Contents

1. [Donor System APIs](#donor-system-apis)
2. [Student Application APIs](#student-application-apis)
3. [Donor-Student Integration APIs](#donor-student-integration-apis)
4. [Ticket System APIs](#ticket-system-apis)
5. [CMS APIs](#cms-apis)
6. [User Management APIs](#user-management-apis)

---

## 🎁 Donor System APIs

### Register New Donor

**POST** `/donor/register`

**Request Body:**

```json
{
  "name": "আহমেদ আলী",
  "email": "ahmed@example.com",
  "phone": "01712345678",
  "password": "secure_password",
  "donorType": "যাকাত প্রদানকারী" // or "শিক্ষা উপকরণ দাতা"
}
```

**Response:**

```json
{
  "success": true,
  "donor": {
    "id": "donor-1234567890",
    "name": "আহমেদ আলী",
    "email": "ahmed@example.com",
    "phone": "01712345678",
    "totalDonations": 0,
    "donationsCount": 0,
    "joinDate": "2025-11-03T10:30:00.000Z",
    "createdAt": "2025-11-03T10:30:00.000Z"
  }
}
```

### Login Donor

**POST** `/donor/login`

**Request Body:**

```json
{
  "emailOrPhone": "ahmed@example.com",
  "password": "secure_password"
}
```

### Get Donor Profile

**GET** `/donor/:donorId`

**Response:**

```json
{
  "success": true,
  "donor": {
    "id": "donor-1234567890",
    "name": "আহমেদ আলী",
    "email": "ahmed@example.com",
    "totalDonations": 15000,
    "donationsCount": 5
  }
}
```

### Update Donor Profile

**PUT** `/donor/:donorId`

**Request Body:**

```json
{
  "name": "আহমেদ আলী",
  "phone": "01712345678",
  "location": "ঢাকা",
  "occupation": "ব্যবসায়ী",
  "bio": "শিক্ষায় সাহায্য করতে চাই"
}
```

### Submit Donation

**POST** `/donor/donate`

**Request Body:**

```json
{
  "donorId": "donor-1234567890",
  "type": "যাকাত",
  "amount": 5000,
  "paymentMethod": "bKash",
  "transactionId": "TXN123456",
  "anonymous": false,
  "studentId": "student-123",
  "campaignId": "campaign-456"
}
```

### Get Donor Donations

**GET** `/donor/:donorId/donations`

**Response:**

```json
{
  "success": true,
  "donations": [
    {
      "id": "donation-1234567890",
      "donorId": "donor-1234567890",
      "type": "যাকাত",
      "amount": 5000,
      "status": "সম্পন্ন",
      "date": "2025-11-03T10:30:00.000Z",
      "receiptNumber": "DON345678"
    }
  ]
}
```

### Get Donation Statistics

**GET** `/donations/stats`

**Response:**

```json
{
  "success": true,
  "stats": {
    "totalDonated": 150000,
    "booksCollected": 250,
    "studentsHelped": 45
  }
}
```

---

## 📝 Student Application APIs

### Create Student Application

**POST** `/student/application/create`

**Request Body:**

```json
{
  "studentId": "student-123",
  "studentName": "রহিম উদ্দিন",
  "applicationType": "যাকাত সাহায্য",
  "class": "৮ম শ্রেণী",
  "school": "ঢাকা সরকারি স্কুল",
  "guardianName": "করিম উদ্দিন",
  "phone": "01812345678",
  "address": "মিরপুর, ঢাকা",
  "monthlyIncome": "8000",
  "familyMembers": "5",
  "reason": "আর্থিক সমস্যার কারণে পড়াশোনা চালিয়ে যেতে পারছি না",
  "amountNeeded": "10000",
  "nidNumber": "1234567890123",
  "documents": []
}
```

**Response:**

```json
{
  "success": true,
  "application": {
    "id": "app-1234567890",
    "studentId": "student-123",
    "studentName": "রহিম উদ্দিন",
    "applicationType": "যাকাত সাহায্য",
    "status": "pending",
    "appliedDate": "2025-11-03T10:30:00.000Z"
  }
}
```

### Get All Student Applications (Admin)

**GET** `/students/applications`

**Response:**

```json
{
  "success": true,
  "applications": [
    {
      "id": "app-1234567890",
      "studentName": "রহিম উদ্দিন",
      "applicationType": "যাকাত সাহায্য",
      "status": "pending",
      "appliedDate": "2025-11-03T10:30:00.000Z"
    }
  ]
}
```

### Get Student's Applications

**GET** `/student/:studentId/applications`

### Get Application Details

**GET** `/student/application/:applicationId`

### Update Application Status (Admin)

**PUT** `/student/application/:applicationId/status`

**Request Body:**

```json
{
  "status": "approved",
  "adminComment": "যাচাই করা হয়েছে এবং অনুমোদিত",
  "assignedTeacherId": "teacher-123",
  "assignedTeacherName": "প্রফেসর আলম"
}
```

---

## 🤝 Donor-Student Integration APIs

### Get Available Applications for Donor

**GET** `/donor/:donorId/available-applications`

Returns applications filtered by donor type:

- **যাকাত প্রদানকারী**: Only shows "যাকাত সাহায্য" applications
- **শিক্ষা উপকরণ দাতা**: Only shows "শিক্ষা উপকরণ" applications

**Response:**

```json
{
  "success": true,
  "applications": [
    {
      "id": "app-1234567890",
      "studentName": "রহিম উদ্দিন",
      "applicationType": "যাকাত সাহায্য",
      "status": "approved",
      "amountNeeded": "10000",
      "reason": "আর্থিক সমস্যা"
    }
  ]
}
```

### Create Donation for Student

**POST** `/donation/create-for-student`

**Request Body:**

```json
{
  "donorId": "donor-1234567890",
  "applicationId": "app-1234567890",
  "amount": 5000,
  "items": ["বই", "খাতা", "কলম"],
  "paymentMethod": "bKash",
  "transactionId": "TXN123456",
  "anonymous": false,
  "message": "তোমার পড়াশোনা চালিয়ে যাও"
}
```

**Response:**

```json
{
  "success": true,
  "donation": {
    "id": "donation-1234567890",
    "donorId": "donor-1234567890",
    "donorName": "আহমেদ আলী",
    "applicationId": "app-1234567890",
    "studentId": "student-123",
    "studentName": "রহিম উদ্দিন",
    "amount": 5000,
    "status": "সম্পন্ন",
    "receiptNumber": "DON345678"
  }
}
```

### Get Student's Received Donations

**GET** `/student/:studentId/received-donations`

**Response:**

```json
{
  "success": true,
  "donations": [
    {
      "id": "donation-1234567890",
      "donorName": "আহমেদ আলী",
      "amount": 5000,
      "date": "2025-11-03T10:30:00.000Z",
      "message": "তোমার পড়াশোনা চালিয়ে যাও"
    }
  ]
}
```

### Get Donor Impact Metrics

**GET** `/donor/:donorId/impact`

**Response:**

```json
{
  "success": true,
  "impact": {
    "totalDonated": 25000,
    "studentsHelped": 8,
    "donationsCount": 12,
    "itemsDonated": 35
  }
}
```

### Route Application to Donors (Admin)

**POST** `/application/:applicationId/route-to-donors`

Marks application as routed to donors after admin approval.

---

## 🎫 Ticket System APIs

### Create Support Ticket

**POST** `/ticket/create`

**Request Body:**

```json
{
  "userId": "user-123",
  "userName": "রহিম উদ্দিন",
  "userRole": "student",
  "category": "পেমেন্ট সমস্যা",
  "priority": "high",
  "subject": "bKash পেমেন্ট ব্যর্থ",
  "description": "আমি bKash দিয়ে পেমেন্ট করতে পারছি না",
  "attachments": []
}
```

### Get User's Tickets

**GET** `/tickets/user/:userId`

### Get All Tickets (Admin)

**GET** `/tickets/all`

### Get Ticket Details

**GET** `/ticket/:ticketId`

### Update Ticket Status

**PUT** `/ticket/:ticketId/status`

**Request Body:**

```json
{
  "status": "inProgress" // or "resolved", "closed"
}
```

### Add Reply to Ticket

**POST** `/ticket/:ticketId/reply`

**Request Body:**

```json
{
  "userId": "admin-1",
  "userName": "অ্যাডমিন",
  "userRole": "admin",
  "message": "আমরা সমস্যাটি দেখছি"
}
```

---

## 📰 CMS APIs

### Get All Posts

**GET** `/cms/posts`

### Get Single Post

**GET** `/cms/posts/:postId`

### Create Post

**POST** `/cms/posts`

**Request Body:**

```json
{
  "title": "নতুন ব্লগ পোস্ট",
  "content": "পোস্টের বিষয়বস্তু...",
  "excerpt": "সংক্ষিপ্ত বর্ণনা",
  "status": "published",
  "type": "post",
  "author": "অ্যাডমিন",
  "authorId": 1,
  "categories": ["শিক্ষা"],
  "tags": ["টিউশন", "অনলাইন"],
  "featuredImage": "https://example.com/image.jpg",
  "seoTitle": "SEO শিরোনাম",
  "seoDescription": "SEO বর্ণনা",
  "featured": false,
  "allowComments": true
}
```

### Update Post

**PUT** `/cms/posts/:postId`

### Delete Post

**DELETE** `/cms/posts/:postId`

### Update Post Views

**POST** `/cms/posts/:postId/view`

### Get All Categories

**GET** `/cms/categories`

### Create Category

**POST** `/cms/categories`

### Get All Tags

**GET** `/cms/tags`

### Create Tag

**POST** `/cms/tags`

---

## 👥 User Management APIs

### Get Users by Type

**GET** `/users/:userType`

**Parameters:**

- `userType`: teacher, guardian, student, donor

### Search Users

**POST** `/users/search`

**Request Body:**

```json
{
  "query": "রহিম",
  "userType": "student" // or "all"
}
```

### Update User Verification Status

**PUT** `/user/:userId/verify`

**Request Body:**

```json
{
  "verified": true,
  "verificationNotes": "সব ডকুমেন্ট যাচাই করা হয়েছে",
  "verifiedBy": "Admin"
}
```

### Update User Details

**PUT** `/user/:userId`

### Delete User

**DELETE** `/user/:userId`

### Allocate Credits to User

**POST** `/user/:userId/credits`

**Request Body:**

```json
{
  "credits": 50,
  "reason": "বোনাস ক্রেডিট"
}
```

---

## 🔧 Health Check

### Health Check

**GET** `/health`

**Response:**

```json
{
  "status": "ok"
}
```

---

## ⚠️ Error Responses

All error responses follow this format:

```json
{
  "error": "বাংলা error message"
}
```

Common HTTP Status Codes:

- `200` - Success
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

1. All dates are in ISO 8601 format
2. All monetary amounts are in BDT (Bangladeshi Taka)
3. Anonymous donations hide donor name from students
4. Admin approval is required before routing applications to donors
5. Donor type determines which applications they can see

---

## 🚀 Getting Started

```javascript
import { projectId, publicAnonKey } from './utils/supabase/info';

const baseURL = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea`;

// Example API call
const response = await fetch(`${baseURL}/donor/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({
    name: 'আহমেদ আলী',
    email: 'ahmed@example.com',
    phone: '01712345678',
    password: 'secure_password'
  })
});

const data = await response.json();
console.log(data);
```

---

**Last Updated:** November 3, 2025  
**API Version:** 1.0