// Test upload functionality
const { animeDB, userDB } = require('./database');

console.log('\n🧪 Test Upload Functionality\n');

// Test 1: Cek user ada
console.log('Test 1: Cek user...');
const users = userDB.getAll();
console.log(`✅ Total users: ${users.length}`);
if (users.length > 0) {
  console.log(`   - User pertama: ${users[0].username} (ID: ${users[0].id})`);
}

// Test 2: Cek anime yang sudah diupload
console.log('\nTest 2: Cek anime yang sudah diupload...');
const allAnime = animeDB.getAll();
console.log(`✅ Total anime: ${allAnime.length}`);

if (allAnime.length > 0) {
  console.log('\n📺 Daftar Anime:');
  allAnime.forEach((anime, index) => {
    console.log(`\n${index + 1}. ${anime.title}`);
    console.log(`   - Episode: ${anime.episode}`);
    console.log(`   - Uploader: ${anime.uploader}`);
    console.log(`   - Views: ${anime.views}`);
    console.log(`   - Video: ${anime.videoPath}`);
    console.log(`   - Upload Date: ${anime.uploadDate}`);
  });
} else {
  console.log('   ℹ️  Belum ada anime yang diupload');
}

// Test 3: Cek folder uploads
const fs = require('fs');
console.log('\nTest 3: Cek folder uploads...');
if (fs.existsSync('uploads')) {
  const files = fs.readdirSync('uploads');
  console.log(`✅ Folder uploads ada`);
  console.log(`   - Total files: ${files.length}`);
  if (files.length > 0) {
    console.log('   - Files:');
    files.forEach(file => {
      const stats = fs.statSync(`uploads/${file}`);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`     • ${file} (${sizeMB} MB)`);
    });
  }
} else {
  console.log('❌ Folder uploads tidak ada!');
}

console.log('\n📝 Cara Test Upload:');
console.log('1. Buka: http://localhost:3000/login');
console.log('2. Login: admin / admin123');
console.log('3. Klik: "Upload"');
console.log('4. Pilih video (max 500MB)');
console.log('5. Isi form:');
console.log('   - Title: Naruto Episode 1');
console.log('   - Episode: Episode 1');
console.log('   - Category: Action');
console.log('   - Description: Anime tentang ninja');
console.log('6. Klik: "Upload Sekarang"');
console.log('7. Video akan muncul di homepage!');
console.log('\n💡 Jalankan script ini lagi untuk cek hasil upload\n');
