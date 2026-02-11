require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { initDatabase, userDB, animeDB, resetTokenDB } = require('./database');
const cloudflareR2 = require('./cloudflare-r2');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting AnimeStream server...');
console.log('📍 PORT:', PORT);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');

// Global error handler untuk uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

// Async error wrapper untuk routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error('❌ Route error:', error);
    console.error('Stack:', error.stack);
    res.status(500).send(`
      <html>
        <head>
          <title>Error - AnimeStream</title>
          <style>
            body { font-family: Arial; padding: 2rem; background: #0f0f1e; color: white; text-align: center; }
            h1 { color: #ff6b6b; }
            p { color: #aaa; }
            a { color: #a855f7; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>⚠️ Terjadi Kesalahan</h1>
          <p>Maaf, terjadi kesalahan pada server.</p>
          <p><a href="/">← Kembali ke Beranda</a></p>
        </body>
      </html>
    `);
  });
};

// Inisialisasi database dengan better error handling
let dbInitialized = false;
try {
  initDatabase();
  dbInitialized = true;
  console.log('✅ Database initialized');
} catch (error) {
  console.error('⚠️ Database init error:', error.message);
  console.error('Stack:', error.stack);
  // Lanjut jalan meskipun database error
}

// Initialize Cloudflare R2
const r2Enabled = cloudflareR2.initCloudflareR2();

// Email transporter setup dengan error handling
let emailTransporter;
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    console.log('✅ Email transporter configured');
  } else {
    console.log('⚠️ Email credentials not configured (email features disabled)');
  }
} catch (error) {
  console.error('❌ Email transporter error:', error);
}

// Function to send reset email
async function sendResetEmail(email, resetToken) {
  if (!emailTransporter) {
    console.log('⚠️ Email not configured, skipping email send');
    return false;
  }
  
  const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@animestream.com',
    to: email,
    subject: 'Reset Password - AnimeStream',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00a1d6;">🔐 Reset Password AnimeStream</h2>
        <p>Halo,</p>
        <p>Anda menerima email ini karena ada permintaan untuk reset password akun Anda.</p>
        <p>Klik tombol di bawah untuk reset password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #00a1d6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">Reset Password</a>
        </div>
        <p>Atau copy link berikut ke browser:</p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all;">${resetUrl}</p>
        <p style="color: #999; font-size: 0.9rem;">Link ini akan kadaluarsa dalam 1 jam.</p>
        <p style="color: #999; font-size: 0.9rem;">Jika Anda tidak meminta reset password, abaikan email ini.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
        <p style="color: #999; font-size: 0.85rem; text-align: center;">© 2024 AnimeStream. All rights reserved.</p>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Increase body size limit for large video uploads
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit: '500mb',
  parameterLimit: 50000
}));
app.use(bodyParser.json({ limit: '500mb' }));

// Increase timeout for upload requests
app.use((req, res, next) => {
  req.setTimeout(600000); // 10 minutes
  res.setTimeout(600000); // 10 minutes
  next();
});

