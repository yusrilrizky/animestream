@echo off
echo Stopping AnimeStream Server...
echo.

REM Find process using port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ✅ Server stopped!
echo.
pause
