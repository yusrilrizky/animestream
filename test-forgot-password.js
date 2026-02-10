// Test forgot password functionality
const { userDB, resetTokenDB } = require('./database');

console.log('\n🧪 Test Forgot Password\n');

// Test 1: Cek user admin ada
console.log('Test 1: Cek user admin...');
const admin = userDB.getByEmail('admin@animestream.com');
if (admin) {
  console.log('✅ User admin ditemukan');
  console.log('   - ID:', admin.id);
  console.log('   - Username:', admin.username);
  console.log('   - Email:', admin.email);
} else {
  console.log('❌ User admin tidak ditemukan!');
  process.exit(1);
}

// Test 2: Generate reset token
console.log('\nTest 2: Generate reset token...');
const crypto = require('crypto');
const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
const resetToken = crypto.randomBytes(32).toString('hex');
const expiresAt = new Date(Date.now() + 3600000).toISOString();

console.log('✅ Token generated');
console.log('   - Code:', resetCode);
console.log('   - Token:', resetToken.substring(0, 20) + '...');

// Test 3: Save to database
console.log('\nTest 3: Save token ke database...');
try {
  const tokenId = resetTokenDB.create(admin.id, resetToken, resetCode, expiresAt);
  console.log('✅ Token berhasil disimpan');
  console.log('   - Token ID:', tokenId);
} catch (error) {
  console.log('❌ Gagal simpan token:', error.message);
  process.exit(1);
}

// Test 4: Retrieve token by code
console.log('\nTest 4: Ambil token berdasarkan kode...');
const retrievedToken = resetTokenDB.getByCode(resetCode);
if (retrievedToken) {
  console.log('✅ Token berhasil diambil');
  console.log('   - User ID:', retrievedToken.userId);
  console.log('   - Code:', retrievedToken.code);
  console.log('   - Used:', retrievedToken.used);
} else {
  console.log('❌ Token tidak ditemukan!');
  process.exit(1);
}

// Test 5: Mark as used
console.log('\nTest 5: Mark token as used...');
resetTokenDB.markAsUsed(resetToken);
const usedToken = resetTokenDB.getByCode(resetCode);
if (!usedToken) {
  console.log('✅ Token berhasil di-mark as used');
} else {
  console.log('❌ Token masih bisa diambil!');
}

console.log('\n🎉 Semua test berhasil!\n');
console.log('💡 Sekarang coba di browser:');
console.log('   1. Buka: http://localhost:3000/login');
console.log('   2. Klik: "Lupa password?"');
console.log('   3. Masukkan: admin@animestream.com');
console.log('   4. Klik: "Dapatkan Kode Reset"');
console.log('   5. Lihat kode 6 digit yang muncul');
console.log('   6. Reset password\n');
