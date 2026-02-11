@echo off
echo ========================================
echo   AnimeStream APK Builder
echo ========================================
echo.

REM Check if Flutter is installed
where flutter >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Flutter tidak ditemukan!
    echo Silakan install Flutter terlebih dahulu: https://flutter.dev
    pause
    exit /b 1
)

echo [1/5] Checking Flutter...
flutter --version
echo.

echo [2/5] Getting dependencies...
flutter pub get
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal get dependencies!
    pause
    exit /b 1
)
echo.

echo [3/5] Cleaning previous build...
flutter clean
echo.

echo [4/5] Building APK (Release)...
echo Ini akan memakan waktu beberapa menit...
flutter build apk --release
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build APK gagal!
    pause
    exit /b 1
)
echo.

echo [5/5] Copying APK to output folder...
if not exist "output" mkdir output
copy "build\app\outputs\flutter-apk\app-release.apk" "output\AnimeStream.apk"
echo.

echo ========================================
echo   BUILD SUCCESS!
echo ========================================
echo.
echo APK Location:
echo   %CD%\output\AnimeStream.apk
echo.
echo APK Size:
dir "output\AnimeStream.apk" | find "AnimeStream.apk"
echo.
echo Sekarang copy APK ke HP dan install!
echo.
pause
