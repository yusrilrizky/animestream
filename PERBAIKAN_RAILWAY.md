# ✅ PERBAIKAN RAILWAY - Server Offline Fixed!

## 🔧 Yang Sudah Diperbaiki

### 1. Database Path Issue
**Masalah:** Railway tidak bisa write database ke root directory
**Solusi:** 
- Database path sekarang flexible dengan env var `DATABASE_PATH`
- Auto-fallback ke in-memory jika tidak bisa write
- Logging lebih detail untuk debug

**File:** `database.js`

### 2. Build Configuration
**Masalah:** better-sqlite3 perlu di-rebuild untuk Linux Railway
**Solusi:**
- Update `nixpacks.toml` dengan gcc & gnumake
- Update `railway.toml` dengan build command yang benar
- Pakai `npm ci` untuk faster install

**Files:** `nixpacks.toml`, `railway.toml`

### 3. Server Startup
**Masalah:** Host binding dan logging kurang jelas
**Solusi:**
- Bind ke `0.0.0.0` (sudah benar, tapi sekarang pakai env var)
- Tambah HOST env var untuk flexibility
- Logging lebih detail (database path, health check URL)

**File:** `server.js`

### 4. Health Check
**Masalah:** Timeout terlalu pendek (100ms)
**Solusi:**
- Increase timeout ke 300 seconds
- Health check return JSON dengan uptime
- Endpoint sudah ada di `/health`

**File:** `railway.toml`

---

## 📋 File Baru

### 1. `RAILWAY_DEPLOY.md`
Panduan lengkap deploy ke Railway dengan troubleshooting

### 2. `DEPLOY_SEKARANG.md`
Quick start guide - 5 menit deploy!

### 3. `test-railway-local.js`
Script untuk test Railway config di local

### 4. `railway-deploy.sh`
Helper script untuk deployment

---

## 🚀 Cara Deploy Sekarang

### Option 1: Quick Deploy (Recommended)

```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Deploy to Railway"
git remote add origin https://github.com/USERNAME/animestream.git
git branch -M main
git push -u origin main

# 2. Deploy di Railway
# - Buka https://railway.app
# - Login with GitHub
# - New Project → Deploy from GitHub repo
# - Pilih repo animestream
# - Tunggu 2-3 menit
# - DONE!
```

### Option 2: Test Local Dulu

```bash
# Test dengan Railway config
npm run test-railway

# Atau manual
npm install
npm start
```

Buka: `http://localhost:3000/health`

---

## ✅ Checklist Deployment

- [x] `railway.json` - Deploy config
- [x] `railway.toml` - Build & health check config
- [x] `nixpacks.toml` - Build dependencies
- [x] `Procfile` - Start command
- [x] `.railwayignore` - Files to ignore
- [x] `server.js` - Fixed host binding & logging
- [x] `database.js` - Fixed database path
- [x] `package.json` - Added test scripts

---

## 🔍 Cara Cek Kalau Berhasil

### 1. Health Check
```bash
curl https://your-app.railway.app/health
```

Harus return:
```json
{
  "status": "OK",
  "timestamp": "2026-02-10T...",
  "uptime": 123.45
}
```

### 2. Login Page
Buka: `https://your-app.railway.app/login`

Harus muncul halaman login dengan background purple

### 3. Login Test
- Username: `admin`
- Password: `admin123`

Harus bisa login dan masuk dashboard

### 4. Upload Test
- Dashboard → Upload
- Upload video kecil (test)
- Harus berhasil dan video tersimpan

---

## 🐛 Troubleshooting

### Error: "Application failed to respond"

**Penyebab:** Server belum selesai starting

**Solusi:**
1. Tunggu 1-2 menit lagi
2. Cek logs di Railway dashboard
3. Cek health check: `/health`

### Error: "Build failed"

**Penyebab:** Dependencies tidak terinstall

**Solusi:**
1. Cek `package.json` ada
2. Cek `nixpacks.toml` ada
3. Redeploy dari Railway dashboard

### Error: "Database error"

**Penyebab:** Database tidak bisa dibuat

**Solusi:**
1. Railway auto-create database di `/app/animestream.db`
2. Jika masih error, set env var:
   ```
   DATABASE_PATH=/tmp/animestream.db
   ```
3. Redeploy

### Error: "Port already in use"

**Penyebab:** Railway set PORT otomatis

**Solusi:**
- Jangan set PORT manual
- Server sudah pakai `process.env.PORT`
- Redeploy

---

## 📊 Monitoring

### Cek Logs
1. Railway dashboard
2. Klik project
3. Tab "Deployments"
4. Klik deployment terakhir
5. View "Build Logs" dan "Deploy Logs"

### Cek Usage
1. Railway dashboard
2. Tab "Usage"
3. Lihat CPU, Memory, Network

### Cek Health
```bash
# Health check
curl https://your-app.railway.app/health

# Login page
curl -I https://your-app.railway.app/login
```

---

## 💡 Tips

### 1. Environment Variables
Railway auto-generate yang penting, tapi bisa tambah:

```
SESSION_SECRET=your-secret-key-here
DATABASE_PATH=./animestream.db
NODE_ENV=production
```

### 2. Custom Domain
Railway kasih domain gratis, tapi bisa pakai domain sendiri:
- Settings → Domains → Add custom domain

### 3. Auto-Deploy
Setiap push ke GitHub, Railway auto-deploy:
```bash
git add .
git commit -m "Update"
git push
```

### 4. Backup Database
Download database dari Railway:
```bash
railway run cat animestream.db > backup.db
```

---

## 🎯 Next Steps

1. **Deploy ke Railway** (ikuti `DEPLOY_SEKARANG.md`)
2. **Test semua fitur** (login, upload, watch)
3. **Ganti password admin** (Settings → Change Password)
4. **Share URL** ke teman
5. **Buat APK** (opsional, lihat `APK_STANDALONE_LENGKAP.md`)

---

## 📞 Butuh Bantuan?

### Railway Error
- Cek logs di dashboard
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

### Aplikasi Error
- Test lokal: `npm start`
- Cek health: `/health`
- Lihat server logs

---

## ✅ Summary

**Masalah:** Server offline di Railway
**Penyebab:** 
- Database path issue
- Build configuration kurang lengkap
- Health check timeout terlalu pendek

**Solusi:**
- ✅ Fixed database path dengan env var
- ✅ Update build config (nixpacks, railway.toml)
- ✅ Increase health check timeout
- ✅ Better logging & error handling

**Status:** **READY TO DEPLOY!** 🚀

**Next:** Push ke GitHub → Deploy di Railway → Test → DONE!
