// Test MySQL Connection
const { userDB } = require('./database');

async function testConnection() {
  try {
    console.log('Testing MySQL connection...');
    
    // Test get all users
    const users = await userDB.getAll();
    console.log('✅ Connected to MySQL!');
    console.log(`📊 Total users: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n👥 Users:');
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.email}) - Role: ${user.role}`);
      });
    } else {
      console.log('\n⚠️ No users found!');
      console.log('💡 Import setup_mysql.sql to create admin user');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    console.log('\n💡 Solutions:');
    console.log('   1. Make sure XAMPP MySQL is running');
    console.log('   2. Import setup_mysql.sql to phpMyAdmin');
    console.log('   3. Check database name: animestream');
    process.exit(1);
  }
}

testConnection();
