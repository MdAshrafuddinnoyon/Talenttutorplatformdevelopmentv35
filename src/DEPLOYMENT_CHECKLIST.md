# 📋 Deployment Checklist - Talent Tutor

## Pre-Deployment Checklist

### ✅ Local Development

- [ ] **Node.js Installed**
  ```bash
  node -v  # Should show v18+ or v20+
  npm -v   # Should show v9+ or v10+
  ```

- [ ] **Dependencies Installed**
  ```bash
  npm install
  # Should complete without errors
  ```

- [ ] **Development Server Works**
  ```bash
  npm run dev
  # Should open at http://localhost:5173
  ```

- [ ] **All Pages Load Correctly**
  - [ ] Homepage (/)
  - [ ] About Page (/about)
  - [ ] Find Teachers (/find-teachers)
  - [ ] Browse Tuitions (/browse-tuitions)
  - [ ] Login/Register pages
  - [ ] Dashboard pages (Student, Teacher, Admin)

- [ ] **No Console Errors**
  - Open Browser Console (F12)
  - Navigate through all pages
  - Check for red error messages

- [ ] **Environment Variables Set**
  ```bash
  # Copy .env.example to .env
  cp .env.example .env
  
  # Add your API keys if needed:
  # - VITE_GOOGLE_MAPS_API_KEY
  # - VITE_SUPABASE_URL
  # - VITE_SUPABASE_ANON_KEY
  ```

### ✅ Production Build

- [ ] **Build Succeeds**
  ```bash
  npm run build
  # Should create 'dist' folder without errors
  ```

- [ ] **Build Output Exists**
  - [ ] `dist/index.html` file exists
  - [ ] `dist/assets/` folder exists
  - [ ] Files have hash in names (e.g., `index-abc123.js`)

- [ ] **Preview Build Locally**
  ```bash
  npm run preview
  # Test at http://localhost:4173
  ```

- [ ] **Test Production Build**
  - [ ] All pages load
  - [ ] Images display correctly
  - [ ] Styles applied correctly
  - [ ] JavaScript works
  - [ ] No 404 errors in console

### ✅ Code Quality

- [ ] **No TypeScript Errors**
  ```bash
  npm run build
  # Should compile without TypeScript errors
  ```

- [ ] **Remove Debug Code**
  - [ ] No `console.log()` statements
  - [ ] No debugging tools left enabled
  - [ ] No test data in production code

- [ ] **Check File Sizes**
  ```bash
  # After build, check dist/assets/
  # Main JS should be < 1MB
  # If larger, consider code splitting
  ```

---

## Deployment Options

### Option 1: Vercel (Recommended) ✅

**Advantages:**
- ✅ Free tier generous
- ✅ Automatic deployments from Git
- ✅ Built-in CDN
- ✅ Free SSL
- ✅ Perfect for React/Vite