// Session - Harus login setiap kali buka web (tidak persistent)
app.use(session({
  secret: process.env.SESSION_SECRET || 'animestream-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: null, // Session berakhir saat browser ditutup
    secure: false,
    httpOnly: true
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDB.getById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy - Only if credentials provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id-here') {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Cek apakah user sudah ada
        let user = await userDB.getByGoogleId(profile.id);
        
        if (!user) {
          // Cek apakah email sudah terdaftar
          user = await userDB.getByEmail(profile.emails[0].value);
          
          if (user) {
            // Update user dengan Google ID
            await userDB.update(user.id, { googleId: profile.id });
            user = await userDB.getById(user.id);
          } else {
            // Buat user baru
            const userId = await userDB.create({
              googleId: profile.id,
              username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
              email: profile.emails[0].value,
              displayName: profile.displayName,
              avatar: profile.photos[0].value,
              password: null,
              role: 'user',
              joinDate: new Date().toLocaleDateString('id-ID')
            });
            user = await userDB.getById(userId);
          }
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
  console.log('✅ Google OAuth configured');
} else {
  console.log('⚠️ Google OAuth not configured (credentials missing)');
}

// Facebook OAuth Strategy - Only if credentials provided
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET &&
    process.env.FACEBOOK_APP_ID !== 'your-facebook-app-id-here') {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Cek apakah user sudah ada
        let user = await userDB.getByFacebookId(profile.id);
        
        if (!user) {
          // Cek apakah email sudah terdaftar
          const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
          user = await userDB.getByEmail(email);
          
          if (user) {
            // Update user dengan Facebook ID
            await userDB.update(user.id, { facebookId: profile.id });
            user = await userDB.getById(user.id);
          } else {
            // Buat user baru
            const userId = await userDB.create({
              facebookId: profile.id,
              username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
              email: email,
              displayName: profile.displayName,
              avatar: profile.photos ? profile.photos[0].value : null,
              password: null,
              role: 'user',
              joinDate: new Date().toLocaleDateString('id-ID')
            });
            user = await userDB.getById(userId);
          }
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
  console.log('✅ Facebook OAuth configured');
} else {
  console.log('⚠️ Facebook OAuth not configured (credentials missing)');
}
// Buat folder uploads jika belum ada
const uploadsDir = process.env.UPLOADS_DIR || 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`✅ Created uploads directory: ${uploadsDir}`);
}

// Konfigurasi multer untuk upload video
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 500 * 1024 * 1024, // 500MB max
    files: 1
  },
  fileFilter: (req, file, cb) => {
    console.log('📁 File filter check:', file.originalname);
    const allowedTypes = /mp4|mkv|avi|webm|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith('video/');
    
    if (mimetype && extname) {
      console.log('✅ File accepted:', file.originalname);
      return cb(null, true);
    }
    console.log('❌ File rejected:', file.originalname);
    cb(new Error('Hanya file video yang diperbolehkan!'));
  }
});

// Database sederhana sudah diganti dengan SQLite (lihat database.js)

// Middleware untuk cek login
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Middleware untuk cek admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Akses ditolak');
}

// Routes
app.get('/', asyncHandler(async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const animeList = await animeDB.getAll();
    res.render('index-new', { animeList, user });
  } else {
    // Redirect ke login jika belum login
    res.redirect('/login');
  }
}));

// Auth Routes
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  const success = req.query.success;
  res.render('login-new', { error: null, success: success });
});

app.post('/login', asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.render('login-new', { error: 'Username dan password harus diisi', success: null });
    }
    
    const user = await userDB.getByUsernameOrEmail(username);
    
    if (!user) {
      console.log('Login failed: User not found -', username);
      return res.render('login-new', { error: 'Username atau email tidak ditemukan', success: null });
    }
    
    if (!user.password) {
      console.log('Login failed: User has no password -', username);
      return res.render('login-new', { error: 'Akun ini tidak memiliki password. Gunakan OAuth atau reset password.', success: null });
    }
    
    if (!bcrypt.compareSync(password, user.password)) {
      console.log('Login failed: Wrong password -', username);
      return res.render('login-new', { error: 'Password salah', success: null });
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.render('login-new', { error: 'Terjadi kesalahan saat login. Silakan coba lagi.', success: null });
      }
      console.log('Login successful:', user.username);
      return res.redirect('/');
    });
  } catch (error) {
    console.error('Login exception:', error);
    return res.render('login-new', { error: 'Terjadi kesalahan sistem. Silakan coba lagi.', success: null });
  }
}));

