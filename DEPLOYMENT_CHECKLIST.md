# ✅ Deployment Checklist - AnimeStream

## 📋 Pre-Deployment Checklist

### Code Status:
- [x] PostgreSQL implementation complete (`database-pg.js`)
- [x] Database wrapper implemented (`database-wrapper.js`)
- [x] Server.js updated with async/await (25 routes)
- [x] Dependencies added (`pg` package)
- [x] Environment variables documented (`.env.example`)
- [x] No syntax errors (verified with `node --check`)
- [x] Build command configured
- [x] Start command configured
- [x] Error handling implemented
- [x] Graceful shutdown implemented

### Documentation:
- [x] Complete deployment guide (`DEPLOY_LENGKAP.md`)
- [x] Quick reference card (`DEPLOY_QUICK_REFERENCE.md`)
- [x] PostgreSQL setup guide (`POSTGRESQL_SETUP_SIMPLE.md`)
- [x] Migration details (`POSTGRESQL_MIGRATION_COMPLETE.md`)
- [x] Status overview (`DEPLOY_STATUS.md`)
- [x] Quick start guide (`START_HERE_DEPLOY.md`)
- [x] Documentation index (`README_DEPLOY.md`)
- [x] This checklist (`DEPLOYMENT_CHECKLIST.md`)

---

## 🚀 GitHub Upload Checklist

### Prerequisites:
- [ ] Git installed on computer
- [ ] GitHub account created
- [ ] Personal Access Token created & saved
- [ ] Repository created on GitHub

### Upload Steps:
- [ ] Navigate to project folder
- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git branch -M main`
- [ ] `git remote add origin https://github.com/USERNAME/animestream.git`
- [ ] `git push -u origin main`
- [ ] Verify code visible on GitHub

---

## 🐘 PostgreSQL Setup Checklist

### Render Account:
- [ ] Render account created
- [ ] Logged in to Render Dashboard

### Database Creation:
- [ ] Click "New +" → PostgreSQL
- [ ] Name: `animestream-db`
- [ ] Database: `animestream`
- [ ] User: `animestream`
- [ ] Region: Singapore
- [ ] Plan: Free
- [ ] Click "Create Database"
- [ ] Wait for status: "Available"

### Database URL:
- [ ] Scroll to "Connections" section
- [ ] Find "Internal Database URL"
- [ ] Click "Copy" button
- [ ] Save URL in notepad
- [ ] Verify URL format: `postgresql://user:pass@host/db`

---

## 🌐 Web Service Setup Checklist

### Service Creation:
- [ ] Click "New +" → Web Service
- [ ] Click "Connect account" (if needed)
- [ ] Select repository: `animestream`
- [ ] Click "Connect"

### Configuration:
- [ ] Name: `animestream` (or custom name)
- [ ] Environment: Node
- [ ] Region: Singapore
- [ ] Branch: main
- [ ] Build Command: `npm install --legacy-peer-deps && npm rebuild better-sqlite3`
- [ ] Start Command: `node server.js`
- [ ] Instance Type: Free

### Environment Variables:
- [ ] Click "Advanced"
- [ ] Add Variable 1: `NODE_ENV` = `production`
- [ ] Add Variable 2: `SESSION_SECRET` = `random-string-here`
- [ ] Add Variable 3: `PORT` = `10000`
- [ ] Add Variable 4: `BASE_URL` = `https://your-app.onrender.com`
- [ ] Add Variable 5: `DATABASE_URL` = (paste PostgreSQL URL)
- [ ] Verify all 5 variables are set correctly

### Deployment:
- [ ] Click "Create Web Service"
- [ ] Wait for build to start
- [ ] Monitor logs for errors
- [ ] Wait for "Build successful"
- [ ] Wait for "Deploy live"

---

## 🧪 Testing Checklist

### Initial Access:
- [ ] Open website URL: `https://your-app.onrender.com`
- [ ] Website loads without errors
- [ ] Login page displays correctly
- [ ] No console errors in browser

### Login Test:
- [ ] Login with: `admin` / `admin123`
- [ ] Login successful
- [ ] Dashboard loads
- [ ] User info displays correctly

### Registration Test:
- [ ] Click "Daftar sekarang"
- [ ] Register new user: `testuser` / `test@test.com` / `test123`
- [ ] Registration successful
- [ ] Redirected to login page

### Data Persistence Test:
- [ ] Login with new user: `testuser` / `test123`
- [ ] Login successful
- [ ] Logout
- [ ] Go to Render Dashboard
- [ ] Click "Manual Deploy" → "Deploy latest commit"
- [ ] Wait for redeploy to complete
- [ ] Login again with: `testuser` / `test123`
- [ ] **Login successful?** → Data persistent! ✅

