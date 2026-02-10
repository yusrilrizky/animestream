# 🎬 AnimeStream - Website Streaming Anime

Platform streaming anime dengan fitur upload dan manajemen konten. Data tersimpan permanen di database SQLite.

## ✨ Fitur

- 🔐 Sistem login & registrasi dengan database permanen
- 📤 Upload video anime (MP4, MKV, AVI, WebM)
- 👁️ Tracking views otomatis
- 👤 Dashboard user & admin
- 🎯 Kategori anime
- 📱 Responsive design (mobile-friendly)
- 💾 Database SQLite (data tidak hilang saat restart)
- 🔒 Password encryption dengan bcrypt
- 📊 Statistik upload dan views

## 🚀 Instalasi

1. Clone repository atau download project

2. Install dependencies:
```bash
npm install
```

3. Copy file `.env.example` ke `.env`:
```bash
copy .env.example .env
```

4. Jalankan server:
```bash
npm start
```

Atau untuk development dengan auto-reload:
```bash
npm run dev
```

5. Buka browser: `http://localhost:3000`

## 🔑 Akun Default

Saat pertama kali dijalankan, sistem otomatis membuat akun admin:

- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@animestream.com`
- **Role:** Admin (akses penuh)

## 💾 Database

AnimeStream menggunakan **SQLite** untuk menyimpan data secara permanen:

- **File database:** `animestream.db` (dibuat otomatis)
- **Data user** tersimpan di tabel `users`
- **Data anime** tersimpan di tabel `anime`
- **Backup:** Copy file `animestream.db` ke lokasi aman
- **Reset:** Hapus file `animestream.db` dan restart server

📚 **Dokumentasi lengkap:** Lihat [DATABASE.md](DATABASE.md)

## 📁 Struktur Folder

```
animestream/
├── views/              # Template EJS
│   ├── index-new.ejs   # Halaman beranda
│   ├── login-new.ejs   # Halaman login
│   ├── register.ejs    # Halaman registrasi
│   ├── upload-new.ejs  # Halaman upload
│   ├── watch.ejs       # Halaman nonton
│   ├── dashboard.ejs   # Dashboard user
│   ├── admin.ejs       # Dashboard admin
│   ├── forgot-password.ejs  # Lupa password
│   └── terms.ejs       # Syarat & ketentuan
├── public/             # CSS & assets
│   └── css/
│       ├── style.css   # Main stylesheet
│       └── auth.css    # Auth pages style
├── uploads/            # Video yang diupload
├── server.js           # Main server
├── database.js         # Database functions
├── animestream.db      # SQLite database (auto-generated)
├── .env                # Environment variables
├── .env.example        # Template environment
├── package.json        # Dependencies
├── README.md           # Dokumentasi ini
├── DATABASE.md         # Dokumentasi database
├── OAUTH_SETUP.md      # Setup OAuth (optional)
└── BUILD_APK.md        # Build aplikasi Android
```

## 🔧 Konfigurasi

Edit file `.env` untuk konfigurasi:

```env
# Session Secret
SESSION_SECRET=animestream-secret-key-2024

# Server
PORT=3000
BASE_URL=http://localhost:3000
NODE_ENV=development

