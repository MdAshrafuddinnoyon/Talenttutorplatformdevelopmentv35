# Teacher Dashboard Testing Guide 🧪

## Step-by-Step Testing Instructions

---

## 1️⃣ Login as Teacher

### Steps:
1. Navigate to homepage
2. Click "লগইন" button
3. Select "শিক্ষক/Teacher" tab
4. Use test credentials:
   ```
   Email: teacher@example.com
   Password: teacher123
   ```
5. Click "লগইন করুন"

### Expected Result:
- ✅ Redirected to Teacher Dashboard
- ✅ Shows "স্বাগতম, [Teacher Name]!"
- ✅ Credit balance shows 50 (or saved amount)
- ✅ Stats cards display properly

---

## 2️⃣ Test Job Application Flow

### Scenario A: Apply for a Job

**Steps:**
1. Click "টিউশন খুঁজুন" button (or browse from homepage)
2. Find a tuition post
3. Click "বিস্তারিত দেখুন"
4. Review job details
5. Click "আবেদন করুন (২ ক্রেডিট)"
6. Confirm application

**Expected Result:**
- ✅ Credit balance decreases by 2
- ✅ Toast notification: "আবেদন সফল হয়েছে!"
- ✅ Application appears in "আমার আবেদন" tab
- ✅ Status shows "বিবেচনাধীন"

### Scenario B: Low Credit Warning

**Steps:**
1. Reduce credits to less than 2 (or apply multiple times)
2. Try to apply for a job
3. Check error message

**Expected Result:**
- ✅ Toast error: "পর্যাপ্ত ক্রেডিট নেই। অনুগ্রহ করে ক্রেডিট কিনুন।"
- ✅ Redirected to Credits tab (optional)

---

## 3️⃣ Test My Applications Tab

### Steps:
1. Click "আমার আবেদন" from sidebar
2. Check application list
3. Verify filter options
4. Test "Withdraw" button (if implemented)
5. Click on an application to view details

**Expected Result:**
- ✅ Shows all submitted applications
- ✅ Correct status badges (pending/shortlisted/hired/rejected)
- ✅ Application date displayed
- ✅ Job details visible
- ✅ Filter works properly

### Status Meanings:
- 🟡 **বিবেচনাধীন (Pending)**: Guardian reviewing
- 🟢 **শর্টলিস্টেড (Shortlisted)**: Selected for interview
- 🔵 **নিয়োগপ্রাপ্ত (Hired)**: Hired for the job
- 🔴 **প্রত্যাখ্যাত (Rejected)**: Application rejected

---

## 4️⃣ Test Credit Purchase System

### Steps:
1. Click "ক্রেডিট" from sidebar
2. View current balance
3. Select a package:
   - Starter: 100 credits for ৳500
   - Pro: 300 credits for ৳1,200
   - Golden: 500 credits for ৳1,800
4. Click "কিনুন" button
5. Payment dialog opens

### Test Payment Methods:

#### A. bKash Payment
1. Select "bKash"
2. Choose account type (Personal/Agent/Merchant)
3. Enter mobile number: `01712345678`
4. Enter amount: Auto-filled
5. Click "পেমেন্ট করুন"
6. Enter OTP: `123456` (demo)
7. Click "নিশ্চিত করুন"

**Expected Result:**
- ✅ Payment success toast
- ✅ Credits added to balance
- ✅ Updated balance shown
- ✅ Dialog closes

#### B. Nagad Payment
1. Select "Nagad"
2. Enter mobile number: `01812345678`
3. Enter PIN: `1234` (demo)
4. Click "পেমেন্ট করুন"

**Expected Result:**
- ✅ Payment success
- ✅ Credits updated
- ✅ Receipt downloadable

#### C. Rocket Payment
1. Select "Rocket"
2. Enter account number: `01912345678`
3. Enter PIN: `1234` (demo)
4. Click "পেমেন্ট করুন"

**Expected Result:**
- ✅ Payment success
- ✅ Credits added
- ✅ Balance saved

---

## 5️⃣ Test Payment Tracking

### Steps:
1. Click "পেমেন্ট" from sidebar
2. View earnings summary:
   - Total Earned
   - Total Pending
   - Lifetime Earnings
