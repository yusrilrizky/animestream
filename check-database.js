// Script untuk cek dan fix database
const { initDatabase, userDB, animeDB } = require('./database');

console.log('🔍 Checking database...\n');

try {
  // Init database
  console.log('1. Initializing database...');
  initDatabase();
  console.log('   ✅ Database initialized\n');

  // Check users
  console.log('2. Checking users...');
  const users = userDB.getAll();
  console.log(`   Found ${users.length} users\n`);

  // Check admin
  console.log('3. Checking admin account...');
  const admin = userDB.getByUsernameOrEmail('admin');
  
  if (admin) {
    console.log('   ✅ Admin account exists');
    console.log('   Username:', admin.username);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   Has password:', admin.password ? 'Yes' : 'No');
  } else {
    console.log('   ❌ Admin account not found!');
    console.log('   Creating admin account...');
    
    const bcrypt = require('bcryptjs');
    const userId = userDB.create({
      username: 'admin',
      email: 'admin@animestream.com',
      password: bcrypt.hashSync('admin123', 10),
      displayName: 'Administrator',
      role: 'admin',
      joinDate: new Date().toLocaleDateString('id-ID')
    });
    
    console.log('   ✅ Admin account created with ID:', userId);
  }

  console.log('\n4. Checking anime...');
  const anime = animeDB.getAll();
  console.log(`   Found ${anime.length} anime\n`);

  console.log('═══════════════════════════════════════');
  console.log('✅ Database check complete!');
  console.log('═══════════════════════════════════════');
  console.log('\nLogin credentials:');
  console.log('Username: admin');
  console.log('Password: admin123');
  console.log('═══════════════════════════════════════\n');

} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
