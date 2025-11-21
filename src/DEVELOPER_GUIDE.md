# 🛠️ Talent Tutor - Developer Guide

Complete technical documentation for developers working on Talent Tutor.

---

## 📚 Table of Contents

1. [Project Architecture](#project-architecture)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Development Workflow](#development-workflow)
6. [Backend Development](#backend-development)
7. [Frontend Development](#frontend-development)
8. [State Management](#state-management)
9. [Styling Guidelines](#styling-guidelines)
10. [Multi-language Support](#multi-language-support)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Best Practices](#best-practices)

---

## 🏗️ Project Architecture

Talent Tutor follows a **three-tier architecture**:

```
Frontend (React + Tailwind)
       ↓
Server (Supabase Edge Functions + Hono)
       ↓
Database (Supabase KV Store)
```

### Key Design Principles

1. **Component-Based Architecture**: Modular, reusable React components
2. **API-First Design**: All data operations go through backend APIs
3. **Multi-language Support**: Bengali and English throughout
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: WCAG 2.1 AA compliant

---

## 🔧 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - Utility-first styling
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **Motion (Framer Motion)** - Animations

### Backend
- **Supabase Edge Functions** - Serverless backend
- **Hono** - Web framework
- **Deno** - Runtime environment
- **KV Store** - Key-value database

### UI Components
- **shadcn/ui** - Pre-built accessible components
- Custom components in `/components`

---

## 📁 Project Structure

```
talent-tutor/
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── figma/              # Figma-imported components
│   ├── Header.tsx          # Main header
│   ├── Footer.tsx          # Main footer
│   ├── DonorDashboard.tsx  # Donor dashboard
│   └── ...                 # Other components
├── pages/                  # Page components
│   ├── HomePage.tsx
│   ├── DonorDashboard.tsx
│   ├── StudentDashboard.tsx
│   └── ...
├── utils/                  # Utility functions
│   ├── supabase/
│   │   └── info.tsx       # Supabase config
│   ├── demoUsers.ts       # Demo user data
│   ├── creditSystem.ts    # Credit system logic
│   └── ...
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx   # Main server file
│           └── kv_store.tsx # KV store utilities
├── styles/
│   ├── globals.css        # Global styles + Tailwind
│   └── responsive-optimized.css # Responsive utilities
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── vite.config.ts         # Vite configuration
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for backend)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-org/talent-tutor.git
cd talent-tutor
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` file (if needed):
```env
# Supabase credentials are auto-loaded from utils/supabase/info.tsx
```

4. **Start development server**
```bash
npm run dev
```

5. **Access the application**
```
http://localhost:5173
```

---

## 💻 Development Workflow

### Running Locally

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Type checking (if configured)
npm run type-check

# Linting (if configured)
npm run lint
```

---

## 🔌 Backend Development

### Server Architecture

The backend is built with **Hono** (web framework) running on **Supabase Edge Functions**.

**Location:** `/supabase/functions/server/index.tsx`

### Adding New API Endpoints

```typescript
// Example: Create new endpoint
app.post("/make-server-5b21d3ea/your-endpoint", async (c) => {
  try {
    const body = await c.req.json();
    const { field1, field2 } = body;

    // Validation
    if (!field1) {
      return c.json({ error: "Field1 প্রয়োজন" }, 400);
    }

    // Business logic
    const result = await processData(field1, field2);

    // Save to KV store
    await kv.set(`key:${result.id}`, result);

    return c.json({ success: true, data: result });
  } catch (error) {
    console.log("Endpoint error:", error);
    return c.json({ error: "সার্ভার এরর" }, 500);
  }
});
```

### KV Store Operations

```typescript
import * as kv from "./kv_store.tsx";

// Set single value
await kv.set("key", { name: "value" });

// Get single value
const data = await kv.get("key");

// Delete single value
await kv.del("key");

// Get all values with prefix
const allUsers = await kv.getByPrefix("user:");

// Set multiple values
await kv.mset({ "key1": "value1", "key2": "value2" });

// Get multiple values
const results = await kv.mget(["key1", "key2"]);

// Delete multiple values
await kv.mdel(["key1", "key2"]);
```

### Error Handling

Always include comprehensive error handling:

```typescript
try {
  // Your code
} catch (error) {
  console.log("Detailed error context:", error);
  return c.json({ 
    error: "User-friendly Bengali error message" 
  }, 500);
}
```

### CORS Configuration

CORS is pre-configured in the server. All origins are allowed for development.

---

## 🎨 Frontend Development

### Component Structure

```typescript
// Good component structure
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <Card>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
}
```

### Making API Calls

```typescript
import { projectId, publicAnonKey } from './utils/supabase/info';

async function fetchData() {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/endpoint`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ data: 'value' })
      }
    );

    if (!response.ok) {
      throw new Error('API call failed');
    }

    const result = await response.json();
    
    if (result.error) {
      console.error('API error:', result.error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

### Toast Notifications

```typescript
import { toast } from 'sonner@2.0.3';

// Success toast
toast.success('সফলভাবে সংরক্ষিত হয়েছে!');

// Error toast
toast.error('একটি সমস্যা হয়েছে');

// Loading toast
const toastId = toast.loading('লোড হচ্ছে...');
// Later dismiss
toast.dismiss(toastId);
```

---

## 🗃️ State Management

### Local State (useState)

For component-level state:

```typescript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
```

### Context API (for shared state)

For app-wide state like authentication:

```typescript
// AuthContext.tsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### LocalStorage

For persistence:

```typescript
// Save
localStorage.setItem('user', JSON.stringify(userData));

// Load
const user = JSON.parse(localStorage.getItem('user') || 'null');

// Remove
localStorage.removeItem('user');
```

---

## 🎨 Styling Guidelines

### Tailwind CSS

**DO:**
```typescript
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
```

**DON'T:**
```typescript
// Don't use inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Typography

**IMPORTANT:** Don't use Tailwind typography classes unless specifically requested:

```typescript
// ❌ Don't use
<h1 className="text-2xl font-bold">

// ✅ Use default HTML
<h1>Title</h1>
```

Typography is defined in `/styles/globals.css`.

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

### Color System

Use Tailwind color classes:
- Primary: `bg-primary text-primary-foreground`
- Secondary: `bg-secondary text-secondary-foreground`
- Accent: `bg-accent text-accent-foreground`
- Destructive: `bg-destructive text-destructive-foreground`

---

## 🌐 Multi-language Support

### Language Toggle

```typescript
const [language, setLanguage] = useState('bn'); // 'bn' or 'en'

const translations = {
  bn: {
    welcome: 'স্বাগতম',
    login: 'লগইন',
  },
  en: {
    welcome: 'Welcome',
    login: 'Login',
  }
};

// Usage
<h1>{translations[language].welcome}</h1>
```

### Fonts

- **Bengali:** Noto Serif Bengali
- **English:** Open Sans

Configured in `/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');

body {
  font-family: 'Noto Serif Bengali', 'Open Sans', sans-serif;
}
```

---

## 🧪 Testing

### Manual Testing

See `/TESTING_GUIDE.md` for comprehensive testing checklist.

### Testing Checklist

- [ ] All user flows work (register, login, donate, etc.)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Multi-language works correctly
- [ ] API errors are handled gracefully
- [ ] Toast notifications appear correctly
- [ ] Loading states work
- [ ] Forms validate properly

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `/dist` folder.

### Deploy to Vercel/Netlify

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Backend Deployment

Backend is already deployed on Supabase Edge Functions. No additional deployment needed.

---

## ✅ Best Practices

### Code Style

1. **Use TypeScript types**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

2. **Destructure props**
```typescript
// Good
function Component({ title, onAction }: Props) { }

// Avoid
function Component(props) { }
```

3. **Use async/await**
```typescript
// Good
const data = await fetchData();

// Avoid
fetchData().then(data => { });
```

### Component Organization

```typescript
// 1. Imports
import React, { useState } from 'react';
import { Button } from './components/ui/button';

// 2. Types/Interfaces
interface Props { }

// 3. Component
export function MyComponent({ }: Props) {
  // 4. State
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => { }, []);
  
  // 6. Handlers
  const handleClick = () => { };
  
  // 7. Render
  return <div></div>;
}
```

### API Integration

1. Always handle errors
2. Show loading states
3. Use toast notifications for feedback
4. Log errors to console for debugging

### Performance

1. Use React.memo for expensive components
2. Lazy load routes with React.lazy
3. Optimize images
4. Minimize bundle size

### Security

1. Never store passwords in plain text
2. Validate all user inputs
3. Sanitize data before rendering
4. Use HTTPS in production

---

## 📝 Common Tasks

### Adding a New Page

1. Create page component in `/pages`
```typescript
// /pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add route in `/App.tsx`
```typescript
import NewPage from './pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Component

1. Create component in `/components`
```typescript
// /components/NewComponent.tsx
export function NewComponent() {
  return <div>Component</div>;
}
```

2. Import and use
```typescript
import { NewComponent } from './components/NewComponent';
```

### Adding a New API Endpoint

1. Add route in `/supabase/functions/server/index.tsx`
2. Test with Postman/curl
3. Update `/API_DOCUMENTATION.md`
4. Create frontend function to call it

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** API calls fail with CORS error
**Solution:** Check backend CORS configuration

**Issue:** Tailwind styles not working
**Solution:** Restart dev server, check `globals.css` import

**Issue:** Component not re-rendering
**Solution:** Check state updates, use proper setState

**Issue:** Build fails
**Solution:** Check for TypeScript errors, missing imports

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Hono Framework](https://hono.dev)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request
5. Wait for code review

---

**Last Updated:** November 3, 2025  
**Version:** 1.0
