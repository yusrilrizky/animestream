# 🚀 Deploy Step-by-Step (Dijamin Berhasil!)

## 📋 Persiapan (5 Menit)

### 1. Pastikan Code Sudah Siap
```bash
# Test local dulu
node server.js

# Buka browser: http://localhost:3000
# Login: admin / admin123
# Pastikan semua berfungsi
```

### 2. Install Git (jika belum)
- Windows: https://git-scm.com/download/win
- Verify: `git --version`

### 3. Buat Akun GitHub (jika belum)
- Buka: https://github.com
- Sign up (gratis)
- Verifikasi email

---

## 📤 Upload ke GitHub (10 Menit)

### Step 1: Init Git
```bash
# Di folder project
git init
git add .
git commit -m "Initial commit - AnimeStream"
```

### Step 2: Buat Repository di GitHub
1. Login ke GitHub
2. Klik **"New repository"** (tombol hijau)
3. Isi:
   ```
   Repository name: animestream
   Description: Platform Streaming Anime
   Public/Private: Public
   ```
4. Klik **"Create repository"**

### Step 3: Push ke GitHub
```bash
# Ganti 'username' dengan username GitHub kamu
git remote add origin https://github.com/username/animestream.git
git branch -M main
git push -u origin main
```

**Jika diminta login:**
- Username: username GitHub kamu
- Password: Personal Access Token (bukan password biasa)

**Cara buat Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Generate new token
3. Pilih: repo (full control)
4. Copy token, simpan!

---

## 🌐 Deploy ke Render (15 Menit)

### Step 1: Buat Akun Render
1. Buka: https://render.com
2. Klik **"Get Started"**
3. Sign up dengan GitHub (recommended)
4. Authorize Render

### Step 2: Buat Web Service
1. Dashboard Render → Klik **"New +"**
2. Pilih **"Web Service"**
3. Connect repository:
   - Klik **"Connect account"** (jika belum)
   - Pilih repository **"animestream"**
   - Klik **"Connect"**

### Step 3: Konfigurasi Service
Isi form:

**Name:**
```
animestream
```

**Environment:**
```
Node
```

**Region:**
```
Singapore
```

**Branch:**
```
main
```

**Build Command:**
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Start Command:**
```
node server.js
```

**Instance Type:**
```
Free
```

### Step 4: Environment Variables
Scroll ke bawah, klik **"Advanced"**

Tambahkan variables (klik "Add Environment Variable"):

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: SESSION_SECRET
Value: animestream-production-secret-2024-GANTI-INI
```
⚠️ **PENTING:** Ganti dengan random string!

**Variable 3:**
```
Key: PORT
Value: 10000
```

**Variable 4:**
```
Key: BASE_URL
Value: https://animestream.onrender.com
```
⚠️ Ganti "animestream" dengan nama service kamu

### Step 5: Deploy!
1. Klik **"Create Web Service"** (tombol biru besar)
2. Tunggu build (5-10 menit)
3. Lihat logs real-time

---

## ✅ Cek Hasil Deploy

### Tunggu Build Selesai
Di logs, tunggu sampai muncul:
```
✅ Database tables initialized
✅ Admin account created
✅ Server berjalan di http://localhost:10000
```

### Buka Website
URL: `https://your-app-name.onrender.com`

Contoh: `https://animestream.onrender.com`

### Test Login
```
Username: admin
Password: admin123
```

**Jika berhasil login → SELESAI! 🎉**

---

## ❌ Jika Ada Error

### Error: "Build failed"
**Cek logs, cari error message**

**Jika "better-sqlite3":**
```
Build Command salah
Fix: npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Jika "Module not found":**
```
Dependencies tidak lengkap
Fix: Cek package.json
```

### Error: "Internal Server Error"
**Cek logs, cari error message**

**Jika "Database":**
```
Normal, database akan dibuat otomatis
Tunggu beberapa detik, refresh
```

**Jika "Port":**
```
Environment variable PORT salah
Fix: Set PORT=10000
```

### Error: "Application failed to respond"
**Website tidak bisa diakses**

```
1. Cek logs untuk error
2. Pastikan server listening di 0.0.0.0
3. Pastikan PORT=10000
4. Redeploy
```

---

## 🔄 Update Website

Setiap kali ada perubahan code:

```bash
# 1. Commit changes
git add .
git commit -m "Update fitur"

# 2. Push ke GitHub
git push

# 3. Render auto-deploy (2-5 menit)
```

---

## 📱 Custom Domain (Optional)

### Gratis dari Render:
```
https://your-app.onrender.com
```

### Custom Domain:
1. Beli domain (Niagahoster, Namecheap, dll)
2. Render Dashboard → Settings → Custom Domain
3. Tambahkan domain
4. Update DNS records
5. Tunggu propagasi (1-24 jam)

---

## 🎯 Checklist Lengkap

- [ ] Code tested local
- [ ] Git initialized
- [ ] Pushed to GitHub
- [ ] Render account created
- [ ] Web Service created
- [ ] Build Command correct
- [ ] Start Command correct
- [ ] Environment variables set
- [ ] Build successful
- [ ] Website accessible
- [ ] Login works
- [ ] Dashboard works

---

## 🆘 Butuh Bantuan?

**Dokumentasi:**
- RENDER_TROUBLESHOOTING.md
- RENDER_QUICK_FIX.md
- PRODUCTION_CHECKLIST.md

**Contact:**
- WA: 082297706541

---

**© 2026 AnimeStream**
**Selamat! Website kamu sudah online! 🎉**
