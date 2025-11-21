# 🔐 Talent Tutor - Demo Login Credentials

## ✅ Login System Status
- ✅ Supabase Auth সম্পূর্ণভাবে সংযুক্ত
- ✅ Database এর সাথে সংযোগ স্থাপিত
- ✅ Demo users automatically initialize হবে
- ✅ Invalid credentials এর জন্য proper error messages

---

## 📧 Demo Account Credentials

### 🔹 Admin Account
- **Email:** `admin@talenttutor.com`
- **Password:** `Admin@2025`
- **Role:** Admin
- **Features:** Full system access, user management, analytics

---

### 🔹 Teacher Account
- **Email:** `teacher1@talenttutor.com`
- **Password:** `Teacher@2025`
- **Role:** Teacher
- **Credits:** 50 (Free)
- **Features:** Post tuition applications, apply to jobs, messaging

---

### 🔹 Guardian Account
- **Email:** `guardian1@talenttutor.com`
- **Password:** `Guardian@2025`
- **Role:** Guardian
- **Credits:** 100 (Free)
- **Features:** Post tuition jobs, browse teachers, hire tutors

---

### 🔹 Student Account
- **Email:** `student1@talenttutor.com`
- **Password:** `Student@2025`
- **Role:** Student
- **Credits:** 0
- **Features:** Apply for help, receive donations, profile completion

---

### 🔹 Zakat Donor Account
- **Email:** `zakatdonor1@talenttutor.com`
- **Password:** `Donor@2025`
- **Role:** Donor (Zakat)
- **Features:** Give zakat donations, help students, track impact

---

### 🔹 Material Donor Account
- **Email:** `materialdonor1@talenttutor.com`
- **Password:** `Donor@2025`
- **Role:** Donor (Materials)
- **Features:** Donate books and educational materials

---

## 🚀 How to Login

1. **Go to Homepage** - Navigate to the main page
2. **Click Login** - Click on "লগইন" / "Login" button in the header
3. **Select User Type** - Choose your role (Teacher, Guardian, Student, Admin, or Donor)
4. **Enter Credentials** - Use email and password from above
5. **Login** - Click "লগইন করুন" / "Login" button

---

## 🔄 Auto-Initialization

Demo users are **automatically created** on first application load:
- Server checks if demo users exist
- If not found, creates them in Supabase Auth
- User profiles are stored in database
- Process is logged in browser console

---

## ⚠️ Error Messages

### If you see "Invalid login credentials":
✅ **Check your email** - Make sure it's exactly as shown above
✅ **Check your password** - Case-sensitive, must match exactly
✅ **Check role selection** - Must select correct user type before login
✅ **Internet connection** - Ensure stable internet connection

### Common Issues:
- **"This account is registered as X"** - You selected wrong role, choose correct one
- **"No account found"** - Email doesn't exist, check spelling or register
- **"Failed to login"** - Network issue, refresh page and try again

---

## 🔧 Technical Details

### Database Configuration
- **Supabase URL:** `https://wkdksiagjwrrocpqkbnh.supabase.co`
- **Auth Provider:** Supabase Auth
- **Data Storage:** KV Store in Supabase Postgres
- **Email Confirmation:** Auto-confirmed for demo users

### Server Endpoints
- **Init Demo Data:** `POST /make-server-5b21d3ea/init-demo-data`
- **Login:** Handled by `authService.login()` → Supabase Auth
- **Register:** `POST /make-server-5b21d3ea/auth/register`

---

## 📝 Notes

1. **Production Ready:** This system is fully production-ready with real Supabase backend
2. **No Mock Data:** All authentication goes through actual Supabase Auth service
3. **Persistent Sessions:** Login sessions are stored and restored on page reload
4. **Role-Based Access:** Each role has specific dashboard and permissions
5. **Credit System:** Teachers and Guardians get free credits on registration

---

## 🎯 Next Steps After Login

### For Teachers:
1. Browse available tuition jobs
2. Apply to jobs (costs 5 credits per application)
3. Manage applications and contracts
4. Message with guardians

### For Guardians:
1. Post tuition jobs (costs 10 credits)
2. Browse teacher profiles
3. Hire teachers for contracts
4. Manage active contracts

### For Students:
1. Complete profile
2. Submit help applications
3. Receive donations from donors
4. Track received help

### For Admin:
1. Manage all users
2. View analytics
3. Handle support tickets
4. Monitor platform activity

### For Donors:
1. View student applications
2. Make donations
3. Track donation impact
4. Download certificates

---

## 📞 Support

If you encounter any issues:
1. Check browser console for error messages
2. Clear browser cache and localStorage
3. Refresh the page
4. Try a different demo account
5. Check internet connection

---

**Last Updated:** November 8, 2025  
**System Version:** 1.0.0  
**Auth System:** Supabase Auth (Fully Integrated)
