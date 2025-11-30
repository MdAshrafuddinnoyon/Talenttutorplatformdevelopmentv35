# 🧪 Teacher Dashboard Testing Guide

## দ্রুত টেস্ট করার পদ্ধতি

### ১. প্রথম লগইন
```bash
# Browser এ যান
http://localhost:5173

# Login credentials
Email: karim@teacher.demo
Password: teacher123

# অথবা নতুন teacher account তৈরি করুন
```

### ২. Dashboard Load হচ্ছে কিনা Check করুন

**Console এ দেখবেন:**
```
✅ Teacher Dashboard initialized with stats: {totalApplications: 2, shortlisted: 1, ...}
✅ Credits refreshed: 50
```

**UI তে দেখবেন:**
```
┌─────────────────────────────────────┐
│  স্বাগতম, মোঃ করিম উদ্দিন!         │
│  আপনার আজকের সংক্ষিপ্ত তথ্য        │
└─────────────────────────────────────┘

Stats Cards:
┌──────────┬──────────┬──────────┬──────────┐
│ ক্রেডিট  │  আবেদন   │শর্টলিস্ট│  রেটিং  │
│   50     │    2     │    1     │  4.8⭐  │
└──────────┴──────────┴──────────┴──────────┘
```

---

### ৩. Apply to Tuition Test

**Steps:**
1. "টিউশন খুঁজুন" tab এ click করুন
2. যেকোনো job এ "আবেদন করুন" button click করুন
3. Proposal লিখুন (যেমন: "আমি ৫ বছরের অভিজ্ঞ শিক্ষক")
4. Expected Salary লিখুন (যেমন: 8000)
5. "জমা দিন" click করুন

**Expected Results:**
```
Console:
🔄 Credits update event received
✅ Credits refreshed: 40
🔄 Applications update event received
✅ Stats refreshed: {totalApplications: 3, ...}
✅ Application submitted successfully

Toast Notification:
✅ আবেদন সফলভাবে জমা হয়েছে! 10 ক্রেডিট কাটা হয়েছে।

UI Updates (No refresh needed!):
- Credits: 50 → 40
- আবেদন: 2 → 3
```

---

### ৪. My Applications Tab Test

**Steps:**
1. "আমার আবেদন" tab এ click করুন
2. আপনার সব applications দেখবেন

**Expected Results:**
```
Applications List:
┌────────────────────────────────────────┐
│ গণিত শিক্ষক - ক্লাস ৯                 │
│ 📍 বনানী, ঢাকা                        │
│ 📅 ২ দিন আগে                          │
│ 🟡 শর্টলিস্টেড                        │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│ বিজ্ঞান টিউটর - ক্লাস ৭              │
│ 📍 উত্তরা, ঢাকা                       │
│ 📅 ৫ দিন আগে                          │
│ 🔵 বিবেচনাধীন                        │
└────────────────────────────────────────┘
```

---

### ৫. Credit Purchase Test

**Steps:**
1. Header এ "ক্রেডিট কিনুন" button click করুন
2. যেকোনো package select করুন (যেমন: Basic - 250 credits)
3. Payment method select করুন
4. Mock payment complete করুন

**Expected Results:**
```
Console:
✅ Credits refreshed: 290 (40 + 250)

Toast:
✅ 250 ক্রেডিট সফলভাবে যোগ হয়েছে!

UI Update:
- Header credit: 40 → 290
- Dashboard credit card: 40 → 290
```

---

### ৬. Stats Real-time Update Test

**Test Scenario:**
```
Initial State:
- Credits: 50
- Applications: 2
- Shortlisted: 1

Action 1: Apply to Job
Result:
- Credits: 40 ✓
- Applications: 3 ✓

Action 2: Buy 100 Credits
Result:
- Credits: 140 ✓
- Applications: 3 ✓

Action 3: Apply to Another Job
Result:
- Credits: 130 ✓
- Applications: 4 ✓
```

---

