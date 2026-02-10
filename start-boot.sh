#!/data/data/com.termux/files/usr/bin/bash

# AnimeStream Auto-Start Script
# Copy file ini ke: ~/.termux/boot/

echo "========================================" >> /storage/emulated/0/AnimeStream/boot.log
echo "AnimeStream Boot Script" >> /storage/emulated/0/AnimeStream/boot.log
echo "Started at: $(date)" >> /storage/emulated/0/AnimeStream/boot.log
echo "========================================" >> /storage/emulated/0/AnimeStream/boot.log

# Wait for system to fully boot
sleep 30

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found!" >> /storage/emulated/0/AnimeStream/boot.log
    exit 1
fi

# Check if project folder exists
if [ ! -d "/storage/emulated/0/AnimeStream" ]; then
    echo "ERROR: Project folder not found!" >> /storage/emulated/0/AnimeStream/boot.log
    exit 1
fi

# Go to project folder
cd /storage/emulated/0/AnimeStream

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "ERROR: server.js not found!" >> /storage/emulated/0/AnimeStream/boot.log
    exit 1
fi

# Kill existing server if any
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Start server in background
nohup node server.js > /storage/emulated/0/AnimeStream/server.log 2>&1 &

# Get PID
SERVER_PID=$!

echo "Server started with PID: $SERVER_PID" >> /storage/emulated/0/AnimeStream/boot.log
echo "Access: http://localhost:3000" >> /storage/emulated/0/AnimeStream/boot.log
echo "========================================" >> /storage/emulated/0/AnimeStream/boot.log

exit 0
