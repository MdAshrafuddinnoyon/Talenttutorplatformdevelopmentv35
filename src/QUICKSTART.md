# ⚡ Talent Tutor - Quick Start Guide

> Get up and running with Talent Tutor in 5 minutes! 🚀

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** (comes with Node.js) or **yarn**
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ A code editor (VS Code recommended)

---

## 🚀 Installation (5 Steps)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-org/talent-tutor.git
cd talent-tutor
```

### Step 2: Install Dependencies
```bash
npm install
```
*This will take 1-2 minutes depending on your internet speed.*

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
```
http://localhost:5173
```

### Step 5: Start Exploring! 🎉
The application is now running! You can:
- Browse as a visitor
- Login as different user types
- Explore all features

---

## 👤 Test User Accounts

Use these test accounts to explore different roles:

### 🧑‍🏫 Teacher Account
```
Email: teacher@test.com
Password: teacher123
Credits: 50
```
**What you can do:**
- Browse tuition jobs
- Apply to jobs (costs 10 credits)
- Chat with guardians (1 credit/message)
- Schedule video meetings (20 credits)
- Manage profile

### 👨‍👩‍👧 Guardian Account
```
Email: guardian@test.com
Password: guardian123
Credits: 100
```
**What you can do:**
- Post tuition jobs
- Find teachers
- Chat with teachers (1 credit/message)
- Schedule video meetings (20 credits)
- Send hiring agreements

### 🎓 Student Account
```
Email: student@test.com
Password: student123
```
**What you can do:**
- Request help
- Access free library
- Apply for scholarships

### 👑 Admin Account
```
Email: admin@test.com
Password: admin123
```
**What you can do:**
- Manage all users
- Manage blog posts
- View analytics
- Handle transactions
- Manage donations

### ❤️ Donor Account
```
Email: donor@test.com
Password: donor123
```
**What you can do:**
- Make donations
- Track donation history
- View impact reports

---

## 🎯 Quick Feature Tour

### 1. For Teachers (শিক্ষক)

#### Browse Jobs
```
Dashboard → Find Jobs → Browse available tuitions
```

#### Apply to Job
```
Click on any job → View details → Apply (costs 10 credits)
```

#### Chat with Guardian
```
Click on any guardian → Chat Now (costs 1 credit/message)
```

#### Buy Credits
```
Dashboard → Quick Actions → ক্রেডিট কিনুন
```

### 2. For Guardians (অভিভাবক)

#### Post a Job
```
Dashboard → Post New Job → Fill details → Submit
```

#### Find Teachers
```
Dashboard → Find Teachers → Filter & Browse → Select
```

#### Schedule Video Meeting
```
Teacher Profile → Schedule Video Meeting (costs 20 credits each)
```

#### Send Hiring Agreement
```
Teacher Profile → Send Hiring Agreement → Fill terms → Send
```

### 3. For Students (ছাত্র)

#### Request Help
```
Dashboard → Request Help → Fill form → Submit
```

#### Browse Library
```
Navigation → Library → Browse books/uniforms → Request item
```

### 4. For Admin (অ্যাডমিন)

#### Manage Blogs
```
Dashboard → Blog Management → View/Edit/Delete posts
```

#### View Analytics
```
Dashboard → Analytics → View charts and reports
```

#### Manage Users
```
Dashboard → User Management → View/Edit/Block users
```

---

## 🛠️ Common Development Tasks

### Run Tests
```bash
npm run test
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 📱 Testing Responsive Design

### Using Browser DevTools

1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Toggle Device Toolbar** (Cmd+Shift+M)
3. **Select Device:**
   - iPhone 12/13 (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)

### Test These Sizes
- **Mobile:** 375px - 640px
- **Tablet:** 768px - 1024px
- **Desktop:** 1280px+

---

## 🌐 Language Switching

The platform supports Bengali (বাংলা) and English.

### Switch Language:
1. Click the **Globe icon** (🌐) in the header
2. Select your preferred language
3. All content will update instantly

### Language Coverage:
- ✅ All pages: 100%
- ✅ All components: 100%
- ✅ All dialogs: 100%
- ✅ All forms: 100%

---

## 💳 Test Credit Purchase

### To Test Credit Purchase Flow:

1. **Login as Teacher or Guardian**
2. **Go to Credit Purchase Page:**
   ```
   Dashboard → ক্রেডিট কিনুন
   ```
3. **Select a Package:**
   - Starter (50 credits - ৳500)
   - Basic (100 credits - ৳900)
   - Professional (200 credits - ৳1,600)
   - Premium (500 credits - ৳3,500)
   - Enterprise (1000 credits - ৳6,000)

