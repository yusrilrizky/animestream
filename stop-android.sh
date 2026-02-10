#!/bin/bash

# AnimeStream - Android Stop Script
# Untuk menghentikan server di Termux

echo "🛑 Stopping AnimeStream server..."

# Find and kill Node.js processes
NODE_PIDS=$(pgrep -f "node server.js")

if [ -z "$NODE_PIDS" ]; then
    echo "ℹ️  No running server found"
    exit 0
fi

# Kill the processes
echo "$NODE_PIDS" | while read pid; do
    kill -9 $pid 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Stopped process $pid"
    fi
done

echo ""
echo "✅ Server stopped successfully!"
