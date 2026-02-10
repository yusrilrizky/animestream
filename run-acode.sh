#!/system/bin/sh

# AnimeStream - Acode Quick Start Script
# Jalankan script ini dari terminal Acode

clear
echo "🎬 AnimeStream - Quick Start"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Node.js is available
if ! command -v node > /dev/null 2>&1; then
    echo "❌ Node.js not found!"
    echo ""
    echo "Please install Node.js in Termux first:"
    echo "  1. Open Termux"
    echo "  2. Run: pkg install nodejs"
    echo "  3. Then try again"
    echo ""
    exit 1
fi

# Check if in correct directory
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found!"
    echo "Please run this script from AnimeStream directory"
    echo ""
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env created from .env.example"
    else
        echo "PORT=3000" > .env
        echo "SESSION_SECRET=animestream-secret-key" >> .env
        echo "BASE_URL=http://localhost:3000" >> .env
        echo "✅ .env created with default values"
    fi
    echo ""
fi

# Create uploads directory
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p uploads
    chmod 777 uploads
    echo "✅ uploads directory created"
    echo ""
fi

# Get local IP (if available)
LOCAL_IP=""
if command -v ifconfig > /dev/null 2>&1; then
    LOCAL_IP=$(ifconfig 2>/dev/null | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
fi

echo "✅ All checks passed!"
echo ""
echo "🚀 Starting AnimeStream server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 Access URLs:"
echo "   Local:   http://localhost:3000"
if [ ! -z "$LOCAL_IP" ]; then
    echo "   Network: http://$LOCAL_IP:3000"
fi
echo ""
echo "👤 Default Login:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "💡 Tips:"
echo "   - Press Ctrl+C to stop server"
echo "   - Edit files in Acode"
echo "   - Restart server after changes"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server
node server.js
