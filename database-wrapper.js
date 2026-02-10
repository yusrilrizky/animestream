// Wrapper untuk handle both SQLite (sync) dan PostgreSQL (async)
const usePostgres = process.env.DATABASE_URL && process.env.NODE_ENV === 'production';

const db = usePostgres ? require('./database-pg') : require('./database');

// Helper function untuk handle async/sync
const asyncHandler = (fn) => {
  return async (...args) => {
    const result = fn(...args);
    // Jika result adalah Promise, await
    if (result && typeof result.then === 'function') {
      return await result;
    }
    // Jika bukan Promise (SQLite sync), return langsung
    return result;
  };
};

// Wrap semua functions
const userDB = {
  getAll: asyncHandler(db.userDB.getAll),
  getById: asyncHandler(db.userDB.getById),
  getByUsernameOrEmail: asyncHandler(db.userDB.getByUsernameOrEmail),
  getByEmail: asyncHandler(db.userDB.getByEmail),
  getByGoogleId: asyncHandler(db.userDB.getByGoogleId),
  getByFacebookId: asyncHandler(db.userDB.getByFacebookId),
  create: asyncHandler(db.userDB.create),
  update: asyncHandler(db.userDB.update),
  delete: asyncHandler(db.userDB.delete)
};

const animeDB = {
  getAll: asyncHandler(db.animeDB.getAll),
  getById: asyncHandler(db.animeDB.getById),
  getByUploaderId: asyncHandler(db.animeDB.getByUploaderId),
  create: asyncHandler(db.animeDB.create),
  incrementViews: asyncHandler(db.animeDB.incrementViews),
  delete: asyncHandler(db.animeDB.delete),
  getTotalViewsByUser: asyncHandler(db.animeDB.getTotalViewsByUser)
};

const resetTokenDB = {
  create: asyncHandler(db.resetTokenDB.create),
  getByToken: asyncHandler(db.resetTokenDB.getByToken),
  getByCode: asyncHandler(db.resetTokenDB.getByCode),
  markAsUsed: asyncHandler(db.resetTokenDB.markAsUsed),
  deleteExpired: asyncHandler(db.resetTokenDB.deleteExpired)
};

module.exports = {
  initDatabase: db.initDatabase,
  userDB,
  animeDB,
  resetTokenDB
};
