# 🔧 Troubleshooting Guide - Talent Tutor

## Common Problems and Solutions

---

## ❌ Problem 1: "npm command not found"

### Cause:
Node.js not installed or not in PATH

### Solution:

**Windows:**
1. Download LTS version from https://nodejs.org
2. Run installer (check all checkboxes)
3. Restart computer
4. Open new Command Prompt/PowerShell
5. Test:
   ```cmd
   node -v
   npm -v
   ```

**Mac:**
```bash
# With Homebrew:
brew install node

# Or download installer from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
# From official repository:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify:
node -v
npm -v
```

---

## ❌ Problem 2: "npm install" not working

### Possible Causes:
- Network timeout
- Corrupted cache
- Permission issues

### Solution:

**Step 1: Clean cache**
```bash
npm cache clean --force
```

**Step 2: Delete node_modules**
```bash
# Windows (PowerShell):
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Mac/Linux:
rm -rf node_modules package-lock.json

# Windows (CMD):
rmdir /s /q node_modules
del package-lock.json
```

**Step 3: Reinstall**
```bash
npm install
```

**Step 4: If still not working**
```bash
# Use alternative registry:
npm config set registry https://registry.npmjs.org/
npm install

# Or use yarn:
npm install -g yarn
yarn install
```

---

## ❌ Problem 3: "Cannot find module" Error

### Cause:
Dependencies not properly installed

### Solution:

```bash
# Option 1: Install specific package
npm install [missing-package-name]

# Option 2: Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# Option 3: Check package.json
# Ensure package.json is correct and not corrupted
```

---

## ❌ Problem 4: Port already in use (EADDRINUSE)

### Cause:
Port 5173 is being used by another process

### Solution:

**Windows:**
```cmd
# Find process using port:
netstat -ano | findstr :5173

# Kill process with ID:
taskkill /PID <process_id> /F

# Or Vite will automatically use another port
```

**Mac/Linux:**
```bash
# Find process using port:
lsof -i :5173

# Kill process:
kill -9 <PID>

# Or use different port:
npm run dev -- --port 3000
```

---

## ❌ Problem 5: Blank/White Page

### Cause:
- JavaScript errors
- Routing issues
- Build problems

### Solution:

**Step 1: Check Browser Console**
1. Press F12 (Developer Tools)
2. Go to Console tab
3. Look for red error messages

**Step 2: Common fixes**
```bash
# Restart development server:
Ctrl+C (stop server)
npm run dev

# Clear cache:
Ctrl+Shift+R (Hard reload)

# Rebuild:
npm run build
npm run preview
```

**Step 3: Check base path**

If deploying to subdirectory, check `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/',  // Use '/' for root deployment
  // base: '/app/', // Use '/app/' for subdirectory deployment
});
```

---

## ❌ Problem 6: CSS/Styles Not Loading

### Cause:
- Tailwind config issue
- Build not updated
- Cache problem

### Solution:

```bash
# 1. Rebuild:
npm run build

# 2. Check in development mode:
npm run dev

# 3. Verify Tailwind config:
# Check that tailwind.config.js exists

# 4. Check globals.css import:
# In main.tsx or App.tsx:
# import './styles/globals.css'
```

---

## ❌ Problem 7: Images Not Loading

### Cause:
- Wrong path
- Build not including images
- Server configuration

### Solution:

**Development:**
```typescript
// ✅ Correct path (if in public folder):
<img src="/images/logo.png" alt="Logo" />

// ❌ Wrong paths:
<img src="images/logo.png" alt="Logo" />
<img src="./images/logo.png" alt="Logo" />
```

**Production:**
```bash
# Check if images copied:
# Look in dist/images/ folder for images

# If missing, place in public folder:
public/
  └── images/
      └── logo.png
```

---

## ❌ Problem 8: Routes Not Working on Live Server (404)

### Cause:
Server not configured for SPA routing

### Solution:

**cPanel / Apache:**

Create `public_html/.htaccess` file:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Vercel/Netlify:**
- Automatically configured! No action needed.

---

## ❌ Problem 9: Environment Variables Not Working

### Cause:
- Missing `VITE_` prefix
- `.env` file in wrong location
- Server not restarted

### Solution:

