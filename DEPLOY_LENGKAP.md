# 🚀 Deploy Lengkap ke Render - Step by Step

## 📋 Yang Dibutuhkan
- ✅ Project AnimeStream ini
- ✅ Akun GitHub (gratis)
- ✅ Akun Render (gratis)
- ✅ 30 menit waktu

---

## 🎯 PART 1: Upload ke GitHub (15 Menit)

### Step 1: Install Git

**Windows:**
1. Download: https://git-scm.com/download/win
2. Install (klik Next terus sampai selesai)
3. Buka **Command Prompt** atau **PowerShell**

**Cek instalasi:**
```bash
git --version
```
Harus muncul: `git version 2.x.x`

---

### Step 2: Buat Akun GitHub

1. Buka: https://github.com
2. Klik **"Sign up"** (kanan atas)
3. Isi:
   - Email: email kamu
   - Password: buat password
   - Username: pilih username
4. Klik **"Create account"**
5. Verifikasi email (cek inbox)
6. Login ke GitHub

---

### Step 3: Buat Personal Access Token

**Kenapa perlu?** Untuk push code ke GitHub

1. Login ke GitHub
2. Klik foto profil (kanan atas) → **Settings**
3. Scroll ke bawah → **Developer settings** (paling bawah)
4. **Personal access tokens** → **Tokens (classic)**
5. Klik **"Generate new token"** → **"Generate new token (classic)"**
6. Isi:
   - Note: `render-deploy`
   - Expiration: **No expiration**
   - Centang: **repo** (full control of private repositories)
7. Scroll ke bawah → Klik **"Generate token"**
8. **COPY TOKEN** (simpan di notepad, tidak bisa dilihat lagi!)
   
   Contoh token:
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

### Step 4: Buat Repository di GitHub

1. Login ke GitHub
2. Klik tombol **"+"** (kanan atas) → **"New repository"**
3. Isi:
   - Repository name: `animestream`
   - Description: `Platform Streaming Anime`
   - Public (pilih ini)
   - **JANGAN** centang "Add a README file"
4. Klik **"Create repository"**
5. **JANGAN TUTUP** halaman ini (akan dipakai di step berikutnya)

---

### Step 5: Upload Project ke GitHub

**Buka Command Prompt/PowerShell:**

1. Masuk ke folder project:
   ```bash
   cd C:\Users\Administrator\Downloads\ArtonNime
   ```

2. Init Git:
   ```bash
   git init
   ```

3. Add semua file:
   ```bash
   git add .
   ```

4. Commit:
   ```bash
   git commit -m "Initial commit - AnimeStream with PostgreSQL"
   ```

5. Set branch ke main:
   ```bash
   git branch -M main
   ```

6. Add remote (ganti USERNAME dengan username GitHub kamu):
   ```bash
   git remote add origin https://github.com/USERNAME/animestream.git
   ```
   
   Contoh:
   ```bash
   git remote add origin https://github.com/johndoe/animestream.git
   ```

7. Push ke GitHub:
   ```bash
   git push -u origin main
   ```

8. **Akan diminta login:**
   - Username: username GitHub kamu
   - Password: **PASTE TOKEN** yang tadi disimpan (bukan password GitHub!)

9. Tunggu upload selesai (1-2 menit)

10. **Refresh halaman GitHub** → Code sudah muncul! ✅

---

## 🌐 PART 2: Deploy ke Render (15 Menit)

### Step 1: Buat Akun Render

1. Buka: https://render.com
2. Klik **"Get Started"**
3. Pilih **"Sign up with GitHub"** (recommended)
4. Klik **"Authorize Render"**
5. Login otomatis dengan GitHub ✅

---

### Step 2: Buat PostgreSQL Database

**Kenapa perlu?** Agar data tidak hilang

1. Dashboard Render → Klik **"New +"** (kanan atas)
2. Pilih **"PostgreSQL"**
3. Isi form:
   ```
   Name: animestream-db
   Database: animestream
   User: animestream
   Region: Singapore
   Plan: Free
   ```
4. Klik **"Create Database"**
5. Tunggu 2-3 menit (status: Available)

6. **Copy Database URL:**
   - Scroll ke **"Connections"**
   - Cari **"Internal Database URL"**
   - Klik **"Copy"** (icon copy)
   - **SIMPAN** di notepad
   
   Contoh URL:
   ```
   postgresql://animestream:xxxxx@dpg-xxxxx-a.singapore-postgres.render.com/animestream
   ```

---

### Step 3: Buat Web Service