### Feature Tests:
- [ ] Upload anime works
- [ ] Watch anime works
- [ ] Dashboard displays correctly
- [ ] My Uploads shows uploaded anime
- [ ] Trending page works
- [ ] New Releases page works
- [ ] Categories page works
- [ ] Settings page works
- [ ] Profile update works
- [ ] Password change works
- [ ] Music controls work
- [ ] WhatsApp button works

---

## 📱 APK Creation Checklist

### AppGeyser Method:
- [ ] Go to https://appsgeyser.com
- [ ] Click "Create App"
- [ ] Select "Website"
- [ ] Enter URL: `https://your-app.onrender.com`
- [ ] Enter Name: `AnimeStream`
- [ ] Customize icon (optional)
- [ ] Click "Create"
- [ ] Download APK
- [ ] Install on Android device
- [ ] Test app functionality

### PWA Method:
- [ ] Open website on mobile browser
- [ ] Click browser menu
- [ ] Select "Add to Home Screen"
- [ ] Confirm installation
- [ ] Test app from home screen

---

## 🔄 Post-Deployment Checklist

### Monitoring:
- [ ] Check Render logs for errors
- [ ] Monitor database usage
- [ ] Check website performance
- [ ] Test all features regularly

### Documentation:
- [ ] Update BASE_URL in documentation
- [ ] Share deployment URL with team
- [ ] Document any custom configurations
- [ ] Save all credentials securely

### Maintenance:
- [ ] Set up regular backups (if needed)
- [ ] Monitor free tier limits
- [ ] Plan for scaling (if needed)
- [ ] Keep dependencies updated

---

## 🐛 Troubleshooting Checklist

### Build Fails:
- [ ] Check Build Command is correct
- [ ] Check package.json is valid
- [ ] Try "Clear build cache & deploy"
- [ ] Check Render logs for specific error

### Internal Server Error:
- [ ] Verify all 5 environment variables are set
- [ ] Check DATABASE_URL is correct
- [ ] Check logs for error details
- [ ] Try redeploying

### Database Connection Error:
- [ ] Verify DATABASE_URL format
- [ ] Check PostgreSQL database is "Available"
- [ ] Copy DATABASE_URL again from Render
- [ ] Update environment variable
- [ ] Redeploy

### Data Not Persistent:
- [ ] Check logs: should see "Using PostgreSQL database"
- [ ] If see "falling back to SQLite" → DATABASE_URL not set
- [ ] Verify DATABASE_URL in environment variables
- [ ] Redeploy with clear cache

### Login Errors:
- [ ] Check database initialized correctly
- [ ] Check logs for error details
- [ ] Try creating new user
- [ ] Check password hashing works

---

## 📊 Success Criteria

### Deployment Success:
- ✅ Website accessible at public URL
- ✅ Login works with admin/admin123
- ✅ Registration works
- ✅ Data persists after redeploy
- ✅ All pages load without errors
- ✅ Upload functionality works
- ✅ Database connection stable

### Production Ready:
- ✅ PostgreSQL connected
- ✅ SSL enabled
- ✅ Error handling working
- ✅ Logs clean (no critical errors)
- ✅ Performance acceptable
- ✅ Security measures in place

---

## 🎯 Final Verification

### Before Going Live:
- [ ] All tests passed
- [ ] No critical errors in logs
- [ ] Data persistence verified
- [ ] All features working
- [ ] APK tested (if created)
- [ ] Documentation updated
- [ ] Credentials saved securely

### Ready for Users:
- [ ] Website URL shared
- [ ] Login credentials provided
- [ ] User guide available
- [ ] Support contact available (WA: 082297706541)

---

## 📝 Notes

### Important URLs:
```
Website: https://your-app.onrender.com
GitHub: https://github.com/USERNAME/animestream
Render Dashboard: https://dashboard.render.com
PostgreSQL Dashboard: (in Render)
```

### Important Credentials:
```
Admin Login: admin / admin123
GitHub Token: (saved securely)
DATABASE_URL: (in Render environment variables)
SESSION_SECRET: (in Render environment variables)
```

### Important Commands:
```bash
# Update website
git add .
git commit -m "Update"
git push

# Check syntax
node --check server.js

# Test locally
npm start
```

---

## 🎉 Deployment Complete!

When all checkboxes are checked:
- ✅ Code deployed
- ✅ Database connected
- ✅ Tests passed
- ✅ Website live
- ✅ APK created
- ✅ Documentation complete

**Congratulations! AnimeStream is now live! 🚀**

---

**© 2026 AnimeStream**
**Deployment Checklist v1.0**
