# 🚨 Edge Function Deployment Required

## ⚠️ Current Issue

```
Error fetching tuition posts: TypeError: Failed to fetch
```

এই error টি দেখাচ্ছে যে **Supabase Edge Function এখনও deploy করা হয়নি।**

---

## 🎯 সমাধান: Edge Function Deploy করুন

### কেন এটি প্রয়োজন?

Talent Tutor platform টি **3-tier architecture** ব্যবহার করে:

```
Frontend (React) → Server (Edge Function) → Database (Supabase KV Store)
```

আপনার **Server** layer এখনও deploy করা হয়নি, তাই frontend server এর সাথে connect করতে পারছে না।

---

## 📋 Deployment Steps

### Method 1: Supabase CLI (Recommended)

#### Step 1: Install Supabase CLI

```bash
# macOS / Linux
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# npm (any platform)
npm install -g supabase
```

#### Step 2: Login to Supabase

```bash
supabase login
```

এটি browser open করবে - আপনার Supabase account দিয়ে login করুন।

#### Step 3: Link to Your Project

```bash
supabase link --project-ref wkdksiagjwrrocpqkbnh
```

যদি project reference জিজ্ঞেস করে:
- **Project ID:** `wkdksiagjwrrocpqkbnh`

#### Step 4: Deploy Edge Function

```bash
supabase functions deploy server
```

এটি `/supabase/functions/server/` folder টি deploy করবে।

#### Step 5: Verify Deployment

Deployment success হলে এই URL visit করুন:

```
https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/health
```

আপনার দেখা উচিত:
```json
{
  "status": "ok",
  "message": "Talent Tutor Server is running",
  "timestamp": "2025-11-09T...",
  "version": "1.0.0"
}
```

---

### Method 2: Supabase Dashboard (Manual)

যদি CLI না চান, manual deploy করতে পারেন:

#### Step 1: Dashboard খুলুন

🔗 https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/functions

#### Step 2: New Function তৈরি করুন

1. **"Create a new function"** click করুন
2. **Function name:** `server`
3. **Create function** click করুন

#### Step 3: Code Upload করুন

এই files গুলো upload করতে হবে:

```
/supabase/functions/server/
  ├── index.tsx
  ├── dataRoutes.tsx
  └── kv_store.tsx
```

**⚠️ Important:** 
- `index.tsx` হবে main entry point
- অন্য files গুলো import হবে

#### Step 4: Deploy করুন

Dashboard এ **"Deploy"** button click করুন।

#### Step 5: Environment Variables Set করুন

Dashboard → Settings → Edge Functions → Environment Variables:

```
SUPABASE_URL (already set by system)
SUPABASE_SERVICE_ROLE_KEY (already set by system)
SUPABASE_ANON_KEY (already set by system)
```

এগুলো Supabase automatically set করে, manually করার দরকার নেই।

---

## ✅ Verification করুন

### Test 1: Health Check

Browser console এ:

```javascript
const projectId = 'wkdksiagjwrrocpqkbnh';
const baseUrl = `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea`;

fetch(`${baseUrl}/health`)
  .then(r => r.json())
  .then(d => console.log('✅ Health:', d))
  .catch(e => console.error('❌ Error:', e));
```

**Expected:** 
```json
{ "status": "ok", "message": "Talent Tutor Server is running" }
```

### Test 2: Tuition Posts Endpoint

```javascript
const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // from /utils/supabase/info.tsx

fetch(`${baseUrl}/tuition-posts`, {
  headers: { 
    'Authorization': `Bearer ${publicAnonKey}`,
    'Content-Type': 'application/json'
  }
})
  .then(r => r.json())
  .then(d => console.log('✅ Tuition Posts:', d))
  .catch(e => console.error('❌ Error:', e));
```

**Expected:** 
```json
{
  "success": true,
  "posts": []
}
```

---

## 🔧 Common Issues

### Issue 1: "Function not found"

**Error:** 404 Not Found

