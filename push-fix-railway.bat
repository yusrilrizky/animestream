@echo off
echo ========================================
echo PUSH FIX RAILWAY NPM INSTALL ERROR
echo ========================================
echo.

echo [1/4] Adding files to git...
git add .

echo.
echo [2/4] Committing changes...
git commit -m "Fix Railway npm install error - Update Dockerfile and package.json"

echo.
echo [3/4] Pushing to GitHub...
git push origin main

echo.
echo [4/4] Done!
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo 1. Buka Railway dashboard: https://railway.app
echo 2. Tab "Deployments"
echo 3. Tunggu 3-5 menit (status: BUILDING)
echo 4. Check status: SUCCESS atau FAILED
echo 5. Jika SUCCESS: Test Railway URL
echo.
echo Baca: RAILWAY_NPM_INSTALL_FIX.txt untuk detail
echo ========================================
pause
