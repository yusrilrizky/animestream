// Test Login
const { userDB } = require('./database');
const bcrypt = require('bcryptjs');

async function testLogin() {
  try {
    console.log('Testing login...\n');
    
    const username = 'admin';
    const password = 'admin123';
    
    console.log(`Trying to login with: ${username} / ${password}`);
    
    // Get user
    const user = await userDB.getByUsernameOrEmail(username);
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }
    
    console.log(`✅ User found: ${user.username} (${user.email})`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password hash: ${user.password.substring(0, 20)}...`);
    
    // Check password
    const isValid = bcrypt.compareSync(password, user.password);
    
    if (isValid) {
      console.log('\n✅ Password correct! Login successful!');
    } else {
      console.log('\n❌ Password incorrect!');
      console.log('💡 Try regenerating password hash:');
      console.log('   node generate-admin-hash.js');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
