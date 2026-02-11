#!/bin/bash

echo "========================================"
echo "  AnimeStream APK Builder"
echo "========================================"
echo ""

# Check if Flutter is installed
if ! command -v flutter &> /dev/null; then
    echo "[ERROR] Flutter tidak ditemukan!"
    echo "Silakan install Flutter terlebih dahulu: https://flutter.dev"
    exit 1
fi

echo "[1/5] Checking Flutter..."
flutter --version
echo ""

echo "[2/5] Getting dependencies..."
flutter pub get
if [ $? -ne 0 ]; then
    echo "[ERROR] Gagal get dependencies!"
    exit 1
fi
echo ""

echo "[3/5] Cleaning previous build..."
flutter clean
echo ""

echo "[4/5] Building APK (Release)..."
echo "Ini akan memakan waktu beberapa menit..."
flutter build apk --release
if [ $? -ne 0 ]; then
    echo "[ERROR] Build APK gagal!"
    exit 1
fi
echo ""

echo "[5/5] Copying APK to output folder..."
mkdir -p output
cp build/app/outputs/flutter-apk/app-release.apk output/AnimeStream.apk
echo ""

echo "========================================"
echo "  BUILD SUCCESS!"
echo "========================================"
echo ""
echo "APK Location:"
echo "  $(pwd)/output/AnimeStream.apk"
echo ""
echo "APK Size:"
ls -lh output/AnimeStream.apk | awk '{print $5}'
echo ""
echo "Sekarang copy APK ke HP dan install!"
echo ""
