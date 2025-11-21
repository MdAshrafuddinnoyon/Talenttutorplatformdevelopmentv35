# 🔌 Talent Tutor API Routes Reference (2025)

## 📍 Base URL

```
https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea
```

## 🔧 Configuration

### In Code:
```typescript
import { API_BASE_URL, getApiHeaders } from './utils/apiConfig';

// Usage
const response = await fetch(`${API_BASE_URL}/endpoint`, {
  method: 'POST',
  headers: getApiHeaders()
});
```

### Environment:
- **Project ID:** `wkdksiagjwrrocpqkbnh`
- **Edge Function:** `server`
- **Route Prefix:** `make-server-5b21d3ea`

---

## 📚 API Endpoints

### Health & Info

#### GET `/health`
Health check endpoint
```javascript
fetch(`${API_BASE_URL}/health`)
```
**Response:**
```json
{
  "status": "ok",
  "message": "Talent Tutor Server is running",
  "timestamp": "2025-11-09T...",
  "version": "1.0.0"
}
```

#### GET `/`
API information
```javascript
fetch(`${API_BASE_URL}/`)
```
**Response:**
```json
{
  "message": "Talent Tutor API Server",
  "endpoints": [...]
}
```

---

### Authentication

#### POST `/auth/register`
Register new user and create profile
```javascript
fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    id: 'user-id-from-supabase-auth', // Optional
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+8801700000000',
    role: 'teacher', // admin, teacher, guardian, student, donor
    address: 'Dhaka, Bangladesh',
    donorType: 'zakat' // Only for donors
  })
})
```
**Response:**
```json
{
  "success": true,
  "user": { ... },
  "message": "Profile created successfully"
}
```

#### POST `/auth/login`
Login user (Note: Use Supabase Auth on client-side instead)
```javascript
fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    emailOrPhone: 'user@example.com',
    password: 'password123'
  })
})
```

#### POST `/auth/get-email-by-phone`
Get email associated with phone number
```javascript
fetch(`${API_BASE_URL}/auth/get-email-by-phone`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    phone: '+8801700000000'
  })
})
```

#### POST `/auth/password-reset`
Request password reset
```javascript
fetch(`${API_BASE_URL}/auth/password-reset`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    email: 'user@example.com'
  })
})
```

---

### Users

#### GET `/users`
Get all users (with optional role filter)
```javascript
fetch(`${API_BASE_URL}/users?role=teacher`, {
  headers: getApiHeaders()
})
```
**Response:**
```json
{
  "success": true,
  "users": [...]
}
```

#### GET `/users/:userId`
Get specific user by ID
```javascript
fetch(`${API_BASE_URL}/users/user-id-123`, {
  headers: getApiHeaders()
})
```

#### PUT `/users/:userId`
Update user profile
```javascript
fetch(`${API_BASE_URL}/users/user-id-123`, {
  method: 'PUT',
  headers: getApiHeaders(),
  body: JSON.stringify({
    name: 'Updated Name',
    address: 'New Address',
    ...otherFields
  })
})
```

---

### Demo Data

#### POST `/init-demo-data`
Initialize demo users (6 users)
```javascript
fetch(`${API_BASE_URL}/init-demo-data`, {
  method: 'POST',
  headers: getApiHeaders()
})
```
**Response:**
```json
{
  "success": true,
  "message": "Demo data initialized successfully",
  "usersCreated": 6,
  "users": [
    {
      "id": "...",
      "name": "Admin User",
      "email": "admin@talenttutor.com",
      "role": "admin",
      "credits": 0
    },
    ...
  ]
}
```

**Creates:**
- 1 Admin (admin@talenttutor.com)
- 1 Teacher (teacher1@talenttutor.com) - 50 credits
- 1 Guardian (guardian1@talenttutor.com) - 100 credits
- 1 Student (student1@talenttutor.com)
- 1 Zakat Donor (zakatdonor1@talenttutor.com)
- 1 Material Donor (materialdonor1@talenttutor.com)

---

### Tickets (Support System)

#### POST `/tickets`
Create new support ticket
```javascript
fetch(`${API_BASE_URL}/tickets`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    userId: 'user-id',
    userName: 'John Doe',
    userRole: 'teacher',
    category: 'technical',
    priority: 'high',
    subject: 'Issue with login',
    description: 'Cannot login to my account',
    messages: []
  })
})
```

#### GET `/tickets`
Get all tickets (with optional filters)
```javascript
fetch(`${API_BASE_URL}/tickets?status=open&userRole=teacher`, {
  headers: getApiHeaders()
})
```

#### GET `/tickets/user/:userId`
Get tickets for specific user
```javascript
fetch(`${API_BASE_URL}/tickets/user/user-id-123`, {
  headers: getApiHeaders()
})
```

