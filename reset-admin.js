// Script untuk reset password admin
const bcrypt = require('bcryptjs');
const { userDB } = require('./database');

console.log('\n🔧 Reset Password Admin\n');

// Cari user admin
const admin = userDB.getByUsernameOrEmail('admin');

if (!admin) {
  console.log('❌ User admin tidak ditemukan!');
  console.log('💡 Jalankan server untuk membuat user admin otomatis.\n');
  process.exit(1);
}

// Reset password ke default
const newPassword = 'admin123';
const hashedPassword = bcrypt.hashSync(newPassword, 10);
userDB.update(admin.id, { password: hashedPassword });

console.log('✅ Password admin berhasil direset!');
console.log('\nDetail akun:');
console.log('- Username:', admin.username);
console.log('- Email:', admin.email);
console.log('- Password:', newPassword);
console.log('\n💡 Silakan login dengan kredensial di atas.\n');
