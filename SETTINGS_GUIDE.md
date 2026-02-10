# 📋 Panduan Pengaturan Akun AnimeStream

## 🎬 Kualitas Video

Pengaturan kualitas video memungkinkan pengguna memilih resolusi default untuk streaming anime.

### Pilihan Kualitas:
- **Auto** - Otomatis menyesuaikan dengan koneksi internet (default)
- **1080p** - Full HD (1920x1080)
- **720p** - HD (1280x720)
- **480p** - SD (854x480)
- **360p** - Low (640x360)

### Cara Mengubah:
1. Buka halaman **Pengaturan** dari Dashboard
2. Pilih kualitas video yang diinginkan
3. Klik **Simpan Kualitas Video**
4. Pengaturan akan otomatis tersimpan ke database

### Database:
- Kolom: `videoQuality` di tabel `users`
- Default: `'auto'`
- Tipe: TEXT

---

## 👤 Informasi Profil

### Field yang Dapat Diubah:
- **Nama Tampilan** - Nama yang ditampilkan di profil dan upload

### Field yang Tidak Dapat Diubah:
- **Username** - Tetap sejak registrasi
- **Email** - Tetap sejak registrasi

### Cara Mengubah:
1. Buka halaman **Pengaturan**
2. Edit **Nama Tampilan**
3. Klik **Simpan Perubahan**
4. Data akan otomatis update di database

---

## 🔒 Ubah Password

Fitur ini memungkinkan pengguna mengubah password dengan aman.

### Proses:
1. Masukkan **Password Saat Ini**
2. Masukkan **Password Baru** (minimal 6 karakter)
3. Konfirmasi **Password Baru**
4. Klik **Ubah Password**

### Keamanan:
- Password di-hash menggunakan **bcrypt** dengan salt rounds 10
- Password lama diverifikasi sebelum update
- Password baru harus minimal 6 karakter
- Konfirmasi password harus cocok

### Database:
- Password disimpan dalam bentuk hash di kolom `password`
- Tidak ada plain text password yang tersimpan
- Aman untuk hosting dan production

### Contoh Hash:
```
Plain: admin123
Hash: $2a$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ
```

---

## 🎵 Pengaturan Musik

Mengatur musik latar belakang untuk halaman login dan dashboard.

### Fitur:
- **Musik Halaman Login** - Toggle on/off
- **Musik Halaman Dashboard** - Toggle on/off

### Penyimpanan:
- Disimpan di **localStorage** browser
- Key: `loginMusicEnabled` dan `dashboardMusicEnabled`
- Value: `'true'` atau `'false'`

### Cara Kerja:
1. User toggle checkbox
2. JavaScript menyimpan ke localStorage
3. Saat halaman dimuat, cek localStorage
4. Putar musik sesuai pengaturan

---

## 📊 Informasi Akun

Menampilkan informasi akun yang tidak dapat diubah:

- **Role** - User atau Administrator
- **Bergabung** - Tanggal registrasi
- **User ID** - ID unik di database
- **Kualitas Video** - Pengaturan kualitas saat ini

---

## 🔧 Implementasi Teknis

### Routes (server.js):

```javascript
// GET Settings Page
app.get('/settings', isAuthenticated, (req, res) => {
  res.render('settings', { 
    user: req.user,
    successProfile: null,
    errorProfile: null,
    successPassword: null,
    errorPassword: null,
    successQuality: null
  });
});

// POST Video Quality
app.post('/settings/video-quality', isAuthenticated, (req, res) => {
  const { videoQuality } = req.body;
  userDB.update(req.user.id, { videoQuality });
  req.user.videoQuality = videoQuality;
  // ... render with success
});

// POST Profile Update
app.post('/settings/profile', isAuthenticated, (req, res) => {
  const { displayName } = req.body;
  userDB.update(req.user.id, { displayName: displayName.trim() });
  req.user.displayName = displayName.trim();
  // ... render with success
});

// POST Password Change
app.post('/settings/password', isAuthenticated, (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  
  // Verify current password
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    // ... error
  }
  
  // Validate new password
  if (newPassword.length < 6) {
    // ... error
  }
  
  if (newPassword !== confirmPassword) {
    // ... error
  }
  
  // Hash and update
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  userDB.update(user.id, { password: hashedPassword });
  // ... render with success
});
```

### Database Schema:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  displayName TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'user',
  videoQuality TEXT DEFAULT 'auto',
  googleId TEXT UNIQUE,
  facebookId TEXT UNIQUE,
  joinDate TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment

### Persiapan Database:
1. Pastikan kolom `videoQuality` sudah ada di tabel `users`
2. Jika belum, jalankan migration:
   ```bash
   node add-video-quality-column.js
   ```

### Environment Variables:
Tidak ada environment variable khusus untuk fitur settings.

### Testing:
1. Login ke aplikasi
2. Buka halaman Settings
3. Test setiap fitur:
   - Ubah kualitas video
   - Ubah nama tampilan
   - Ubah password
   - Toggle musik

### Production Checklist:
- ✅ Password di-hash dengan bcrypt
- ✅ Validasi input di server-side
- ✅ Session management untuk auth
- ✅ Error handling lengkap
- ✅ Success/error messages untuk user feedback
- ✅ Database update otomatis
- ✅ Responsive design untuk mobile

---

## 📝 Notes

- Semua perubahan langsung tersimpan ke database SQLite
- Password selalu di-hash sebelum disimpan
- Session user di-update setelah perubahan
- Tidak perlu logout/login ulang setelah update settings
- Pengaturan musik disimpan di browser (localStorage)
- Kualitas video tersimpan di database untuk sync antar device

---

## 🔐 Keamanan

### Password Hashing:
```javascript
const bcrypt = require('bcryptjs');

// Hash password
const hashedPassword = bcrypt.hashSync(password, 10);

// Verify password
const isValid = bcrypt.compareSync(plainPassword, hashedPassword);
```

### Session Management:
- Session disimpan di memory (express-session)
- Cookie httpOnly untuk keamanan
- Session berakhir saat browser ditutup
- Middleware `isAuthenticated` untuk proteksi route

### Input Validation:
- Server-side validation untuk semua input
- Minimum password length: 6 karakter
- Trim whitespace dari input
- Validasi videoQuality dengan whitelist

---

## 📱 Mobile Responsive

Halaman settings fully responsive untuk:
- Desktop (> 768px)
- Tablet (768px)
- Mobile (< 480px)

### Breakpoints:
```css
@media (max-width: 768px) {
  .quality-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .account-info-grid {
    grid-template-columns: 1fr;
  }
}
```

---

Dibuat untuk AnimeStream © 2026