4. **Choose Payment Method:**
   - bKash
   - Nagad
   - Rocket
   - Credit Card
   - Net Banking

5. **Fill Payment Details:**
   - Full Name
   - Email
   - Phone
   - Payment Number (for mobile banking)
   - Transaction ID

6. **Submit & Confirm**

*Note: In development mode, all payments are simulated.*

---

## 🎨 Customization Guide

### Change Colors

Edit `styles/globals.css`:
```css
/* Primary Colors */
--emerald-500: #10b981;  /* Change to your color */
--teal-600: #0d9488;     /* Change to your color */
```

### Change Font

Edit `styles/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', system-ui, sans-serif;
}
```

### Add New Page

1. **Create page file:**
   ```typescript
   // pages/MyNewPage.tsx
   export function MyNewPage({ language, setLanguage, setPage }) {
     return <div>My New Page</div>;
   }
   ```

2. **Add to App.tsx:**
   ```typescript
   import { MyNewPage } from "./pages/MyNewPage";
   
   // Add to Page type
   type Page = "home" | "my-new-page" | ...;
   
   // Add to switch statement
   case "my-new-page":
     return <MyNewPage ... />;
   ```

3. **Add navigation link**

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear build cache
rm -rf dist .vite

# Rebuild
npm run build
```

### TypeScript Errors
```bash
# Check types
npm run type-check

# Fix automatically (if possible)
npm run lint --fix
```

---

## 📚 Learning Resources

### For Beginners
1. **React Basics** - [React Docs](https://react.dev)
2. **TypeScript** - [TS Handbook](https://www.typescriptlang.org/docs/)
3. **Tailwind CSS** - [Tailwind Docs](https://tailwindcss.com)

### For Intermediate
1. **Shadcn/ui** - [Component Docs](https://ui.shadcn.com)
2. **Motion/React** - [Animation Guide](https://motion.dev)
3. **React Patterns** - [Patterns](https://reactpatterns.com)

### Project-Specific
1. **Project Structure** - See `README.md`
2. **API Documentation** - See `API_DOCUMENTATION.md`
3. **Developer Guide** - See `DEVELOPER_GUIDE.md`
4. **Component Guide** - See `guidelines/Guidelines.md`

---

## 🎯 Next Steps

### After Setup, You Can:

1. **Explore the Platform** 🔍
   - Try all user roles
   - Test all features
   - Understand the workflow

2. **Read Documentation** 📖
   - `README.md` - Complete overview
   - `COMPLETION_SUMMARY.md` - Feature list
   - `guidelines/Guidelines.md` - Dev guidelines

3. **Start Customizing** 🎨
   - Change colors
   - Add your logo
   - Customize content

4. **Build New Features** 🚀
   - Add new pages
   - Create new components
   - Extend functionality

5. **Deploy** 🌐
   - Build for production
   - Deploy to Vercel/Netlify
   - Configure domain

---

## 💡 Pro Tips

### Development Tips
```bash
# Use concurrent mode for faster development
npm run dev

# Keep console open to see errors
# Use React DevTools browser extension
# Use VS Code with ESLint and Prettier extensions
```

### Testing Tips
```bash
# Test in multiple browsers
# Test all user roles
# Test responsive design
# Test payment flows
# Test all dialogs and forms
```

### Performance Tips
```bash
# Use production build for testing performance
npm run build && npm run preview

# Check bundle size
npm run build -- --analyze

# Optimize images before adding
# Use lazy loading for routes
```

---

## 🤝 Getting Help

### If You Get Stuck:

1. **Check Documentation**
   - README.md
   - COMPLETION_SUMMARY.md
   - Component inline docs

2. **Search Issues**
   - GitHub Issues
   - Stack Overflow
   - React/Tailwind docs

3. **Ask for Help**
   - Open GitHub Issue
   - Contact dev@websearchbd.com
   - Join Discord (coming soon)

---

## ✅ Checklist

Before you start developing, ensure:

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] App opens in browser
- [ ] Test accounts work
- [ ] All pages load correctly
- [ ] Language switch works
- [ ] Responsive design works

---

## 🎉 You're Ready!

Congratulations! You're all set up and ready to start working with Talent Tutor.

### Quick Links:
- 📖 [Full Documentation](README.md)
- 🎯 [Feature List](COMPLETION_SUMMARY.md)
- 🛠️ [Development Guidelines](guidelines/Guidelines.md)
- 🐛 [Report Issues](https://github.com/your-org/talent-tutor/issues)

---

<div align="center">

**Happy Coding! 💻✨**

Made with ❤️ by Web Search BD

</div>
