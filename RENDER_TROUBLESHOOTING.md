# 🔧 Render Troubleshooting - Internal Server Error

## ❌ Masalah: Internal Server Error

### Penyebab Umum:

1. **better-sqlite3 tidak ter-compile untuk Linux**
2. **Environment variables tidak diset**
3. **Database file tidak bisa dibuat**
4. **Port tidak sesuai**
5. **Build command salah**

---

## ✅ Solusi Step-by-Step

### Step 1: Cek Build Command

Di Render Dashboard:
```
Build Command: npm install --legacy-peer-deps && npm rebuild better-sqlite3
Start Command: node server.js
```

### Step 2: Set Environment Variables

Di Render Dashboard → Environment:
```
NODE_ENV=production
SESSION_SECRET=animestream-secret-key-2024-render
PORT=10000
BASE_URL=https://your-app.onrender.com
```

### Step 3: Cek Logs

Di Render Dashboard → Logs, cari error:

**Jika error "better-sqlite3":**
```
Build Command: npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Jika error "EADDRINUSE":**
```
Pastikan PORT di environment = 10000
```

**Jika error "Database":**
```
Database akan dibuat otomatis, tidak perlu khawatir
```

---

## 🔍 Cek Error Spesifik

### Error 1: "Cannot find module 'better-sqlite3'"

**Solusi:**
```bash
# Build Command di Render:
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

### Error 2: "EADDRINUSE: Port already in use"

**Solusi:**
```bash
# Pastikan di server.js:
const PORT = process.env.PORT || 3000;

# Dan di Render Environment:
PORT=10000
```

### Error 3: "Database locked"

**Solusi:**
SQLite tidak cocok untuk production di Render.
Gunakan PostgreSQL (gratis di Render).

Baca: **RENDER_POSTGRESQL.md**

### Error 4: "Session secret required"

**Solusi:**
```bash
# Di Render Environment:
SESSION_SECRET=animestream-secret-key-2024-render
```

---

## 🚀 Deploy Ulang

Setelah fix:
1. Push ke GitHub
2. Render auto-deploy
3. Tunggu 5-10 menit
4. Cek logs
5. Test website

---

## 📝 Checklist Deploy

- [ ] Build command benar
- [ ] Start command benar
- [ ] Environment variables diset
- [ ] Push ke GitHub
- [ ] Deploy berhasil
- [ ] Logs tidak ada error
- [ ] Website bisa diakses

---

## ⚠️ Catatan Penting

### SQLite di Render:
- ❌ File database tidak persistent
- ❌ Akan reset setiap deploy
- ❌ Tidak cocok untuk production

### Solusi:
- ✅ Gunakan PostgreSQL (gratis di Render)
- ✅ Atau gunakan external database

Baca: **RENDER_POSTGRESQL.md**

---

## 🆘 Masih Error?

### 1. Cek Logs Detail
```
Render Dashboard → Logs → Lihat error message
```

### 2. Test Local
```bash
# Set environment
export NODE_ENV=production
export PORT=10000

# Run server
node server.js

# Jika jalan di local, masalah di Render config
```

### 3. Rebuild
```
Render Dashboard → Manual Deploy → Clear build cache
```

---

**© 2026 AnimeStream**
**WA: 082297706541**