// Google OAuth Routes - Mock untuk development
app.get('/auth/google', asyncHandler(async (req, res) => {
  // Cek apakah credentials sudah disetup
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'your-google-client-id-here') {
    // Mock login - langsung buat user dan login
    let user = await userDB.getByEmail('google.user@test.com');
    
    if (!user) {
      const userId = await userDB.create({
        googleId: 'mock-google-' + Date.now(),
        username: 'googleuser' + Math.floor(Math.random() * 1000),
        email: 'google.user@test.com',
        displayName: 'Google Test User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff',
        password: null,
        role: 'user',
        joinDate: new Date().toLocaleDateString('id-ID')
      });
      user = await userDB.getById(userId);
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.redirect('/login');
      }
      console.log('✅ Mock Google login berhasil:', user.email);
      return res.redirect('/');
    });
  } else {
    // Real OAuth
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
  }
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Facebook OAuth Routes - Mock untuk development
app.get('/auth/facebook', asyncHandler(async (req, res) => {
  // Cek apakah credentials sudah disetup
  if (!process.env.FACEBOOK_APP_ID || process.env.FACEBOOK_APP_ID === 'your-facebook-app-id-here') {
    // Mock login - langsung buat user dan login
    let user = await userDB.getByEmail('facebook.user@test.com');
    
    if (!user) {
      const userId = await userDB.create({
        facebookId: 'mock-facebook-' + Date.now(),
        username: 'fbuser' + Math.floor(Math.random() * 1000),
        email: 'facebook.user@test.com',
        displayName: 'Facebook Test User',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877f2&color=fff',
        password: null,
        role: 'user',
        joinDate: new Date().toLocaleDateString('id-ID')
      });
      user = await userDB.getById(userId);
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.redirect('/login');
      }
      console.log('✅ Mock Facebook login berhasil:', user.email);
      return res.redirect('/');
    });
  } else {
    // Real OAuth
    passport.authenticate('facebook', { scope: ['email'] })(req, res);
  }
}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('register', { error: null });
});

app.get('/forgot-password', (req, res) => {
  try {
    console.log('GET /forgot-password - rendering page...');
    res.render('forgot-password', { 
      error: null, 
      success: false,
      resetCode: null,
      email: null
    }, (err, html) => {
      if (err) {
        console.error('Render error:', err);
        res.status(500).send('Render error: ' + err.message);
      } else {
        console.log('Rendered HTML length:', html ? html.length : 0);
        res.send(html);
      }
    });
  } catch (error) {
    console.error('Error rendering forgot-password:', error);
    res.status(500).send('Error loading page: ' + error.message);
  }
});

app.post('/forgot-password', asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.render('forgot-password', { 
        error: 'Email harus diisi', 
        success: false,
        resetCode: null,
        email: null
      });
    }
    
    const user = await userDB.getByEmail(email);
    
    if (!user) {
      return res.render('forgot-password', { 
        error: 'Email tidak terdaftar di sistem kami', 
        success: false,
        resetCode: null,
        email: null
      });
    }
    
    // Generate kode 6 digit
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    
    // Save to database
    try {
      await resetTokenDB.create(user.id, resetToken, resetCode, expiresAt);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.render('forgot-password', { 
        error: 'Terjadi kesalahan sistem. Silakan coba lagi.', 
        success: false,
        resetCode: null,
        email: null
      });
    }
    
    console.log(`\n🔐 Reset Password - Email: ${email} | Kode: ${resetCode}\n`);
    
    // Tampilkan kode di halaman
    res.render('forgot-password', { 
      error: null, 
      success: true,
      resetCode: resetCode,
      email: email,
      verifyError: null
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.render('forgot-password', { 
      error: 'Terjadi kesalahan. Silakan coba lagi.', 
      success: false,
      resetCode: null,
      email: null
    });
  }
}));

// Route untuk verifikasi kode
app.post('/verify-code', async (req, res) => {
  const { code } = req.body;
  
  if (!code || code.length !== 6) {
    return res.render('forgot-password', {
      error: null,
      success: true,
      resetCode: code,
      email: null,
      verifyError: 'Kode harus 6 digit'
    });
  }
  
  const resetToken = await resetTokenDB.getByCode(code);
  
  if (!resetToken) {
    return res.render('forgot-password', {
      error: null,
      success: true,
      resetCode: code,
      email: null,
      verifyError: 'Kode tidak valid atau sudah digunakan'
    });
  }
  
  // Check if expired
  if (new Date(resetToken.expiresAt) < new Date()) {
    return res.render('forgot-password', {
      error: null,
      success: true,
      resetCode: code,
      email: null,
      verifyError: 'Kode sudah kadaluarsa. Silakan request kode baru.'
    });
  }
  
  // Kode valid! Tampilkan form reset password
  res.render('reset-password-verified', {
    code: code,
    error: null
  });
});

app.get('/terms', (req, res) => {
  res.render('terms');
});

// Settings Routes
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

