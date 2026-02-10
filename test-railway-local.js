#!/usr/bin/env node

/**
 * Test Railway deployment locally
 * Simulates Railway environment
 */

const { spawn } = require('child_process');
const http = require('http');

console.log('🧪 Testing Railway deployment locally...\n');

// Set Railway-like environment
process.env.PORT = '3000';
process.env.HOST = '0.0.0.0';
process.env.NODE_ENV = 'production';
process.env.DATABASE_PATH = './animestream.db';

console.log('📋 Environment:');
console.log('   PORT:', process.env.PORT);
console.log('   HOST:', process.env.HOST);
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   DATABASE_PATH:', process.env.DATABASE_PATH);
console.log('');

// Start server
console.log('🚀 Starting server...\n');
const server = spawn('node', ['server.js'], {
  env: process.env,
  stdio: 'inherit'
});

// Wait for server to start
setTimeout(() => {
  console.log('\n🔍 Testing health check...\n');
  
  http.get('http://localhost:3000/health', (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Health check response:');
      console.log(data);
      console.log('');
      console.log('🎉 Server is running successfully!');
      console.log('');
      console.log('📍 Test URLs:');
      console.log('   Health: http://localhost:3000/health');
      console.log('   Login:  http://localhost:3000/login');
      console.log('   Home:   http://localhost:3000/');
      console.log('');
      console.log('Press Ctrl+C to stop server');
    });
  }).on('error', (err) => {
    console.error('❌ Health check failed:', err.message);
    console.log('');
    console.log('💡 Possible issues:');
    console.log('   - Server not started yet (wait longer)');
    console.log('   - Port already in use');
    console.log('   - Database error');
    console.log('');
    process.exit(1);
  });
}, 3000);

// Handle exit
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping server...');
  server.kill();
  process.exit(0);
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Server exited with code ${code}`);
    process.exit(code);
  }
});
