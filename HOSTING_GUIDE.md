# 🌐 Hosting Guide - Pilih yang Cocok

## ⚠️ PENTING: Aplikasi Ini Butuh Persistent Storage!

Aplikasi ini pakai:
- SQLite database (file `animestream.db`)
- Upload video (folder `uploads/`)

Jadi butuh hosting yang support **persistent storage**.

---

## 🎯 Pilihan Hosting

### 1️⃣ Localhost (RECOMMENDED - Paling Simple)

**Cara:**
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
- ✅ Setup 2 menit

**Kekurangan:**
- ❌ Hanya bisa diakses dari komputer sendiri
- ❌ Komputer harus nyala terus

**Cocok untuk:**
- Personal use
- Development
- Testing

---

### 2️⃣ Railway.app (RECOMMENDED - Online)

**Cara:**
```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Deploy to Railway"
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main

# 2. Deploy
# - Buka https://railway.app
# - Login with GitHub
# - New Project → Deploy from GitHub
# - Pilih repo animestream
# - Tunggu 3-5 menit
# - Done!
```

**Keuntungan:**
- ✅ $5 kredit gratis/bulan (~500 jam)
- ✅ Data persisten
- ✅ Upload video bisa
- ✅ Database persisten
- ✅ Bisa diakses dari mana saja
- ✅ Auto-deploy dari GitHub

**Kekurangan:**
- ❌ Perlu credit card (tapi gratis)
- ❌ Kredit terbatas ($5/bulan)

**Cocok untuk:**
- Production
- Share dengan teman
- Online access

---

### 3️⃣ Vercel (TIDAK RECOMMENDED)

**Kenapa tidak?**
- ❌ Tidak ada persistent storage
- ❌ Database reset setiap deploy
- ❌ Upload video tidak bisa
- ❌ Serverless (tidak cocok)

**Hanya cocok untuk:**
- Static website
- API tanpa database
- Demo sementara

---

## 🎯 Rekomendasi

### Kalau Mau Simple & Lokal:
→ **Localhost** (`npm start`)

### Kalau Mau Online & Data Persisten:
→ **Railway.app**

### Jangan Pakai:
→ ~~Vercel~~ (data tidak persisten)

---

## 📋 Quick Comparison

| Feature | Localhost | Railway | Vercel |
|---------|-----------|---------|--------|
| Gratis | ✅ | ✅ ($5/mo) | ✅ |
| Data Persisten | ✅ | ✅ | ❌ |
| Upload Video | ✅ | ✅ | ❌ |
| Online Access | ❌ | ✅ | ✅ |
| Setup Time | 2 min | 5 min | 3 min |
| Recommended | ✅ | ✅ | ❌ |

---

## 🚀 Quick Start

### Localhost:
```bash
npm install && npm start
```

### Railway:
1. Push ke GitHub
2. Deploy di railway.app
3. Done!

---

## 💡 Tips

1. **Development:** Pakai localhost
2. **Production:** Pakai Railway
3. **Demo:** Bisa pakai Vercel (tapi data hilang)

---

## 📞 Butuh Bantuan?

- Localhost: Baca `README.md`
- Railway: Tanya cara deploy Railway
- Vercel: Baca `VERCEL_DEPLOY.md` (tapi tidak recommended)

---

**Pilih yang sesuai kebutuhan! 🎉**
