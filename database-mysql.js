// MySQL Database Configuration for XAMPP
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // XAMPP default password kosong
  database: process.env.DB_NAME || 'animestream',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL database (XAMPP)');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err.message);
    console.log('💡 Make sure XAMPP MySQL is running!');
  });

// Initialize database tables
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Tabel Users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        displayName VARCHAR(255),
        avatar TEXT,
        role VARCHAR(50) DEFAULT 'user',
        videoQuality VARCHAR(50) DEFAULT 'auto',
        googleId VARCHAR(255) UNIQUE,
        facebookId VARCHAR(255) UNIQUE,
        joinDate VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Tabel Anime
    await connection.query(`
      CREATE TABLE IF NOT EXISTS anime (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        episode VARCHAR(100),
        genre VARCHAR(255),
        videoPath TEXT NOT NULL,
        googleDriveFileId TEXT,
        uploadDate VARCHAR(100) NOT NULL,
        uploaderId INT NOT NULL,
        uploader VARCHAR(255) NOT NULL,
        views INT DEFAULT 0,
        category VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaderId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Tabel Reset Password Tokens
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        code VARCHAR(10) NOT NULL,
        expiresAt DATETIME NOT NULL,
        used TINYINT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ MySQL tables initialized');

    // Cek apakah sudah ada admin
    const [adminRows] = await connection.query('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (adminRows.length === 0) {
      // Buat akun admin default
      await connection.query(`
        INSERT INTO users (username, email, password, displayName, role, joinDate)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        'admin',
        'admin@animestream.com',
        bcrypt.hashSync('admin123', 10),
        'Administrator',
        'admin',
        new Date().toLocaleDateString('id-ID')
      ]);
      
      console.log('✅ Admin account created (username: admin, password: admin123)');
    }
    
    connection.release();
  } catch (error) {
    console.error('❌ MySQL initialization error:', error);
    throw error;
  }
}

// User functions
const userDB = {
  // Get all users
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM users ORDER BY createdAt DESC');
      return rows;
    } catch (error) {
      console.error('userDB.getAll error:', error);
      return [];
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('userDB.getById error:', error);
      return null;
    }
  },

  // Get user by username or email
  getByUsernameOrEmail: async (identifier) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [identifier, identifier]);
      return rows[0] || null;
    } catch (error) {
      console.error('userDB.getByUsernameOrEmail error:', error);
      return null;
    }
  },

  // Get user by email
  getByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('userDB.getByEmail error:', error);
      return null;
    }
  },

  // Get user by Google ID
  getByGoogleId: async (googleId) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
    return rows[0] || null;
  },

  // Get user by Facebook ID
  getByFacebookId: async (facebookId) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE facebookId = ?', [facebookId]);
    return rows[0] || null;
  },

  // Create new user
  create: async (userData) => {
    const [result] = await pool.query(`
      INSERT INTO users (username, email, password, displayName, avatar, role, googleId, facebookId, joinDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userData.username,
      userData.email,
      userData.password || null,
      userData.displayName || userData.username,
      userData.avatar || null,
      userData.role || 'user',
      userData.googleId || null,
      userData.facebookId || null,
      userData.joinDate || new Date().toLocaleDateString('id-ID')
    ]);
    
    return result.insertId;
  },

  // Update user
  update: async (id, userData) => {
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
    await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  },

  // Delete user
  delete: async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
};

// Anime functions
const animeDB = {
  // Get all anime
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM anime ORDER BY createdAt DESC');
    return rows;
  },

  // Get anime by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM anime WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Get anime by uploader ID
  getByUploaderId: async (uploaderId) => {
    const [rows] = await pool.query('SELECT * FROM anime WHERE uploaderId = ? ORDER BY createdAt DESC', [uploaderId]);
    return rows;
  },

  // Create new anime
  create: async (animeData) => {
    const [result] = await pool.query(`
      INSERT INTO anime (title, description, episode, genre, videoPath, googleDriveFileId, uploadDate, uploaderId, uploader, views, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      animeData.title,
      animeData.description || '',
      animeData.episode,
      animeData.genre || '',
      animeData.videoPath,
      animeData.googleDriveFileId || null,
      animeData.uploadDate || new Date().toLocaleDateString('id-ID'),
      animeData.uploaderId,
      animeData.uploader,
      animeData.views || 0,
      animeData.category || 'action'
    ]);
    
    return result.insertId;
  },

  // Update anime views
  incrementViews: async (id) => {
    await pool.query('UPDATE anime SET views = views + 1 WHERE id = ?', [id]);
  },

  // Delete anime
  delete: async (id) => {
    const [rows] = await pool.query('SELECT * FROM anime WHERE id = ?', [id]);
    const anime = rows[0];
    if (anime) {
      await pool.query('DELETE FROM anime WHERE id = ?', [id]);
      return anime;
    }
    return null;
  },

  // Get total views for user
  getTotalViewsByUser: async (uploaderId) => {
    const [rows] = await pool.query('SELECT SUM(views) as total FROM anime WHERE uploaderId = ?', [uploaderId]);
    return rows[0].total || 0;
  }
};

// Reset Token functions
const resetTokenDB = {
  // Create reset token
  create: async (userId, token, code, expiresAt) => {
    const [result] = await pool.query(`
      INSERT INTO reset_tokens (userId, token, code, expiresAt)
      VALUES (?, ?, ?, ?)
    `, [userId, token, code, expiresAt]);
    return result.insertId;
  },

  // Get token
  getByToken: async (token) => {
    const [rows] = await pool.query('SELECT * FROM reset_tokens WHERE token = ? AND used = 0', [token]);
    return rows[0] || null;
  },

  // Get by code
  getByCode: async (code) => {
    const [rows] = await pool.query('SELECT * FROM reset_tokens WHERE code = ? AND used = 0', [code]);
    return rows[0] || null;
  },

  // Mark token as used
  markAsUsed: async (token) => {
    await pool.query('UPDATE reset_tokens SET used = 1 WHERE token = ?', [token]);
  },

  // Delete expired tokens
  deleteExpired: async () => {
    await pool.query('DELETE FROM reset_tokens WHERE expiresAt < NOW()');
  }
};

module.exports = {
  initDatabase,
  userDB,
  animeDB,
  resetTokenDB,
  pool
};