app.post('/settings/video-quality', isAuthenticated, async (req, res) => {
  const { videoQuality } = req.body;
  
  const validQualities = ['auto', '1080p', '720p', '480p', '360p'];
  if (!validQualities.includes(videoQuality)) {
    return res.render('settings', {
      user: req.user,
      successProfile: null,
      errorProfile: null,
      successPassword: null,
      errorPassword: null,
      successQuality: null
    });
  }
  
  await userDB.update(req.user.id, { videoQuality });
  
  // Update session user
  req.user.videoQuality = videoQuality;
  
  res.render('settings', {
    user: req.user,
    successProfile: null,
    errorProfile: null,
    successPassword: null,
    errorPassword: null,
    successQuality: true
  });
});

app.post('/settings/profile', isAuthenticated, async (req, res) => {
  const { displayName } = req.body;
  
  if (!displayName || displayName.trim() === '') {
    return res.render('settings', {
      user: req.user,
      successProfile: null,
      errorProfile: 'Nama tampilan tidak boleh kosong',
      successPassword: null,
      errorPassword: null,
      successQuality: null
    });
  }
  
  await userDB.update(req.user.id, { displayName: displayName.trim() });
  
  // Update session user
  req.user.displayName = displayName.trim();
  
  res.render('settings', {
    user: req.user,
    successProfile: true,
    errorProfile: null,
    successPassword: null,
    errorPassword: null,
    successQuality: null
  });
});

app.post('/settings/password', isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = req.user;
  
  // Cek password lama
  if (!user.password || !bcrypt.compareSync(currentPassword, user.password)) {
    return res.render('settings', {
      user: req.user,
      successProfile: null,
      errorProfile: null,
      successPassword: null,
      errorPassword: 'Password saat ini salah',
      successQuality: null
    });
  }
  
  // Validasi password baru
  if (newPassword.length < 6) {
    return res.render('settings', {
      user: req.user,
      successProfile: null,
      errorProfile: null,
      successPassword: null,
      errorPassword: 'Password baru minimal 6 karakter',
      successQuality: null
    });
  }
  
  if (newPassword !== confirmPassword) {
    return res.render('settings', {
      user: req.user,
      successProfile: null,
      errorProfile: null,
      successPassword: null,
      errorPassword: 'Konfirmasi password tidak cocok',
      successQuality: null
    });
  }
  
  // Update password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  await userDB.update(user.id, { password: hashedPassword });
  
  res.render('settings', {
    user: req.user,
    successProfile: null,
    errorProfile: null,
    successPassword: true,
    errorPassword: null,
    successQuality: null
  });
});

// Reset Password Routes
app.post('/reset-password-with-code', async (req, res) => {
  const { code, password, confirmPassword } = req.body;
  
  const resetToken = await resetTokenDB.getByCode(code);
  
  if (!resetToken) {
    return res.render('forgot-password', {
      error: 'Kode tidak valid atau sudah digunakan',
      success: false,
      resetCode: null,
      email: null
    });
  }
  
  // Check if expired
  if (new Date(resetToken.expiresAt) < new Date()) {
    return res.render('forgot-password', {
      error: 'Kode sudah kadaluarsa. Silakan request kode baru.',
      success: false,
      resetCode: null,
      email: null
    });
  }
  
  // Validate password
  if (password.length < 6) {
    return res.render('forgot-password', {
      error: 'Password minimal 6 karakter',
      success: false,
      resetCode: null,
      email: null
    });
  }
  
  if (password !== confirmPassword) {
    return res.render('forgot-password', {
      error: 'Konfirmasi password tidak cocok',
      success: false,
      resetCode: null,
      email: null
    });
  }
  
  // Update password
  const hashedPassword = bcrypt.hashSync(password, 10);
  await userDB.update(resetToken.userId, { password: hashedPassword });
  
  // Mark token as used
  await resetTokenDB.markAsUsed(resetToken.token);
  
  console.log(`✅ Password berhasil direset untuk user ID: ${resetToken.userId}`);
  
  // Redirect to login with success message
  res.redirect('/login?success=password-reset');
});

app.get('/reset-password-code', (req, res) => {
  res.render('reset-password-code', {
    error: null
  });
});

