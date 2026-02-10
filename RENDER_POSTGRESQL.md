# 🐘 PostgreSQL untuk Render (Recommended)

## ⚠️ Kenapa Perlu PostgreSQL?

**Masalah SQLite di Render:**
- ❌ File database tidak persistent
- ❌ Reset setiap deploy
- ❌ Data hilang

**Solusi: PostgreSQL**
- ✅ Gratis di Render
- ✅ Data persistent
- ✅ Production-ready

---

## 🚀 Setup PostgreSQL di Render

### Step 1: Buat PostgreSQL Database

1. Login ke Render.com
2. Klik **"New +"** → **"PostgreSQL"**
3. Konfigurasi:
   ```
   Name: animestream-db
   Database: animestream
   User: animestream
   Region: Singapore
   Plan: Free
   ```
4. Klik **"Create Database"**
5. Tunggu 2-3 menit

### Step 2: Copy Connection String

Di PostgreSQL Dashboard, copy:
```
Internal Database URL
```

Contoh:
```
postgresql://user:pass@host:5432/dbname
```

### Step 3: Set Environment Variable

Di Web Service → Environment:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

---

## 📝 Update Code untuk PostgreSQL

### 1. Install Package

Tambahkan di `package.json`:
```json
"dependencies": {
  "pg": "^8.11.3",
  "pg-hstore": "^2.3.4"
}
```

### 2. Buat File `database-pg.js`

```javascript
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Init tables
async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        display_name VARCHAR(255),
        avatar TEXT,
        role VARCHAR(50) DEFAULT 'user',
        video_quality VARCHAR(50) DEFAULT 'auto',
        google_id VARCHAR(255) UNIQUE,
        facebook_id VARCHAR(255) UNIQUE,
        join_date VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS anime (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        episode VARCHAR(50),
        genre TEXT,
        video_path TEXT NOT NULL,
        upload_date VARCHAR(50) NOT NULL,
        uploader_id INTEGER NOT NULL,
        uploader VARCHAR(255) NOT NULL,
        views INTEGER DEFAULT 0,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploader_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create admin if not exists
    const adminCheck = await client.query('SELECT * FROM users WHERE username = $1', ['admin']);
    if (adminCheck.rows.length === 0) {
      await client.query(`
        INSERT INTO users (username, email, password, display_name, role, join_date)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, ['admin', 'admin@animestream.com', bcrypt.hashSync('admin123', 10), 'Administrator', 'admin', new Date().toLocaleDateString('id-ID')]);
      console.log('✅ Admin account created');
    }

    console.log('✅ PostgreSQL tables initialized');
  } finally {
    client.release();
  }
}

module.exports = { initDatabase, pool };
```

### 3. Update `server.js`

Ganti:
```javascript
const { initDatabase, userDB, animeDB } = require('./database');
```

Dengan:
```javascript
const { initDatabase, pool } = require('./database-pg');
```

---

## 🔄 Migrasi Data (Opsional)

Jika sudah ada data di SQLite:

```bash
# Export dari SQLite
sqlite3 animestream.db .dump > data.sql

# Import ke PostgreSQL
psql $DATABASE_URL < data.sql
```

---

## ✅ Testing

```bash
# Local test dengan PostgreSQL
export DATABASE_URL=postgresql://localhost/animestream
node server.js
```

---

## 📊 Alternatif: Tetap Pakai SQLite

Jika tetap mau pakai SQLite (tidak recommended):

**Konsekuensi:**
- Data reset setiap deploy
- Hanya untuk testing
- Tidak untuk production

**Solusi Temporary:**
- Backup database manual
- Restore setelah deploy

---

**Rekomendasi: Gunakan PostgreSQL untuk production!**

**© 2026 AnimeStream**
