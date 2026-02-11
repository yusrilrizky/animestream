@echo off
echo ========================================
echo   REBUILD APK - FILE UPLOAD FIX
echo ========================================
echo.

cd flutter_app

echo [1/4] Cleaning previous build...
call flutter clean
if errorlevel 1 (
    echo ERROR: Flutter clean failed!
    pause
    exit /b 1
)
echo.

echo [2/4] Getting dependencies...
call flutter pub get
if errorlevel 1 (
    echo ERROR: Flutter pub get failed!
    pause
    exit /b 1
)
echo.

echo [3/4] Building APK (Release)...
call flutter build apk --release
if errorlevel 1 (
    echo ERROR: Flutter build failed!
    pause
    exit /b 1
)
echo.

echo [4/4] Copying APK to output folder...
if not exist "output" mkdir output
copy /Y "build\app\outputs\flutter-apk\app-release.apk" "output\animestream-file-upload-fix.apk"
if errorlevel 1 (
    echo WARNING: Failed to copy APK to output folder
) else (
    echo SUCCESS: APK copied to flutter_app\output\animestream-file-upload-fix.apk
)
echo.

echo ========================================
echo   BUILD COMPLETE!
echo ========================================
echo.
echo APK Location:
echo   flutter_app\build\app\outputs\flutter-apk\app-release.apk
echo   flutter_app\output\animestream-file-upload-fix.apk
echo.
echo Next Steps:
echo   1. Transfer APK to Android device
echo   2. Install APK
echo   3. Grant storage permissions
echo   4. Test file upload from gallery
echo.
pause
