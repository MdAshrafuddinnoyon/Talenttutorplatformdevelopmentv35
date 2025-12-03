# 🚀 Talent Tutor - Complete Local & Live Server Deployment Guide

## ⚠️ Important Information

This project is a **Modern React + Vite Application**. It will NOT work as a simple HTML file.

### Why It Won't Work Directly?
- ❌ This is not just HTML/CSS/JS
- ❌ Cannot be uploaded directly to PHP servers
- ❌ Double-clicking `index.html` won't work
- ✅ Requires a **Build Process**
- ✅ Modern **SPA (Single Page Application)** architecture

---

## 📋 Part 1: Running Locally on Your Computer

### Step 1: Install Required Software

#### Install Node.js (Most Important!)

1. **Download**: [https://nodejs.org](https://nodejs.org)
2. Download **LTS Version** (20.x or higher) - Recommended
3. Run installer with default settings
4. **Verify Installation** - Open terminal and run:

```bash
node -v
# Output: v20.12.1 (or similar)

npm -v
# Output: 10.x.x (or similar)
```

If you see version numbers, installation was successful! ✅

---

### Step 2: Download and Open Project

```bash
# 1. Unzip the project folder
# 2. Open Command Prompt or PowerShell
# 3. Navigate to project folder

cd C:\Users\YourName\Desktop\talent-tutor
# (Use your actual path)
```

**Or use VS Code:**
1. Open VS Code
2. `File → Open Folder`
3. Select project folder
4. `Terminal → New Terminal` (Ctrl + `)

---

### Step 3: Install Dependencies

```bash
npm install
```

⏱️ **This may take 3-10 minutes.** It's downloading all packages from the internet.

**Possible Issues and Solutions:**

#### ❌ Error: "npm not found"
**Solution:** Node.js not installed properly. Reinstall and restart computer.

#### ❌ Error: Permission denied
**Windows:**
```bash
# Run PowerShell as Administrator
```

**Mac/Linux:**
```bash
sudo npm install
```

#### ❌ Error: Network timeout
```bash
# Change NPM registry
npm config set registry https://registry.npmjs.org/
npm install
```

---

### Step 4: Start Development Server

```bash
npm run dev
```

✅ **If successful, you'll see:**
```
  VITE v5.4.8  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

🌐 **Open in Browser:** http://localhost:5173

**Your application is now running!** 🎉

---

### Step 5: Environment Variables Setup (Optional)

```bash
# Copy .env.example file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

Add your API Keys in `.env` file:

```env
# Google Maps (Optional - for map features)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Supabase (if you want to use it)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

**Note:** App will work without these keys, but some features (Maps, Database) won't function.

---

## 🌍 Part 2: Deploying to Live Server

### Creating Production Build

Before uploading to live server, create a **Production Build**:

```bash
npm run build
```

✅ **If successful:**
- `dist` folder will be created
- Contains optimized HTML, CSS, JS files

**Build Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other files]
└── [static files]
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Easiest - RECOMMENDED ✅)

#### Why Vercel?
- ✅ **Completely FREE**
- ✅ **Auto-deployment** (auto-deploy on Git push)
- ✅ **Fast with CDN + SSL**
- ✅ **Perfect for Vite/React**

#### Steps:

1. **Create Vercel Account**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign Up with GitHub/GitLab

2. **Create Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   
   # Create new repository on GitHub, then:
   git remote add origin https://github.com/username/talent-tutor.git
   git push -u origin main
   ```

3. **Import to Vercel**
   - Vercel Dashboard → "Add New Project"
   - Select GitHub repository
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Click "Deploy"

4. **✅ Done!**
   - Your site is live: `https://talent-tutor.vercel.app`
   - Auto-deploys on every Git push

---

### Option 2: Netlify (Very Popular)

