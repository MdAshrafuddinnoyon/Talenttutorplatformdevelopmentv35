# 🎫 টিকেট সিস্টেম Quick Start Guide

## 🚀 দ্রুত শুরু করুন | Quick Start

### 1️⃣ ইউজার হিসেবে টিকেট তৈরি করুন | Create Ticket as User

```tsx
import { UniversalTicketSystem } from './components/UniversalTicketSystem';
import { useState } from 'react';

function MyDashboard() {
  const [showTickets, setShowTickets] = useState(false);

  return (
    <>
      <button onClick={() => setShowTickets(true)}>
        সাপোর্ট টিকেট | Support Ticket
      </button>

      <UniversalTicketSystem
        open={showTickets}
        onOpenChange={setShowTickets}
        language="bn"          // "bn" for Bengali, "en" for English
        userId="your-user-id"
        userName="Your Name"
        userRole="teacher"     // teacher | guardian | student | donor
      />
    </>
  );
}
```

### 2️⃣ এডমিন হিসেবে টিকেট পরিচালনা করুন | Manage Tickets as Admin

```tsx
import { UniversalTicketSystem } from './components/UniversalTicketSystem';

function AdminPanel() {
  return (
    <UniversalTicketSystem
      open={true}
      onOpenChange={() => {}}
      language="bn"
      userId="admin-id"
      userName="Admin"
      userRole="admin"
      embedded={true}    // Display without dialog wrapper
    />
  );
}
```

---

## 📍 Where to Find Components

### Main Component
```
/components/UniversalTicketSystem.tsx
```

### Testing Tool
```
/components/TicketSystemTester.tsx
```

### Admin Manager (Legacy)
```
/components/AdminTicketManager.tsx
```

---

## 🧪 Testing

### Go to Testing Page
1. Login as Admin
2. Go to Admin Dashboard
3. Click "Testing & Development"
4. Select "Ticket System Testing" tab

### Or Direct URL
```
http://localhost:5173/#admin-testing
```

### Test Users

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@test.com | teacher123 |
| Guardian | guardian@test.com | guardian123 |
| Student | student@test.com | student123 |
| Donor | donor@test.com | donor123 |
| Admin | admin@talent.com | admin123 |

---

## 📊 Ticket Categories

1. **Technical Issue** (টেকনিক্যাল সমস্যা)
2. **Account Issue** (অ্যাকাউন্ট সমস্যা)
3. **Payment Issue** (পেমেন্ট সমস্যা)
4. **Credit Issue** (ক্রেডিট সমস্যা)
5. **Tuition Related** (টিউশন সংক্রান্ত)
6. **Donation Related** (দান সংক্রান্ত)
7. **Contract Related** (চুক্তি সংক্রান্ত)
8. **General Question** (সাধারণ প্রশ্ন)
9. **Feature Request** (নতুন ফিচার অনুরোধ)
10. **Bug Report** (বাগ রিপোর্ট)
11. **Other** (অন্যান্য)

---

## 🎯 Priority Levels

- **Low** (নিম্ন) - Can wait
- **Medium** (মাধ্যম) - Normal priority
- **High** (উচ্চ) - Important, needs quick response
- **Urgent** (জরুরী) - Critical, immediate attention needed

---

## 📈 Ticket Status Flow

```
Open (খোলা)
  ↓
In Progress (প্রগতিশীল)
  ↓
Resolved (সমাধান)
  ↓
Closed (বন্ধ)
```

---

## 🔧 API Endpoints

### Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-5b21d3ea
```

### Create Ticket
```http
POST /ticket/create
{
  "userId": "user-123",
  "userName": "John Doe",
  "userRole": "teacher",
  "category": "technical",
  "priority": "high",
  "subject": "Login problem",
  "description": "Cannot login"
}
```

### Get User Tickets
```http
GET /tickets/user/{userId}
```

### Get All Tickets (Admin)
```http
GET /tickets?status=open&userRole=teacher
```

### Reply to Ticket
```http
POST /ticket/{ticketId}/reply
{
  "userId": "user-123",
  "userName": "John Doe",
  "userRole": "teacher",
  "message": "Thank you!"
}
```

### Update Status (Admin)
```http
PUT /tickets/{ticketId}
{
  "status": "resolved"
}
```

---

## 🌍 Language Support

### Switch Language

```tsx
// Bengali
<UniversalTicketSystem language="bn" {...props} />

// English
<UniversalTicketSystem language="en" {...props} />
```

### All Text is Translated

- UI labels
- Button text
- Error messages
- Success messages
- Categories
- Status names
- Instructions

---

## 💡 Quick Tips

### For Users
1. ✅ Choose the right category for faster response
2. ✅ Set appropriate priority (don't mark everything as urgent!)
3. ✅ Provide detailed description
4. ✅ Check "My Tickets" for updates
5. ✅ Reply to admin questions promptly

### For Admins
1. ✅ Respond to urgent tickets first
2. ✅ Update status as you work on tickets
3. ✅ Provide helpful replies
4. ✅ Use filters to manage workload
5. ✅ Close resolved tickets after confirmation

---

## 🎨 Features at a Glance

### All Users Can:
- ✅ Create support tickets
- ✅ View their tickets
- ✅ Filter and search
- ✅ Reply to tickets
- ✅ Track status
- ✅ See statistics

### Admins Can Also:
- ✅ View all tickets
- ✅ Filter by user role
- ✅ Update ticket status
- ✅ Manage all conversations
- ✅ See comprehensive dashboard

---

## 📚 Full Documentation

For complete documentation, see:
- **TICKET_SYSTEM_GUIDE.md** - Complete guide
- **TICKET_SYSTEM_IMPLEMENTATION.md** - Implementation details
- **API_DOCUMENTATION.md** - API reference

---

## 🐛 Common Issues & Solutions

### Issue: Tickets not loading
**Solution**: Check if user is logged in and has valid userId

### Issue: Cannot create ticket
**Solution**: Ensure all required fields (category, priority, subject, description) are filled

### Issue: Reply not showing
**Solution**: Refresh the ticket list or reload the ticket details

### Issue: Status not updating
**Solution**: Only admins can update status. Check userRole is "admin"

---

## 📞 Need Help?

Create a ticket! 😊

Or contact: admin@talenttutor.com

---

**Quick Start Complete! Happy Ticketing! 🎉**
