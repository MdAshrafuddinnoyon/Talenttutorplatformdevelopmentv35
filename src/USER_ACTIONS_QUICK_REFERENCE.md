# 🎯 User Actions Quick Reference - Talent Tutor

## দ্রুত রেফারেন্স গাইড: কে কী করতে পারবে?

---

## 👨‍🏫 শিক্ষক (Teacher)

### করতে পারবে ✅
- Browse tuition posts (সব দেখা)
- Apply to jobs (10 ক্রেডিট)
- Contact guardians (5 ক্রেডিট)
- Send messages (profile complete করার পর)
- View all profiles
- Upload certificates
- Receive notifications
- Purchase credits

### করতে পারবে না ❌
- Post tuition (শুধু guardian)
- Donate (শুধু donor)
- Request books (শুধু student)

**প্রাথমিক ক্রেডিট:** 50 (ফ্রি)

---

## 👨‍👩‍👧 অভিভাবক (Guardian)

### করতে পারবে ✅
- Post tuition (5 ক্রেডিট)
- Browse teachers
- Contact teachers (5 ক্রেডিট)
- View applications
- Hire teachers
- Send messages
- Receive notifications
- Purchase credits

### করতে পারবে না ❌
- Apply to jobs (শুধু teacher)
- Donate (শুধু donor)
- Request books (শুধু student)

**প্রাথমিক ক্রেডিট:** 100 (ফ্রি)

---

## 👦 ছাত্র/অসহায় (Student)

### করতে পারবে ✅
- View all profiles
- Request books from library
- Submit help applications
- View donation library
- Receive notifications

### করতে পারবে না ❌
- Contact teachers/guardians
- Send messages
- Post/Apply tuition
- Purchase credits (দরকার নেই)

**প্রাথমিক ক্রেডিট:** 0 (ক্রেডিট সিস্টেম নেই)

---

## 🔧 অ্যাডমিন (Admin)

### সব কিছু করতে পারবে ✅
- Manage all users
- Blog management
- Tuition moderation
- Credit management
- Donation management
- Library management
- Support tickets
- Analytics dashboard
- Broadcast notifications
- Contact anyone (free)

**বিশেষ ক্ষমতা:** সব access, কোনো restrictions নেই

---

## 💝 দাতা (Donor)

### করতে পারবে ✅
- Make donations (টাকা/বই)
- View student requests
- Select recipients
- Download certificates
- View impact reports
- Receive notifications

### করতে পারবে না ❌
- Contact teachers/guardians
- Send messages (donation ছাড়া)
- Post/Apply tuition
- Purchase credits (দরকার নেই)

**প্রাথমিক ক্রেডিট:** 0 (donation এ ক্রেডিট লাগে না)

---

## 💳 ক্রেডিট চার্জ

| কাজ | Teacher | Guardian |
|-----|---------|----------|
| Contact | 5 | 5 |
| Apply Job | 10 | - |
| Post Job | - | 5 |
| Message (first) | 5 | 5 |
| Message (after) | Free | Free |

---

## 📞 কে কাকে Contact করতে পারবে?

```
Teacher → Guardian ✅ (5 credits)
Guardian → Teacher ✅ (5 credits)
Student → Anyone ❌ (ticket system use করবে)
Admin → Anyone ✅ (free)
Donor → Student ✅ (donation এর মাধ্যমে)

Teacher → Teacher ❌
Guardian → Guardian ❌
Anyone → Student ❌ (শুধু admin/donor)
```

---

## 🔔 Notification পাবে কে?

| Event | Recipients |
|-------|-----------|
| New Job Posted | Teachers, Admin |
| Application Received | Guardian, Admin |
| Application Accepted | Teacher, Admin |
| New Message | Sender, Receiver |
| Credit Low | Teacher, Guardian |
| Donation Received | Student, Admin, Donor |
| Book Request | Admin, Donor |
| System Alert | Everyone |

---

## 🎯 Quick Decision Table

