# 📊 Fitur Dashboard AnimeStream

## 📹 Upload Saya

Halaman untuk mengelola semua anime yang telah diupload oleh user.

### Fitur:
- ✅ Menampilkan semua anime yang diupload user
- ✅ Total upload count
- ✅ Total views dari semua upload
- ✅ Detail lengkap setiap anime (judul, episode, deskripsi, genre, views, tanggal)
- ✅ Tombol hapus untuk setiap anime
- ✅ Tombol upload anime baru
- ✅ Empty state jika belum ada upload

### Route:
```javascript
app.get('/dashboard/my-uploads', isAuthenticated, (req, res) => {
  const user = req.user;
  const userUploads = animeDB.getByUploaderId(user.id);
  
  res.render('my-uploads', { 
    user, 
    uploads: userUploads
  });
});
```

### Akses:
- URL: `/dashboard/my-uploads`
- Auth: Required (isAuthenticated)
- View: `views/my-uploads.ejs`

### Fitur Hapus Anime:
```javascript
function deleteAnime(id) {
  if (confirm('Yakin ingin menghapus anime ini?')) {
    fetch(`/delete/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          location.reload();
        }
      });
  }
}
```

---

## ❤️ Favorit

Halaman untuk menyimpan dan mengelola anime favorit user.

### Status: 🚧 Coming Soon

### Fitur yang Akan Datang:
- [ ] Tambah anime ke favorit dari halaman watch
- [ ] Hapus anime dari favorit
- [ ] Tampilkan semua anime favorit
- [ ] Sort by: Terbaru, Terlama, Judul
- [ ] Filter by genre

### Route:
```javascript
app.get('/dashboard/favorites', isAuthenticated, (req, res) => {
  const user = req.user;
  // TODO: Implement favorites system
  const favorites = [];
  
  res.render('favorites', { 
    user, 
    favorites
  });
});
```

### Database Schema (Future):
```sql
CREATE TABLE favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  animeId INTEGER NOT NULL,
  addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (animeId) REFERENCES anime(id) ON DELETE CASCADE,
  UNIQUE(userId, animeId)
);
```

### API Endpoints (Future):
```javascript
// Add to favorites
POST /api/favorites/add
Body: { animeId: number }

// Remove from favorites
DELETE /api/favorites/remove/:animeId

// Get user favorites
GET /api/favorites
```

---

## 🕐 Riwayat Tonton

Halaman untuk melihat riwayat anime yang pernah ditonton.

### Status: 🚧 Coming Soon

### Fitur yang Akan Datang:
- [ ] Otomatis simpan riwayat saat menonton
- [ ] Tampilkan waktu terakhir ditonton
- [ ] Progress bar untuk anime yang belum selesai
- [ ] Hapus riwayat individual
- [ ] Hapus semua riwayat
- [ ] Continue watching dari terakhir kali

### Route:
```javascript
app.get('/dashboard/history', isAuthenticated, (req, res) => {
  const user = req.user;
  // TODO: Implement watch history system
  const history = [];
  
  res.render('history', { 
    user, 
    history
  });
});
```

### Database Schema (Future):
```sql
CREATE TABLE watch_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  animeId INTEGER NOT NULL,
  watchedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  progress INTEGER DEFAULT 0,
  duration INTEGER DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (animeId) REFERENCES anime(id) ON DELETE CASCADE
);
```

### API Endpoints (Future):
```javascript
// Add to history
POST /api/history/add
Body: { animeId: number, progress: number, duration: number }

// Remove from history
DELETE /api/history/remove/:animeId

// Clear all history
DELETE /api/history/clear