3. Check payment history table
4. Verify student/guardian names
5. Check payment status

**Expected Result:**
- ✅ Summary cards display correct amounts
- ✅ Payment table populated
- ✅ Month-wise breakdown visible
- ✅ Status badges correct (Paid/Pending/Overdue)

---

## 6️⃣ Test Contract Management

### Steps:
1. Click "চুক্তি" from sidebar
2. View active contracts
3. Check pending contracts
4. Click "Sign Contract" on a pending one
5. Review contract terms
6. Click signature pad
7. Draw signature
8. Click "চুক্তি স্বাক্ষর করুন"

**Expected Result:**
- ✅ Contract list displays
- ✅ Active/Pending/Completed tabs work
- ✅ Signature dialog opens
- ✅ Signature captured
- ✅ Contract status updates to "Active"
- ✅ Toast: "চুক্তি সফলভাবে স্বাক্ষরিত হয়েছে!"

---

## 7️⃣ Test Messaging System

### Steps:
1. Click "মেসেজ" from sidebar
2. View conversation list
3. Click on a conversation
4. Read messages
5. Type a new message
6. Click send
7. Check unread counter
8. Test file attachment (if available)

**Expected Result:**
- ✅ Conversation list displays
- ✅ Unread count shows
- ✅ Messages load properly
- ✅ New message sent
- ✅ Real-time update (if implemented)
- ✅ File attachment works

---

## 8️⃣ Test Profile Management

### Steps:
1. Click "প্রোফাইল" from sidebar
2. View current profile info
3. Click camera icon on profile photo
4. Upload new image
5. Edit personal information:
   - Name
   - Phone number
   - Address
   - Bio
   - Education
   - Experience
   - Subjects
6. Click "সংরক্ষণ করুন"

**Expected Result:**
- ✅ Profile photo updates
- ✅ All fields editable
- ✅ Save button works
- ✅ Toast: "প্রোফাইল সফলভাবে আপডেট হয়েছে!"
- ✅ Changes persist on refresh

### Test Password Change:
1. Scroll to password section
2. Enter current password
3. Enter new password
4. Confirm new password
5. Click "পাসওয়ার্ড পরিবর্তন করুন"

**Expected Result:**
- ✅ Validation works
- ✅ Password updated
- ✅ Toast: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!"

---

## 9️⃣ Test Progress Reports

### Steps:
1. Click "প্রগতি রিপোর্ট" from sidebar
2. View student list
3. Click "রিপোর্ট যোগ করুন" on a student
4. Fill report form:
   - Performance rating
   - Comments
   - Monthly progress
5. Click "জমা দিন"

**Expected Result:**
- ✅ Student list displays
- ✅ Progress bars show
- ✅ Report dialog opens
- ✅ Form validation works
- ✅ Report submitted
- ✅ Toast confirmation
- ✅ Last updated date changes

---

## 🔟 Test Support System

### Steps:
1. Click "সাপোর্ট" from sidebar
2. Read admin notices
3. Click "নতুন টিকেট" button
4. Fill ticket form:
   - Subject
   - Priority (Low/Medium/High/Critical)
   - Category
   - Description
   - Attachment (optional)
5. Click "টিকেট তৈরি করুন"

**Expected Result:**
- ✅ Admin notices visible
- ✅ Ticket dialog opens
- ✅ All fields work
- ✅ File upload works
- ✅ Ticket created
- ✅ Ticket ID generated
- ✅ Toast: "টিকেট সফলভাবে তৈরি হয়েছে!"

---

## 1️⃣1️⃣ Test Notifications

### Steps:
1. Click notification bell icon (🔔)
2. View notification list
3. Click on a notification
4. Mark as read
5. Click "সব পরিষ্কার করুন"

**Expected Result:**
- ✅ Notification dropdown opens
- ✅ Unread count shows
- ✅ Notifications listed
- ✅ Clicking navigates to relevant page
- ✅ Mark as read works
- ✅ Clear all works

### Notification Types:
- 📩 New message from guardian
- 📝 Application status update
- 💰 Payment received
- 📋 Contract signed
- 🎯 New matched job
- ⚠️ Low credit warning

---

## 1️⃣2️⃣ Test Review System

