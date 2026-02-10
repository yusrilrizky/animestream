#!/bin/bash

echo "🚀 Railway Deployment Helper"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Railway deployment"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Next steps:"
echo "1. Create a GitHub repository"
echo "2. Add remote: git remote add origin https://github.com/USERNAME/REPO.git"
echo "3. Push code: git push -u origin main (or master)"
echo "4. Go to Railway.app and sign in"
echo "5. Click 'New Project' → 'Deploy from GitHub repo'"
echo "6. Select your repository"
echo "7. Railway will auto-detect and deploy!"
echo ""
echo "⚙️ Environment Variables (optional):"
echo "   - SESSION_SECRET (auto-generated if not set)"
echo "   - DATABASE_PATH (default: ./animestream.db)"
echo "   - NODE_ENV=production"
echo ""
echo "🔍 After deployment, check:"
echo "   - Deployment logs in Railway dashboard"
echo "   - Health check: https://your-app.railway.app/health"
echo "   - Login page: https://your-app.railway.app/login"
echo ""
