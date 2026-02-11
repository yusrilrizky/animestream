# Setup MySQL XAMPP untuk AnimeStream

## 📋 Langkah-Langkah Setup

### 1. Install & Jalankan XAMPP
- Download XAMPP dari https://www.apachefriends.org/
- Install XAMPP
- Buka XAMPP Control Panel
- Start **Apache** dan **MySQL**

### 2. Buka phpMyAdmin
- Buka browser, ketik: `http://localhost/phpmyadmin`
- Atau klik tombol **Admin** di samping MySQL di XAMPP Control Panel

### 3. Import Database
1. Di phpMyAdmin, klik tab **SQL** di bagian atas
2. Copy semua isi file `setup_mysql.sql`
3. Paste ke kolom SQL query
4. Klik tombol **Go** atau **Kirim**
5. Tunggu sampai muncul pesan sukses

### 4. Verifikasi Database
- Klik database **animestream** di sidebar kiri
- Pastikan ada 3 tabel:
  - `users` (berisi 1 admin)
  - `anime` (kosong)
  - `reset_tokens` (kosong)

### 5. Jalankan Server
```bash
node server.js
```

Atau double-click file `start-server.bat`

### 6. Login ke Website
- Buka: `http://localhost:3000/login`
- Username: `admin`
- Password: `admin123`

## ✅ Fitur MySQL

### Data Permanen
- Semua data tersimpan di MySQL XAMPP
- Data tidak hilang saat server restart
- Bisa dilihat langsung di phpMyAdmin

### Upload Video
- Upload video dengan link (Streamable, Cloudinary, Vimeo, dll)
- Data tersimpan di tabel `anime`
- Bisa dilihat di phpMyAdmin → animestream → anime

### Lihat Data di phpMyAdmin
1. Buka `http://localhost/phpmyadmin`
2. Klik database **animestream**
3. Klik tabel **anime** untuk lihat video yang diupload
4. Klik tabel **users** untuk lihat user yang terdaftar

## 📱 APK Flutter

APK sudah support video hosting:
- Video dari Streamable, Cloudinary, Vimeo langsung bisa diputar
- Tidak perlu buka browser
- WebView otomatis load embed video

## 🔧 Troubleshooting

### Error: MySQL connection error
**Solusi:**
1. Pastikan XAMPP MySQL sudah running (hijau di Control Panel)
2. Cek username/password di `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=animestream
   ```
3. Restart server

### Error: Table doesn't exist
**Solusi:**
1. Import ulang `setup_mysql.sql` di phpMyAdmin
2. Pastikan database `animestream` sudah dibuat

### Error: Cannot login
**Solusi:**
1. Cek di phpMyAdmin → animestream → users
2. Pastikan ada user `admin`
3. Jika tidak ada, import ulang `setup_mysql.sql`

## 📊 Struktur Database

### Tabel: users
- `id` - ID user (auto increment)
- `username` - Username unik
- `email` - Email unik
- `password` - Password (bcrypt hash)
- `displayName` - Nama tampilan
- `role` - Role (admin/user)
- `joinDate` - Tanggal join

### Tabel: anime
- `id` - ID anime (auto increment)
- `title` - Judul anime
- `episode` - Episode
- `description` - Deskripsi
- `genre` - Genre
- `category` - Kategori
- `videoPath` - Link video (Streamable, Cloudinary, dll)
- `uploaderId` - ID user yang upload
- `uploader` - Nama uploader
- `views` - Jumlah views
- `uploadDate` - Tanggal upload

### Tabel: reset_tokens
- `id` - ID token
- `userId` - ID user
- `token` - Token reset password
- `code` - Kode 6 digit
- `expiresAt` - Waktu kadaluarsa
- `used` - Status (0=belum, 1=sudah)

## 🎯 Keuntungan MySQL vs SQLite

| Fitur | SQLite | MySQL XAMPP |
|-------|--------|-------------|
| Data permanen | ❌ Hilang saat deploy | ✅ Permanen |
| Lihat data | ❌ Perlu tools | ✅ phpMyAdmin |
| Multi-user | ⚠️ Terbatas | ✅ Support |
| Backup | ⚠️ Manual | ✅ Export SQL |
| Performance | ⚠️ File-based | ✅ Server-based |

## 📝 Catatan Penting

1. **XAMPP harus running** setiap kali mau jalankan server
2. **Data tersimpan permanen** di MySQL, tidak hilang
3. **phpMyAdmin** untuk lihat/edit data secara visual
4. **APK Flutter** otomatis connect ke server (Railway atau localhost)
5. **Video hosting** support 10+ platform (Streamable, Cloudinary, Vimeo, dll)

## 🚀 Deploy ke Railway (Opsional)

Jika mau deploy ke Railway dengan MySQL:
1. Tambahkan MySQL plugin di Railway
2. Update environment variables:
   ```
   DB_HOST=<railway-mysql-host>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=animestream
   ```
3. Import `setup_mysql.sql` ke Railway MySQL

---

**Status:** ✅ MySQL sudah terintegrasi
**Login:** admin / admin123
**phpMyAdmin:** http://localhost/phpmyadmin
