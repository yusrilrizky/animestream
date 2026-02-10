// PostgreSQL Database untuk Production
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Gunakan DATABASE_URL dari environment (Render auto-provide)
// Atau fallback ke SQLite untuk development
const usePostgres = process.env.DATABASE_URL && process.env.NODE_ENV === 'production';

let pool;
if (usePostgres) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  console.log('✅ Using PostgreSQL database');
} else {
  console.log('⚠️ DATABASE_URL not found, falling back to SQLite');
  // Fallback ke SQLite untuk development
  const sqliteDb = require('./database');
  module.exports = sqliteDb;
  return;
}

// Inisialisasi tabel
async function initDatabase() {
  const client = await pool.connect();
  try {
    // Tabel Users
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

    // Tabel Anime
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

    // Tabel Reset Password Tokens
    await client.query(`
      CREATE TABLE IF NOT EXISTS reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        code VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ PostgreSQL tables initialized');

    // Cek apakah sudah ada admin
    const adminCheck = await client.query('SELECT * FROM users WHERE username = $1', ['admin']);
    
    if (adminCheck.rows.length === 0) {
      // Buat akun admin default
      await client.query(`
        INSERT INTO users (username, email, password, display_name, role, join_date)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        'admin',
        'admin@animestream.com',
        bcrypt.hashSync('admin123', 10),
        'Administrator',
        'admin',
        new Date().toLocaleDateString('id-ID')
      ]);
      
      console.log('✅ Admin account created (username: admin, password: admin123)');
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// User functions
const userDB = {
  // Get all users
  getAll: async () => {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('userDB.getAll error:', error);
      return [];
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('userDB.getById error:', error);
      return null;
    }
  },

  // Get user by username or email
  getByUsernameOrEmail: async (identifier) => {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $1',
        [identifier]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('userDB.getByUsernameOrEmail error:', error);
      return null;
    }
  },

  // Get user by email
  getByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('userDB.getByEmail error:', error);
      return null;
    }
  },

  // Get user by Google ID
  getByGoogleId: async (googleId) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('userDB.getByGoogleId error:', error);
      return null;
    }
  },

  // Get user by Facebook ID
  getByFacebookId: async (facebookId) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE facebook_id = $1', [facebookId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('userDB.getByFacebookId error:', error);
      return null;
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const result = await pool.query(`
        INSERT INTO users (username, email, password, display_name, avatar, role, google_id, facebook_id, join_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
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
      
      return result.rows[0].id;
    } catch (error) {
      console.error('userDB.create error:', error);
      throw error;
    }
  },

  // Update user
  update: async (id, userData) => {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (userData.googleId !== undefined) {
        fields.push(`google_id = $${paramCount++}`);
        values.push(userData.googleId);
      }
      if (userData.facebookId !== undefined) {
        fields.push(`facebook_id = $${paramCount++}`);
        values.push(userData.facebookId);
      }
      if (userData.displayName !== undefined) {
        fields.push(`display_name = $${paramCount++}`);
        values.push(userData.displayName);
      }
      if (userData.avatar !== undefined) {
        fields.push(`avatar = $${paramCount++}`);
        values.push(userData.avatar);
      }
      if (userData.password !== undefined) {
        fields.push(`password = $${paramCount++}`);
        values.push(userData.password);
      }
      if (userData.email !== undefined) {
        fields.push(`email = $${paramCount++}`);
        values.push(userData.email);
      }
      if (userData.videoQuality !== undefined) {
        fields.push(`video_quality = $${paramCount++}`);
        values.push(userData.videoQuality);
      }

      if (fields.length === 0) return;

      values.push(id);
      await pool.query(
        `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount}`,
        values
      );
    } catch (error) {
      console.error('userDB.update error:', error);
      throw error;
    }
  },

  // Delete user
  delete: async (id) => {
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
      console.error('userDB.delete error:', error);
      throw error;
    }
  }
};

// Anime functions
const animeDB = {
  // Get all anime
  getAll: async () => {
    try {
      const result = await pool.query('SELECT * FROM anime ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('animeDB.getAll error:', error);
      return [];
    }
  },

  // Get anime by ID
  getById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM anime WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('animeDB.getById error:', error);
      return null;
    }
  },

  // Get anime by uploader ID
  getByUploaderId: async (uploaderId) => {
    try {
      const result = await pool.query(
        'SELECT * FROM anime WHERE uploader_id = $1 ORDER BY created_at DESC',
        [uploaderId]
      );
      return result.rows;
    } catch (error) {
      console.error('animeDB.getByUploaderId error:', error);
      return [];
    }
  },

  // Create new anime
  create: async (animeData) => {
    try {
      const result = await pool.query(`
        INSERT INTO anime (title, description, episode, genre, video_path, upload_date, uploader_id, uploader, views, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [
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
      ]);
      
      return result.rows[0].id;
    } catch (error) {
      console.error('animeDB.create error:', error);
      throw error;
    }
  },

  // Update anime views
  incrementViews: async (id) => {
    try {
      await pool.query('UPDATE anime SET views = views + 1 WHERE id = $1', [id]);
    } catch (error) {
      console.error('animeDB.incrementViews error:', error);
    }
  },

  // Delete anime
  delete: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM anime WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        await pool.query('DELETE FROM anime WHERE id = $1', [id]);
        return result.rows[0];
      }
      return null;
    } catch (error) {
      console.error('animeDB.delete error:', error);
      return null;
    }
  },

  // Get total views for user
  getTotalViewsByUser: async (uploaderId) => {
    try {
      const result = await pool.query(
        'SELECT SUM(views) as total FROM anime WHERE uploader_id = $1',
        [uploaderId]
      );
      return result.rows[0].total || 0;
    } catch (error) {
      console.error('animeDB.getTotalViewsByUser error:', error);
      return 0;
    }
  }
};

// Reset Token functions
const resetTokenDB = {
  // Create reset token
  create: async (userId, token, code, expiresAt) => {
    try {
      const result = await pool.query(`
        INSERT INTO reset_tokens (user_id, token, code, expires_at)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, [userId, token, code, expiresAt]);
      
      return result.rows[0].id;
    } catch (error) {
      console.error('resetTokenDB.create error:', error);
      throw error;
    }
  },

  // Get token
  getByToken: async (token) => {
    try {
      const result = await pool.query(
        'SELECT * FROM reset_tokens WHERE token = $1 AND used = 0',
        [token]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('resetTokenDB.getByToken error:', error);
      return null;
    }
  },

  // Get by code
  getByCode: async (code) => {
    try {
      const result = await pool.query(
        'SELECT * FROM reset_tokens WHERE code = $1 AND used = 0',
        [code]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('resetTokenDB.getByCode error:', error);
      return null;
    }
  },

  // Mark token as used
  markAsUsed: async (token) => {
    try {
      await pool.query('UPDATE reset_tokens SET used = 1 WHERE token = $1', [token]);
    } catch (error) {
      console.error('resetTokenDB.markAsUsed error:', error);
    }
  },

  // Delete expired tokens
  deleteExpired: async () => {
    try {
      await pool.query('DELETE FROM reset_tokens WHERE expires_at < NOW()');
    } catch (error) {
      console.error('resetTokenDB.deleteExpired error:', error);
    }
  }
};

module.exports = {
  initDatabase,
  userDB,
  animeDB,
  resetTokenDB,
  pool
};
