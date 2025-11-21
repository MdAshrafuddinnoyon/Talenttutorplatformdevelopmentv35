# ✅ Login Testing Checklist

## পরীক্ষা করার আগে (Pre-Testing)

### 1. Server Deployment যাচাই করুন
- [ ] Supabase Edge Function "server" deployed আছে
- [ ] Function status "Active" দেখাচ্ছে
- [ ] Database table `kv_store_5b21d3ea` তৈরি হয়েছে

### 2. Environment Variables চেক করুন
- [ ] Project ID: `wkdksiagjwrrocpqkbnh` 
- [ ] Anon Key configured আছে
- [ ] `/utils/supabase/info.tsx` file আছে

## Testing Steps (পরীক্ষার ধাপ)

### পর্যায় ১: API Diagnostics

**পেজ**: `/login-testing`

1. [ ] "Run Diagnostics" বাটনে ক্লিক করুন
2. [ ] নিচের সব tests pass হবে:
   - [ ] ✅ Environment Variables
   - [ ] ✅ API URL Construction  
   - [ ] ✅ Health Endpoint
   - [ ] ✅ Root Endpoint
   - [ ] ✅ CORS Configuration

**Expected Result**: 5/5 tests passed

### পর্যায় ২: Demo Accounts Creation

1. [ ] "Seed Demo Accounts" বাটনে ক্লিক করুন
2. [ ] Loading indicator দেখবেন
3. [ ] Success message আসবে
4. [ ] Created users list দেখবেন:
   - [ ] Admin User (admin@talenttutor.com)
   - [ ] Teacher One (teacher1@talenttutor.com)
   - [ ] Guardian One (guardian1@talenttutor.com)
   - [ ] Student One (student1@talenttutor.com)
   - [ ] Zakat Donor One (zakatdonor1@talenttutor.com)
   - [ ] Material Donor One (materialdonor1@talenttutor.com)

**Expected Result**: 6 টি user তৈরি হবে

### পর্যায় ৩: Load All Users

1. [ ] "Load All Users" বাটনে ক্লিক করুন
2. [ ] Users table দেখবেন
3. [ ] সব 6 জন user list-এ থাকবে
4. [ ] প্রতিটি user-এর role badge দেখবেন

**Expected Result**: 6 users loaded

### পর্যায় ৪: Login Testing

প্রতিটি role-এর জন্য login test করুন:

#### 4.1 Admin Login
1. [ ] "Admin" quick fill button ক্লিক করুন
2. [ ] Email: `admin@talenttutor.com` auto-fill হবে
3. [ ] Password: `Admin@2025` auto-fill হবে
4. [ ] "Test Login" বাটনে ক্লিক করুন
5. [ ] Success message দেখবেন
6. [ ] Response data-তে user object থাকবে
7. [ ] Token generate হবে

**Expected Response**:
```json
{
  "success": true,
  "user": {
    "id": "admin-demo-001",
    "name": "Admin User",
    "email": "admin@talenttutor.com",
    "role": "admin",
    "credits": 0,
    "status": "active"
  },
  "token": "token-admin-..."
}
```

#### 4.2 Teacher Login
1. [ ] "Teacher" quick fill button ক্লিক করুন
2. [ ] Email: `teacher1@talenttutor.com`
3. [ ] Password: `Teacher@2025`
4. [ ] "Test Login" ক্লিক করুন
5. [ ] Success + 50 credits দেখবেন

**Expected**: Success with 50 credits

#### 4.3 Guardian Login
1. [ ] "Guardian" quick fill button
2. [ ] Email: `guardian1@talenttutor.com`
3. [ ] Password: `Guardian@2025`
4. [ ] "Test Login" ক্লিক করুন
5. [ ] Success + 100 credits দেখবেন

**Expected**: Success with 100 credits

#### 4.4 Student Login
1. [ ] "Student" quick fill button
2. [ ] Email: `student1@talenttutor.com`
3. [ ] Password: `Student@2025`
4. [ ] "Test Login" ক্লিক করুন
5. [ ] Success + 0 credits দেখবেন

**Expected**: Success with 0 credits

#### 4.5 Zakat Donor Login
1. [ ] "Zakat Donor" quick fill button
2. [ ] Email: `zakatdonor1@talenttutor.com`
3. [ ] Password: `Donor@2025`
4. [ ] "Test Login" ক্লিক করুন
5. [ ] Success + donorType: 'zakat' দেখবেন

