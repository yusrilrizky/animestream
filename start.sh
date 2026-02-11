#!/bin/sh

echo "🚀 Starting AnimeStream..."
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "Working directory: $(pwd)"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found!"
  exit 1
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
  echo "❌ server.js not found!"
  exit 1
fi

# Create uploads directory if not exists
mkdir -p uploads
chmod 777 uploads

# Start server with error logging
echo "✅ Starting server..."
exec node server.js 2>&1
