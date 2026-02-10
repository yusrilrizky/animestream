#!/bin/bash

# AnimeStream - Auto Fix Module Errors
# Script untuk fix "module not found" error

clear
echo "🔧 AnimeStream - Module Error Fix"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Node.js installed
echo "📦 Step 1: Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    echo "Installing Node.js..."
    pkg install nodejs -y
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Node.js"
        exit 1
    fi
    echo "✅ Node.js installed"
else
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
fi
echo ""

# Check if in correct directory
echo "📁 Step 2: Checking directory..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    echo ""
    echo "Please run this script from AnimeStream directory:"
    echo "  cd ~/storage/shared/AnimeStream"
    echo "  bash fix-modules.sh"
    echo ""
    exit 1
fi
echo "✅ In correct directory"
echo ""

# Backup database if exists
echo "💾 Step 3: Backing up database..."
if [ -f "animestream.db" ]; then
    cp animestream.db animestream.db.backup
    echo "✅ Database backed up"
else
    echo "ℹ️  No database to backup"
fi
echo ""

# Clean old installations
echo "🧹 Step 4: Cleaning old installations..."
if [ -d "node_modules" ]; then
    echo "Removing old node_modules..."
    rm -rf node_modules
fi
if [ -f "package-lock.json" ]; then
    echo "Removing package-lock.json..."
    rm -f package-lock.json
fi
echo "✅ Cleaned"
echo ""

# Install build tools
echo "🔨 Step 5: Installing build tools..."
echo "This is needed for better-sqlite3..."
pkg install python make clang binutils -y > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build tools installed"
else
    echo "⚠️  Build tools installation had issues (may still work)"
fi
echo ""

# Set environment for compilation
export CC=clang
export CXX=clang++

# Clear npm cache
echo "🗑️  Step 6: Clearing npm cache..."
npm cache clean --force > /dev/null 2>&1
echo "✅ Cache cleared"
echo ""

# Install dependencies
echo "📦 Step 7: Installing dependencies..."
echo "This may take 3-5 minutes, please wait..."
echo ""

npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Installation had errors, trying alternative method..."
    echo ""
    npm install --force
fi

echo ""

# Verify installation
echo "✅ Step 8: Verifying installation..."
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules folder not created!"
    echo ""
    echo "Installation failed. Please check:"
    echo "1. Internet connection"
    echo "2. Storage space"
    echo "3. Error messages above"
    echo ""
    exit 1
fi

# Count modules
MODULE_COUNT=$(ls node_modules 2>/dev/null | wc -l)
echo "✅ Found $MODULE_COUNT modules installed"
echo ""

# Test critical modules
echo "🧪 Step 9: Testing critical modules..."
ERRORS=0

if node -e "require('express')" 2>/dev/null; then
    echo "✅ express"
else
    echo "❌ express"
    ERRORS=$((ERRORS + 1))
fi

if node -e "require('ejs')" 2>/dev/null; then
    echo "✅ ejs"
else
    echo "❌ ejs"
    ERRORS=$((ERRORS + 1))
fi

if node -e "require('bcryptjs')" 2>/dev/null; then
    echo "✅ bcryptjs"
else
    echo "❌ bcryptjs"
    ERRORS=$((ERRORS + 1))
fi

if node -e "require('better-sqlite3')" 2>/dev/null; then
    echo "✅ better-sqlite3"
else
    echo "❌ better-sqlite3"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# Final result
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo "🎉 SUCCESS! All modules installed correctly!"
    echo ""
    echo "You can now run the server:"
    echo "  node server.js"
    echo ""
    echo "Or use the helper script:"
    echo "  bash start-android.sh"
    echo ""
else
    echo "⚠️  WARNING: $ERRORS module(s) failed to install"
    echo ""
    echo "Try manual installation:"
    echo "  npm install express ejs bcryptjs better-sqlite3"
    echo ""
    echo "Or check the detailed guide:"
    echo "  cat FIX_MODULE_ERROR.md"
    echo ""
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
