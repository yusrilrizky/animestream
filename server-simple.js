// Simple server untuk test Railway
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting simple server...');
console.log('PORT:', PORT);

// Health check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
