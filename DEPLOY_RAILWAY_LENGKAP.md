# 🚀 Deploy ke Railway.app - Data & Video Persistent!

## ✅ Railway = Data Tetap Ada!

Railway support:
- ✅ SQLite persistent (database tidak hilang)
- ✅ File upload persistent (video tetap ada)
- ✅ Tidak sleep (website selalu online)
- ✅ Gratis $5/bulan credit
- ✅ Cepat & mudah

---

## 📋 STEP 1: Push ke GitHub (10 Menit)

### 1.1 Cek Status Git

Code sudah di-commit. Sekarang tinggal push ke GitHub.

### 1.2 Buat Repository di GitHub (jika belum)

1. Buka: https://github.com
2. Login (atau Sign up jika belum punya)
3. Klik **"+"** (pojok kanan atas) → **"New repository"**
4. Isi:
   ```
   Repository name: animestream
   Description: Platform Streaming Anime
   Public (pilih ini)
   ```
5. **JANGAN** centang "Add a README file"
6. Klik **"Create repository"**

---

### 1.3 Buat Personal Access Token

**Kenapa perlu?** Untuk push code ke GitHub

1. GitHub → Klik foto profil → **Settings**
2. Scroll ke bawah → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Isi:
   ```
   Note: railway-deploy
   Expiration: No expiration
   Centang: ☑️ repo (full control)
   ```
6. Klik **"Generate token"**
7. **COPY TOKEN** dan simpan di notepad!

Token seperti ini:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **PENTING:** Token hanya muncul sekali!

---

### 1.4 Push ke GitHub

**Buka Command Prompt atau PowerShell:**

```bash
# 1. Set branch ke main
git branch -M main

# 2. Add remote (GANTI USERNAME dengan username GitHub kamu!)
git remote add origin https://github.com/USERNAME/animestream.git

# Contoh:
# git remote add origin https://github.com/johndoe/animestream.git

# 3. Push ke GitHub
git push -u origin main
```

**Saat diminta login:**
- Username: `username-github-kamu`
- Password: **PASTE TOKEN** (bukan password GitHub!)

**Tunggu upload selesai (1-2 menit)**

**Refresh halaman GitHub** → Code sudah muncul! ✅

---

## 🚂 STEP 2: Deploy ke Railway (5 Menit)

### 2.1 Buat Akun Railway

1. Buka: https://railway.app
2. Klik **"Login"** atau **"Start a New Project"**
3. Pilih **"Login with GitHub"** (paling mudah)
4. Klik **"Authorize Railway"**
5. Login otomatis! ✅

---

### 2.2 Buat Project Baru

1. Dashboard Railway → Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Jika diminta, klik **"Configure GitHub App"**
4. Pilih repository **"animestream"**
5. Klik **"Deploy Now"**

Railway akan:
- Auto-detect Node.js
- Install dependencies
- Start server
- Generate domain

**Tunggu 2-3 menit...**

---

### 2.3 Set Environment Variables

1. Klik project kamu
2. Klik tab **"Variables"**
3. Klik **"New Variable"**
4. Add variables:

```
SESSION_SECRET = animestream-secret-railway-xyz789
NODE_ENV = production
```

5. Klik **"Add"**
6. Railway auto-redeploy

---

### 2.4 Generate Domain

1. Klik tab **"Settings"**
2. Scroll ke **"Domains"**
3. Klik **"Generate Domain"**
4. Domain otomatis dibuat!

**URL:**
```
https://animestream-production.up.railway.app
```

---

## ✅ STEP 3: Test Website! (5 Menit)

### 3.1 Buka Website

Klik URL yang diberikan Railway

---

### 3.2 Test Login

Login dengan:
```
Username: admin
Password: admin123
```

**Berhasil login?** → Deploy sukses! 🎉

---

### 3.3 Test Register

1. Klik **"Daftar sekarang"**
2. Register user baru:
   ```
   Username: testuser
   Email: test@test.com
   Password: test123
   ```
3. Login dengan user baru
4. **Berhasil?** → Fitur register jalan! ✅

---

### 3.4 Test Upload Video

1. Login sebagai admin
2. Klik **"Upload"**
3. Upload video anime
4. **Video muncul?** → Upload jalan! ✅

---

### 3.5 Test Data Persistent

**Ini penting untuk memastikan data tidak hilang:**

