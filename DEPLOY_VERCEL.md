# 🚀 Deploy ke Vercel - Step by Step

## ✅ File Konfigurasi Sudah Dibuat!

File `vercel.json` sudah dibuat untuk konfigurasi Vercel.

---

## ⚠️ Catatan Penting

**Vercel adalah platform serverless**, jadi:
- ✅ Super cepat (CDN global)
- ✅ 100% gratis unlimited
- ✅ Custom domain gratis
- ⚠️ **SQLite tidak persistent** (data hilang setiap deploy)
- ⚠️ Upload file tidak persistent (video hilang setiap deploy)

**Solusi:**
- Untuk testing: OK, bisa dicoba
- Untuk production: Pakai hosting lain (Cyclic, Railway, Fly.io)

---

## 🚀 Cara Deploy (10 Menit)

### STEP 1: Push ke GitHub (5 Menit)

#### 1.1 Commit File Baru

```bash
# Add vercel.json
git add vercel.json
git commit -m "Add Vercel config"
```

#### 1.2 Push ke GitHub (jika belum)

**Jika belum punya repository:**

1. Buka: https://github.com
2. Login atau Sign up
3. New repository → Nama: `animestream`
4. Public
5. Create repository

**Push code:**

```bash
# Set branch
git branch -M main

# Add remote (GANTI USERNAME!)
git remote add origin https://github.com/USERNAME/animestream.git

# Push
git push -u origin main
```

Saat diminta password: **paste token** (bukan password GitHub!)

**Jika sudah punya repository:**

```bash
git push
```

---

### STEP 2: Deploy ke Vercel (5 Menit)

#### 2.1 Buat Akun Vercel

1. Buka: https://vercel.com
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"** (paling mudah)
4. Klik **"Authorize Vercel"**
5. Login otomatis! ✅

---

#### 2.2 Import Project

1. Dashboard Vercel → Klik **"Add New"** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari repository **"animestream"**
4. Klik **"Import"**

---

#### 2.3 Konfigurasi Project

**Framework Preset:**
```
Other
```

**Root Directory:**
```
./
```

**Build Command:**
```
npm install --legacy-peer-deps
```

**Output Directory:**
```
(kosongkan)
```

**Install Command:**
```
npm install --legacy-peer-deps
```

---

#### 2.4 Environment Variables

Klik **"Environment Variables"** → Add:

```
SESSION_SECRET = animestream-secret-vercel-xyz
NODE_ENV = production
```

---

#### 2.5 Deploy!

1. Klik **"Deploy"** (tombol biru)
2. Tunggu build (2-3 menit)
3. Status: **"Ready"**
4. Website online! 🎉

**URL:**
```
https://animestream.vercel.app
```
(atau nama lain yang Vercel generate)

---

### STEP 3: Test Website (2 Menit)

#### 3.1 Buka Website

Klik URL yang diberikan Vercel

---

#### 3.2 Test Login

Login dengan:
```
Username: admin
Password: admin123
```

**Berhasil login?** → Deploy sukses! 🎉

---

#### 3.3 Test Register

1. Klik **"Daftar sekarang"**
2. Register user baru
3. Login dengan user baru

⚠️ **Catatan:** Data akan hilang setiap deploy karena serverless!

---

## 🔄 Update Website

```bash
# 1. Edit code
# ...

# 2. Commit & push
git add .
git commit -m "Update"
git push

# 3. Vercel auto-deploy (30 detik)
```

---

## 🎨 Custom Domain (Opsional)

1. Vercel Dashboard → Project → **"Settings"**
2. **"Domains"**
3. Add domain kamu
4. Update DNS di domain provider
5. Done!

---

## ⚠️ Masalah & Solusi

### Masalah 1: Data Hilang Setiap Deploy

**Penyebab:** Vercel serverless, tidak ada persistent storage

**Solusi:**
- Pakai database eksternal (MongoDB Atlas, Supabase)
- Atau pakai hosting lain (Cyclic, Railway, Fly.io)

---

### Masalah 2: Upload Video Tidak Jalan

**Penyebab:** Vercel tidak support file upload persistent

**Solusi:**
- Pakai cloud storage (Cloudinary, AWS S3)
- Atau pakai hosting lain

---

### Masalah 3: Session Tidak Persistent

**Penyebab:** Serverless function restart setiap request

**Solusi:**
- Pakai session store eksternal (Redis)
- Atau pakai hosting lain

---

## 💡 Rekomendasi

### Untuk Testing:
✅ **Vercel** - Cepat, mudah, gratis

### Untuk Production:
❌ **Jangan pakai Vercel** untuk app dengan:
- Upload file
- SQLite database
- Session management

✅ **Pakai ini:**
- **Cyclic.sh** - Data persistent, gratis
- **Railway.app** - Cepat, tidak sleep
- **Fly.io** - Powerful, gratis

---

## 🆘 Troubleshooting

### Error: "Build failed"

**Fix:**
1. Vercel Dashboard → Logs
2. Cek error message
3. Pastikan `vercel.json` ada
4. Redeploy

---

### Error: "Internal Server Error"

**Fix:**
1. Cek Logs
2. Pastikan environment variables sudah diset
3. Cek `vercel.json` konfigurasi

---

### Error: "Cannot find module"

**Fix:**
1. Pastikan `package.json` benar
2. Build Command: `npm install --legacy-peer-deps`
3. Redeploy

---

## 📱 Buat APK

1. Website sudah online
2. Buka: https://appsgeyser.com
3. Pilih "Website"
4. URL: `https://animestream.vercel.app`
5. Download APK
6. Install di HP

---

## 🎯 Kesimpulan

**Vercel bagus untuk:**
- ✅ Static website
- ✅ API serverless
- ✅ Testing cepat

**Vercel TIDAK cocok untuk:**
- ❌ Upload file
- ❌ SQLite database
- ❌ Long-running process

**Alternatif terbaik:**
- **Cyclic.sh** - Data persistent, upload file OK
- **Railway.app** - Full-stack, powerful
- **Fly.io** - Production-ready

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `HOSTING_ALTERNATIF_MUDAH.md` - Semua pilihan hosting
- `MULAI_SINI_HOSTING.md` - Overview

---

**© 2026 AnimeStream**
**Vercel: Cepat untuk testing, tapi pakai hosting lain untuk production! 🚀**
