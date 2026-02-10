# 🔄 Auto-Start Server di HP

## 🎯 Tujuan

Server AnimeStream jalan otomatis saat HP dinyalakan, tanpa perlu buka Termux manual.

---

## 📋 Persiapan

### 1. Termux Sudah Setup
- Node.js terinstall
- Project di `/storage/emulated/0/AnimeStream`
- Server bisa jalan manual

### 2. Install Termux:Boot
- Download dari F-Droid: https://f-droid.org/packages/com.termux/
- Cari "Termux:Boot"
- Install (gratis)

---

## 🚀 Setup Auto-Start (10 Menit)

### Step 1: Buka Termux:Boot
1. Buka aplikasi Termux:Boot sekali
2. Klik "OK" untuk activate
3. Tutup aplikasi

### Step 2: Buat Folder Boot
Di Termux:
```bash
mkdir -p ~/.termux/boot
```

### Step 3: Copy Script Auto-Start
```bash
# Copy script
cp /storage/emulated/0/AnimeStream/start-boot.sh ~/.termux/boot/

# Beri permission
chmod +x ~/.termux/boot/start-boot.sh
```

### Step 4: Test Script
```bash
# Test manual
bash ~/.termux/boot/start-boot.sh

# Tunggu 30 detik
# Cek log
cat /storage/emulated/0/AnimeStream/boot.log

# Cek server
lsof -i:3000
```

**Jika ada output → Script berhasil!**

### Step 5: Test Auto-Start
1. Restart HP
2. Tunggu 1-2 menit
3. Buka browser: `http://localhost:3000`
4. Jika website muncul → BERHASIL! 🎉

---

## 🔍 Troubleshooting

### Server tidak auto-start

**Cek log:**
```bash
cat /storage/emulated/0/AnimeStream/boot.log
```

**Jika error "Node.js not found":**
```bash
# Install ulang Node.js
pkg install nodejs -y
```

**Jika error "Project folder not found":**
```bash
# Pastikan folder ada
ls /storage/emulated/0/AnimeStream
```

**Jika error "Permission denied":**
```bash
# Beri permission
chmod +x ~/.termux/boot/start-boot.sh
```

### Server jalan tapi tidak bisa diakses

**Cek apakah server jalan:**
```bash
lsof -i:3000
```

**Jika tidak ada output:**
```bash
# Start manual
cd /storage/emulated/0/AnimeStream
node server.js
```

**Jika ada error, cek log:**
```bash
cat /storage/emulated/0/AnimeStream/server.log
```

### Termux:Boot tidak jalan

**Pastikan:**
1. Termux:Boot sudah dibuka sekali
2. Battery optimization disabled untuk Termux
3. Autostart enabled untuk Termux

**Cara disable battery optimization:**
1. Settings → Apps → Termux
2. Battery → Unrestricted
3. Autostart → Enabled

---

## 📱 Akses Server

### Dari HP yang sama:
```
http://localhost:3000
```

### Dari HP lain (WiFi sama):
```
http://192.168.x.x:3000
```

**Cara cari IP:**
```bash
ifconfig | grep inet
```

---

## 🎯 Tips

### 1. Buat Shortcut di Home Screen
1. Buka Chrome
2. Buka `http://localhost:3000`
3. Menu → Add to Home screen
4. Sekarang bisa buka langsung dari icon!

### 2. Cek Status Server
```bash
# Cek apakah jalan
lsof -i:3000

# Cek log
tail -f /storage/emulated/0/AnimeStream/server.log

# Cek boot log
cat /storage/emulated/0/AnimeStream/boot.log
```

### 3. Stop Server
```bash
# Kill server
lsof -ti:3000 | xargs kill -9
```

### 4. Restart Server
```bash
# Kill dulu
lsof -ti:3000 | xargs kill -9

# Start ulang
cd /storage/emulated/0/AnimeStream
node server.js &
```

---

## 🔋 Battery Optimization

Agar server tidak di-kill oleh sistem:

### Android 9+:
1. Settings → Apps → Termux
2. Battery → Battery optimization
3. Pilih "Don't optimize"

### Xiaomi (MIUI):
1. Settings → Apps → Manage apps → Termux
2. Battery saver → No restrictions
3. Autostart → Enabled

### Samsung (One UI):
1. Settings → Apps → Termux
2. Battery → Optimize battery usage → All
3. Termux → OFF

---

## ✅ Checklist

- [ ] Termux:Boot installed
- [ ] Termux:Boot dibuka sekali
- [ ] Folder ~/.termux/boot dibuat
- [ ] Script copied & executable
- [ ] Script tested manual
- [ ] HP direstart
- [ ] Server auto-start berhasil
- [ ] Website bisa diakses
- [ ] Battery optimization disabled
- [ ] Autostart enabled

---

## 📊 Status Check

### Cek semua status:
```bash
echo "=== AnimeStream Status ==="
echo ""
echo "1. Node.js:"
node --version
echo ""
echo "2. Project folder:"
ls /storage/emulated/0/AnimeStream/server.js
echo ""
echo "3. Boot script:"
ls ~/.termux/boot/start-boot.sh
echo ""
echo "4. Server running:"
lsof -i:3000
echo ""
echo "5. Boot log:"
tail -5 /storage/emulated/0/AnimeStream/boot.log
```

---

**© 2026 AnimeStream**
**Server jalan permanen di HP! 🎉**
