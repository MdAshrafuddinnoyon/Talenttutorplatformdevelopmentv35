# 🚀 Complete Setup Guide - Talent Tutor Platform

এই গাইড আপনাকে Talent Tutor প্ল্যাটফর্ম সম্পূর্ণভাবে setup এবং test করতে সাহায্য করবে।

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Initialization](#backend-initialization)
3. [Login System](#login-system)
4. [Testing Each User Role](#testing-each-user-role)
5. [Admin Panel Setup](#admin-panel-setup)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Information
আপনার Supabase project এর নিম্নলিখিত তথ্য প্রয়োজন:

```javascript
// utils/supabase/info.tsx থেকে
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

### Verification
1. Browser console খুলুন (F12)
2. এই command run করুন:
```javascript
import { projectId, publicAnonKey } from './utils/supabase/info';
console.log('Project ID:', projectId);
console.log('Anon Key:', publicAnonKey ? 'Set ✓' : 'Not Set ✗');
```

---

## 🎯 Backend Initialization

### Step 1: Initialize Demo Data

Backend server এ demo users এবং data তৈরি করতে:

#### Method 1: Browser Console
```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/init-demo-data', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
})
.then(res => res.json())
.then(data => {
  console.log('✅ Demo data initialized:', data);
  console.table(data.users);
})
.catch(err => console.error('❌ Error:', err));
```

#### Method 2: Using cURL
```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/init-demo-data \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  | json_pp
```

#### Method 3: Direct Integration
যদি আপনার app চলছে, তাহলে login page এ একটি "Initialize Demo Data" button থাকবে।

### Step 2: Verify Initialization

Health check করুন:
```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/health')
  .then(res => res.json())
  .then(data => console.log('Server Status:', data))
```

Expected Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-03T..."
}
```

---

## 🔐 Login System

### Login Endpoint

```javascript
async function login(email, password) {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ANON_KEY'
      },
      body: JSON.stringify({ email, password })
    }
  );
  
  const data = await response.json();
  
  if (data.success) {
    console.log('✅ Login successful');
    console.log('User:', data.user);
    console.log('Token:', data.token);
    return data;
  } else {
    console.error('❌ Login failed:', data.error);
    return null;
  }
}

// Example usage
login('admin1@talenttutor.com', 'Admin@123');
```

### Quick Login Test

Browser console এ এই function run করুন:

```javascript
async function quickTest() {
  const roles = {
    admin: { email: 'admin1@talenttutor.com', password: 'Admin@123' },
    teacher: { email: 'teacher1@talenttutor.com', password: 'Teacher@123' },
    guardian: { email: 'guardian1@talenttutor.com', password: 'Guardian@123' },
    student: { email: 'student1@talenttutor.com', password: 'Student@123' },
    donor: { email: 'donor1@talenttutor.com', password: 'Donor@123' }
  };
  
  for (const [role, creds] of Object.entries(roles)) {
    console.log(`\n🧪 Testing ${role}...`);
    const result = await login(creds.email, creds.password);
    console.log(result ? '✅ Success' : '❌ Failed');
  }
}

quickTest();
```

---

## 👥 Testing Each User Role

### 1. 🛡️ Super Admin Testing

**Login Credentials:**
- Email: `admin1@talenttutor.com`
- Password: `Admin@123`

**Test Checklist:**
```
□ Login successful
□ Admin Dashboard loads
□ User Management tab accessible
□ Can view all users (teachers, guardians, students, donors)
□ Ticket Management system works
  □ Can view all tickets
  □ Can filter by status and role
  □ Can reply to tickets
  □ Can update ticket status
□ Notice Board
  □ Can create notices
  □ Can publish notices
  □ Can edit/delete notices
□ Student Applications
  □ Can view pending applications
  □ Can approve applications
  □ Can reject applications
  □ Can add admin notes
□ Analytics Dashboard accessible
□ Credit Management works
```

**Key Admin Functions:**

```javascript
// Get all users
async function getAllUsers() {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/users',
    {
      headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
    }
  );
  const data = await response.json();
  console.table(data.users);
}

// Get tickets
async function getAllTickets() {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/tickets',
    {
      headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
    }
  );
  const data = await response.json();
  console.table(data.tickets);
}

// Create notice
async function createNotice(noticeData) {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/notices',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ANON_KEY'
      },
      body: JSON.stringify(noticeData)
    }
  );
  return await response.json();
}
```

### 2. 👨‍🏫 Teacher Testing

**Login Credentials:**
- Email: `teacher1@talenttutor.com`
- Password: `Teacher@123`

**Test Checklist:**
```
□ Login successful
□ Teacher Dashboard loads
□ Profile shows correct info
  □ Name: মোঃ করিম উদ্দিন
  □ Subjects: গণিত, পদার্থবিজ্ঞান
  □ Credits: 50
□ Browse Tuitions works
□ Can apply for tuitions
□ View Applications tab
□ Support tab accessible
  □ Can see admin notices
  □ Can create tickets
□ Cannot access admin panel ❌
□ Cannot see other teachers' data ❌
```

### 3. 👨‍👩‍👧 Guardian Testing

**Login Credentials:**
- Email: `guardian1@talenttutor.com`
- Password: `Guardian@123`

**Test Checklist:**
```
□ Login successful
□ Guardian Dashboard loads
□ Profile shows correct info
  □ Name: জনাব আহমেদ
  □ Credits: 100
□ Can post tuition jobs
□ Can browse teachers
□ Can create contracts
□ Support tab accessible
  □ Can see admin notices
  □ Can create tickets
□ Cannot access admin panel ❌
□ Cannot see other guardians' data ❌
```

### 4. 🎓 Student Testing

**Login Credentials:**
- Email: `student1@talenttutor.com`
- Password: `Student@123`

**Test Checklist:**
```
□ Login successful
□ Student Dashboard loads
□ Profile shows correct info
  □ Name: রিয়া খাতুন
  □ Class: ক্লাস ১০
  □ School: সরকারি বালিকা উচ্চ বিদ্যালয়
□ Can apply for aid
  □ Scholarship
  □ Books
  □ Tuition support
□ Can view application status
□ Can share success stories
□ Support tab accessible
  □ Can see admin notices
  □ Can create tickets
□ Cannot make payments ❌
□ Cannot access admin panel ❌
```

### 5. 💝 Donor Testing

**Login Credentials:**
- Email: `donor1@talenttutor.com` (Zakat Donor)
- Email: `donor2@talenttutor.com` (Materials Donor)
- Password: `Donor@123`

**Test Checklist:**
```
□ Login successful
□ Donor Dashboard loads
□ Profile shows correct donor type
□ Can view approved student applications
  □ Zakat donors: See all types
  □ Materials donors: See only material requests
□ Can donate
  □ Zakat: Money donations
  □ Materials: Book donations
□ Impact Reports accessible
□ Donation Certificates downloadable
□ Support tab accessible
  □ Can see admin notices
  □ Can create tickets
□ Cannot see pending applications ❌
□ Cannot access admin panel ❌
```

---

## ⚙️ Admin Panel Setup

### Ticket System Configuration

Admin dashboard এ Ticket Management enable করতে:

1. Admin হিসেবে login করুন
2. "Support & Tickets" tab এ যান
3. নিম্নলিখিত verify করুন:
   - All tickets visible
   - Filter by status working
   - Filter by user role working
   - Reply functionality working
   - Status update working

### Notice Board Setup

1. Admin dashboard → "Notices" tab
2. Create a test notice:

```javascript
const testNotice = {
  title: 'প্ল্যাটফর্ম আপডেট',
  message: 'নতুন ফিচার যুক্ত হয়েছে!',
  type: 'announcement',
  priority: 'high',
  targetAudience: 'all', // or 'teachers', 'guardians', 'students', 'donors'
};
```

3. Verify notice appears in:
   - Admin dashboard
   - All user dashboards (based on targetAudience)
   - Support tab

---

## 🧪 Real-time Testing

### Test Ticket Creation

1. **Student creates ticket:**
```javascript
// Login as student
// Go to Support tab
// Create new ticket
// Subject: "পেমেন্ট সমস্যা"
// Category: "payment"
// Description: "আমার পেমেন্ট প্রসেস হচ্ছে না"
```

2. **Admin responds:**
```javascript
// Login as admin
// Go to Ticket Management
// Find student's ticket
// Reply to ticket
// Update status to "in-progress"
```

3. **Student sees update:**
```javascript
// Refresh student dashboard
// Check Support tab
// Ticket should show admin's reply
// Status should be "in-progress"
```

### Test Student Application Flow

1. **Student applies:**
```javascript
// Login as student
// Create application for scholarship
// Amount: 5000 টাকা
// Reason: পরীক্ষার ফি
// Submit
```

2. **Admin reviews:**
```javascript
// Login as admin
// Go to Student Applications
// Find new application
// Review details
// Approve application
```

3. **Donor donates:**
```javascript
// Login as donor (zakat type)
// Browse Student Applications
// Find approved application
// Click "Donate"
// Complete donation
```

4. **Student sees update:**
```javascript
// Login as student
// Check Applications tab
// Status should be "fulfilled"
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. "Demo data already initialized"
**Solution:** Data already loaded. You can test directly.

#### 2. Login fails
**Checks:**
```javascript
// Verify credentials
console.log('Testing login endpoint...');
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  },
  body: JSON.stringify({
    email: 'admin1@talenttutor.com',
    password: 'Admin@123'
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data));
```

#### 3. Tickets not loading
**Solution:**
```javascript
// Check tickets endpoint
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/tickets', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
.then(res => res.json())
.then(data => {
  console.log('Tickets:', data);
  if (data.tickets.length === 0) {
    console.log('No tickets yet. Create one from any user dashboard.');
  }
});
```

#### 4. Notices not showing
**Check:**
```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-5b21d3ea/notices', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
.then(res => res.json())
.then(data => console.log('Notices:', data));
```

### Reset Demo Data

যদি আপনি fresh start চান:

```javascript
// Clear all KV store data (Admin only)
// This will remove all test data
// WARNING: This cannot be undone!

async function resetDemoData() {
  // You'll need to implement a reset endpoint
  // Or manually delete keys from Supabase dashboard
  console.warn('Reset functionality not yet implemented');
  console.log('Please delete keys manually from Supabase dashboard');
}
```

---

## 📊 Monitoring & Logging

### Enable Console Logging

```javascript
// Add to App.tsx or main.tsx
window.TALENT_TUTOR_DEBUG = true;

// In components, use:
if (window.TALENT_TUTOR_DEBUG) {
  console.log('Debug info:', data);
}
```

### Check API Calls

```javascript
// Monitor all API calls
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('🌐 API Call:', args[0]);
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('✅ Response:', response.status);
      return response;
    })
    .catch(error => {
      console.error('❌ Error:', error);
      throw error;
    });
};
```

---

## 📝 Next Steps

After successful setup:

1. ✅ Customize user profiles
2. ✅ Add more test data
3. ✅ Configure payment gateway
4. ✅ Setup email notifications
5. ✅ Enable real-time features
6. ✅ Deploy to production

---

## 🆘 Support

যদি কোনো সমস্যা হয়:

1. Check browser console for errors
2. Verify Supabase credentials
3. Check network tab for failed requests
4. Review backend logs in Supabase dashboard
5. Create a support ticket in the platform itself!

**Happy Testing! 🎉**
