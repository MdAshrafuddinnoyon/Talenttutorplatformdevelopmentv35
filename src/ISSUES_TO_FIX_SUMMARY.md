# 🔧 সমস্যা সমাধানের তালিকা (Issues to Fix)

## ✅ সম্পন্ন (Completed)

### 1. Real Demo Data ✅
- ✅ `/REAL_DEMO_DATA_CREDENTIALS.md` তৈরি হয়েছে
- ✅ ৫ জন শিক্ষক, ৫ জন অভিভাবক, ৫ জন ছাত্র, ৫ জন দাতার credentials
- ✅ সব user এর activities এবং relationships

### 2. DonationLibrary - Single Item Detail ✅
- ✅ Item click করলে detail dialog খুলে
- ✅ সম্পূর্ণ বিবরণ, ছবি, donor info দেখায়
- ✅ Request button কাজ করে

---

## 🚧 সমাধান প্রয়োজন (Pending)

### 3. HomePage - Student Login/Registration Button
**সমস্যা**: ছাত্রদের জন্য "এখনই শুরু করুন" button এ ক্লিক করলে লগইন/রেজিস্ট্রেশন dialog আসছে না

**সমাধান করতে হবে**:
- [ ] HomePage এ Student section খুঁজুন
- [ ] "এখনই শুরু করুন" বা "লগইন করুন" button এ ModernAuthDialog যুক্ত করুন
- [ ] Default role 'student' সেট করুন

---

### 4. GuardianDashboard - Multiple Issues

#### 4.1 আবেদনকারী শিক্ষকদের প্রোফাইল না দেখা
**সমস্যা**: টিউশন পোস্টে যেসব শিক্ষক আবেদন করেছে তাদের প্রোফাইল দেখা যাচ্ছে না

**সমাধান করতে হবে**:
- [ ] GuardianDashboard এ "আবেদনকারী" section তৈরি
- [ ] Server endpoint: GET /tuition-post/:postId/applications
- [ ] প্রতিটি আবেদনে:
  - শিক্ষকের নাম, ছবি, rating
  - বিষয়, অভিজ্ঞতা
  - প্রস্তাবিত fee
  - "প্রোফাইল দেখুন" button
  - "শর্টলিস্ট" button
  - "প্রত্যাখ্যান" button

#### 4.2 শর্টলিস্ট/প্রত্যাখ্যান করা যাচ্ছে না
**সমস্যা**: শর্টলিস্ট ও প্রত্যাখ্যান button কাজ করছে না

**সমাধান করতে হবে**:
- [ ] শর্টলিস্ট function তৈরি করুন
- [ ] Server endpoint: PUT /application/:id/status
- [ ] Status: shortlisted, rejected
- [ ] Notification পাঠানো (শিক্ষককে)

#### 4.3 নতুন টিউশন পোস্ট লিস্ট না হওয়া
**সমস্যা**: নতুন টিউশন পোস্ট করলে "আমার পোস্ট" সেকশনে দেখা যায় না

**সমাধান করতে হবে**:
- [ ] PostTuitionDialog সফল হলে guardian's posts list আপডেট
- [ ] Server endpoint: POST /tuition-posts (already exists, check)
- [ ] Frontend: posts state refresh করুন

#### 4.4 শিক্ষক নিয়োগ করা (২৫ ক্রেডিট কাটা)
**সমস্যা**: শিক্ষক প্রোফাইল থেকে "নিয়োগ করুন" button নেই

**সমাধান করতে হবে**:
- [ ] শিক্ষক প্রোফাইল দেখার dialog/page তৈরি
- [ ] "নিয়োগ করুন" button যুক্ত করুন
- [ ] HiringAgreementDialog open করুন
- [ ] Guardian এর ২৫ ক্রেডিট কাটুন
- [ ] Contract তৈরি করুন
- [ ] Teacher কে notification পাঠান

---

### 5. Contract PDF Download
**সমস্যা**: চুক্তি দেখা যায় কিন্তু PDF download করা যায় না

**সমাধান করতে হবে**:
- [ ] `jsPDF` বা `react-pdf` library ব্যবহার করুন
- [ ] Contract data format করে PDF generate করুন
- [ ] Download button এ click করলে PDF download হবে
- [ ] PDF তে থাকবে:
  - Contract details
  - Guardian info
  - Teacher info
  - Terms & conditions
  - Signatures
  - Date

