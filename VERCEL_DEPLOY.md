# 🚀 Deploy ke Vercel - GRATIS

Vercel adalah platform hosting gratis yang mudah dipakai.

## ⚠️ PENTING - Keterbatasan Vercel

Vercel **TIDAK COCOK** untuk aplikasi ini karena:

❌ **Tidak ada persistent storage** - Database & video akan **HILANG** setiap deploy
❌ **Tidak bisa upload file** - Folder uploads tidak persisten
❌ **Serverless** - Tidak cocok untuk long-running server
❌ **SQLite tidak didukung** - Database akan reset

### ✅ Alternatif yang Lebih Baik:

1. **Localhost** (Recommended)
   - Data persisten
   - Upload video bisa
   - Gratis selamanya
   - Cara: `npm start`

2. **Railway.app**
   - $5 kredit gratis/bulan
   - Persistent storage
   - Upload video bisa
   - Database persisten

3. **Render.com**
   - Free tier
   - Persistent storage (terbatas)
   - Database persisten

---

## 🤔 Tetap Mau Coba Vercel?

Vercel bisa dipakai untuk **DEMO SAJA** (data tidak persisten).

### Langkah Deploy:

#### 1️⃣ Install Vercel CLI
```bash
npm install -g vercel
```

#### 2️⃣ Login
```bash
vercel login
```

#### 3️⃣ Deploy
```bash
vercel
```

Ikuti instruksi:
- Project name: `animestream`
- Setup: `y`
- Build command: (kosongkan)
- Output directory: (kosongkan)
- Development command: `npm start`

#### 4️⃣ Buka URL
Vercel akan kasih URL: `https://animestream-xxx.vercel.app`

---

## ⚠️ Masalah yang Akan Muncul:

### 1. Database Reset
Setiap deploy, database akan reset ke default (admin/admin123).

**Solusi:** Tidak ada. Vercel tidak support persistent database.

### 2. Upload Tidak Bisa
Upload video akan error karena filesystem read-only.

**Solusi:** Pakai cloud storage (Cloudinary, AWS S3) - ribet!

### 3. Session Tidak Persisten
Login akan logout sendiri karena session tidak tersimpan.

**Solusi:** Pakai external session store (Redis) - ribet!

---

## 💡 Rekomendasi

**Untuk aplikasi ini, JANGAN pakai Vercel!**

Pakai salah satu:

### Option 1: Localhost (Paling Simple)
```bash
npm install
npm start
# Buka: http://localhost:3000
```

**Keuntungan:**
- ✅ Gratis selamanya
- ✅ Data persisten
- ✅ Upload video bisa
- ✅ Tidak ada batasan

**Kekurangan:**
- ❌ Hanya bisa diakses dari komputer sendiri
- ❌ Harus nyalain komputer terus

### Option 2: Railway.app (Recommended untuk Online)
```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main

# 2. Buka railway.app
# 3. Login with GitHub
# 4. New Project → Deploy from GitHub
# 5. Pilih repo animestream
# 6. Done!
```

**Keuntungan:**
- ✅ $5 kredit gratis/bulan
- ✅ Data persisten
- ✅ Upload video bisa
- ✅ Database persisten
- ✅ Bisa diakses dari mana saja

**Kekurangan:**
- ❌ Perlu credit card (tapi gratis)
- ❌ Kredit terbatas ($5/bulan)

---

## 🎯 Kesimpulan

**Vercel = TIDAK COCOK untuk aplikasi ini!**

Pilih:
- **Localhost** - Kalau cuma buat sendiri
- **Railway** - Kalau mau online & data persisten

---

## 📞 Butuh Bantuan?

Kalau tetap mau deploy online dengan data persisten, tanya cara deploy ke Railway.app!
