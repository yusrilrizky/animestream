#!/bin/bash

# Termux Setup Script untuk AnimeStream
# Jalankan script ini pertama kali di Termux

echo "🎬 AnimeStream - Termux Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if running in Termux
if [ ! -d "$PREFIX" ]; then
    echo "❌ This script must be run in Termux!"
    exit 1
fi

echo "📦 Step 1: Updating packages..."
pkg update -y && pkg upgrade -y

echo ""
echo "📦 Step 2: Installing Node.js..."
pkg install -y nodejs

echo ""
echo "📦 Step 3: Installing Git..."
pkg install -y git

echo ""
echo "📦 Step 4: Installing other tools..."
pkg install -y wget curl nano

echo ""
echo "📁 Step 5: Setting up storage access..."
termux-setup-storage

echo ""
echo "✅ Termux setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Copy your AnimeStream project to:"
echo "   /storage/emulated/0/AnimeStream"
echo ""
echo "2. Navigate to project:"
echo "   cd ~/storage/shared/AnimeStream"
echo ""
echo "3. Install dependencies:"
echo "   npm install"
echo ""
echo "4. Start server:"
echo "   npm run android"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
