# 🎯 MULAI DI SINI - Deploy AnimeStream

## ✅ CODE SUDAH 100% SIAP!

PostgreSQL migration **SELESAI**! Semua code sudah production-ready.

---

## 🚀 3 Langkah Deploy (30 Menit)

### 1️⃣ Upload ke GitHub (15 menit)

**Install Git:**
- Download: https://git-scm.com/download/win
- Install (Next, Next, Finish)

**Buat GitHub Account:**
- https://github.com → Sign up
- Verifikasi email

**Buat Personal Access Token:**
- GitHub → Settings → Developer settings
- Personal access tokens → Generate new token
- Centang: **repo**
- Copy & simpan token!

**Push Code:**
```bash
cd C:\Users\Administrator\Downloads\ArtonNime
git init
git add .
git commit -m "PostgreSQL ready"
git branch -M main
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main
```
(Ganti USERNAME dengan username GitHub kamu)

---

### 2️⃣ Setup PostgreSQL di Render (5 menit)

**Buat Database:**
1. https://render.com → Sign up with GitHub
2. Dashboard → **New +** → **PostgreSQL**
3. Name: `animestream-db`
4. Region: Singapore
5. Plan: **Free**
6. **Create Database**
7. Tunggu 2-3 menit
8. **Copy "Internal Database URL"** → Simpan!

---

### 3️⃣ Deploy Web Service (10 menit)

**Buat Web Service:**
1. Dashboard → **New +** → **Web Service**
2. Connect GitHub → Select `animestream`
3. Isi form:
   - Name: `animestream`
   - Environment: **Node**
   - Region: **Singapore**
   - Branch: `main`
   - Build Command: `npm install --legacy-peer-deps && npm rebuild better-sqlite3`
   - Start Command: `node server.js`
   - Instance Type: **Free**

**Set Environment Variables:**
Klik "Advanced" → Add Environment Variable (5x):

```
1. NODE_ENV = production
2. SESSION_SECRET = animestream-secret-2024-GANTI-INI
3. PORT = 10000
4. BASE_URL = https://animestream.onrender.com
5. DATABASE_URL = (paste URL dari step 2)
```

**Deploy:**
- Klik **Create Web Service**
- Tunggu 5-10 menit
- Buka: `https://animestream.onrender.com`
- Login: `admin` / `admin123`

---

## ✅ Test Data Persistent

1. Register user baru: `testuser` / `test@test.com` / `test123`
2. Logout
3. Render Dashboard → **Manual Deploy**
4. Tunggu deploy selesai
5. Login lagi: `testuser` / `test123`
6. **Berhasil?** → Data persistent! 🎉

---

## 📱 Buat APK (5 menit)

1. https://appsgeyser.com
2. Pilih **"Website"**
3. URL: `https://animestream.onrender.com`
4. Nama: `AnimeStream`
5. **Download APK**
6. Install di HP
7. Selesai!

---

## 📖 Dokumentasi Lengkap

**Panduan Utama:**
- [`DEPLOY_LENGKAP.md`](DEPLOY_LENGKAP.md) - Panduan lengkap dengan screenshot
- [`DEPLOY_QUICK_REFERENCE.md`](DEPLOY_QUICK_REFERENCE.md) - Referensi cepat
- [`README_DEPLOY.md`](README_DEPLOY.md) - Index semua dokumentasi

**PostgreSQL:**
- [`POSTGRESQL_SETUP_SIMPLE.md`](POSTGRESQL_SETUP_SIMPLE.md) - Setup PostgreSQL
- [`POSTGRESQL_MIGRATION_COMPLETE.md`](POSTGRESQL_MIGRATION_COMPLETE.md) - Detail teknis

**Troubleshooting:**
- [`RENDER_TROUBLESHOOTING.md`](RENDER_TROUBLESHOOTING.md) - Error di Render
- [`LOGIN_ERROR_FIX.md`](LOGIN_ERROR_FIX.md) - Error login

---

## 🐛 Troubleshooting Cepat

### Build Failed
```
Fix: Cek Build Command (harus persis!)
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

### Internal Server Error
```
Fix: Cek Environment Variables
- Harus ada 5 variables
- DATABASE_URL harus dari PostgreSQL Dashboard
- Redeploy
```

### Data Hilang Setelah Deploy
```
Fix: DATABASE_URL belum diset
- Copy ulang dari PostgreSQL Dashboard
- Paste ke Environment Variables
- Redeploy dengan "Clear build cache"
```

---

## 🎯 Yang Sudah Dikerjakan

### Code Changes:
- ✅ PostgreSQL implementation (`database-pg.js`)
- ✅ Database wrapper (`database-wrapper.js`)
- ✅ Server async/await (`server.js` - 25 routes updated)
- ✅ Dependencies (`pg` added to package.json)
- ✅ Environment variables (`.env.example` updated)

### Features:
- ✅ Data persistent dengan PostgreSQL
- ✅ Auto-switch SQLite (local) ↔ PostgreSQL (production)
- ✅ Production-ready security (bcrypt, SSL)
- ✅ Error handling & graceful shutdown
- ✅ Comprehensive documentation

### Documentation:
- ✅ 5 deployment guides
- ✅ 3 PostgreSQL guides
- ✅ 4 troubleshooting guides
- ✅ 3 APK creation guides
- ✅ This quick start guide

---

## 🔄 Update Website (Setelah Deploy)

```bash
# Edit code
# ...

# Push update
git add .
git commit -m "Update fitur"
git push

# Render auto-deploy (2-5 menit)
```

---

## 🆘 Butuh Bantuan?

**Dokumentasi:**
Baca [`DEPLOY_LENGKAP.md`](DEPLOY_LENGKAP.md) untuk panduan lengkap

**Contact:**
WhatsApp: 082297706541

**Logs:**
Render Dashboard → Logs (untuk debug error)

---

## 🎉 Ready to Deploy!

**Next Steps:**
1. ✅ Code sudah siap
2. 📖 Baca [`DEPLOY_LENGKAP.md`](DEPLOY_LENGKAP.md)
3. 🚀 Follow 3 langkah di atas
4. ✅ Website online dalam 30 menit!
5. 📱 Buat APK
6. 🎉 Selesai!

---

**© 2026 AnimeStream**
**Let's go! 🚀**
