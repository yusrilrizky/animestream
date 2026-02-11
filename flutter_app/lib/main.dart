import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:url_launcher/url_launcher.dart';

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

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..enableZoom(true)
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
          },
          onWebResourceError: (WebResourceError error) {
            print('WebView error: ${error.description}');
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
            const SizedBox(height: 80), // Space for WhatsApp button
          ],
        ),
      ),
    );
  }
}