### Steps:
1. Go to Payment or Student section
2. Find a guardian you worked with
3. Click "রিভিউ দিন" button
4. Rate with stars (1-5)
5. Write comment
6. Click "রিভিউ জমা দিন"

**Expected Result:**
- ✅ Review dialog opens
- ✅ Star rating works
- ✅ Comment field active
- ✅ Review submitted
- ✅ Toast: "রিভিউ সফলভাবে জমা হয়েছে!"

---

## 1️⃣3️⃣ Test Profile Completion

### Steps:
1. View dashboard
2. Check profile completion card
3. Note current percentage (e.g., 65%)
4. Click "প্রোফাইল সম্পূর্ণ করুন"
5. Complete missing fields
6. Save changes
7. Return to dashboard

**Expected Result:**
- ✅ Completion percentage shows
- ✅ Dialog opens with checklist
- ✅ Missing items highlighted
- ✅ Percentage updates after completion
- ✅ Alert disappears at 100%

---

## 🔄 Edge Cases to Test

### 1. No Internet Connection
- Try actions offline
- Check error messages
- Verify retry mechanism

### 2. Session Timeout
- Leave page idle for 30 minutes
- Try to perform action
- Check auto-logout

### 3. Insufficient Credits
- Apply with 0 credits
- Verify error handling
- Check redirect to credits page

### 4. Invalid Input
- Submit forms with empty fields
- Enter invalid phone numbers
- Test special characters

### 5. Concurrent Actions
- Open multiple tabs
- Make changes in both
- Check data sync

---

## 📱 Responsive Testing

### Mobile (< 768px)
- [ ] Sidebar becomes hamburger menu
- [ ] Stats cards stack vertically
- [ ] Tables scroll horizontally
- [ ] Buttons full width
- [ ] Forms responsive

### Tablet (768px - 1024px)
- [ ] 2-column layout
- [ ] Compact sidebar
- [ ] Medium-sized cards
- [ ] Readable text

### Desktop (> 1024px)
- [ ] Full sidebar visible
- [ ] Multi-column grids
- [ ] Large cards
- [ ] Optimal spacing

---

## 🎨 UI/UX Checks

- [ ] All Bengali text renders properly (Noto Serif Bengali)
- [ ] English text uses Libre Franklin
- [ ] Colors consistent (emerald/teal gradient)
- [ ] Icons display correctly (Lucide React)
- [ ] Animations smooth (Motion/React)
- [ ] Loading states show
- [ ] Error states handled
- [ ] Empty states designed
- [ ] Toast notifications appear
- [ ] Dialogs centered and modal

---

## 🐛 Common Issues & Solutions

### Issue: Credits not updating
**Solution:** Check localStorage, clear cache, re-login

### Issue: Applications not showing
**Solution:** Verify filter settings, check date range

### Issue: Payment fails
**Solution:** Use test credentials, check network, retry

### Issue: Messages not sending
**Solution:** Check contract status, verify recipient

### Issue: Profile changes not saving
**Solution:** Ensure all required fields filled, check validation

---

## ✅ Final Checklist

Before marking as complete, ensure:

- [ ] All tabs accessible
- [ ] All buttons functional
- [ ] All forms validate
- [ ] All dialogs open/close
- [ ] All notifications work
- [ ] All payments process
- [ ] All data persists
- [ ] All errors handled
- [ ] All UI responsive
- [ ] All fonts correct
- [ ] All colors consistent
- [ ] All animations smooth

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

✅ PASSED | ❌ FAILED | ⚠️ ISSUES

1. Login: ___
2. Job Applications: ___
3. Credit Purchase: ___
4. Payment Tracking: ___
5. Contracts: ___
6. Messaging: ___
7. Profile: ___
8. Progress Reports: ___
9. Support: ___
10. Notifications: ___
11. Reviews: ___
12. Responsive: ___

Notes:
_______________________________
_______________________________
_______________________________
```

---

## 🚀 Ready for Production?

After completing all tests and fixing any issues:

1. ✅ All features working
2. ✅ No critical bugs
3. ✅ UI/UX polished
4. ✅ Performance optimized
5. ✅ Mobile responsive
6. ✅ Data persistent
7. ✅ Error handling robust
8. ✅ Security measures in place

**Status: READY FOR DEPLOYMENT! 🎉**
