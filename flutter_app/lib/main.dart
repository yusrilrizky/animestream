import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  runApp(const AnimeStreamApp());
}

class AnimeStreamApp extends StatelessWidget {
  const AnimeStreamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AnimeStream',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.purple,
        scaffoldBackgroundColor: const Color(0xFF1a1a2e),
      ),
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkConnection();
  }

  Future<void> _checkConnection() async {
    await Future.delayed(const Duration(seconds: 2));
    
    final connectivityResult = await Connectivity().checkConnectivity();
    
    if (!mounted) return;
    
    if (connectivityResult.contains(ConnectivityResult.none)) {
      _showNoInternetDialog();
    } else {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const WebViewScreen()),
      );
    }
  }

  void _showNoInternetDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF2d2d44),
        title: const Text(
          '❌ Tidak Ada Internet',
          style: TextStyle(color: Colors.white),
        ),
        content: const Text(
          'Aplikasi memerlukan koneksi internet.',
          style: TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _checkConnection();
            },
            child: const Text('Coba Lagi'),
          ),
          TextButton(
            onPressed: () => SystemNavigator.pop(),
            child: const Text('Keluar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF8a2be2), Color(0xFFa855f7), Color(0xFFc084fc)],
          ),
        ),
        child: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('🎬', style: TextStyle(fontSize: 80)),
              SizedBox(height: 20),
              Text(
                'AnimeStream',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 50),
              CircularProgressIndicator(color: Colors.white),
            ],
          ),
        ),
      ),
    );
  }
}

