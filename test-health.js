#!/usr/bin/env node

/**
 * Quick health check test
 * Usage: node test-health.js [url]
 */

const http = require('http');
const https = require('https');

const url = process.argv[2] || 'http://localhost:3000/health';

console.log('🔍 Testing health check...');
console.log('URL:', url);
console.log('');

const client = url.startsWith('https') ? https : http;

const startTime = Date.now();

client.get(url, (res) => {
  const duration = Date.now() - startTime;
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response time:', duration + 'ms');
    console.log('');
    
    if (res.statusCode === 200) {
      console.log('✅ Health check PASSED!');
      console.log('');
      console.log('Response:');
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));
      } catch (e) {
        console.log(data);
      }
    } else {
      console.log('❌ Health check FAILED!');
      console.log('Expected: 200');
      console.log('Got:', res.statusCode);
    }
  });
}).on('error', (err) => {
  console.log('❌ Connection failed!');
  console.log('');
  console.log('Error:', err.message);
  console.log('');
  console.log('Possible causes:');
  console.log('  - Server not running');
  console.log('  - Wrong URL');
  console.log('  - Network issue');
  console.log('');
  console.log('Try:');
  console.log('  - Start server: npm start');
  console.log('  - Check URL: ' + url);
  process.exit(1);
});
