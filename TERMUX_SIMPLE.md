# 📱 Cara Run di Termux (SUPER SIMPLE!)

## 🎯 Langkah-Langkah

### 1️⃣ Install Termux
- Download dari F-Droid atau GitHub
- Install aplikasi

### 2️⃣ Buka Termux, Copy-Paste Command Ini:

```bash
pkg update && pkg upgrade -y && pkg install nodejs -y
```
Tunggu sampai selesai (5-10 menit).

### 3️⃣ Masuk ke Folder Project:

```bash
cd /storage/emulated/0/AnimeStream
```

**Catatan:** Ganti `AnimeStream` dengan nama folder project kamu.

### 4️⃣ Install Dependencies:

```bash
npm install --legacy-peer-deps
```
Tunggu sampai selesai (2-5 menit).

### 5️⃣ Jalankan Server:

```bash
bash start-android.sh
```

### 6️⃣ Buka Browser:
- Buka Chrome/Firefox
- Ketik: `http://localhost:3000`
- Login: `admin` / `admin123`

---

## ✅ Selesai!

Jika berhasil, di Termux akan muncul:
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

---

## ❌ Jika Ada Error

### Error: "Module Not Found"
```bash
npm install --legacy-peer-deps
```

### Error: "Port Already in Use"
```bash
lsof -ti:3000 | xargs kill -9
bash start-android.sh
```

### Error: "Command Not Found"
```bash
pkg install nodejs -y
```

---

## 🔄 Stop Server

Tekan: **Volume Down + C**

Atau:
```bash
bash stop-android.sh
```

---

## 🎯 Command Lengkap (Copy-Paste Semua)

```bash
# Setup (sekali saja)
pkg update && pkg upgrade -y
pkg install nodejs -y

# Masuk folder project
cd /storage/emulated/0/AnimeStream

# Install dependencies (sekali saja)
npm install --legacy-peer-deps

# Start server (setiap kali mau run)
bash start-android.sh
```

---

## 📱 Akses Server

- **Local**: http://localhost:3000
- **Login**: admin / admin123

---

**Butuh bantuan lebih?** Baca **TERMUX_GUIDE.md**