class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  late final WebViewController controller;
  double progress = 0;
  
  final String websiteUrl = 'https://animestream-production-95b2.up.railway.app/login';
  bool _filePickerActive = false;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..enableZoom(true)
      ..addJavaScriptChannel(
        'FlutterFilePicker',
        onMessageReceived: (JavaScriptMessage message) async {
          if (_filePickerActive) return;
          _filePickerActive = true;
          
          try {
            // Handle file picker from JavaScript
            FilePickerResult? result = await FilePicker.platform.pickFiles(
              type: FileType.video,
              allowMultiple: false,
            );
            
            if (result != null && result.files.isNotEmpty) {
              PlatformFile file = result.files.first;
              // Send file info back to JavaScript
              String fileInfo = jsonEncode({
                'name': file.name,
                'size': file.size,
                'path': file.path,
              });
              await controller.runJavaScript('if(window.handleFileSelected) window.handleFileSelected($fileInfo);');
            }
          } finally {
            _filePickerActive = false;
          }
        },
      )
      ..addJavaScriptChannel(
        'FlutterFileUpload',
        onMessageReceived: (JavaScriptMessage message) async {
          try {
            // Parse upload data from JavaScript
            final data = jsonDecode(message.message);
            final filePath = data['filePath'] as String;
            final title = data['title'] as String;
            final episode = data['episode'] as String;
            final category = data['category'] as String;
            final genre = data['genre'] as String?;
            final description = data['description'] as String;
            
            // Upload file
            await _uploadFile(filePath, title, episode, category, genre ?? '', description);
          } catch (e) {
            debugPrint('Upload error: $e');
            await controller.runJavaScript('if(window.handleUploadError) window.handleUploadError("${e.toString()}");');
          }
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              this.progress = progress / 100;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              progress = 0;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              progress = 1;
            });
            // Inject JavaScript to intercept file input clicks
            _injectFilePickerScript();
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebView error: ${error.description}');
            if (error.errorType == WebResourceErrorType.hostLookup ||
                error.errorType == WebResourceErrorType.connect ||
                error.errorType == WebResourceErrorType.timeout) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Error: ${error.description}'),
                  action: SnackBarAction(
                    label: 'Retry',
                    onPressed: () => controller.reload(),
                  ),
                ),
              );
            }
          },
          onNavigationRequest: (NavigationRequest request) {
            // Redirect /upload to /upload-link in APK (file upload not working in WebView)
            if (request.url.contains('/upload-apk')) {
              controller.loadRequest(Uri.parse(request.url.replaceFirst('/upload-apk', '/upload')));
              return NavigationDecision.prevent;
            }
            
            // Allow file picker and external links
            if (request.url.startsWith('https://wa.me/') ||
                request.url.startsWith('whatsapp://')) {
              launchUrl(Uri.parse(request.url), mode: LaunchMode.externalApplication);
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(websiteUrl));
    
    // Enable file upload support for Android
    if (controller.platform is AndroidWebViewController) {
      (controller.platform as AndroidWebViewController).setMediaPlaybackRequiresUserGesture(false);
    }
  }
  
  void _injectFilePickerScript() {
    controller.runJavaScript('''
      (function() {
        // Intercept file input clicks
        document.addEventListener('click', function(e) {
          var target = e.target;
          
          // Check if clicked element is file input or triggers file input
          if (target.tagName === 'INPUT' && target.type === 'file') {
            e.preventDefault();
            e.stopPropagation();
            window.FlutterFilePicker.postMessage('pickFile');
            return false;
          }
          
          // Check if clicked button triggers file input
          if (target.tagName === 'BUTTON' || target.classList.contains('file-input-area')) {
            var fileInput = document.getElementById('videoFile');
            if (fileInput) {
              e.preventDefault();
              e.stopPropagation();
              window.FlutterFilePicker.postMessage('pickFile');
              return false;
            }
          }
        }, true);
        
        // Handle file selected from Flutter
        window.handleFileSelected = function(fileInfo) {
          var fileInput = document.getElementById('videoFile');
          if (fileInput) {
            // Update file name display
            var fileNameDisplay = document.getElementById('fileName');
            if (fileNameDisplay) {
              var sizeMB = (fileInfo.size / (1024 * 1024)).toFixed(2);
              fileNameDisplay.textContent = '📁 ' + fileInfo.name + ' (' + sizeMB + ' MB)';
            }
            
            // Store file path for upload
            window.selectedFilePath = fileInfo.path;
            window.selectedFileName = fileInfo.name;
            window.selectedFileSize = fileInfo.size;
          }
        };
      })();
    ''');
  }

  Future<void> _uploadFile(String filePath, String title, String episode, String category, String genre, String description) async {
    try {
      // Notify JavaScript upload started
      await controller.runJavaScript('if(window.handleUploadProgress) window.handleUploadProgress(0, "Preparing upload...");');
      
      final file = File(filePath);
      if (!await file.exists()) {
        throw Exception('File not found');
      }

      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$websiteUrl/upload'.replaceAll('/login', '/upload')),
      );

      // Add form fields
      request.fields['title'] = title;
      request.fields['episode'] = episode;
      request.fields['category'] = category;
      request.fields['genre'] = genre;
      request.fields['description'] = description;

      // Add file
      final fileStream = http.ByteStream(file.openRead());
      final fileLength = await file.length();
      final multipartFile = http.MultipartFile(
        'video',
        fileStream,
        fileLength,
        filename: file.path.split('/').last,
      );
      request.files.add(multipartFile);

      // Send request
      await controller.runJavaScript('if(window.handleUploadProgress) window.handleUploadProgress(10, "Uploading...");');
      
      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);

      if (response.statusCode == 200) {
        await controller.runJavaScript('if(window.handleUploadProgress) window.handleUploadProgress(100, "Upload complete!");');
        await controller.runJavaScript('if(window.handleUploadSuccess) window.handleUploadSuccess();');
      } else {
        throw Exception('Upload failed: ${response.statusCode}');
      }
    } catch (e) {
      debugPrint('Upload error: $e');
      await controller.runJavaScript('if(window.handleUploadError) window.handleUploadError("${e.toString()}");');
    }
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        
        if (await controller.canGoBack()) {
          controller.goBack();
        } else {
          if (context.mounted) {
            final shouldPop = await showDialog<bool>(
              context: context,
              builder: (context) => AlertDialog(
                backgroundColor: const Color(0xFF2d2d44),
                title: const Text(
                  'Keluar Aplikasi?',
                  style: TextStyle(color: Colors.white),
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: const Text('Batal'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text('Keluar'),
                  ),
                ],
              ),
            );
            
            if (shouldPop == true && context.mounted) {
              SystemNavigator.pop();
            }
          }
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: Column(
            children: [
              if (progress < 1)
                LinearProgressIndicator(
                  value: progress,
                  backgroundColor: Colors.grey[800],
                  valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFa855f7)),
                ),
              Expanded(
                child: WebViewWidget(controller: controller),
              ),
            ],
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
        floatingActionButton: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
              heroTag: 'refresh',
              mini: true,
              backgroundColor: const Color(0xFF8a2be2),
              onPressed: () => controller.reload(),
              child: const Icon(Icons.refresh, size: 20),
            ),
            const SizedBox(height: 10),
            FloatingActionButton(
              heroTag: 'home',
              mini: true,
              backgroundColor: const Color(0xFFa855f7),
              onPressed: () => controller.loadRequest(Uri.parse(websiteUrl)),
              child: const Icon(Icons.home, size: 20),
            ),
          ],
        ),
      ),
    );
  }
}