1. Logout
2. Railway Dashboard → Klik **"Redeploy"**
3. Tunggu redeploy selesai (1-2 menit)
4. Buka website lagi
5. Login dengan: `testuser` / `test123`
6. **Berhasil login?** → Data persistent! ✅
7. Cek video yang tadi diupload
8. **Video masih ada?** → File persistent! ✅

---

## 📱 STEP 4: Buat APK (5 Menit)

### 4.1 Pakai AppGeyser

1. Buka: https://appsgeyser.com
2. Klik **"Create App"**
3. Pilih **"Website"**
4. Masukkan URL: `https://animestream-production.up.railway.app`
5. Nama: `AnimeStream`
6. Klik **"Create"**
7. **Download APK**
8. Install di HP Android
9. Selesai! 📱

---

## 🔄 Update Website (Setiap Ada Perubahan)

```bash
# 1. Edit code kamu
# ...

# 2. Commit & push
git add .
git commit -m "Update fitur"
git push

# 3. Railway auto-deploy (1-2 menit)
```

---

## 💰 Monitoring Credit

Railway gratis $5/bulan. Cek usage:

1. Dashboard → **"Usage"**
2. Lihat credit yang terpakai
3. $5 cukup untuk ~500 jam/bulan (1 project kecil)

**Tips hemat credit:**
- Hapus project yang tidak dipakai
- Optimize code (kurangi memory usage)

**Jika credit habis:**
- Daftar akun baru dengan email lain (gratis lagi)
- Atau upgrade ke paid plan ($5/bulan)

---

## 🎨 Custom Domain (Opsional)

1. Railway Dashboard → Project → **"Settings"**
2. **"Domains"**
3. Klik **"Custom Domain"**
4. Masukkan domain kamu (contoh: `animestream.com`)
5. Update DNS di domain provider:
   ```
   Type: CNAME
   Name: @
   Value: (yang diberikan Railway)
   ```
6. Tunggu propagasi (5-30 menit)
7. Done!

---

## 🆘 Troubleshooting

### Error: "Build failed"

**Fix:**
1. Railway Dashboard → Logs
2. Cek error message
3. Biasanya karena dependencies
4. Pastikan `package.json` benar
5. Redeploy

---

### Error: "Application Error"

**Fix:**
1. Cek Logs untuk detail
2. Pastikan environment variables sudah diset
3. Cek PORT (Railway auto-set, jangan override)
4. Redeploy

---

### Website Lambat

**Fix:**
1. Optimize code
2. Compress images
3. Minify CSS/JS
4. Atau upgrade plan

---

### Credit Habis

**Fix:**
1. Hapus project yang tidak dipakai
2. Atau daftar akun baru (email lain)
3. Atau upgrade ke paid ($5/bulan)

---

## 📊 Perbandingan Railway vs Lainnya

| Fitur | Railway | Vercel | Cyclic | Glitch |
|-------|---------|--------|--------|--------|
| **Data Persistent** | ✅ | ❌ | ✅ | ❌ |
| **File Upload** | ✅ | ❌ | ✅ | ❌ |
| **Sleep** | ❌ | ❌ | ❌ | ✅ |
| **Gratis** | $5/bulan | ✅ | ✅ | ✅ |
| **Mudah** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Kesimpulan:**
Railway = **Terbaik untuk AnimeStream!**

---

## 🎯 Checklist Lengkap

### GitHub:
- [ ] Repository created
- [ ] Personal Access Token created
- [ ] Code pushed to GitHub

### Railway:
- [ ] Account created
- [ ] Project deployed
- [ ] Environment variables set
- [ ] Domain generated
- [ ] Website accessible

### Testing:
- [ ] Login works (admin/admin123)
- [ ] Register works
- [ ] Upload video works
- [ ] Data persistent (test redeploy)
- [ ] Video persistent (test redeploy)

### APK:
- [ ] APK created
- [ ] APK installed on phone
- [ ] App works on phone

---

## 🎉 Selesai!

Website kamu sudah online di:
```
https://animestream-production.up.railway.app
```

**Kelebihan Railway:**
- ✅ Data tidak hilang
- ✅ Video tidak hilang
- ✅ Tidak sleep
- ✅ Cepat
- ✅ Mudah

**Perfect untuk AnimeStream! 🚀**

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `HOSTING_ALTERNATIF_MUDAH.md` - Semua pilihan
- `MULAI_SINI_HOSTING.md` - Overview

---

**© 2026 AnimeStream**
**Railway: Data & video tetap ada! 🎉**