1. Dashboard Render → Klik **"New +"**
2. Pilih **"Web Service"**
3. Klik **"Connect account"** (jika belum)
4. Pilih repository **"animestream"**
5. Klik **"Connect"**

---

### Step 4: Konfigurasi Web Service

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

---

### Step 5: Set Environment Variables

**Scroll ke bawah, klik "Advanced"**

**Klik "Add Environment Variable" 5 kali, isi:**

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: SESSION_SECRET
Value: animestream-production-secret-2024-GANTI-INI-DENGAN-RANDOM
```
⚠️ Ganti dengan random string!

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
⚠️ Ganti `animestream` dengan nama service kamu!

**Variable 5:** (DATABASE URL dari Step 2)
```
Key: DATABASE_URL
Value: (paste URL PostgreSQL yang tadi disimpan)
```

Contoh:
```
postgresql://animestream:xxxxx@dpg-xxxxx-a.singapore-postgres.render.com/animestream
```

---

### Step 6: Deploy!

1. Scroll ke bawah
2. Klik **"Create Web Service"** (tombol biru besar)
3. Tunggu build (5-10 menit)
4. Lihat logs real-time

**Tunggu sampai muncul:**
```
✅ Using PostgreSQL database
✅ PostgreSQL tables initialized
✅ Admin account created
✅ Server berjalan di http://localhost:10000
```

---

### Step 7: Buka Website!

**URL website:**
```
https://nama-service-kamu.onrender.com
```

Contoh: `https://animestream.onrender.com`

**Test Login:**
```
Username: admin
Password: admin123
```

**Jika berhasil login → SELESAI! 🎉**

---

## ✅ Test Data Persistent

1. Login: `admin` / `admin123`
2. Klik **"Daftar sekarang"**
3. Register user baru:
   - Username: `testuser`
   - Email: `test@test.com`
   - Password: `test123`
4. Login dengan user baru
5. Logout
6. **Redeploy** (Render Dashboard → Manual Deploy)
7. Tunggu deploy selesai
8. Login lagi dengan `testuser` / `test123`
9. **Berhasil login?** → Data persistent! ✅

---

## 🔄 Update Website (Setiap Ada Perubahan)

```bash
# 1. Commit changes
git add .
git commit -m "Update fitur"

# 2. Push ke GitHub
git push

# 3. Render auto-deploy (2-5 menit)
```

---

## ❌ Troubleshooting

### Error: "Build failed"

**Cek Build Command:**
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```
Harus PERSIS seperti itu!

### Error: "Internal Server Error"

**Cek Environment Variables:**
- NODE_ENV = production
- SESSION_SECRET = (isi random)
- PORT = 10000
- BASE_URL = https://your-app.onrender.com
- DATABASE_URL = postgresql://...

**Redeploy:**
1. Manual Deploy
2. Clear build cache & deploy

### Error: "Cannot connect to database"

**Cek DATABASE_URL:**
- Copy ulang dari PostgreSQL Dashboard
- Paste ke Environment Variables
- Save Changes
- Redeploy

---

## 📝 Checklist Lengkap

### GitHub:
- [ ] Git installed
- [ ] GitHub account created
- [ ] Personal Access Token created & saved
- [ ] Repository created
- [ ] Code pushed to GitHub

### Render:
- [ ] Render account created
- [ ] PostgreSQL database created
- [ ] Database URL copied & saved
- [ ] Web Service created
- [ ] Build Command correct
- [ ] Start Command correct
- [ ] 5 Environment Variables set
- [ ] Deploy successful
- [ ] Website accessible
- [ ] Login works (admin/admin123)
- [ ] Register user baru
- [ ] Data persistent (test redeploy)

---

## 🎯 Summary Commands

### Upload ke GitHub:
```bash
cd C:\Users\Administrator\Downloads\ArtonNime
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main
```

### Update Website:
```bash
git add .
git commit -m "Update"
git push
```

---

## 📱 Buat APK (Setelah Online)

1. Buka: https://appsgeyser.com
2. Pilih "Website"
3. URL: `https://your-app.onrender.com`
4. Nama: AnimeStream
5. Download APK
6. Install di HP
7. Selesai!

---

## 🆘 Butuh Bantuan?

**Dokumentasi:**
- RENDER_SIMPLE.md
- POSTGRESQL_SETUP_SIMPLE.md
- LOGIN_ERROR_FIX.md

**Contact:**
WA: 082297706541

---

**© 2026 AnimeStream**
**Website kamu akan online dalam 30 menit! 🚀**
