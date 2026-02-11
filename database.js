// Auto-detect database based on environment
const isRailway = process.env.RAILWAY_ENVIRONMENT === 'production' || 
                  (process.env.NODE_ENV === 'production' && !process.env.DB_HOST);

if (isRailway) {
  console.log('🚂 Railway environment detected - using SQLite');
  module.exports = require('./database-sqlite.js.backup');
} else {
  console.log('💻 Local environment detected - using MySQL');
  module.exports = require('./database-mysql.js');
}
