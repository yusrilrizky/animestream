# ⚡ Quick Start - Render + APK (20 Menit!)

## 🎯 Langkah Cepat

### 1️⃣ Push ke GitHub (10 menit)

```bash
# Buat repo di https://github.com → New repository → animestream

# Push code
git branch -M main
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main
```

---

### 2️⃣ Deploy Render (5 menit)

1. Buka: https://render.com
2. Sign up with GitHub
3. New + → Web Service
4. Connect repository `animestream`
5. Konfigurasi:
   ```
   Build: npm install --legacy-peer-deps && npm rebuild better-sqlite3
   Start: node server.js
   ```
6. Environment Variables:
   ```
   NODE_ENV = production
   SESSION_SECRET = animestream-secret-xyz
   PORT = 10000
   BASE_URL = https://animestream.onrender.com
   ```
7. Create Web Service
8. Tunggu 5-10 menit
9. Website online! ✅

**URL:** `https://animestream.onrender.com`

---

### 3️⃣ Buat APK (5 menit)

**Cara Termudah - AppGeyser:**

1. Buka: https://appsgeyser.com
2. Create App → Website
3. URL: `https://animestream.onrender.com`
4. Name: `AnimeStream`
5. Create
6. Download APK
7. Install di HP
8. Selesai! 📱

---

## 💡 Tips

### Agar Website Tidak Sleep:

**Pakai UptimeRobot (Gratis):**
1. Buka: https://uptimerobot.com
2. Add Monitor → HTTP(s)
3. URL: `https://animestream.onrender.com`
4. Interval: 5 minutes
5. Website selalu online! ✅

---

## 📖 Panduan Lengkap

Baca: **`RENDER_DAN_APK_LENGKAP.md`**

Ada:
- Step-by-step detail
- Troubleshooting
- Customize icon
- Distribusi APK
- Tips pro

---

## ⚠️ Catatan

**Render (SQLite):**
- ✅ Gratis & mudah
- ⚠️ Data tidak persistent
- ⚠️ Website sleep 15 menit

**Untuk data persistent:**
- Railway.app (baca: `DEPLOY_RAILWAY_LENGKAP.md`)
- Atau tambah PostgreSQL

---

**© 2026 AnimeStream**