### "আমি contact করতে চাই"
```
আপনি কে?
├─ Teacher
│  └─ কাকে? Guardian → ✅ (5 credits + profile complete)
│
├─ Guardian  
│  └─ কাকে? Teacher → ✅ (5 credits + profile complete)
│
├─ Student
│  └─ কাকে? Anyone → ❌ (ticket system use করুন)
│
├─ Admin
│  └─ কাকে? Anyone → ✅ (free)
│
└─ Donor
   └─ কাকে? Student only → ✅ (donation মাধ্যমে)
```

### "আমি tuition post করতে চাই"
```
আপনি কে?
├─ Teacher → ❌ (শুধু apply করতে পারবেন)
├─ Guardian → ✅ (5 credits + profile complete)
├─ Student → ❌
├─ Admin → ✅ (free, testing জন্য)
└─ Donor → ❌
```

### "আমি message পাঠাতে চাই"
```
Profile complete?
├─ Yes → ✅ (first contact এ credit লাগবে)
└─ No → ❌ (প্রথমে profile complete করুন)
```

---

## ⚡ Real-time Features

### স্বয়ংক্রিয় Update:
- 🔄 Tuition posts (প্রতি 5 সেকেন্ড)
- 🔔 Notifications (প্রতি 3 সেকেন্ড)
- 💬 Messages (প্রতি 2 সেকেন্ড)
- 📝 Blog posts (প্রতি 10 সেকেন্ড)
- 📚 Library (প্রতি 10 সেকেন্ড)

### কখন Refresh হবে:
- নতুন job post হলে → Automatically
- নতুন message এলে → Automatically + sound
- নতুন notification → Automatically + badge update
- Application submit করলে → Instant update

---

## 🎓 Profile Completion কেন দরকার?

### Locked Without Profile:
- ❌ Contact করতে পারবেন না
- ❌ Message পাঠাতে পারবেন না
- ❌ Tuition apply/post করতে পারবেন না
- ❌ Book request করতে পারবেন না
- ❌ Donation করতে পারবেন না

### Unlocked After Profile:
- ✅ সব features access
- ✅ Contact permissions
- ✅ Messaging enabled
- ✅ Application submit
- ✅ Full platform access

---

## 💡 Pro Tips

### Teacher Tips:
1. Profile complete করুন → 50 credits পাবেন
2. Certificates upload করুন → বেশি jobs পাবেন
3. Credits শেষ হলে → Package কিনুন (10 টাকা থেকে শুরু)

### Guardian Tips:
1. Profile complete করুন → 100 credits পাবেন
2. Urgent post করুন → দ্রুত teachers পাবেন
3. Multiple teachers contact করুন → Best match খুঁজুন

### Student Tips:
1. Profile ভালো করে fill up করুন
2. Help application details এ লিখুন
3. Guardian info দিন
4. Regular check করুন donation status

### Donor Tips:
1. Donor type select করুন (Zakat/Sadaqah/Books)
2. Student profiles দেখুন
3. Verified students কে সাহায্য করুন
4. Certificate download করুন tax benefits এর জন্য

---

## 📱 Mobile vs Desktop

### সব features available:
- ✅ Mobile - Full functionality
- ✅ Tablet - Optimized layout
- ✅ Desktop - Best experience

### Real-time works on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🔒 Security Rules

### Password Requirements:
- Minimum 8 characters
- Mix of letters & numbers (recommended)

### Profile Verification:
- NID upload (teachers)
- Phone verification
- Email verification

### Payment Security:
- SSL encrypted
- bKash/Nagad/Rocket supported
- No card details stored

---

## ❓ Quick FAQ

**Q: ক্রেডিট শেষ হলে কী করব?**  
A: Settings → Credit Purchase → Package select → Pay

**Q: Profile complete না করলে কী হবে?**  
A: Contact/Message করতে পারবেন না

**Q: Real-time update দেখছি না কেন?**  
A: Page refresh করুন অথবা 5 সেকেন্ড wait করুন

**Q: Student কীভাবে contact করবে?**  
A: Ticket system ব্যবহার করবে (Help → Create Ticket)

**Q: Donor কাকে সাহায্য করবে?**  
A: Student requests দেখবে → Select recipient → Donate

---

**Last Updated:** November 7, 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready
