# 🚀 Deploy ke Render - Super Simple!

## 🎯 Hasil Akhir

Website bisa dibuka di: `https://nama-kamu.onrender.com`

---

## 📋 Yang Dibutuhkan

1. ✅ Akun GitHub (gratis)
2. ✅ Akun Render (gratis)
3. ✅ Project AnimeStream ini
4. ✅ 20 menit waktu

---

## 🚀 Langkah 1: Upload ke GitHub (10 Menit)

### A. Install Git (jika belum)
**Windows:**
- Download: https://git-scm.com/download/win
- Install (next-next-finish)
- Buka Command Prompt

**Cek instalasi:**
```bash
git --version
```

### B. Buat Akun GitHub
1. Buka: https://github.com
2. Klik **Sign up**
3. Isi email, password, username
4. Verifikasi email

### C. Upload Project

**Di Command Prompt, masuk ke folder project:**
```bash
cd C:\Users\Administrator\Downloads\ArtonNime
```

**Jalankan command ini satu per satu:**

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "AnimeStream ready for deploy"
```

**Buat repository di GitHub:**
1. Buka GitHub
2. Klik tombol **"+"** (kanan atas) → **"New repository"**
3. Isi:
   - Repository name: `animestream`
   - Public
4. Klik **"Create repository"**

**Push ke GitHub:**
```bash
git remote add origin https://github.com/USERNAME/animestream.git
```
⚠️ Ganti `USERNAME` dengan username GitHub kamu!

```bash
git branch -M main
```

```bash
git push -u origin main
```

**Jika diminta login:**
- Username: username GitHub kamu
- Password: buat Personal Access Token

**Cara buat Token:**
1. GitHub → Settings (kanan atas)
2. Developer settings (paling bawah)
3. Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Note: `render-deploy`
6. Expiration: No expiration
7. Centang: `repo` (full control)
8. Generate token
9. **COPY TOKEN** (simpan, tidak bisa dilihat lagi!)
10. Paste sebagai password saat push

**Selesai! Project sudah di GitHub!**

---

## 🌐 Langkah 2: Deploy ke Render (10 Menit)

### A. Buat Akun Render
1. Buka: https://render.com
2. Klik **"Get Started"**
3. Pilih **"Sign up with GitHub"** (recommended)
4. Authorize Render

### B. Buat Web Service

1. Dashboard Render → Klik **"New +"** (kanan atas)
2. Pilih **"Web Service"**
3. Klik **"Connect account"** (jika belum)
4. Pilih repository **"animestream"**
5. Klik **"Connect"**

### C. Konfigurasi (PENTING!)

**Isi form dengan PERSIS seperti ini:**

**Name:**
```
animestream
```
(atau nama lain yang kamu mau)

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

**Build Command:** (COPY PERSIS!)
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

### D. Environment Variables (PENTING!)

Scroll ke bawah, klik **"Advanced"**

Klik **"Add Environment Variable"** 4 kali, isi:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: SESSION_SECRET
Value: animestream-secret-2024-ganti-ini-dengan-random
```

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
⚠️ Ganti `animestream` dengan nama service kamu di step C!

### E. Deploy!

1. Klik **"Create Web Service"** (tombol biru besar)
2. Tunggu build (5-10 menit)
3. Lihat logs

**Tunggu sampai muncul:**
```
✅ Database tables initialized
✅ Admin account created
✅ Server berjalan di http://localhost:10000
```

---

## ✅ Langkah 3: Buka Website!

### URL Website:
```
https://nama-service-kamu.onrender.com
```

Contoh: `https://animestream.onrender.com`

### Test Login:
```
Username: admin
Password: admin123
```

**Jika berhasil login → SELESAI! 🎉**

---

## ❌ Jika Ada Error

### Error: "Build failed"

**Cek Build Command:**
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Harus PERSIS seperti itu!**

### Error: "Internal Server Error"

**Cek Environment Variables:**
- NODE_ENV = production
- SESSION_SECRET = (isi random)
- PORT = 10000
- BASE_URL = https://nama-kamu.onrender.com

**Redeploy:**
1. Render Dashboard → Manual Deploy
2. Clear build cache & deploy

### Error: "Application failed to respond"

**Tunggu 2-3 menit lagi**

Server butuh waktu untuk start pertama kali.

---

## 🔄 Update Website

Setiap kali ada perubahan code:

```bash
git add .
git commit -m "Update"
git push
```

Render akan auto-deploy dalam 2-5 menit!

---

## 📱 Buat APK

Setelah website online, buat APK:

1. Buka: https://appsgeyser.com
2. Pilih "Website"
3. Masukkan URL: `https://nama-kamu.onrender.com`
4. Isi nama app: AnimeStream
5. Download APK
6. Selesai!

---

## ✅ Checklist

- [ ] Git installed
- [ ] GitHub account created
- [ ] Project pushed to GitHub
- [ ] Render account created
- [ ] Web Service created
- [ ] Build Command correct
- [ ] Start Command correct
- [ ] Environment Variables set (4 variables)
- [ ] Deploy successful
- [ ] Website accessible
- [ ] Login works (admin/admin123)

---

## 🆘 Butuh Bantuan?

**Cek logs di Render:**
Dashboard → Logs → Lihat error message

**Dokumentasi lengkap:**
- DEPLOY_STEP_BY_STEP.md
- RENDER_TROUBLESHOOTING.md
- RENDER_QUICK_FIX.md

**Contact:**
WA: 082297706541

---

## 📊 Ringkasan Command

### Upload ke GitHub:
```bash
git init
git add .
git commit -m "AnimeStream ready"
git remote add origin https://github.com/USERNAME/animestream.git
git branch -M main
git push -u origin main
```

### Build Command (Render):
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

### Start Command (Render):
```
node server.js
```

### Environment Variables (Render):
```
NODE_ENV=production
SESSION_SECRET=random-secret-here
PORT=10000
BASE_URL=https://your-app.onrender.com
```

---

**© 2026 AnimeStream**
**Website kamu akan online dalam 20 menit! 🚀**