**Correct format:**
```env
# ✅ Correct - with VITE_ prefix:
VITE_GOOGLE_MAPS_API_KEY=abc123
VITE_SUPABASE_URL=https://xyz.supabase.co

# ❌ Wrong - without prefix:
GOOGLE_MAPS_API_KEY=abc123
SUPABASE_URL=https://xyz.supabase.co
```

**File location:**
```
talent-tutor/
├── .env          # ✅ Must be here (root)
├── package.json
├── vite.config.ts
└── src/
```

**Usage in code:**
```typescript
// In code:
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Test with console.log:
console.log('API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
```

**Important:**
- Restart server after changing `.env` file!
```bash
Ctrl+C
npm run dev
```

---

## ❌ Problem 10: TypeScript Errors

### Solution:

```bash
# 1. Type check:
npx tsc --noEmit

# 2. If many errors, fix one by one

# 3. Common fixes:
# - Missing types: npm install @types/[package-name]
# - Wrong imports: Check import paths
# - Any type: Replace with proper types

# 4. Temporary fix (NOT recommended):
# In tsconfig.json:
{
  "compilerOptions": {
    "skipLibCheck": true,
    "noEmit": true
  }
}
```

---

## ❌ Problem 11: Build Fails

### Solution:

```bash
# 1. Read error message carefully
npm run build

# 2. Common issues:
# - TypeScript errors → Fix type issues
# - Missing dependencies → npm install
# - Import errors → Check paths
# - Memory issues → Increase Node memory

# 3. Increase memory (for large projects):
# In package.json:
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
}

# Windows PowerShell:
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## ❌ Problem 12: Slow Performance

### Cause:
- Too many re-renders
- Large bundle size
- Unoptimized images

### Solution:

**Check bundle size:**
```bash
npm run build
# Check dist/assets/ file sizes
# Main JS should be < 1MB
```

**Optimize images:**
```bash
# Use WebP format
# Compress images
# Lazy load images
```

**Code splitting:**
```typescript
// Use React.lazy for route-based splitting:
const HomePage = React.lazy(() => import('./pages/HomePage'));
```

---

## 🔍 Debugging Tips

### 1. Console Logging
```typescript
console.log('Debug:', variable);
console.error('Error:', error);
console.table(arrayData);
```

### 2. React DevTools
- Install React Developer Tools (Chrome/Firefox extension)
- Inspect component props and state
- Check component hierarchy

### 3. Network Tab
- F12 → Network tab
- Check which files are loading
- Look for 404 errors
- Check response times

### 4. Lighthouse Audit
- F12 → Lighthouse tab
- Run audit
- Check Performance, Accessibility, SEO scores

---

## 📞 Still Having Issues?

### Quick Checklist:
- [ ] Node.js properly installed? (`node -v`)
- [ ] Dependencies installed? (`npm install`)
- [ ] In correct directory? (`ls` or `dir`)
- [ ] package.json exists?
- [ ] .env configured (if needed)?
- [ ] Browser console checked?
- [ ] Server restarted?
- [ ] Cache cleared?

### For Help:
1. **Copy error message**
2. **Search on Google**
3. **Check Stack Overflow**
4. **Open GitHub Issue**
5. **Ask in Community**

### Collect Debug Information:
```bash
# System info:
node -v
npm -v
npm list

# Error logs:
npm run dev > debug.log 2>&1
# Share debug.log file
```

---

## ✅ Successfully Running

Your terminal should show:
```
  VITE v5.4.8  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

Browser should show:
- ✅ Beautiful homepage
- ✅ Correct designs
- ✅ Navigation works
- ✅ No errors (check F12 console)

**Congratulations! Your Talent Tutor application is running!** 🎉

---

## 📚 More Information

- **Setup Guide:** [`SETUP_LOCAL.md`](/SETUP_LOCAL.md)
- **Deployment Guide:** [`DEPLOYMENT_GUIDE_COMPLETE.md`](/DEPLOYMENT_GUIDE_COMPLETE.md)
- **Quick Start:** [`QUICK_START_GUIDE.md`](/QUICK_START_GUIDE.md)
- **Deployment Checklist:** [`DEPLOYMENT_CHECKLIST.md`](/DEPLOYMENT_CHECKLIST.md)