app.post('/verify-reset-code', async (req, res) => {
  const { code, password, confirmPassword } = req.body;
  
  const resetToken = await resetTokenDB.getByCode(code);
  
  if (!resetToken) {
    return res.render('reset-password-code', {
      error: 'Kode tidak valid atau sudah digunakan'
    });
  }
  
  // Check if expired
  if (new Date(resetToken.expiresAt) < new Date()) {
    return res.render('reset-password-code', {
      error: 'Kode sudah kadaluarsa. Silakan request kode baru.'
    });
  }
  
  // Validate password
  if (password.length < 6) {
    return res.render('reset-password-code', {
      error: 'Password minimal 6 karakter'
    });
  }
  
  if (password !== confirmPassword) {
    return res.render('reset-password-code', {
      error: 'Konfirmasi password tidak cocok'
    });
  }
  
  // Update password
  const hashedPassword = bcrypt.hashSync(password, 10);
  await userDB.update(resetToken.userId, { password: hashedPassword });
  
  // Mark token as used
  await resetTokenDB.markAsUsed(resetToken.token);
  
  // Redirect to login with success message
  res.redirect('/login?success=password-reset');
});

app.get('/reset-password', async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.redirect('/login');
  }
  
  const resetToken = await resetTokenDB.getByToken(token);
  
  if (!resetToken) {
    return res.redirect('/login');
  }
  
  // Check if expired
  if (new Date(resetToken.expiresAt) < new Date()) {
    return res.render('reset-password', {
      token: token,
      error: 'Link reset password sudah kadaluarsa'
    });
  }
  
  res.render('reset-password', {
    token: token,
    error: null
  });
});

app.post('/reset-password', async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  
  const resetToken = await resetTokenDB.getByToken(token);
  
  if (!resetToken) {
    return res.render('reset-password', {
      token: token,
      error: 'Token tidak valid'
    });
  }
  
  // Check if expired
  if (new Date(resetToken.expiresAt) < new Date()) {
    return res.render('reset-password', {
      token: token,
      error: 'Link reset password sudah kadaluarsa'
    });
  }
  
  // Validate password
  if (password.length < 6) {
    return res.render('reset-password', {
      token: token,
      error: 'Password minimal 6 karakter'
    });
  }
  
  if (password !== confirmPassword) {
    return res.render('reset-password', {
      token: token,
      error: 'Konfirmasi password tidak cocok'
    });
  }
  
  // Update password
  const hashedPassword = bcrypt.hashSync(password, 10);
  await userDB.update(resetToken.userId, { password: hashedPassword });
  
  // Mark token as used
  await resetTokenDB.markAsUsed(token);
  
  // Redirect to login with success message
  res.redirect('/login?success=password-reset');
});

app.post('/register', asyncHandler(async (req, res) => {
  try {
    const { username, email, password, confirmPassword, terms } = req.body;
    
    console.log('📝 Register attempt:', { username, email });
    
    if (!terms) {
      return res.render('register', { error: 'Anda harus menyetujui syarat & ketentuan' });
    }
    
    if (password !== confirmPassword) {
      return res.render('register', { error: 'Password tidak cocok' });
    }
    
    if (password.length < 6) {
      return res.render('register', { error: 'Password minimal 6 karakter' });
    }
    
    // Check existing user
    const existingUser = await userDB.getByUsernameOrEmail(username);
    if (existingUser) {
      return res.render('register', { error: 'Username sudah digunakan' });
    }
    
    const existingEmail = await userDB.getByEmail(email);
    if (existingEmail) {
      return res.render('register', { error: 'Email sudah terdaftar' });
    }
    
    // Create user
    const userId = await userDB.create({
      username,
      email,
      displayName: username,
      password: bcrypt.hashSync(password, 10),
      role: 'user',
      joinDate: new Date().toLocaleDateString('id-ID')
    });
    
    console.log('✅ User registered:', username, 'ID:', userId);
    
    // Redirect ke login dengan pesan sukses
    res.redirect('/login?success=registered');
  } catch (error) {
    console.error('❌ Register error:', error);
    res.render('register', { error: 'Terjadi kesalahan. Silakan coba lagi.' });
  }
}));

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/login');
  });
});

// Dashboard Routes
app.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = req.user;
  const userUploads = await animeDB.getByUploaderId(user.id);
  
  const stats = {
    uploads: userUploads.length,
    views: await animeDB.getTotalViewsByUser(user.id),
    favorites: 0,
    rating: '4.5'
  };
  
  res.render('dashboard', { 
    user, 
    stats, 
    recentUploads: userUploads.slice(0, 5) 
  });
});

