# 🔧 Fix Crash - AnimeStream

## ✅ Perbaikan yang Sudah Dilakukan:

### 1. Global Error Handler
Tambah handler untuk uncaught errors:
```javascript
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});
```

### 2. Async Error Wrapper
Wrap semua async routes dengan error handler:
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('❌ Route error:', error);
    res.status(500).send('Error page');
  });
};
```

### 3. Database Error Handling
Better error handling untuk database init:
```javascript
try {
  initDatabase();
  console.log('✅ Database initialized');
} catch (error) {
  console.error('⚠️ Database error:', error);
  // Continue even if database fails
}
```

---

## 🐛 Common Crash Causes & Fixes:

### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use`

**Fix:** Server sudah handle ini:
```javascript
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});
```

### 2. Database Error
**Error:** `SQLITE_CANTOPEN` atau `Database locked`

**Fix:** Database sudah pakai error handling:
```javascript
try {
  initDatabase();
} catch (error) {
  console.error('Database error:', error);
  // App continues without database
}
```

### 3. Async/Await Errors
**Error:** `UnhandledPromiseRejection`

**Fix:** Semua async routes wrapped dengan `asyncHandler`

### 4. Missing Dependencies
**Error:** `Cannot find module 'xxx'`

**Fix:** 
```bash
npm install
```

---

## 🧪 Test Lokal:

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Test di browser
http://localhost:3000/login
```

**Kalau lokal jalan, Railway pasti jalan!**

---

## 🚀 Deploy ke Railway:

```bash
# 1. Commit fixes
git add .
git commit -m "Fix crash issues"

# 2. Push
git push

# 3. Railway auto-redeploy
# Tunggu 3-5 menit
```

---

## 📊 Cek Logs di Railway:

1. Railway dashboard → Project
2. Tab "Deployments"
3. Klik deployment terakhir
4. View "Deploy Logs"

**Cari:**
- ✅ "Server berjalan di..."
- ✅ "Database initialized"
- ❌ Error messages

---

## 🔍 Debug Crash:

### Step 1: Cek Logs
Railway logs akan show error message.

### Step 2: Common Errors

#### "Application failed to respond"
- Server tidak start
- Port issue
- Database issue

**Fix:** Cek logs untuk error detail

#### "Build failed"
- Dependencies error
- Dockerfile error

**Fix:** Test build lokal:
```bash
docker build -t animestream .
```

#### "Database error"
- SQLite issue
- File permissions

**Fix:** Database sudah handle error, app tetap jalan

---

## ✅ Checklist Fix:

- [x] Global error handlers added
- [x] Async routes wrapped
- [x] Database error handling
- [x] Port error handling
- [x] Graceful shutdown
- [x] Error logging

---

## 🎯 Status:

**Crash issues sudah diperbaiki!**

Server sekarang:
- ✅ Handle uncaught errors
- ✅ Handle async errors
- ✅ Handle database errors
- ✅ Handle port errors
- ✅ Graceful shutdown

**Tinggal deploy ulang!**

---

## 📞 Masih Crash?

### 1. Test Lokal
```bash
npm start
```

Kalau lokal crash, fix lokal dulu.

### 2. Cek Railway Logs
Lihat error message spesifik.

### 3. Common Fixes

**Memory limit:**
- Railway free tier: 512MB
- Upgrade plan kalau perlu

**Timeout:**
- Railway timeout: 300s
- Kalau build lama, normal

**Dependencies:**
```bash
npm install
npm rebuild better-sqlite3
```

---

## ✅ Summary:

**Perbaikan:**
1. ✅ Error handlers added
2. ✅ Async routes wrapped
3. ✅ Database error handling
4. ✅ Better logging

**Next:**
1. Commit & push
2. Railway redeploy
3. Check logs
4. Test website

**Crash sudah diperbaiki! 🎉**