1. **Create Netlify Account**: [https://netlify.com](https://netlify.com)

2. **Drag & Drop Deployment:**
   ```bash
   npm run build
   ```
   - Netlify Dashboard → "Add new site" → "Deploy manually"
   - Drag & drop `dist` folder

3. **Or Git Integration:**
   - Connect GitHub repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

---

### Option 3: cPanel / Traditional Hosting

⚠️ **Important:** Deploying to cPanel is slightly complex because SPA routing requires special configuration.

#### Steps:

1. **Create Build:**
   ```bash
   npm run build
   ```

2. **Upload Files:**
   - Use FileZilla or cPanel File Manager
   - Upload **ALL CONTENTS** of `dist` folder to `public_html`
   - (Not the dist folder itself, but its **contents**)

3. **Create `.htaccess` File:**

Create `public_html/.htaccess` file and add this code:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle React Router
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

4. **Verify:**
   - Visit your domain: `https://yourdomain.com`
   - Check that all pages (About, Contact, etc.) work

---

### Option 4: GitHub Pages (Free)

1. **Install `gh-pages` package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to `package.json`:**
   ```json
   {
     "homepage": "https://username.github.io/talent-tutor",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/talent-tutor/',  // repository name
     // ... rest of config
   });
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## 🔍 Troubleshooting

### Issue 1: "Blank Page" Showing

**Cause:**
- Build not created
- Wrong base path configured

**Solution:**
```bash
# 1. Rebuild
npm run build

# 2. Check Console (F12)
# If you see 404 errors, fix base path

# 3. Check vite.config.ts
# Set base path if deploying to subdirectory
```

---

### Issue 2: Routes Not Working (404 Error)

**Cause:** Server-side routing not configured

**Solution (cPanel):**
- Upload `.htaccess` file properly (shown above)

**Solution (Nginx):**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### Issue 3: CSS/Images Not Loading

**Cause:** Incorrect base path

**Solution:**

If hosting in subdirectory (e.g., `yourdomain.com/app`):

`vite.config.ts`:
```typescript
export default defineConfig({
  base: '/app/',  // subdirectory name
  // ...
});
```

---

### Issue 4: "npm install" Failing

**Solution:**
```bash
# 1. Clear cache
npm cache clean --force

# 2. Delete node_modules
rm -rf node_modules package-lock.json
# Windows: rmdir /s node_modules and del package-lock.json

# 3. Reinstall
npm install
```

---

### Issue 5: "Module not found" Error

**Solution:**
```bash
# Most common issue - dependency not installed
npm install

# If specific package is missing:
npm install [package-name]
```

---

## 📊 Deployment Comparison

| Feature | Vercel | Netlify | cPanel | GitHub Pages |
|---------|--------|---------|--------|--------------|
| **Setup Ease** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Free Tier** | ✅ Excellent | ✅ Good | ❌ Paid | ✅ Limited |
| **Auto Deploy** | ✅ | ✅ | ❌ | ⚠️ Manual |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ | ✅ |
| **SSL Certificate** | ✅ Auto | ✅ Auto | ⚠️ Let's Encrypt | ✅ Auto |
| **Build Time** | Fast | Fast | N/A | Slow |
| **Best For** | Production | Production | Traditional | Demo |

---

## ✅ Recommended Workflow

### Development (On Your Computer):
```bash
npm run dev
# Edit code → See changes instantly
```

### Testing Production Build (Before Deploy):
```bash
npm run build
npm run preview
# Test at http://localhost:4173
```

### Deploy to Production:
```bash
# Option A: Vercel/Netlify (Auto)
git push

# Option B: Manual
npm run build
# Upload dist folder
```

---

## 🎯 Quick Checklist

Before deploying, check:

- [ ] ✅ Node.js installed (v18+)
- [ ] ✅ `npm install` successful
- [ ] ✅ `npm run dev` runs locally
- [ ] ✅ `npm run build` completes without errors
- [ ] ✅ `.env` file configured (if needed)
- [ ] ✅ `dist` folder created
- [ ] ✅ `.htaccess` ready (for cPanel)
- [ ] ✅ No errors in browser console

---

## 📞 Need Help?

**Common Issues:**
1. **Works locally but not live:** Check base path and routing
2. **Build failing:** Check dependencies and TypeScript errors
3. **Slow loading:** Enable compression and caching

**For Debugging:**
```bash
# Detailed build output
npm run build -- --debug

# Check for errors
npm run build 2>&1 | tee build.log
```

---

## 🎉 Summary

### To Run Locally:
```bash
npm install
npm run dev
```

### To Deploy:
```bash
npm run build
# Then upload dist folder
```

**Easiest Path:** Use Vercel or Netlify - connects to GitHub and auto-deploys! 🚀

---

**For More Information:**
- `/SETUP_LOCAL.md` - Detailed local setup
- `/README.md` - Project overview
- `/DOCUMENTATION_INDEX.md` - Complete documentation

**Wishing you successful deployment!** 🎊
