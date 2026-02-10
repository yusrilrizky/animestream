# 🔧 Quick Fix - Server Tidak Bisa Buka

## Masalah: "node server.js error / tidak bisa buka"

### ✅ Solusi Cepat:

**Cara 1: Pakai Batch File**
```bash
# Double click file ini:
start-server.bat
```

**Cara 2: Manual**
```bash
# Stop semua node process
taskkill /F /IM node.exe

# Tunggu 2 detik
timeout /t 2

# Start server
node server.js
```

**Cara 3: Pakai NPM**
```bash
npm start
```

---

## Cek Status Server

### Test 1: Cek Syntax
```bash
node -c server.js
```
Jika tidak ada output = OK ✅

### Test 2: Cek Port
```bash
netstat -ano | findstr :3000
```
Jika ada output = Port sudah dipakai ❌

### Test 3: Cek Server Response
```bash
curl http://localhost:3000
```
Jika ada HTML = Server jalan ✅

---

## Error Umum & Solusi

### ❌ Error: "EADDRINUSE: address already in use"

**Penyebab:** Port 3000 sudah dipakai

**Solusi:**
```bash
# Kill semua node process
taskkill /F /IM node.exe

# Atau ubah port di .env
PORT=3001
```

### ❌ Error: "Cannot find module"

**Penyebab:** Dependencies belum terinstall

**Solusi:**
```bash
npm install
```

### ❌ Error: "Database locked"

**Penyebab:** Database masih diakses process lain

**Solusi:**
```bash
# Stop semua node
taskkill /F /IM node.exe

# Hapus lock files
del animestream.db-shm
del animestream.db-wal

# Start ulang
node server.js
```

### ❌ Browser tidak bisa akses

**Penyebab:** Cache browser atau firewall

**Solusi:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Coba browser lain (Chrome/Firefox/Edge)
3. Coba incognito mode
4. Cek firewall Windows
5. Restart browser

---

## Reset Total (Nuclear Option)

Jika semua cara di atas gagal:

```bash
# 1. Stop server
taskkill /F /IM node.exe

# 2. Delete database
del animestream.db
del animestream.db-shm
del animestream.db-wal

# 3. Delete node_modules
rmdir /s /q node_modules

# 4. Reinstall
npm install

# 5. Start fresh
node server.js
```

---

## Verifikasi Server Jalan

Setelah start server, cek:

✅ **Console menampilkan:**
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

✅ **Browser bisa akses:**
- http://localhost:3000
- http://localhost:3000/login
- http://localhost:3000/register

✅ **Tidak ada error di console**

---

## Akses Server

Setelah server jalan:

1. **Buka browser**
2. **Ketik:** `http://localhost:3000`
3. **Atau:** `localhost:3000`
4. **Jangan pakai:** `https://` (pakai `http://`)

---

## Login Default

Setelah database direset:

- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@animestream.com`

---

## Masih Bermasalah?

1. **Cek console** untuk error message
2. **Screenshot error** dan lihat pesan lengkapnya
3. **Jalankan test:**
   ```bash
   node test-forgot-password.js
   ```
4. **Cek log file** (jika ada)

---

## Kontak

Jika masih error, catat:
- Error message lengkap
- Langkah yang sudah dicoba
- Screenshot console
- Versi Node.js: `node --version`
