import 'package:flutter/material.dart';
import 'package:mobile/pages/login/login.dart';
import 'package:mobile/json.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await JsonDataSingleton().fetchData();

  runApp(const MyApp());
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
      home: const LoginPage(),
    );
  }
}