**Steps:**
1. [ ] Create Vercel account (https://vercel.com)
2. [ ] Connect GitHub repository
3. [ ] Import project
4. [ ] Configure build settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. [ ] Add Environment Variables (if needed)
6. [ ] Deploy!

**After Deployment:**
- [ ] Test live URL
- [ ] Check all routes work
- [ ] Verify SSL certificate active
- [ ] Test on mobile devices

---

### Option 2: Netlify

**Steps:**
1. [ ] Create Netlify account (https://netlify.com)
2. [ ] Choose deployment method:

   **Option A: Drag & Drop**
   ```bash
   npm run build
   # Drag 'dist' folder to Netlify
   ```

   **Option B: Git Integration**
   - Connect repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

3. [ ] Configure Environment Variables
4. [ ] Deploy

**After Deployment:**
- [ ] Add custom domain (optional)
- [ ] Enable HTTPS
- [ ] Test all routes

---

### Option 3: cPanel / Traditional Hosting

**Pre-requisites:**
- [ ] FTP access credentials
- [ ] Access to File Manager
- [ ] `.htaccess` support enabled

**Steps:**

1. [ ] **Build Project**
   ```bash
   npm run build
   ```

2. [ ] **Upload Files**
   - Open FileZilla or cPanel File Manager
   - Navigate to `public_html` (or `www`)
   - Upload **contents** of `dist` folder (not the folder itself)
   - Should look like:
     ```
     public_html/
     ├── index.html
     ├── assets/
     │   ├── index-abc123.js
     │   ├── index-xyz789.css
     └── .htaccess (create this)
     ```

3. [ ] **Create `.htaccess` File**
   - Create file: `public_html/.htaccess`
   - Add this content:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. [ ] **Verify Upload**
   - [ ] All files uploaded
   - [ ] File permissions correct (644 for files, 755 for folders)
   - [ ] `.htaccess` is uploaded

5. [ ] **Test Deployment**
   - [ ] Homepage loads
   - [ ] All routes work (no 404)
   - [ ] Images load
   - [ ] CSS applies
   - [ ] JavaScript works

**Common cPanel Issues:**

- [ ] **404 on routes**: Check `.htaccess` file
- [ ] **Blank page**: Check browser console for errors
- [ ] **Images missing**: Check file paths and uploads
- [ ] **CSS not loading**: Clear browser cache

---

### Option 4: GitHub Pages

**Steps:**

1. [ ] **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. [ ] **Update package.json**
   ```json
   {
     "homepage": "https://username.github.io/talent-tutor",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. [ ] **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/talent-tutor/',  // repository name
     // ... rest of config
   });
   ```

4. [ ] **Deploy**
   ```bash
   npm run deploy
   ```

5. [ ] **Enable GitHub Pages**
   - Go to repository Settings
   - Pages section
   - Source: `gh-pages` branch
   - Save

**Limitations:**
- Static site only (no server-side features)
- URL will be: username.github.io/repo-name

---

## Post-Deployment Checklist

### ✅ Functionality Tests

- [ ] **Homepage**
  - [ ] Hero section displays
  - [ ] All images load
  - [ ] Buttons work
  - [ ] Links navigate correctly

- [ ] **Navigation**
  - [ ] Header links work
  - [ ] Footer links work
  - [ ] Mobile menu works (if applicable)

- [ ] **Authentication**
  - [ ] Login page works
  - [ ] Register page works
  - [ ] Logout works
  - [ ] Session persists

- [ ] **Dashboard**
  - [ ] Student dashboard accessible
  - [ ] Teacher dashboard accessible
  - [ ] Admin dashboard accessible
  - [ ] All features functional

- [ ] **Forms**
  - [ ] Contact form works
  - [ ] Registration form works
  - [ ] Application forms work
  - [ ] Validation works

### ✅ Performance Tests

- [ ] **Page Load Speed**
  - Use: https://pagespeed.web.dev
  - Target: > 80 score

- [ ] **Mobile Responsiveness**
  - [ ] Test on actual mobile device
  - [ ] Test on tablet
  - [ ] Test different screen sizes

- [ ] **Browser Compatibility**
  - [ ] Chrome/Edge (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)

### ✅ SEO & Metadata

- [ ] **Meta Tags Present**
  - [ ] Page title set
  - [ ] Meta description set
  - [ ] Open Graph tags (for social sharing)

- [ ] **Favicon Visible**
  - Check browser tab for favicon

- [ ] **Robots.txt**
  - [ ] File exists in `public/` folder
  - [ ] Allows indexing (if desired)

### ✅ Security

- [ ] **HTTPS Enabled**
  - [ ] SSL certificate active
  - [ ] No mixed content warnings

- [ ] **API Keys Secured**
  - [ ] No API keys in client-side code
  - [ ] Environment variables used properly

- [ ] **Headers Set** (for cPanel)
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection

### ✅ Monitoring

- [ ] **Analytics Setup** (optional)
  - Google Analytics
  - Vercel Analytics
  - Netlify Analytics

- [ ] **Error Tracking** (optional)
  - Sentry
  - LogRocket
  - Bugsnag

---

## Common Issues & Solutions

### Issue: Blank Page After Deployment

**Causes:**
- Base path misconfigured
- Build errors not noticed
- JavaScript not loading

**Solutions:**
1. Check browser console (F12)
2. Verify `vite.config.ts` base path
3. Re-build: `npm run build`
4. Check all files uploaded

---

### Issue: Routes Return 404

**Cause:** Server not configured for SPA routing

**Solutions:**

**Vercel/Netlify:** Automatic (no action needed)

**cPanel:** Add `.htaccess` (see above)

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### Issue: Images/CSS Not Loading

**Causes:**
- Incorrect base path
- Files not uploaded
- Wrong file permissions (cPanel)

**Solutions:**
1. Check `vite.config.ts` base path
2. Verify all files in `dist/assets/` uploaded
3. cPanel: Set permissions to 644

---

### Issue: Environment Variables Not Working

**Cause:** Not prefixed with `VITE_`

**Solution:**
All environment variables MUST start with `VITE_`:
```env
# ✅ Correct
VITE_GOOGLE_MAPS_API_KEY=abc123

# ❌ Wrong
GOOGLE_MAPS_API_KEY=abc123
```

---

## Final Checklist

Before marking as "Production Ready":

- [ ] All features working on live site
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads (< 3 seconds)
- [ ] HTTPS enabled
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Images optimized
- [ ] SEO basics covered
- [ ] Tested on multiple devices/browsers

---

## Emergency Rollback

If deployment fails:

**Vercel/Netlify:**
- Go to Deployments
- Click "Rollback" on previous successful deployment

**cPanel:**
- Keep backup of previous `dist` folder
- Re-upload old files via FTP

**GitHub Pages:**
```bash
git revert HEAD
git push
npm run deploy
```

---

## Support Resources

- **Vite Documentation:** https://vitejs.dev/guide/
- **React Documentation:** https://react.dev
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com

---

## 🎉 Deployment Complete!

Once all items are checked, your Talent Tutor platform is live and ready for users!

**Next Steps:**
1. Share your URL with users
2. Monitor analytics
3. Gather feedback
4. Plan updates and improvements

**Congratulations!** 🚀