**Expected**: Success with donorType

#### 4.6 Material Donor Login
1. [ ] "Material Donor" quick fill button
2. [ ] Email: `materialdonor1@talenttutor.com`
3. [ ] Password: `Donor@2025`
4. [ ] "Test Login" ক্লিক করুন
5. [ ] Success + donorType: 'materials' দেখবেন

**Expected**: Success with donorType

### পর্যায় ৫: Negative Testing (Error Cases)

#### 5.1 Wrong Password
1. [ ] Email: `admin@talenttutor.com` দিন
2. [ ] Password: `WrongPassword123` দিন
3. [ ] "Test Login" ক্লিক করুন
4. [ ] Error message: "Invalid credentials" দেখবেন

**Expected**: ❌ Login failed with error

#### 5.2 Non-existent User
1. [ ] Email: `nonexistent@test.com` দিন
2. [ ] Password: `Test@2025` দিন
3. [ ] "Test Login" ক্লিক করুন
4. [ ] Error message: "Invalid credentials" দেখবেন

**Expected**: ❌ Login failed with error

#### 5.3 Empty Fields
1. [ ] Email field খালি রাখুন
2. [ ] "Test Login" ক্লিক করুন
3. [ ] Error message দেখবেন

**Expected**: ❌ Validation error

### পর্যায় ৬: Actual Login Page Testing

**পেজ**: `/login`

1. [ ] Navigate to `/login` page
2. [ ] Admin credentials দিন:
   - Email: `admin@talenttutor.com`
   - Password: `Admin@2025`
3. [ ] "Login" বাটনে ক্লিক করুন
4. [ ] Admin Dashboard-এ redirect হবে

**Expected**: Redirect to `/admin-dashboard`

### পর্যায় ৭: Browser Console Testing

Browser console-এ নিচের test করুন:

```javascript
// Test 1: API URL
console.log('API Base:', API_BASE_URL);

// Test 2: Health Check
fetch('https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/health')
  .then(r => r.json())
  .then(d => console.log('Health:', d));

// Test 3: Login
fetch('https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZGtzaWFnandycm9jcHFrYm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTkwMzcsImV4cCI6MjA3ODA5NTAzN30.XJSvM3RJH0KlVkA0HmqZDwDQytdxu1pxJd1SVLgxS_Q'
  },
  body: JSON.stringify({
    emailOrPhone: 'admin@talenttutor.com',
    password: 'Admin@2025'
  })
})
  .then(r => r.json())
  .then(d => console.log('Login:', d));
```

**Expected**: All 3 tests return valid data

## সমস্যা সমাধান (Troubleshooting)

### যদি Diagnostics Fail হয়:

#### "Failed to fetch" error
- [ ] Server deployed আছে কিনা check করুন
- [ ] Function logs দেখুন
- [ ] Network tab-এ CORS error check করুন

#### "Health Endpoint Failed"
- [ ] Function status check করুন dashboard-এ
- [ ] Restart function
- [ ] Redeploy if needed

### যদি Demo Accounts Create না হয়:

- [ ] Database table আছে কিনা verify করুন
- [ ] Function logs check করুন
- [ ] API endpoint URL সঠিক আছে কিনা দেখুন

### যদি Login Fail হয়:

- [ ] Demo accounts আগে create করেছেন কিনা check করুন
- [ ] Credentials সঠিক আছে কিনা verify করুন
- [ ] Browser console-এ error দেখুন

## সফলতার মাপকাঠি (Success Criteria)

✅ **সব tests pass হবে যদি**:
1. API Diagnostics: 5/5 passed
2. Demo Accounts: 6 users created
3. Load Users: 6 users loaded
4. All 6 logins: Successful
5. Negative tests: Proper errors shown
6. Actual login page: Working and redirecting

## পরবর্তী ধাপ (Next Steps)

Login সফল হলে:
1. [ ] Dashboard navigation test করুন
2. [ ] Profile completion test করুন
3. [ ] Credit system test করুন
4. [ ] Role-based access test করুন

---

**Testing Date**: _____________  
**Tester Name**: _____________  
**Result**: ☐ All Passed  ☐ Some Failed  ☐ Failed  
**Notes**: _____________________________________________

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-11-08