app.get('/dashboard/admin', isAdmin, async (req, res) => {
  const user = req.user;
  const allUsers = await userDB.getAll();
  const allAnime = await animeDB.getAll();
  
  const adminStats = {
    totalUsers: allUsers.length,
    totalAnime: allAnime.length,
    totalViews: allAnime.reduce((sum, a) => sum + (a.views || 0), 0),
    reports: 0
  };
  
  res.render('admin', { 
    user, 
    adminStats, 
    users: allUsers.slice(0, 10),
    animeList: allAnime.slice(0, 10)
  });
});

// My Uploads Route
app.get('/dashboard/my-uploads', isAuthenticated, async (req, res) => {
  const user = req.user;
  const userUploads = await animeDB.getByUploaderId(user.id);
  
  res.render('my-uploads', { 
    user, 
    uploads: userUploads
  });
});

// Favorites Route
app.get('/dashboard/favorites', isAuthenticated, (req, res) => {
  const user = req.user;
  // TODO: Implement favorites system
  const favorites = [];
  
  res.render('favorites', { 
    user, 
    favorites
  });
});

// History Route
app.get('/dashboard/history', isAuthenticated, (req, res) => {
  const user = req.user;
  // TODO: Implement watch history system
  const history = [];
  
  res.render('history', { 
    user, 
    history
  });
});

// Trending Page
app.get('/trending', isAuthenticated, async (req, res) => {
  const user = req.user;
  const allAnime = await animeDB.getAll();
  
  // Sort by views (trending)
  const trendingAnime = allAnime.sort((a, b) => (b.views || 0) - (a.views || 0));
  
  res.render('trending', { 
    user, 
    animeList: trendingAnime
  });
});

// New Releases Page
app.get('/new', isAuthenticated, async (req, res) => {
  const user = req.user;
  const allAnime = await animeDB.getAll();
  
  // Sort by newest (already sorted by createdAt DESC in getAll)
  res.render('new-releases', { 
    user, 
    animeList: allAnime
  });
});

// Categories Page
app.get('/categories', isAuthenticated, async (req, res) => {
  const user = req.user;
  const allAnime = await animeDB.getAll();
  
  // Group by category
  const categories = {};
  allAnime.forEach(anime => {
    const cat = anime.category || 'action';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(anime);
  });
  
  res.render('categories', { 
    user, 
    categories
  });
});

app.get('/upload', isAuthenticated, (req, res) => {
  const user = req.user;
  res.render('upload-link', { user });
});

// Upload APK mode (native file picker)
app.get('/upload-apk', isAuthenticated, (req, res) => {
  const user = req.user;
  res.render('upload-apk', { user });
});

// Upload with link (Terabox, Google Drive, etc)
app.post('/upload-link', isAuthenticated, asyncHandler(async (req, res) => {
  try {
    const { videoLink, title, episode, description, genre, category } = req.body;
    
    // Validate required fields
    if (!videoLink || !title || !episode || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Semua field harus diisi!' 
      });
    }
    
    // Validate URL
    try {
      new URL(videoLink);
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        error: 'Link video tidak valid!' 
      });
    }
    
    console.log('📤 Upload link received:', {
      link: videoLink,
      title: title
    });

    const user = req.user;
    
    const animeId = await animeDB.create({
      title: title,
      description: description,
      episode: episode,
      genre: genre || '',
      videoPath: videoLink, // Store the link directly
      uploadDate: new Date().toLocaleDateString('id-ID'),
      uploaderId: user.id,
      uploader: user.displayName || user.username,
      views: 0,
      category: category || 'action',
      googleDriveFileId: 'external-link' // Mark as external link
    });

    console.log('✅ Upload link successful, anime ID:', animeId);
    
    res.redirect('/?success=upload');
  } catch (error) {
    console.error('❌ Upload link error:', error);
    console.error('Stack:', error.stack);
    
    res.status(500).json({ 
      success: false, 
      error: 'Gagal menyimpan anime: ' + error.message 
    });
  }
}));