#### PUT `/tickets/:ticketId`
Update ticket (admin)
```javascript
fetch(`${API_BASE_URL}/tickets/ticket-id-123`, {
  method: 'PUT',
  headers: getApiHeaders(),
  body: JSON.stringify({
    status: 'resolved',
    assignedTo: 'admin-id'
  })
})
```

#### POST `/tickets/:ticketId/messages`
Add message to ticket
```javascript
fetch(`${API_BASE_URL}/tickets/ticket-id-123/messages`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    userId: 'user-id',
    userName: 'John Doe',
    message: 'Thank you for your help'
  })
})
```

#### POST `/ticket/create`
Alternative endpoint to create ticket
```javascript
fetch(`${API_BASE_URL}/ticket/create`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    // Same as POST /tickets
  })
})
```

#### POST `/ticket/:ticketId/reply`
Alternative endpoint to add reply
```javascript
fetch(`${API_BASE_URL}/ticket/ticket-id-123/reply`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    userId: 'user-id',
    userName: 'Admin',
    userRole: 'admin',
    message: 'We are looking into this issue'
  })
})
```

---

### Student Applications

#### POST `/student-applications`
Create student help application
```javascript
fetch(`${API_BASE_URL}/student-applications`, {
  method: 'POST',
  headers: getApiHeaders(),
  body: JSON.stringify({
    studentId: 'student-id',
    studentName: 'Student Name',
    class: '10th Grade',
    school: 'ABC School',
    reason: 'Need financial help',
    amount: 5000,
    documents: ['doc-url-1', 'doc-url-2']
  })
})
```

#### GET `/student-applications`
Get all student applications
```javascript
fetch(`${API_BASE_URL}/student-applications?status=pending`, {
  headers: getApiHeaders()
})
```

#### GET `/student-applications/student/:studentId`
Get applications by student
```javascript
fetch(`${API_BASE_URL}/student-applications/student/student-id-123`, {
  headers: getApiHeaders()
})
```

#### PUT `/student-applications/:applicationId`
Update application status
```javascript
fetch(`${API_BASE_URL}/student-applications/app-id-123`, {
  method: 'PUT',
  headers: getApiHeaders(),
  body: JSON.stringify({
    status: 'approved',
    approvedBy: 'admin-id',
    approvedAmount: 5000
  })
})
```

---

## 🔐 Authentication

All API requests (except health check) require authorization:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
}
```

**Public Anon Key location:**
```typescript
import { publicAnonKey } from './utils/supabase/info';
```

---

## 🗄️ Data Storage

**KV Store Table:** `kv_store_5b21d3ea`

**Key Patterns:**
- `user:{userId}` - User profile
- `user:email:{email}` - Email to user ID mapping
- `user:phone:{phone}` - Phone to user ID mapping
- `ticket:{ticketId}` - Ticket data
- `tickets:user:{userId}` - User's ticket IDs
- `tickets:all` - All ticket IDs
- `application:{applicationId}` - Student application

---

## 🧪 Testing

### Quick Health Check:
```bash
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/health
```

### Create Demo Users:
```bash
curl -X POST https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/init-demo-data \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Get All Users:
```bash
curl https://wkdksiagjwrrocpqkbnh.supabase.co/functions/v1/server/make-server-5b21d3ea/users \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 📝 Notes

1. **Supabase Auth Integration:**
   - User authentication is handled by Supabase Auth on client-side
   - Use `signInWithPassword()` for login
   - Server stores user profiles in KV store

2. **Credits System:**
   - Teachers get 50 free credits on registration
   - Guardians get 100 free credits on registration
   - Credits are stored in user profile

3. **Route Prefix:**
   - Current: `make-server-5b21d3ea`
   - Defined in `/utils/apiConfig.ts` and server routes
   - Keep these in sync!

4. **Edge Function Name:**
   - Function name: `server`
   - Deployed at: `/functions/v1/server/`

---

## 🔄 Recent Changes (November 2025)

- ✅ Updated route prefix from `make-server-c70f394b` to `make-server-5b21d3ea`
- ✅ Added enhanced error handling
- ✅ Added Bengali error messages
- ✅ Fixed DashboardConnectivityTester API URLs
- ✅ Improved demo data initialization

---

## 📚 Related Documentation

- `SEED_ACCOUNTS_ERROR_FIXED_BANGLA.md` - Demo accounts setup guide
- `FIXES_NOVEMBER_2025.md` - Recent fixes summary
- `EDGE_FUNCTION_DEPLOYMENT_REQUIRED.md` - Deployment guide
- `DATABASE_INTEGRATION_COMPLETE.md` - Legacy API docs

---

**Last Updated:** November 9, 2025
**API Version:** 1.0.0
**Status:** ✅ Active
