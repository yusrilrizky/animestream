# 🔧 Fix Error Login di Website

## ❌ Masalah: Error Saat Login

### Kemungkinan Penyebab:
1. Database belum ter-create
2. Admin account belum ada
3. Session error
4. Password hash error

---

## ✅ Solusi Quick Fix

### Local (PC):

```bash
# 1. Cek database
npm run check-db

# 2. Jika error, hapus database lama
del animestream.db

# 3. Start server (database akan dibuat otomatis)
node server.js

# 4. Test login
# Buka: http://localhost:3000
# Login: admin / admin123
```

### Render (Production):

**Step 1: Cek Logs**
1. Render Dashboard → Logs
2. Cari error message
3. Screenshot error

**Step 2: Redeploy**
1. Render Dashboard → Manual Deploy
2. Clear build cache & deploy
3. Tunggu 5-10 menit

**Step 3: Test Login**
1. Buka website
2. Login: admin / admin123
3. Jika masih error, lanjut ke Step 4

**Step 4: Check Environment Variables**
Pastikan ada 4 variables:
```
NODE_ENV=production
SESSION_SECRET=random-secret-here
PORT=10000
BASE_URL=https://your-app.onrender.com
```

---

## 🔍 Diagnosa Error Spesifik

### Error: "Username atau email tidak ditemukan"

**Penyebab:** Admin account belum ter-create

**Solusi:**
```bash
# Local
npm run check-db

# Render
Redeploy dengan clear cache
```

### Error: "Password salah"

**Penyebab:** Password hash tidak match

**Solusi:**
```bash
# Local
npm run reset-admin

# Render
Redeploy dengan clear cache
```

### Error: "Terjadi kesalahan saat login"

**Penyebab:** Session error

**Solusi:**
1. Cek SESSION_SECRET di environment
2. Pastikan tidak kosong
3. Redeploy

### Error: "Internal Server Error"

**Penyebab:** Database error

**Solusi:**
1. Cek logs untuk detail error
2. Redeploy dengan clear cache
3. Jika masih error, gunakan PostgreSQL

---

## 🧪 Test Database

### Local:
```bash
# Test database
npm run check-db

# Output yang benar:
# ✅ Database initialized
# Found X users
# ✅ Admin account exists
# Username: admin
# Email: admin@animestream.com
# Role: admin
# Has password: Yes
```

### Render:
Lihat logs saat deploy, harus ada:
```
✅ Database tables initialized
✅ Admin account created (username: admin, password: admin123)
```

---

## 🔄 Reset Admin Password

### Local:
```bash
npm run reset-admin
```

### Render:
Tidak bisa reset di Render (database tidak persistent).
Solusi: Gunakan PostgreSQL untuk production.

---

## 📝 Checklist Troubleshooting

- [ ] Database ter-create (cek logs)
- [ ] Admin account ada (cek logs)
- [ ] SESSION_SECRET diset
- [ ] Build successful
- [ ] Server running
- [ ] Website accessible
- [ ] Login form muncul
- [ ] Submit login
- [ ] Cek error message
- [ ] Cek logs untuk detail

---

## 🆘 Masih Error?

### 1. Cek Logs Detail
**Render:**
- Dashboard → Logs
- Cari "Login failed" atau "Login error"
- Screenshot error

**Local:**
- Terminal akan show error
- Copy error message

### 2. Test dengan User Baru
Coba register user baru:
1. Klik "Daftar sekarang"
2. Isi form register
3. Submit
4. Login dengan user baru
5. Jika berhasil → masalah di admin account
6. Jika gagal → masalah di sistem login

### 3. Cek Browser Console
1. F12 → Console
2. Lihat error JavaScript
3. Screenshot error

---

## 🎯 Solusi Permanen

### Untuk Production (Render):

**Gunakan PostgreSQL** (database persistent)

Baca: **RENDER_POSTGRESQL.md**

**Kenapa?**
- SQLite di Render tidak persistent
- Database reset setiap deploy
- Admin account hilang setiap deploy

**PostgreSQL:**
- ✅ Data persistent
- ✅ Admin account tetap ada
- ✅ Production-ready

---

## 📞 Contact Support

Jika masih error setelah semua cara di atas:

**Kirim info ini:**
1. Screenshot error di website
2. Screenshot logs di Render
3. Screenshot environment variables
4. URL website

**WA:** 082297706541

---

**© 2026 AnimeStream**