// Get user history
GET /api/history
```

---

## 📊 Dashboard Utama

Halaman overview dengan statistik dan aktivitas terbaru.

### Fitur:
- ✅ Total upload count
- ✅ Total views
- ✅ Favorit count (placeholder)
- ✅ Rating (placeholder)
- ✅ Quick actions (Upload, Beranda, Kelola Upload)
- ✅ Recent uploads (5 terbaru)

### Stats:
```javascript
const stats = {
  uploads: userUploads.length,
  views: animeDB.getTotalViewsByUser(user.id),
  favorites: 0, // TODO: Implement
  rating: '4.5' // TODO: Implement
};
```

---

## 🎨 UI/UX

### Sidebar Menu:
- 📊 Dashboard
- 📹 Upload Saya
- ❤️ Favorit
- 🕐 Riwayat
- ⚙️ Admin Panel (admin only)
- 🔧 Pengaturan

### Bottom Navigation (Mobile):
- 🏠 Beranda
- 📊 Dashboard
- ⬆️ Upload
- 👤 Profil

### Empty States:
Setiap halaman memiliki empty state yang informatif:
- Upload Saya: "Belum ada anime yang diupload"
- Favorit: "Belum ada anime favorit"
- Riwayat: "Belum ada riwayat tontonan"

### Coming Soon Notice:
Halaman Favorit dan Riwayat menampilkan notice bahwa fitur akan segera hadir.

---

## 🔐 Security

### Authentication:
- Semua routes menggunakan middleware `isAuthenticated`
- Session-based authentication
- Redirect ke login jika belum auth

### Authorization:
- User hanya bisa hapus anime milik sendiri
- Admin bisa hapus semua anime
- Validasi di server-side

---

## 📱 Mobile Responsive

Semua halaman dashboard fully responsive:
- Desktop: Sidebar di kiri
- Mobile: Sidebar horizontal scroll + Bottom navigation
- Breakpoint: 768px

### CSS:
```css
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e5e5;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
  }
}
```

---

## 🚀 Implementasi Future Features

### 1. Favorites System

**Step 1: Database**
```javascript
// Add to database.js
const favoriteDB = {
  add: (userId, animeId) => {
    const stmt = db.prepare('INSERT INTO favorites (userId, animeId) VALUES (?, ?)');
    return stmt.run(userId, animeId);
  },
  
  remove: (userId, animeId) => {
    db.prepare('DELETE FROM favorites WHERE userId = ? AND animeId = ?').run(userId, animeId);
  },
  
  getByUser: (userId) => {
    return db.prepare(`
      SELECT a.*, f.addedAt 
      FROM favorites f 
      JOIN anime a ON f.animeId = a.id 
      WHERE f.userId = ? 
      ORDER BY f.addedAt DESC
    `).all(userId);
  },
  
  isFavorite: (userId, animeId) => {
    const result = db.prepare('SELECT * FROM favorites WHERE userId = ? AND animeId = ?').get(userId, animeId);
    return !!result;
  }
};
```

**Step 2: API Routes**
```javascript
app.post('/api/favorites/add', isAuthenticated, (req, res) => {
  const { animeId } = req.body;
  try {
    favoriteDB.add(req.user.id, animeId);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.delete('/api/favorites/remove/:animeId', isAuthenticated, (req, res) => {
  favoriteDB.remove(req.user.id, req.params.animeId);
  res.json({ success: true });
});
```

**Step 3: Update Watch Page**
Add favorite button to watch page with toggle functionality.

### 2. Watch History System

**Step 1: Database**
```javascript
const historyDB = {
  add: (userId, animeId, progress, duration) => {
    // Check if exists, update or insert
    const existing = db.prepare('SELECT * FROM watch_history WHERE userId = ? AND animeId = ?').get(userId, animeId);
    
    if (existing) {
      db.prepare('UPDATE watch_history SET watchedAt = CURRENT_TIMESTAMP, progress = ?, duration = ? WHERE userId = ? AND animeId = ?')
        .run(progress, duration, userId, animeId);
    } else {
      db.prepare('INSERT INTO watch_history (userId, animeId, progress, duration) VALUES (?, ?, ?, ?)')
        .run(userId, animeId, progress, duration);
    }
  },
  
  getByUser: (userId) => {
    return db.prepare(`
      SELECT a.*, h.watchedAt, h.progress, h.duration 
      FROM watch_history h 
      JOIN anime a ON h.animeId = a.id 
      WHERE h.userId = ? 
      ORDER BY h.watchedAt DESC
    `).all(userId);
  },
  
  clear: (userId) => {
    db.prepare('DELETE FROM watch_history WHERE userId = ?').run(userId);
  }
};
```

**Step 2: Auto-track on Watch**
Add JavaScript to watch page to track progress and save to history.

---

## 📝 Testing Checklist

### Upload Saya:
- [ ] Tampil semua anime user
- [ ] Total count benar
- [ ] Total views benar
- [ ] Hapus anime berhasil
- [ ] Empty state tampil jika kosong
- [ ] Redirect ke upload page

### Favorit:
- [ ] Empty state tampil
- [ ] Coming soon notice tampil
- [ ] Link ke beranda berfungsi

### Riwayat:
- [ ] Empty state tampil
- [ ] Coming soon notice tampil
- [ ] Link ke beranda berfungsi

### Navigation:
- [ ] Sidebar menu active state
- [ ] Bottom nav active state
- [ ] Mobile responsive
- [ ] Semua link berfungsi

---

Dibuat untuk AnimeStream © 2026