## 🔍 Debug Checklist

### যদি Stats Update না হয়:

**Check 1: Console Logs**
```javascript
// Browser Console এ type করুন:
localStorage.getItem('teacher_applications_' + currentUserId)

// Should return: JSON string with applications
```

**Check 2: Event Listeners**
```javascript
// Console এ check করুন:
window.dispatchEvent(new Event('applicationsUpdated'))

// Console log দেখা উচিত:
// 🔄 Applications update event received
```

**Check 3: Service Import**
```javascript
// TeacherDashboard.tsx এ check করুন:
const { getTeacherStats } = require('../utils/teacherDashboardService');
console.log('Stats:', getTeacherStats('your-user-id'));
```

---

## 🎯 Feature Verification Matrix

| Feature | Status | Test Method |
|---------|--------|-------------|
| Load Credits | ✅ | Check header & dashboard card |
| Load Stats | ✅ | Check 4 stats cards |
| Apply to Tuition | ✅ | Click apply, check credits decrease |
| Real-time Credit Update | ✅ | Credits update without refresh |
| Real-time Stats Update | ✅ | Stats update without refresh |
| Applications List | ✅ | Check "আমার আবেদন" tab |
| Demo Data Init | ✅ | First login shows 2 applications |
| Credit Purchase | ✅ | Buy credits, balance increases |
| Event Dispatching | ✅ | Console shows event logs |
| Toast Notifications | ✅ | Success/error messages appear |

---

## 📊 Expected Console Output

### On Dashboard Load:
```
✅ Teacher Dashboard initialized with stats: {
  totalApplications: 2,
  shortlisted: 1,
  hired: 1,
  rating: 4.8,
  totalEarned: 16000,
  pendingPayments: 21000
}
✅ Credits refreshed: 50
```

### On Apply to Tuition:
```
🔄 Credits update event received
✅ Credits refreshed: 40
🔄 Applications update event received  
✅ Stats refreshed: {totalApplications: 3, ...}
✅ Application saved: {id: "app-xxx", title: "...", ...}
✅ Application submitted successfully
```

### On Credit Purchase:
```
🔄 Credits update event received
✅ Credits refreshed: 140
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Stats showing 0
**Solution:**
```javascript
// Browser console:
const teacherId = 'your-teacher-id';
const { initializeDemoData } = require('./utils/teacherDashboardService');
initializeDemoData(teacherId);
// Reload page
```

### Issue 2: Credits not updating
**Solution:**
```javascript
// Check if event listener is attached:
// Should see log when you do this in console:
window.dispatchEvent(new Event('creditsUpdated'));
// If no log appears, refresh page
```

### Issue 3: LocalStorage full
**Solution:**
```javascript
// Clear all teacher data:
Object.keys(localStorage)
  .filter(key => key.startsWith('teacher_'))
  .forEach(key => localStorage.removeItem(key));
// Reload page
```

---

## ✅ Success Criteria

আপনার Dashboard সঠিকভাবে কাজ করছে যদি:

- [x] Credits header এ দেখা যাচ্ছে
- [x] Stats cards real data দেখাচ্ছে
- [x] Apply করলে credits কমছে
- [x] Stats real-time update হচ্ছে
- [x] Console এ ✅ logs দেখা যাচ্ছে
- [x] Toast notifications আসছে
- [x] Page refresh ছাড়াই update হচ্ছে
- [x] Applications tab এ list দেখা যাচ্ছে
- [x] Demo data load হচ্ছে প্রথম login এ

---

## 🚀 Performance Check

```javascript
// Console এ run করুন:
console.time('Stats Load');
const { getTeacherStats } = require('./utils/teacherDashboardService');
const stats = getTeacherStats('teacher-id');
console.timeEnd('Stats Load');
// Should be < 10ms
```

---

**Happy Testing!** 🎉

যদি সব ঠিকমতো কাজ করে, তাহলে আপনার Teacher Dashboard fully functional এবং real-time! 🚀

