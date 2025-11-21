# 🚀 Donor Management - Quick Start Guide

## ⚡ Quick Setup (5 Minutes)

### Step 1: Initialize Demo Data
```bash
POST /make-server-5b21d3ea/init-demo-data
```
This creates:
- ✅ Zakat Donor (zakatdonor1@talenttutor.com / Donor@2025)
- ✅ Material Donor (materialdonor1@talenttutor.com / Donor@2025)

### Step 2: Add to Admin Dashboard

Edit `/pages/AdminDashboard.tsx`:

```tsx
// Add import
import { EnhancedDonorManagement } from '../components/EnhancedDonorManagement';

// Add tab (line ~250)
<TabsTrigger value="donors">
  <Heart className="w-4 h-4 mr-2" />
  {language === 'bn' ? 'দাতা ম্যানেজমেন্ট' : 'Donor Management'}
</TabsTrigger>

// Add content (line ~500)
<TabsContent value="donors">
  <EnhancedDonorManagement language={language} />
</TabsContent>
```

### Step 3: Test
1. Login as admin (admin@talenttutor.com / Admin@2025)
2. Go to Admin Dashboard
3. Click "Donors" tab
4. See donor list with statistics

---

## 📋 API Endpoints Reference

### GET Endpoints:
```
/donors                              - Get all donors
/donors/:donorId                     - Get single donor
/donors/:donorId/donations           - Get donor's donations
/donor/:donorId/available-applications - Get available student applications
/donations                           - Get all donations (admin)
/donors/statistics                   - Get statistics
```

### POST Endpoints:
```
/donors/:donorId/donations           - Record new donation
/donors/:donorId/verify              - Verify donor (admin)
/donations/match                     - Match donor with student
```

### PUT Endpoints:
```
/donors/:donorId                     - Update donor profile
/donations/:donationId               - Update donation status
```

---

## 🎨 Component Usage

### Admin Dashboard:
```tsx
<EnhancedDonorManagement language="bn" />
```

### Donor Selection:
```tsx
<DonorTypeSelector 
  selectedType={donorType}
  onSelect={setDonorType}
  language="bn"
/>
```

### Donor Dashboard (automatic):
```tsx
// Rendered automatically for donor role
<DonorDashboard 
  language={language}
  onLogout={onLogout}
  setPage={setPage}
  currentUser={currentUser}
/>
```

---

## 💡 Common Tasks

### Add New Donor:
```javascript
const response = await fetch(
  `${API_URL}/auth/register`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "Donor Name",
      email: "donor@example.com",
      phone: "+8801712345678",
      role: "donor",
      donorType: "zakat", // or "materials"
      address: "Dhaka, Bangladesh"
    })
  }
);
```

### Record Donation:
```javascript
const response = await fetch(
  `${API_URL}/donors/${donorId}/donations`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      studentId: "student-123",
      studentName: "Student Name",
      type: "money", // or "books" or "materials"
      amount: 5000,
      message: "Optional message"
    })
  }
);
```

### Verify Donor:
```javascript
const response = await fetch(
  `${API_URL}/donors/${donorId}/verify`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    }
  }
);
```

---

## 🔍 Troubleshooting

### Issue: No donors showing
**Fix**: Initialize demo data or check API connection

### Issue: API errors
**Fix**: Verify database table exists (kv_store_5b21d3ea)

### Issue: Tier not showing
**Fix**: Tier is calculated automatically based on donations

---

## 📊 Statistics Explained

| Metric | Description |
|--------|-------------|
| Total Donors | All registered donors |
| Zakat Donors | Donors who donate money + materials |
| Material Donors | Donors who donate only materials |
| Total Donations | Sum of all donation amounts |
| Pending Requests | Student applications waiting for match |
| Average Donation | Total amount / total donations |

---

## 🎯 Tier System

- 🥉 **Bronze**: ৳0-20,000 or 0-5 donations
- 🥈 **Silver**: ৳20,000-50,000 or 5-10 donations
- 🥇 **Gold**: ৳50,000-100,000 or 10-20 donations
- 💎 **Platinum**: ৳100,000+ or 20+ donations

---

## 🔐 Credentials

### Demo Donors:
```
Zakat Donor:
Email: zakatdonor1@talenttutor.com
Password: Donor@2025
Type: Can donate money + materials

Material Donor:
Email: materialdonor1@talenttutor.com
Password: Donor@2025
Type: Can donate only materials
```

### Admin:
```
Email: admin@talenttutor.com
Password: Admin@2025
Access: Full donor management controls
```

---

## ✅ Feature Checklist

- [x] Two donor types (Zakat & Materials)
- [x] Tier system (Bronze to Platinum)
- [x] Donation recording
- [x] Donor verification
- [x] Student-donor matching
- [x] Analytics dashboard
- [x] Export functionality
- [x] Real-time updates
- [x] Search & filter
- [x] Multi-language (EN/BN)

---

## 📚 Full Documentation

For complete details, see:
- `/DONOR_MANAGEMENT_SYSTEM_COMPLETE.md` (English)
- `/দাতা_ম্যানেজমেন্ট_সিস্টেম_গাইড.md` (বাংলা)

---

## 🚀 Ready to Use!

Your donor management system is **fully functional** and **production-ready**. Start managing donors now! 🎉