# OAuth (Optional - untuk login Google/Facebook)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
FACEBOOK_APP_ID=your-facebook-app-id-here
FACEBOOK_APP_SECRET=your-facebook-app-secret-here
```

## 📝 Cara Pakai

### Untuk User:

1. **Daftar akun** di `/register`
   - Isi username, email, password
   - Centang syarat & ketentuan
   - Klik "Daftar Sekarang"

2. **Login** dengan username/email & password
   - Atau gunakan akun admin default

3. **Upload anime** di menu Upload
   - Pilih file video (max 500MB)
   - Isi judul, episode, kategori, deskripsi
   - Klik "Upload Sekarang"

4. **Tonton anime** di halaman beranda
   - Klik card anime untuk nonton
   - Views otomatis bertambah

5. **Lihat dashboard** untuk statistik
   - Total upload
   - Total views
   - Recent uploads

6. **Logout** dengan klik tombol "Keluar"

### Untuk Admin:

1. **Login** dengan akun admin
2. **Akses admin panel** di `/dashboard/admin`
3. **Lihat statistik:**
   - Total users
   - Total anime
   - Total views
4. **Lihat semua user** dan anime
5. **Hapus konten** yang melanggar

## 🌐 Hosting

### Persiapan Hosting:

1. **Backup database** sebelum deploy:
   ```bash
   copy animestream.db backup/animestream-backup.db
   ```

2. **Set environment variables** di hosting platform

3. **Upload semua file** kecuali:
   - `node_modules/` (akan di-install otomatis)
   - `.env` (set di hosting panel)
   - `animestream.db` (akan dibuat otomatis)

4. **Install dependencies** di server:
   ```bash
   npm install
   ```

5. **Start server:**
   ```bash
   npm start
   ```

### Platform yang Disarankan:

- ✅ **VPS/Dedicated Server** (DigitalOcean, Linode, AWS EC2)
  - Full control, support SQLite
  - Recommended untuk production

- ✅ **Railway.app**
  - Support SQLite dengan persistent disk
  - Easy deployment

- ✅ **Render.com**
  - Support persistent disk
  - Free tier available

- ⚠️ **Heroku**
  - Perlu addon database (PostgreSQL)
  - Filesystem tidak persistent

- ❌ **Vercel/Netlify**
  - Tidak support SQLite (serverless)
  - Gunakan database external

## 🔒 Keamanan

- ✅ Password di-hash dengan bcrypt (10 rounds)
- ✅ Session management dengan express-session
- ✅ SQL injection protection (prepared statements)
- ✅ File upload validation (type & size)
- ✅ Authentication middleware
- ✅ CSRF protection ready
- ✅ XSS protection (EJS auto-escape)

## 📱 Membuat APK

Website ini sudah dioptimasi untuk dijadikan aplikasi Android (APK).

**Lihat panduan lengkap di [BUILD_APK.md](BUILD_APK.md)**

Metode tercepat:
1. Deploy website ke hosting (Railway/Render)
2. Buka https://www.pwabuilder.com/
3. Masukkan URL website
4. Download APK yang sudah jadi

## 🐛 Troubleshooting

### Server tidak bisa start

```bash
# Stop semua instance node
taskkill /F /IM node.exe

# Start ulang
npm start
```

### Database error / locked

```bash
# Stop semua node process
taskkill /F /IM node.exe

# Hapus lock files
del animestream.db-shm
del animestream.db-wal

# Start ulang
npm start
```

### Reset database (hapus semua data)

```bash
# Stop server
taskkill /F /IM node.exe

# Hapus database
del animestream.db

# Start server (akan buat database baru)
npm start
```

### Upload error

- Pastikan folder `uploads/` ada dan writable
- Cek ukuran file (max 500MB)
- Cek format video (MP4, MKV, AVI, WebM)
- Cek disk space tersedia

### Lupa password admin

```bash
# Reset database untuk buat admin baru
del animestream.db
npm start

# Login dengan: admin / admin123
```

## 🛠️ Teknologi

- **Backend:** Node.js + Express.js
- **Database:** SQLite3 (better-sqlite3)
- **Template Engine:** EJS
- **Authentication:** Passport.js + bcryptjs
- **File Upload:** Multer
- **Session:** express-session
- **OAuth:** passport-google-oauth20, passport-facebook

## 📚 Dokumentasi Tambahan

- [DATABASE.md](DATABASE.md) - Dokumentasi database lengkap
- [OAUTH_SETUP.md](OAUTH_SETUP.md) - Setup Google & Facebook OAuth (optional)
- [BUILD_APK.md](BUILD_APK.md) - Build aplikasi Android

## 🚀 Pengembangan Lebih Lanjut

Fitur yang bisa ditambahkan:

- [ ] Email verification saat registrasi
- [ ] Reset password via email
- [ ] Thumbnail otomatis dari video
- [ ] Streaming adaptif (HLS/DASH)
- [ ] Komentar dan rating
- [ ] Playlist dan favorites
- [ ] Notifikasi episode baru
- [ ] Search dan filter advanced
- [ ] Multiple subtitle support
- [ ] Download video
- [ ] Social sharing

## 📞 Support

Jika ada pertanyaan atau masalah:

- Email: support@animestream.com
- GitHub Issues: [Create issue](https://github.com/yourusername/animestream/issues)

## 📄 License

MIT License - Bebas digunakan untuk project pribadi atau komersial.

---

**Dibuat dengan ❤️ untuk komunitas anime Indonesia**

**Version:** 2.0.0 (with SQLite Database)