app.post('/upload', isAuthenticated, (req, res, next) => {
  upload.single('video')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('❌ Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          success: false, 
          error: 'File terlalu besar! Maksimal 500MB' 
        });
      }
      return res.status(400).json({ 
        success: false, 
        error: 'Error upload: ' + err.message 
      });
    } else if (err) {
      console.error('❌ Upload error:', err);
      return res.status(400).json({ 
        success: false, 
        error: err.message 
      });
    }
    next();
  });
}, asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tidak ada file yang diupload!' 
      });
    }

    console.log('📤 Upload received:', {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    });

    const user = req.user;
    
    // Validate required fields
    if (!req.body.title || !req.body.episode || !req.body.description) {
      // Delete uploaded file
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        success: false, 
        error: 'Judul, episode, dan deskripsi harus diisi!' 
      });
    }
    
    let videoPath = req.file.filename;
    let r2Key = null;
    let r2Url = null;
    
    // Upload to Cloudflare R2 if configured
    if (r2Enabled) {
      try {
        console.log('📤 Uploading to Cloudflare R2...');
        const r2Result = await cloudflareR2.uploadToR2(
          req.file.path,
          req.file.filename,
          req.file.mimetype
        );
        
        r2Key = r2Result.key;
        r2Url = r2Result.url;
        videoPath = r2Result.url; // Use R2 URL
        
        console.log('✅ Uploaded to Cloudflare R2:', r2Key);
        
        // Delete local file after successful upload to R2
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
          console.log('🗑️ Deleted local file:', req.file.filename);
        }
      } catch (r2Error) {
        console.error('⚠️ Cloudflare R2 upload failed, using local storage:', r2Error.message);
        // Continue with local storage if R2 fails
      }
    }
    
    const animeId = await animeDB.create({
      title: req.body.title,
      description: req.body.description,
      episode: req.body.episode,
      genre: req.body.genre || '',
      videoPath: videoPath,
      uploadDate: new Date().toLocaleDateString('id-ID'),
      uploaderId: user.id,
      uploader: user.displayName || user.username,
      views: 0,
      category: req.body.category || 'action',
      googleDriveFileId: r2Key // Reuse this field for R2 key
    });

    console.log('✅ Upload successful, anime ID:', animeId);
    
    res.json({ 
      success: true, 
      animeId: animeId,
      message: 'Video berhasil diupload!' + (r2Key ? ' (Cloudflare R2)' : ''),
      storage: r2Key ? 'cloudflare-r2' : 'local'
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    console.error('Stack:', error.stack);
    
    // Delete uploaded file if database insert fails
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('🗑️ Deleted failed upload file:', req.file.filename);
      } catch (e) {
        console.error('Failed to delete file:', e);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Gagal menyimpan video: ' + error.message 
    });
  }
}));

app.get('/watch/:id', isAuthenticated, async (req, res) => {
  const anime = await animeDB.getById(req.params.id);
  if (!anime) {
    return res.status(404).send('Anime tidak ditemukan!');
  }
  
  // Increment views
  await animeDB.incrementViews(req.params.id);
  
  const user = req.user;
  res.render('watch', { anime, user });
});

app.delete('/delete/:id', async (req, res) => {
  const anime = await animeDB.delete(req.params.id);
  if (anime) {
    // Hapus file video
    const videoPath = path.join('uploads', anime.videoPath);
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send(`
    <html>
      <head>
        <title>Error - AnimeStream</title>
        <style>
          body { font-family: Arial; padding: 2rem; background: #0f0f1e; color: white; text-align: center; }
          h1 { color: #ff6b6b; }
          p { color: #aaa; }
          a { color: #a855f7; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>⚠️ Terjadi Kesalahan</h1>
        <p>Maaf, terjadi kesalahan pada server.</p>
        <p><a href="/">← Kembali ke Beranda</a></p>
        <p style="font-size: 0.8rem; margin-top: 2rem;">Error: ${err.message}</p>
      </body>
    </html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>404 - AnimeStream</title>
        <style>
          body { font-family: Arial; padding: 2rem; background: #0f0f1e; color: white; text-align: center; }
          h1 { color: #a855f7; }
          p { color: #aaa; }
          a { color: #a855f7; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Halaman yang kamu cari tidak ada.</p>
        <p><a href="/">← Kembali ke Beranda</a></p>
      </body>
    </html>
  `);
});

const server = app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📱 Login: http://localhost:${PORT}/login`);
  console.log(`👤 Username: admin | Password: admin123`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Stopping server...');
  server.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Stopping server...');
  server.close();
  process.exit(0);
});
