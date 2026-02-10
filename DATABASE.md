# 💾 Database AnimeStream

## Tentang Database

AnimeStream menggunakan **SQLite** sebagai database untuk menyimpan data user dan anime secara permanen. Data akan tetap tersimpan meskipun server direstart atau di-hosting.

## File Database

- **File:** `animestream.db`
- **Lokasi:** Root folder project
- **Type:** SQLite3 Database
- **Library:** better-sqlite3

## Struktur Tabel

### 1. Tabel `users`

Menyimpan data pengguna yang terdaftar.

| Kolom | Type | Deskripsi |
|-------|------|-----------|
| id | INTEGER | Primary key, auto increment |
| username | TEXT | Username unik |
| email | TEXT | Email unik |
| password | TEXT | Password ter-hash (bcrypt) |
| displayName | TEXT | Nama tampilan |
| avatar | TEXT | URL avatar |
| role | TEXT | Role user (user/admin) |
| googleId | TEXT | Google OAuth ID (optional) |
| facebookId | TEXT | Facebook OAuth ID (optional) |
| joinDate | TEXT | Tanggal bergabung |
| createdAt | DATETIME | Timestamp otomatis |

### 2. Tabel `anime`

Menyimpan data anime yang diupload.

| Kolom | Type | Deskripsi |
|-------|------|-----------|
| id | INTEGER | Primary key, auto increment |
| title | TEXT | Judul anime |
| description | TEXT | Deskripsi anime |
| episode | TEXT | Nomor episode |
| videoPath | TEXT | Path file video |
| uploadDate | TEXT | Tanggal upload |
| uploaderId | INTEGER | ID user yang upload (foreign key) |
| uploader | TEXT | Nama uploader |
| views | INTEGER | Jumlah views (default 0) |
| category | TEXT | Kategori anime |
| createdAt | DATETIME | Timestamp otomatis |

## Akun Default

Saat pertama kali dijalankan, sistem otomatis membuat akun admin:

- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@animestream.com`
- **Role:** `admin`

## Fungsi Database

### User Functions (`userDB`)

```javascript
// Get all users
userDB.getAll()

// Get user by ID
userDB.getById(id)

// Get user by username or email
userDB.getByUsernameOrEmail(identifier)

// Get user by email
userDB.getByEmail(email)

// Get user by Google ID
userDB.getByGoogleId(googleId)

// Get user by Facebook ID
userDB.getByFacebookId(facebookId)

// Create new user
userDB.create({
  username: 'john',
  email: 'john@example.com',
  password: hashedPassword,
  displayName: 'John Doe',
  role: 'user'
})

// Update user
userDB.update(userId, {
  googleId: 'google-id-123',
  displayName: 'New Name'
})

// Delete user
userDB.delete(userId)
```

### Anime Functions (`animeDB`)

```javascript
// Get all anime
animeDB.getAll()

// Get anime by ID
animeDB.getById(id)

// Get anime by uploader ID
animeDB.getByUploaderId(uploaderId)

// Create new anime
animeDB.create({
  title: 'Naruto',
  description: 'Anime tentang ninja',
  episode: 'Episode 1',
  videoPath: 'video.mp4',
  uploaderId: 1,
  uploader: 'admin',
  category: 'action'
})

// Increment views
animeDB.incrementViews(animeId)

// Delete anime
animeDB.delete(animeId)

// Get total views by user
animeDB.getTotalViewsByUser(uploaderId)
```

## Backup Database

### Manual Backup

Copy file `animestream.db` ke lokasi aman:

```bash
# Windows
copy animestream.db backup/animestream-backup.db

# Linux/Mac
cp animestream.db backup/animestream-backup.db
```

### Restore Database

Replace file `animestream.db` dengan file backup:

```bash
# Windows
copy backup/animestream-backup.db animestream.db

# Linux/Mac
cp backup/animestream-backup.db animestream.db
```

## Reset Database

Untuk reset database (hapus semua data):

1. Stop server
2. Hapus file `animestream.db`
3. Start server lagi (akan buat database baru dengan akun admin default)

```bash
# Windows
del animestream.db
node server.js

# Linux/Mac
rm animestream.db
node server.js
```

## Migrasi dari Array ke Database

Jika sebelumnya menggunakan array (data di memory), sekarang semua data tersimpan di database SQLite. Keuntungan:

✅ Data tidak hilang saat server restart
✅ Data tetap ada saat hosting/deploy
✅ Performa lebih baik untuk data besar
✅ Bisa di-backup dengan mudah
✅ Support relational data (foreign keys)

## Hosting Database

Saat hosting aplikasi:

1. **File `animestream.db` akan otomatis dibuat** di server saat pertama kali dijalankan
2. **Data akan persistent** selama file database tidak dihapus
3. **Backup berkala** disarankan untuk keamanan data
4. **Jangan commit** file database ke Git (sudah ada di `.gitignore`)

### Hosting di Platform Populer

**Vercel/Netlify:**
- SQLite tidak disarankan (filesystem read-only)
- Gunakan PostgreSQL atau MongoDB

**VPS/Dedicated Server:**
- SQLite berfungsi sempurna
- Pastikan folder writable
- Setup backup otomatis

**Heroku:**
- Gunakan Heroku Postgres addon
- Atau gunakan external database

## Troubleshooting

### Error: "database is locked"

Server lain masih mengakses database. Stop semua instance server:

```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

### Error: "unable to open database file"

Pastikan folder writable dan file database ada:

```bash
# Cek permission (Linux/Mac)
ls -la animestream.db
chmod 644 animestream.db
```

### Database Corrupt

Restore dari backup atau reset database:

```bash
del animestream.db
node server.js
```

## Security

⚠️ **PENTING:**

1. **Jangan commit** `animestream.db` ke Git
2. **Backup berkala** database ke lokasi aman
3. **Password** sudah ter-hash dengan bcrypt
4. **SQL Injection** sudah di-handle oleh prepared statements
5. **Foreign keys** enabled untuk data integrity

## Monitoring

Untuk melihat isi database, gunakan SQLite browser:

- **DB Browser for SQLite:** https://sqlitebrowser.org/
- **SQLite Viewer (VS Code Extension)**
- **Command line:** `sqlite3 animestream.db`

```sql
-- Lihat semua users
SELECT * FROM users;

-- Lihat semua anime
SELECT * FROM anime;

-- Lihat total users
SELECT COUNT(*) FROM users;

-- Lihat anime dengan views terbanyak
SELECT * FROM anime ORDER BY views DESC LIMIT 10;
```

---

**Dokumentasi lengkap:** Lihat `database.js` untuk implementasi detail.
