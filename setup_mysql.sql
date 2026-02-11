-- AnimeStream MySQL Database Setup
-- Import this file to phpMyAdmin XAMPP
-- Database: animestream

CREATE DATABASE IF NOT EXISTS animestream CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE animestream;

-- Users table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Anime table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reset Password Tokens table
CREATE TABLE IF NOT EXISTS reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10) NOT NULL,
    expiresAt DATETIME NOT NULL,
    used TINYINT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
-- Hash generated with bcrypt, salt rounds 10
INSERT INTO users (username, email, password, displayName, role, joinDate) 
VALUES ('admin', 'admin@animestream.com', '$2a$10$TpbfIe6U.5eTgqHM/.ReAOrUfZYhojFIrgzOyVRvTNI9w1en9kFGS', 'Administrator', 'admin', '11/2/2026')
ON DUPLICATE KEY UPDATE username=username;

-- Create indexes for better performance
CREATE INDEX idx_anime_title ON anime(title);
CREATE INDEX idx_anime_category ON anime(category);
CREATE INDEX idx_anime_uploadDate ON anime(uploadDate);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

SELECT 'Database setup completed successfully!' AS message;
SELECT 'Login: admin / admin123' AS credentials;
