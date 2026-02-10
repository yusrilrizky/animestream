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

const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi database
initDatabase();

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
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

passport.deserializeUser((id, done) => {
  const user = userDB.getById(id);
  done(null, user);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // Cek apakah user sudah ada
    let user = userDB.getByGoogleId(profile.id);
    
    if (!user) {
      // Cek apakah email sudah terdaftar
      user = userDB.getByEmail(profile.emails[0].value);
      
      if (user) {
        // Update user dengan Google ID
        userDB.update(user.id, { googleId: profile.id });
        user = userDB.getById(user.id);
      } else {
        // Buat user baru
        const userId = userDB.create({
          googleId: profile.id,
          username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
          email: profile.emails[0].value,
          displayName: profile.displayName,
          avatar: profile.photos[0].value,
          password: null,
          role: 'user',
          joinDate: new Date().toLocaleDateString('id-ID')
        });
        user = userDB.getById(userId);
      }
    }
    
    return done(null, user);
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'photos']
  },
  (accessToken, refreshToken, profile, done) => {
    // Cek apakah user sudah ada
    let user = userDB.getByFacebookId(profile.id);
    
    if (!user) {
      // Cek apakah email sudah terdaftar
      const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
      user = userDB.getByEmail(email);
      
      if (user) {
        // Update user dengan Facebook ID
        userDB.update(user.id, { facebookId: profile.id });
        user = userDB.getById(user.id);
      } else {
        // Buat user baru
        const userId = userDB.create({
          facebookId: profile.id,
          username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
          email: email,
          displayName: profile.displayName,
          avatar: profile.photos ? profile.photos[0].value : null,
          password: null,
          role: 'user',
          joinDate: new Date().toLocaleDateString('id-ID')
        });
        user = userDB.getById(userId);
      }
    }
    
    return done(null, user);
  }
));

// Buat folder uploads jika belum ada
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Konfigurasi multer untuk upload video
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|mkv|avi|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
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
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const animeList = animeDB.getAll();
    res.render('index-new', { animeList, user });
  } else {
    // Redirect ke login jika belum login
    res.redirect('/login');
  }
});

// Auth Routes
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  const success = req.query.success;
  res.render('login-new', { error: null, success: success });
});

app.post('/login', async (req, res, next) => {
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
});

// Google OAuth Routes - Mock untuk development
app.get('/auth/google', (req, res) => {
  // Cek apakah credentials sudah disetup
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'your-google-client-id-here') {
    // Mock login - langsung buat user dan login
    let user = userDB.getByEmail('google.user@test.com');
    
    if (!user) {
      const userId = userDB.create({
        googleId: 'mock-google-' + Date.now(),
        username: 'googleuser' + Math.floor(Math.random() * 1000),
        email: 'google.user@test.com',
        displayName: 'Google Test User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff',
        password: null,
        role: 'user',
        joinDate: new Date().toLocaleDateString('id-ID')
      });
      user = userDB.getById(userId);
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
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Facebook OAuth Routes - Mock untuk development
app.get('/auth/facebook', (req, res) => {
  // Cek apakah credentials sudah disetup
  if (!process.env.FACEBOOK_APP_ID || process.env.FACEBOOK_APP_ID === 'your-facebook-app-id-here') {
    // Mock login - langsung buat user dan login
    let user = userDB.getByEmail('facebook.user@test.com');
    
    if (!user) {
      const userId = userDB.create({
        facebookId: 'mock-facebook-' + Date.now(),
        username: 'fbuser' + Math.floor(Math.random() * 1000),
        email: 'facebook.user@test.com',
        displayName: 'Facebook Test User',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877f2&color=fff',
        password: null,
        role: 'user',
        joinDate: new Date().toLocaleDateString('id-ID')
      });
      user = userDB.getById(userId);
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
});

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

app.post('/forgot-password', async (req, res) => {
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
});

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

app.post('/register', async (req, res, next) => {
  const { username, email, password, confirmPassword, terms } = req.body;
  
  if (!terms) {
    return res.render('register', { error: 'Anda harus menyetujui syarat & ketentuan' });
  }
  
  if (password !== confirmPassword) {
    return res.render('register', { error: 'Password tidak cocok' });
  }
  
  if (password.length < 6) {
    return res.render('register', { error: 'Password minimal 6 karakter' });
  }
  
  if (await userDB.getByUsernameOrEmail(username)) {
    return res.render('register', { error: 'Username sudah digunakan' });
  }
  
  if (await userDB.getByEmail(email)) {
    return res.render('register', { error: 'Email sudah terdaftar' });
  }
  
  const userId = await userDB.create({
    username,
    email,
    displayName: username,
    password: bcrypt.hashSync(password, 10),
    role: 'user',
    joinDate: new Date().toLocaleDateString('id-ID')
  });
  
  // Redirect ke login dengan pesan sukses (tidak auto-login)
  res.redirect('/login?success=registered');
});

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
  res.render('upload-new', { user });
});

app.post('/upload', isAuthenticated, upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Tidak ada file yang diupload!');
  }

  const user = req.user;
  
  const animeId = await animeDB.create({
    title: req.body.title,
    description: req.body.description,
    episode: req.body.episode,
    genre: req.body.genre || '',
    videoPath: req.file.filename,
    uploadDate: new Date().toLocaleDateString('id-ID'),
    uploaderId: user.id,
    uploader: user.displayName || user.username,
    views: 0,
    category: req.body.category || 'action'
  });

  res.redirect('/');
});

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Ready to accept connections`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
