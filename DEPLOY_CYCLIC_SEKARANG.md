# 🚀 Deploy ke Cyclic - Lanjutan

## ✅ Code Sudah Di-Commit!

Git sudah di-init dan code sudah di-commit. Sekarang tinggal push ke GitHub!

---

## 📋 Langkah Selanjutnya

### STEP 1: Push ke GitHub (5 Menit)

#### 1.1 Buat Repository di GitHub (jika belum)

1. Buka: https://github.com
2. Login (atau Sign up jika belum punya akun)
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

#### 1.2 Buat Personal Access Token

**Kenapa perlu?** Untuk push code ke GitHub

1. GitHub → Klik foto profil → **Settings**
2. Scroll ke bawah → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Isi:
   ```
   Note: cyclic-deploy
   Expiration: No expiration
   Centang: ☑️ repo (full control of private repositories)
   ```
6. Klik **"Generate token"** (tombol hijau)
7. **COPY TOKEN** dan simpan di notepad!

Token seperti ini:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **PENTING:** Token hanya muncul sekali! Simpan baik-baik!

---

#### 1.3 Push ke GitHub

**Buka Command Prompt atau PowerShell:**

```bash
# 1. Set branch ke main
git branch -M main

# 2. Add remote (GANTI USERNAME dengan username GitHub kamu!)
git remote add origin https://github.com/USERNAME/animestream.git

# 3. Push ke GitHub
git push -u origin main
```

**Contoh:**
Jika username GitHub kamu: `johndoe`
```bash
git remote add origin https://github.com/johndoe/animestream.git
git push -u origin main
```

**Saat diminta login:**
- Username: `username-github-kamu`
- Password: **PASTE TOKEN** (bukan password GitHub!)

**Tunggu upload selesai (1-2 menit)**

**Refresh halaman GitHub** → Code sudah muncul! ✅

---

### STEP 2: Deploy ke Cyclic (5 Menit)

#### 2.1 Buat Akun Cyclic

1. Buka: https://cyclic.sh
2. Klik **"Sign up"**
3. Pilih **"Sign up with GitHub"** (paling mudah)
4. Klik **"Authorize Cyclic"**
5. Login otomatis! ✅

---

#### 2.2 Deploy Project

1. Di Cyclic Dashboard, klik **"Link Your Own"**
2. Pilih repository **"animestream"** dari list
3. Klik **"Connect"**
4. Cyclic auto-detect Node.js
5. Tunggu deploy (2-3 menit)
6. Status berubah jadi **"Deployed"**

**Website langsung online!** 🎉

**URL:**
```
https://animestream-xxx.cyclic.app
```

---

#### 2.3 Set Environment Variables (Opsional)

1. Dashboard → Klik project kamu
2. Klik **"Variables"** (sidebar kiri)
3. Add variables:
   ```
   SESSION_SECRET = animestream-secret-cyclic-xyz789
   NODE_ENV = production
   ```
4. Klik **"Save"**
5. Cyclic auto-redeploy

---

### STEP 3: Test Website! (2 Menit)

#### 3.1 Buka Website

Klik URL yang diberikan Cyclic:
```
https://animestream-xxx.cyclic.app
```

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
2. Register user baru:
   ```
   Username: testuser
   Email: test@test.com
   Password: test123
   ```
3. Login dengan user baru
4. **Berhasil?** → Semua fitur jalan! ✅

---

#### 3.4 Test Data Persistent

1. Upload anime baru
2. Logout
3. Cyclic Dashboard → **"Redeploy"**
4. Tunggu redeploy selesai
5. Login lagi
6. **Anime masih ada?** → Data persistent! ✅

---

### STEP 4: Buat APK (5 Menit)

#### 4.1 Pakai AppGeyser

1. Buka: https://appsgeyser.com
2. Klik **"Create App"**
3. Pilih **"Website"**
4. Masukkan URL: `https://animestream-xxx.cyclic.app`
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

# 3. Cyclic auto-deploy (1-2 menit)
```

---

## 🎉 Selesai!

Website kamu sudah online di:
```
https://animestream-xxx.cyclic.app
```

**Kelebihan Cyclic:**
- ✅ 100% gratis
- ✅ Data persistent (tidak hilang)
- ✅ Tidak sleep
- ✅ Custom domain gratis
- ✅ Auto-deploy dari GitHub

---

## 🆘 Troubleshooting

### Error: "Build failed"

**Fix:**
1. Cyclic Dashboard → Logs
2. Cek error message
3. Biasanya karena dependencies
4. Pastikan `package.json` benar

---

### Error: "Application Error"

**Fix:**
1. Cek Logs untuk detail error
2. Pastikan `PORT` environment variable tidak diset (Cyclic auto-set)
3. Redeploy

---

### Website Tidak Muncul

**Fix:**
1. Tunggu 2-3 menit (deploy masih proses)
2. Refresh browser
3. Cek Logs untuk error

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `HOSTING_ALTERNATIF_MUDAH.md` - Panduan lengkap
- `MULAI_SINI_HOSTING.md` - Overview hosting

---

**© 2026 AnimeStream**
**Website kamu akan online dalam 15 menit! 🚀**