**Solution:** 
- Edge Function deploy হয়নি
- Function name ভুল (should be exactly "server")
- Re-deploy করুন

### Issue 2: "Invalid API key"

**Error:** 401 Unauthorized

**Solution:**
- `/utils/supabase/info.tsx` তে check করুন `publicAnonKey` correct আছে কিনা
- Supabase Dashboard → Settings → API → anon public key copy করুন

### Issue 3: "CORS error"

**Error:** CORS policy blocked

**Solution:**
- Edge Function এ CORS headers আছে কিনা check করুন
- `/supabase/functions/server/index.tsx` line 90-99 দেখুন
- Re-deploy করুন

### Issue 4: "TypeError: Failed to fetch"

**Error:** Network request failed

**Solution:**
- Edge Function deploy করা হয়নি
- URL ভুল আছে
- Network connectivity check করুন
- এই guide follow করুন

---

## 📊 Current System Status

### ✅ What's Working:

- Frontend application (React)
- Static fallback data
- All UI components
- Routing and navigation
- Supabase client setup
- Authentication flow (client-side)

### ❌ What's NOT Working (Until Deployment):

- Backend API calls
- Database operations (KV Store)
- Real-time data
- User registration (server-side)
- Tuition posts from database
- Teachers profiles from database

### 🟡 What Happens Now:

Application **gracefully degrades** to use:
- Static tuition posts
- Static teacher profiles
- Local fallback data
- Mock mode if needed

**No crashes or errors visible to users** - but real database functionality is disabled.

---

## 🎯 After Deployment

একবার Edge Function deploy হলে:

### ✅ Will Start Working:

1. **Real Database:** 
   - Tuition posts
   - Teacher profiles
   - User management
   - Applications
   - Tickets

2. **Backend Operations:**
   - User registration
   - Profile updates
   - Credit transactions
   - Messaging
   - Notifications

3. **API Endpoints:**
   - `/tuition-posts`
   - `/teachers`
   - `/users`
   - `/auth/login`
   - `/auth/register`
   - And 40+ more...

### 📝 Next Steps:

1. ✅ Deploy Edge Function (this guide)
2. ✅ Run database table setup (CREATE_DATABASE_TABLE.sql)
3. ✅ Initialize demo users (call `/init-demo-data`)
4. ✅ Test all features

---

## 💡 Alternative: Use Static Data

যদি Edge Function deploy করতে না চান (demo/testing এর জন্য):

**Application will automatically:**
- Use static tuition posts from `/utils/tuitionData.ts`
- Use static teacher profiles from `/utils/teachersData.ts`
- Work in "demo mode" without backend
- Show all UI and features (but no persistence)

**This is fine for:**
- UI/UX testing
- Design review
- Frontend development
- Demo presentations

**But you need backend for:**
- Real user registration
- Data persistence
- Production deployment
- Multi-user testing

---

## 📞 Need Help?

### Quick Check:

Open browser console এবং দেখুন কোন error আছে কিনা।

### Diagnostic Tool:

```javascript
// Run this in browser console
import('./utils/serverHealthCheck').then(({ runServerDiagnostics }) => {
  runServerDiagnostics();
});
```

এটি complete diagnostic report দেখাবে।

### Support:

- Supabase Docs: https://supabase.com/docs/guides/functions
- CLI Docs: https://supabase.com/docs/reference/cli/introduction
- Dashboard: https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh

---

## ✅ Summary

**To fix "TypeError: Failed to fetch" error:**

1. Install Supabase CLI
2. Login: `supabase login`
3. Link: `supabase link --project-ref wkdksiagjwrrocpqkbnh`
4. Deploy: `supabase functions deploy server`
5. Verify: Visit health check URL

**Or use Supabase Dashboard to manually deploy.**

**After deployment, all backend features will work!** 🎉

---

**Status:** ⏸️ Waiting for Edge Function Deployment  
**Action Required:** Deploy `/supabase/functions/server/`  
**Impact:** High - Backend functionality unavailable until deployed  
**Fallback:** Static data mode (currently active)
