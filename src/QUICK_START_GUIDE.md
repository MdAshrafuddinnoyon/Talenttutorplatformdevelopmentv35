# 🎯 Quick Start Guide - Talent Tutor

## ⚠️ Important Warning

**This project will NOT run as a simple HTML file!**

This is a **Modern React Application** that requires:

### ✅ What You Need:
1. **Node.js** (Version 18 or higher)
2. **npm** (Node Package Manager)
3. **Terminal/Command Prompt** knowledge

### ❌ What Won't Work:
- ❌ Double-clicking index.html file
- ❌ Direct upload to PHP server
- ❌ Copying files and opening in browser

---

## 🚀 Quick Start (3 Steps)

### Windows Users:

1. **Install Node.js** (if not installed):
   - Download: https://nodejs.org
   - Choose LTS Version (Recommended)

2. **Go to Project Folder:**
   - Right-click folder
   - Select "Open in Terminal" or PowerShell

3. **Run Quick Start Script:**
   ```cmd
   quick-start.bat
   ```
   This will automatically check and setup everything!

4. **Start Development Server:**
   ```cmd
   npm run dev
   ```

5. **Open in Browser:**
   ```
   http://localhost:5173
   ```

---

### Mac/Linux Users:

1. **Install Node.js:**
   ```bash
   # Mac (with Homebrew):
   brew install node
   
   # Linux (Ubuntu/Debian):
   sudo apt install nodejs npm
   ```

2. **Open Terminal and Go to Project:**
   ```bash
   cd /path/to/talent-tutor
   ```

3. **Run Quick Start Script:**
   ```bash
   chmod +x quick-start.sh
   ./quick-start.sh
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 📦 Manual Setup (If Quick Start Fails)

### Step 1: Install Dependencies

```bash
npm install
```

⏱️ First time may take 3-10 minutes.

### Step 2: Start Development Mode

```bash
npm run dev
```

### Step 3: Create Production Build (For Deployment)

```bash
npm run build
```

After build, `dist` folder will be created.

---

## 🌍 Deploying to Live Server

See detailed guide: [`DEPLOYMENT_GUIDE_COMPLETE.md`](/DEPLOYMENT_GUIDE_COMPLETE.md)

### Easiest Way (Recommended):

**Use Vercel or Netlify** - both are free and provide automatic deployment!

#### Deploy to Vercel:
1. Go to https://vercel.com
2. Sign Up with GitHub
3. Import repository
4. Click Deploy
5. ✅ Done! Your site is live!

### Traditional Hosting (cPanel):

1. **Create Build:**
   ```bash
   npm run build
   ```

2. **Upload ALL CONTENTS of `dist` folder:**
   - Use FileZilla or cPanel File Manager
   - Upload to `public_html` folder

3. **Add `.htaccess` file** (for React Router)

See deployment guide for detailed instructions.

---

## 🔍 Troubleshooting

### Problem: "npm not found"

**Solution:**
1. Install Node.js from https://nodejs.org
2. Restart computer
3. Close and reopen Terminal

### Problem: "npm install" failing

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Try again
npm install
```

### Problem: Port already in use

**Solution:**
Vite will automatically use another port. Check Terminal for the new URL.

### Problem: Blank page showing

**Solution:**
1. Check browser console (F12)
2. Look for errors and fix them
3. Restart `npm run dev`

---

## 📚 More Information

- **Setup Guide:** [`SETUP_LOCAL.md`](/SETUP_LOCAL.md)
- **Deployment Guide:** [`DEPLOYMENT_GUIDE_COMPLETE.md`](/DEPLOYMENT_GUIDE_COMPLETE.md)
- **Full Documentation:** [`DOCUMENTATION_INDEX.md`](/DOCUMENTATION_INDEX.md)

---

## ✅ Checklist

Before deploying, ensure:

- [ ] Node.js installed and working
- [ ] `npm install` successful
- [ ] `npm run dev` runs locally
- [ ] All pages load correctly
- [ ] No errors in console
- [ ] `npm run build` successful
- [ ] `.env` file configured (if needed)

---

## 🎉 If Successful

You will see:
- ✅ Homepage loads beautifully
- ✅ All navigation works
- ✅ Designs display correctly
- ✅ Interactive features work

**Now you can start development!** 🚀

---

## 📞 Need Help?

1. **Read Documentation:** All guides are in the folder
2. **Check Console:** Look for error messages
3. **Google Search:** Copy error message and search
4. **GitHub Issues:** Ask the community

**Good luck!** 🎊
