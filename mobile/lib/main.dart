import 'package:flutter/material.dart';
import 'package:mobile/pages/login/login.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/json.dart';
import 'package:mobile/provider.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await JsonDataSingleton().fetchData();
    print(JsonDataSingleton().jsonData);
  } catch (e) {
    runApp(const Error());
    return;
  }
  await dotenv.load();

  runApp(
    ChangeNotifierProvider(
      create: (context) => AuthState(),
      child: const MyApp(),
    ),
  );
}

class Error extends StatelessWidget {
  const Error({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Container(
            padding: const EdgeInsets.all(16.0),
            color: Colors.red,
            child: const Text(
              'Server Error',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: Consumer<AuthState>(
        builder: (context, authState, _) {
          return const LoginPage();
        },
      ),
    );
  }
}
