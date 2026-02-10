// Script untuk test email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('\n📧 Test Email Configuration\n');

// Cek apakah email sudah disetup
if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
  console.log('❌ Email belum dikonfigurasi!');
  console.log('\n📝 Cara setup:');
  console.log('1. Buka https://myaccount.google.com/apppasswords');
  console.log('2. Generate app password untuk Gmail');
  console.log('3. Update file .env:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASSWORD=your-16-digit-app-password');
  console.log('\n📚 Lihat EMAIL_SETUP.md untuk panduan lengkap\n');
  process.exit(1);
}

console.log('📋 Konfigurasi saat ini:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER);
console.log('- EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');
console.log('');

// Buat transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email
const testEmail = process.argv[2] || process.env.EMAIL_USER;

console.log(`📤 Mengirim test email ke: ${testEmail}...`);

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: testEmail,
  subject: 'Test Email - AnimeStream',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #00a1d6;">✅ Email Configuration Berhasil!</h2>
      <p>Halo,</p>
      <p>Ini adalah test email dari AnimeStream. Jika kamu menerima email ini, berarti konfigurasi email sudah benar!</p>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>✅ Email service berfungsi dengan baik</strong></p>
        <p style="margin: 5px 0 0 0; color: #666;">Sekarang fitur reset password akan mengirim email otomatis ke user.</p>
      </div>
      <p style="color: #999; font-size: 0.9rem;">Dikirim pada: ${new Date().toLocaleString('id-ID')}</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
      <p style="color: #999; font-size: 0.85rem; text-align: center;">© 2024 AnimeStream</p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('\n❌ Gagal mengirim email!');
    console.log('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Pastikan 2-Step Verification sudah aktif');
    console.log('2. Pastikan menggunakan App Password (bukan password Gmail biasa)');
    console.log('3. Pastikan tidak ada spasi di app password');
    console.log('4. Coba generate app password baru');
    console.log('\n📚 Lihat EMAIL_SETUP.md untuk panduan lengkap\n');
  } else {
    console.log('\n✅ Email berhasil terkirim!');
    console.log('Message ID:', info.messageId);
    console.log('\n📬 Cek inbox email:', testEmail);
    console.log('💡 Jika tidak ada, cek folder Spam/Junk\n');
    console.log('🎉 Email service siap digunakan untuk reset password!\n');
  }
  process.exit(error ? 1 : 0);
});
