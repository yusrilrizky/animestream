# 🚀 Cara Deploy ke Glitch.com (PALING MUDAH!)

## ✅ Tidak Perlu Git, Tidak Perlu GitHub!

Deploy langsung dari browser dalam 5 menit!

---

## 📋 Step 1: Persiapan File (2 Menit)

### 1.1 Zip Project Kamu

1. Buka folder: `C:\Users\Administrator\Downloads\ArtonNime`
2. Select semua file & folder (Ctrl+A)
3. Klik kanan → **"Send to"** → **"Compressed (zipped) folder"**
4. Nama: `animestream.zip`

⚠️ **PENTING:** Jangan zip folder-nya, tapi isi folder!

**Yang di-zip:**
```
✅ server.js
✅ package.json
✅ database.js
✅ views/ (folder)
✅ public/ (folder)
✅ uploads/ (folder)
✅ .env.example
✅ dll...
```

**JANGAN zip:**
```
❌ node_modules/ (folder ini)
❌ animestream.db (file ini)
```

---

## 🌐 Step 2: Deploy ke Glitch (3 Menit)

### 2.1 Buat Akun Glitch

1. Buka: https://glitch.com
2. Klik **"Sign up"** (pojok kanan atas)
3. Pilih **"Sign up with Email"** atau **"Sign up with GitHub"**
4. Isi email & password
5. Verifikasi email (cek inbox)
6. Login ke Glitch

---

### 2.2 Buat Project Baru

1. Klik **"New Project"** (pojok kanan atas)
2. Pilih **"glitch-hello-node"** (template Node.js)
3. Tunggu project dibuat (10 detik)
4. Project otomatis dibuka di editor

---

### 2.3 Upload File

**Cara 1: Upload Zip (Paling Mudah)**

1. Klik **"Tools"** (pojok kiri bawah)
2. Pilih **"Import and Export"**
3. Klik **"Import from GitHub"**
4. Atau klik **"Upload Asset"**
5. Pilih file `animestream.zip`
6. Tunggu upload selesai
7. Klik **"Tools"** → **"Terminal"**
8. Ketik: `unzip animestream.zip`
9. Enter

**Cara 2: Upload Manual (Satu-satu)**

1. Klik file yang mau dihapus (server.js, package.json, dll)
2. Klik **"Delete"**
3. Klik **"New File"** (pojok kiri atas)
4. Copy-paste isi file dari project kamu
5. Ulangi untuk semua file penting

---

### 2.4 Install Dependencies

1. Klik **"Tools"** → **"Terminal"**
2. Ketik:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Enter
4. Tunggu install selesai (2-3 menit)

---

### 2.5 Set Environment Variables

1. Klik **".env"** (file di sidebar kiri)
2. Hapus isi yang ada
3. Paste ini:
   ```
   SESSION_SECRET=animestream-secret-glitch-xyz789
   PORT=3000
   NODE_ENV=production
   ```
4. File auto-save

---

### 2.6 Start Server

1. Glitch otomatis restart server
2. Tunggu 10-20 detik
3. Klik **"Show"** (pojok atas) → **"In a New Window"**
4. Website terbuka di tab baru!

**URL website:**
```
https://nama-project-kamu.glitch.me
```

Contoh: `https://animestream-xyz.glitch.me`

---

## ✅ Step 3: Test Website (1 Menit)

### 3.1 Test Login

1. Buka website
2. Login dengan:
   ```
   Username: admin
   Password: admin123
   ```
3. **Berhasil login?** → Deploy sukses! 🎉

---

### 3.2 Test Register

1. Klik **"Daftar sekarang"**
2. Register user baru:
   ```
   Username: testuser
   Email: test@test.com
   Password: test123
   ```
3. Login dengan user baru
4. **Berhasil?** → Semua fitur jalan! ✅

---

## 🎨 Step 4: Customize (Opsional)

### 4.1 Ganti Nama Project

1. Klik nama project (pojok kiri atas)
2. Klik **"Edit Project Details"**
3. Ganti nama: `animestream-xyz`
4. Save

**URL baru:**
```
https://animestream-xyz.glitch.me
```

---

### 4.2 Tambah Custom Domain (Opsional)

1. Upgrade ke Glitch Pro ($8/bulan)
2. Settings → Custom Domain
3. Tambah domain kamu

---

## 📱 Step 5: Buat APK (5 Menit)

### 5.1 Pakai AppGeyser

1. Buka: https://appsgeyser.com
2. Klik **"Create App"**
3. Pilih **"Website"**
4. Masukkan URL: `https://animestream-xyz.glitch.me`
5. Nama: `AnimeStream`
6. Klik **"Create"**
7. **Download APK**
8. Install di HP Android
9. Selesai! 📱

---

## ⚠️ Catatan Penting

### Glitch Sleep Mode:

**Website akan sleep setelah 5 menit tidak ada visitor.**

**Cara bangunkan:**
- Buka website lagi
- Loading 10-20 detik pertama
- Setelah itu normal

**Cara agar tidak sleep:**
- Upgrade ke Glitch Pro ($8/bulan)
- Atau pakai UptimeRobot (gratis) untuk ping website setiap 5 menit

---

### Data Tidak Persistent:

**Data akan hilang jika:**
- Project di-restart
- Glitch maintenance
- Project tidak aktif 5 hari

**Solusi:**
- Pakai hosting lain (Cyclic.sh) untuk data persistent
- Atau backup database manual

---

## 🔄 Update Website

### Cara Update Code:

1. Login ke Glitch
2. Buka project kamu
3. Edit file langsung di browser
4. File auto-save
5. Server auto-restart
6. Website langsung update! ✅

---

## 🆘 Troubleshooting

### Error: "Application Error"

**Fix:**
1. Klik **"Tools"** → **"Logs"**
2. Cek error message
3. Biasanya karena dependencies belum install
4. Terminal: `npm install --legacy-peer-deps`

---

### Error: "Cannot find module"

**Fix:**
1. Terminal: `npm install --legacy-peer-deps`
2. Restart: Klik **"Tools"** → **"Terminal"** → `refresh`

---

### Website Tidak Muncul

**Fix:**
1. Tunggu 30 detik (server masih starting)
2. Refresh browser
3. Cek Logs untuk error

---

### Upload Anime Tidak Jalan

**Fix:**
1. Cek folder `uploads/` ada
2. Jika tidak ada, buat folder baru:
   - Klik **"New File"**
   - Nama: `uploads/.gitkeep`
   - Save

---

## 🎉 Selesai!

Website kamu sudah online di:
```
https://nama-project-kamu.glitch.me
```

**Login:**
```
Username: admin
Password: admin123
```

**APK:**
Buat di AppGeyser dengan URL di atas!

---

## 🏆 Kelebihan Glitch

- ✅ Super mudah (tidak perlu Git)
- ✅ Edit langsung di browser
- ✅ Auto-deploy
- ✅ 100% gratis
- ✅ Dapat domain gratis

## ⚠️ Kekurangan Glitch

- ❌ Website sleep setelah 5 menit
- ❌ Data tidak persistent
- ❌ Loading lambat saat bangun dari sleep

---

## 💡 Alternatif Lain

Jika mau data persistent & tidak sleep:
- **Cyclic.sh** - Gratis, data persistent
- **Railway.app** - Gratis $5/bulan, cepat

Baca: `HOSTING_ALTERNATIF_MUDAH.md`

---

**© 2026 AnimeStream**
**Deploy dalam 5 menit! 🚀**
