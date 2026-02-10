@echo off
echo.
echo ========================================
echo   AnimeStream Server
echo ========================================
echo.

REM Stop existing server on port 3000
echo [1/3] Checking for existing server...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 2^>nul') do (
    echo       Stopping old server PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

REM Start server
echo [2/3] Starting server...
echo.
echo       URL: http://localhost:3000
echo       Login: admin / admin123
echo.
echo [3/3] Server running... Press Ctrl+C to stop
echo.
node server.js

REM If server stops, show message
echo.
echo ========================================
echo   Server stopped
echo ========================================
echo.
pause
