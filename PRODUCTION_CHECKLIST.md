# ✅ Production Deployment Checklist

## 🎯 Sebelum Deploy ke Render

### 1. Code Ready
- [ ] Semua fitur sudah ditest local
- [ ] Tidak ada error di console
- [ ] Login/Register berfungsi
- [ ] Dashboard berfungsi
- [ ] Upload berfungsi (local)

### 2. Environment Variables
- [ ] SESSION_SECRET diubah (jangan pakai default!)
- [ ] BASE_URL diset ke URL production
- [ ] NODE_ENV=production
- [ ] PORT=10000 (untuk Render)

### 3. Database
- [ ] Database bisa dibuat otomatis
- [ ] Admin account ter-create otomatis
- [ ] Tabel ter-create semua

### 4. Dependencies
- [ ] package.json lengkap
- [ ] better-sqlite3 ada di dependencies
- [ ] Tidak ada dev dependencies yang required

---

## 🚀 Deploy ke Render

### Step 1: Push ke GitHub
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Buat Web Service di Render
1. Login ke Render.com
2. New + → Web Service
3. Connect GitHub repository
4. Konfigurasi:
   ```
   Name: animestream
   Environment: Node
   Region: Singapore
   Branch: main
   Build Command: npm install --legacy-peer-deps && npm rebuild better-sqlite3
   Start Command: node server.js
   ```

### Step 3: Set Environment Variables
Di Render Dashboard → Environment:
```
NODE_ENV=production
SESSION_SECRET=animestream-production-secret-2024-CHANGE-THIS
PORT=10000
BASE_URL=https://your-app.onrender.com
```

**PENTING:** Ganti SESSION_SECRET dengan random string!

### Step 4: Deploy
1. Klik "Create Web Service"
2. Tunggu build (5-10 menit)
3. Cek logs untuk error
4. Test website

---

## ✅ Setelah Deploy

### 1. Test Login
- [ ] Buka https://your-app.onrender.com
- [ ] Login dengan admin/admin123
- [ ] Berhasil masuk dashboard

### 2. Test Register
- [ ] Register user baru
- [ ] Login dengan user baru
- [ ] Berhasil masuk

### 3. Test Dashboard
- [ ] Dashboard loading
- [ ] Stats muncul
- [ ] Menu berfungsi

### 4. Test Upload (akan error karena storage)
- [ ] Upload form muncul
- [ ] (File upload tidak akan persist di Render)

---

## ⚠️ Known Issues di Render

### 1. SQLite Not Persistent
**Masalah:**
- Database reset setiap deploy
- Data hilang setelah restart

**Solusi:**
- Gunakan PostgreSQL (gratis di Render)
- Baca: RENDER_POSTGRESQL.md

### 2. File Upload Not Persistent
**Masalah:**
- File video tidak persist
- Hilang setelah restart

**Solusi:**
- Gunakan cloud storage (Cloudinary, AWS S3)
- Atau disable upload feature untuk demo

### 3. Cold Start
**Masalah:**
- Website sleep setelah 15 menit
- First load lambat (~30 detik)

**Solusi:**
- Upgrade ke paid plan
- Atau gunakan uptime monitor (gratis)

---

## 🔧 Troubleshooting

### Error: "Internal Server Error"
1. Cek Render logs
2. Lihat error message
3. Baca: RENDER_TROUBLESHOOTING.md

### Error: "Module not found"
```
Build Command: npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

### Error: "Database locked"
```
Gunakan PostgreSQL
Baca: RENDER_POSTGRESQL.md
```

---

## 📊 Monitoring

### Cek Status
- Render Dashboard → Logs
- Lihat real-time logs
- Monitor errors

### Uptime Monitor (Gratis)
- UptimeRobot.com
- Ping website setiap 5 menit
- Prevent cold start

---

## 🎯 Production Best Practices

### Security
- [ ] SESSION_SECRET unique & random
- [ ] Password di-hash dengan bcrypt
- [ ] HTTPS enabled (otomatis di Render)
- [ ] Environment variables aman

### Performance
- [ ] Gzip compression enabled
- [ ] Static files cached
- [ ] Database indexed

### Monitoring
- [ ] Error logging
- [ ] Uptime monitoring
- [ ] Performance monitoring

---

**© 2026 AnimeStream**
