const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Tentukan path database
const dbPath = path.join(__dirname, 'animestream.db');

// Buat database file dengan error handling
let db;
try {
  db = new Database(dbPath);
  console.log('✅ Database connected');
} catch (error) {
  console.error('❌ Database error:', error);
  db = new Database(':memory:');
  console.log('⚠️ Using in-memory database');
}

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Inisialisasi tabel
function initDatabase() {
  try {
    // Tabel Users
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
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
      )
    `);

    // Tabel Anime
    db.exec(`
      CREATE TABLE IF NOT EXISTS anime (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        episode TEXT,
        genre TEXT,
        videoPath TEXT NOT NULL,
        uploadDate TEXT NOT NULL,
        uploaderId INTEGER NOT NULL,
        uploader TEXT NOT NULL,
        views INTEGER DEFAULT 0,
        category TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaderId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Tabel Reset Password Tokens
    db.exec(`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        code TEXT NOT NULL,
        expiresAt DATETIME NOT NULL,
        used INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables initialized');

    // Cek apakah sudah ada admin
    const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
    
    if (!adminExists) {
      // Buat akun admin default
      const stmt = db.prepare(`
        INSERT INTO users (username, email, password, displayName, role, joinDate)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        'admin',
        'admin@animestream.com',
        bcrypt.hashSync('admin123', 10),
        'Administrator',
        'admin',
        new Date().toLocaleDateString('id-ID')
      );
      
      console.log('✅ Admin account created (username: admin, password: admin123)');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

// User functions
const userDB = {
  // Get all users
  getAll: () => {
    try {
      return db.prepare('SELECT * FROM users ORDER BY createdAt DESC').all();
    } catch (error) {
      console.error('userDB.getAll error:', error);
      return [];
    }
  },

  // Get user by ID
  getById: (id) => {
    try {
      return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    } catch (error) {
      console.error('userDB.getById error:', error);
      return null;
    }
  },

  // Get user by username or email
  getByUsernameOrEmail: (identifier) => {
    try {
      return db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(identifier, identifier);
    } catch (error) {
      console.error('userDB.getByUsernameOrEmail error:', error);
      return null;
    }
  },

  // Get user by email
  getByEmail: (email) => {
    try {
      return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    } catch (error) {
      console.error('userDB.getByEmail error:', error);
      return null;
    }
  },

  // Get user by Google ID
  getByGoogleId: (googleId) => {
    return db.prepare('SELECT * FROM users WHERE googleId = ?').get(googleId);
  },

  // Get user by Facebook ID
  getByFacebookId: (facebookId) => {
    return db.prepare('SELECT * FROM users WHERE facebookId = ?').get(facebookId);
  },

  // Create new user
  create: (userData) => {
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, displayName, avatar, role, googleId, facebookId, joinDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userData.username,
      userData.email,
      userData.password || null,
      userData.displayName || userData.username,
      userData.avatar || null,
      userData.role || 'user',
      userData.googleId || null,
      userData.facebookId || null,
      userData.joinDate || new Date().toLocaleDateString('id-ID')
    );
    
    return result.lastInsertRowid;
  },

  // Update user
  update: (id, userData) => {
    const fields = [];
    const values = [];
    
    if (userData.googleId !== undefined) {
      fields.push('googleId = ?');
      values.push(userData.googleId);
    }
    if (userData.facebookId !== undefined) {
      fields.push('facebookId = ?');
      values.push(userData.facebookId);
    }
    if (userData.displayName !== undefined) {
      fields.push('displayName = ?');
      values.push(userData.displayName);
    }
    if (userData.avatar !== undefined) {
      fields.push('avatar = ?');
      values.push(userData.avatar);
    }
    if (userData.password !== undefined) {
      fields.push('password = ?');
      values.push(userData.password);
    }
    if (userData.email !== undefined) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.videoQuality !== undefined) {
      fields.push('videoQuality = ?');
      values.push(userData.videoQuality);
    }
    
    if (fields.length === 0) return;
    
    values.push(id);
    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
  },

  // Delete user
  delete: (id) => {
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
  }
};

// Anime functions
const animeDB = {
  // Get all anime
  getAll: () => {
    return db.prepare('SELECT * FROM anime ORDER BY createdAt DESC').all();
  },

  // Get anime by ID
  getById: (id) => {
    return db.prepare('SELECT * FROM anime WHERE id = ?').get(id);
  },

  // Get anime by uploader ID
  getByUploaderId: (uploaderId) => {
    return db.prepare('SELECT * FROM anime WHERE uploaderId = ? ORDER BY createdAt DESC').all(uploaderId);
  },

  // Create new anime
  create: (animeData) => {
    const stmt = db.prepare(`
      INSERT INTO anime (title, description, episode, genre, videoPath, uploadDate, uploaderId, uploader, views, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      animeData.title,
      animeData.description || '',
      animeData.episode,
      animeData.genre || '',
      animeData.videoPath,
      animeData.uploadDate || new Date().toLocaleDateString('id-ID'),
      animeData.uploaderId,
      animeData.uploader,
      animeData.views || 0,
      animeData.category || 'action'
    );
    
    return result.lastInsertRowid;
  },

  // Update anime views
  incrementViews: (id) => {
    db.prepare('UPDATE anime SET views = views + 1 WHERE id = ?').run(id);
  },

  // Delete anime
  delete: (id) => {
    const anime = db.prepare('SELECT * FROM anime WHERE id = ?').get(id);
    if (anime) {
      db.prepare('DELETE FROM anime WHERE id = ?').run(id);
      return anime;
    }
    return null;
  },

  // Get total views for user
  getTotalViewsByUser: (uploaderId) => {
    const result = db.prepare('SELECT SUM(views) as total FROM anime WHERE uploaderId = ?').get(uploaderId);
    return result.total || 0;
  }
};

// Reset Token functions
const resetTokenDB = {
  // Create reset token
  create: (userId, token, code, expiresAt) => {
    const stmt = db.prepare(`
      INSERT INTO reset_tokens (userId, token, code, expiresAt)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(userId, token, code, expiresAt);
    return result.lastInsertRowid;
  },

  // Get token
  getByToken: (token) => {
    return db.prepare('SELECT * FROM reset_tokens WHERE token = ? AND used = 0').get(token);
  },

  // Get by code
  getByCode: (code) => {
    return db.prepare('SELECT * FROM reset_tokens WHERE code = ? AND used = 0').get(code);
  },

  // Mark token as used
  markAsUsed: (token) => {
    db.prepare('UPDATE reset_tokens SET used = 1 WHERE token = ?').run(token);
  },

  // Delete expired tokens
  deleteExpired: () => {
    db.prepare('DELETE FROM reset_tokens WHERE expiresAt < datetime("now")').run();
  }
};

module.exports = {
  initDatabase,
  userDB,
  animeDB,
  resetTokenDB,
  db
};
