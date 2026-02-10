# 🚀 Deploy ke Render.com (Gratis)

## 📋 Persiapan

### 1. Buat Akun GitHub
1. Buka https://github.com
2. Sign up (gratis)
3. Verifikasi email

### 2. Upload Project ke GitHub
```bash
# Di folder project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/animestream.git
git push -u origin main
```

### 3. Buat Akun Render
1. Buka https://render.com
2. Sign up dengan GitHub
3. Authorize Render

---

## 🎯 Langkah Deploy

### Step 1: Buat Web Service
1. Login ke Render.com
2. Klik **"New +"** → **"Web Service"**
3. Connect repository GitHub kamu
4. Pilih repository **animestream**

### Step 2: Konfigurasi
```
Name: animestream
Environment: Node
Region: Singapore (terdekat)
Branch: main
Build Command: npm install
Start Command: node server.js
```

### Step 3: Environment Variables
Tambahkan di **Environment**:
```
PORT=3000
SESSION_SECRET=animestream-secret-key-2024
BASE_URL=https://animestream.onrender.com
NODE_ENV=production
```

### Step 4: Deploy
1. Klik **"Create Web Service"**
2. Tunggu 5-10 menit
3. Selesai! ✅

---

## 🌐 URL Website

Setelah deploy, website bisa diakses di:
```
https://animestream.onrender.com
```

Atau custom domain (gratis):
```
https://namakamu.com
```

---

## 📝 Update Website

Setiap kali push ke GitHub, otomatis deploy:
```bash
git add .
git commit -m "Update fitur"
git push
```

Render akan auto-deploy dalam 2-5 menit.

---

## ⚠️ Catatan Penting

### Sleep Mode
- Website sleep setelah 15 menit tidak aktif
- First load butuh ~30 detik (cold start)
- Solusi: Gunakan uptime monitor (gratis)

### Database
- SQLite tidak persistent di Render
- Gunakan PostgreSQL (gratis di Render)
- Atau gunakan external database

### File Upload
- File upload tidak persistent
- Gunakan cloud storage (Cloudinary, AWS S3)

---

Baca: **DEPLOY_DATABASE.md** untuk setup database