**Implementation**:
```tsx
import jsPDF from 'jspdf';

const downloadContractPDF = (contract: any) => {
  const doc = new jsPDF();
  
  // Add content
  doc.setFontSize(20);
  doc.text('Tuition Contract', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Contract ID: ${contract.id}`, 20, 40);
  doc.text(`Guardian: ${contract.guardianName}`, 20, 50);
  doc.text(`Teacher: ${contract.teacherName}`, 20, 60);
  doc.text(`Subject: ${contract.subject}`, 20, 70);
  doc.text(`Fee: ৳${contract.fee}/month`, 20, 80);
  
  // Save
  doc.save(`contract-${contract.id}.pdf`);
};
```

---

### 6. Payment Options

#### 6.1 Subscription History না দেখা
**সমস্যা**: Subscription history empty বা load হচ্ছে না

**সমাধান করতে হবে**:
- [ ] Server endpoint: GET /subscriptions/user/:userId
- [ ] Subscription transactions store করুন
- [ ] Frontend এ history table দেখান
- [ ] তথ্য: Date, Plan, Amount, Status, Receipt

#### 6.2 শিক্ষকদের Payment করা
**সমস্যা**: শিক্ষকদের payment করার option ঠিকমত কাজ করছে না

**সমাধান করতে হবে**:
- [ ] Contract এর মধ্যে "Pay Now" button যুক্ত করুন
- [ ] PaymentGatewayDialog open করুন
- [ ] Payment সফল হলে:
  - Teacher কে credit যুক্ত করুন
  - Payment record তৈরি করুন
  - Receipt generate করুন
  - Both parties কে notification পাঠান

---

## 📝 Implementation Priority

### High Priority (Urgent)
1. ✅ DonationLibrary item details (Done)
2. GuardianDashboard - আবেদনকারী প্রোফাইল
3. শিক্ষক নিয়োগ + ২৫ ক্রেডিট কাটা
4. Contract PDF download

### Medium Priority
5. নতুন টিউশন পোস্ট লিস্ট
6. শর্টলিস্ট/প্রত্যাখ্যান
7. Student login/registration button
8. Subscription history

### Low Priority
9. শিক্ষকদের payment system polish

---

## 🔄 Next Steps

### Step 1: GuardianDashboard এ আবেদনকারী section
```tsx
// GuardianDashboard.tsx এ যুক্ত করুন

<TabsContent value="applications">
  <Card>
    <h3>আবেদনকারী শিক্ষকদের তালিকা</h3>
    {applications.map(app => (
      <Card key={app.id}>
        <div className="flex items-center justify-between">
          <div>
            <h4>{app.teacherName}</h4>
            <p>{app.subject} • {app.experience}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => viewProfile(app.teacherId)}>
              প্রোফাইল দেখুন
            </Button>
            <Button onClick={() => shortlist(app.id)}>
              শর্টলিস্ট
            </Button>
            <Button variant="destructive" onClick={() => reject(app.id)}>
              প্রত্যাখ্যান
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </Card>
</TabsContent>
```

### Step 2: Server endpoints যুক্ত করুন
```typescript
// Get applications for a post
app.get("/make-server-5b21d3ea/tuition-post/:postId/applications", async (c) => {
  // Return all applications for this post
});

// Update application status
app.put("/make-server-5b21d3ea/application/:id/status", async (c) => {
  // Update status to shortlisted/rejected
});

// Hire teacher
app.post("/make-server-5b21d3ea/hire-teacher", async (c) => {
  // Deduct 25 credits from guardian
  // Create contract
  // Send notifications
});
```

### Step 3: Contract PDF
```bash
# Install jsPDF
npm install jspdf
```

---

## 🧪 Testing Checklist

### DonationLibrary ✅
- [x] Item click opens detail dialog
- [x] All info displayed correctly
- [x] Request button works

### HomePage
- [ ] Student "এখনই শুরু করুন" opens auth dialog
- [ ] Registration works with role='student'
- [ ] Login redirects to StudentDashboard

### GuardianDashboard
- [ ] Can see applicants for each post
- [ ] Can view teacher profile
- [ ] Can shortlist/reject
- [ ] Notifications sent to teachers
- [ ] New posts appear in "আমার পোস্ট"
- [ ] Can hire teacher from profile
- [ ] 25 credits deducted
- [ ] Contract created
- [ ] PDF download works
- [ ] Subscription history loads
- [ ] Can pay teachers

---

## 🚀 Quick Commands for Testing

```javascript
// Test as Guardian
Email: guardian1@talenttutor.com
Password: Guardian@123

// Test as Teacher  
Email: teacher1@talenttutor.com
Password: Teacher@123

// Test as Student
Email: student1@talenttutor.com
Password: Student@123
```

---

## 📊 Progress Tracking

- ✅ Real demo data created
- ✅ DonationLibrary item details
- 🚧 HomePage student login (30%)
- 🚧 GuardianDashboard applications (0%)
- 🚧 Hire teacher flow (0%)
- 🚧 Contract PDF (0%)
- 🚧 Subscription history (0%)
- 🚧 Teacher payments (0%)

---

## 💡 Notes

- সব endpoints server index.tsx এ যুক্ত করতে হবে
- Frontend components আপডেট করতে হবে
- Real-time data sync ensure করতে হবে
- Error handling যুক্ত করতে হবে
- Success notifications দিতে হবে

---

আপডেট: 2025-01-03
