import 'package:flutter/material.dart';
import 'package:mobile/pages/home/home.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('IFTTT Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const TextField(
              decoration: InputDecoration(labelText: 'Email'),
            ),
            const TextField(
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                MaterialPageRoute(builder: (context) => const HomePage()),
                );
              },
              child: const Text('Login'),
            ),
            TextButton(
              onPressed: () {
                // Ajoutez ici la logique d'inscription
              },
              child: const Text('Sign Up'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Ajoutez ici la logique d'authentification avec Google
              },
              child: const Text('Login with Google'),
            ),
            ElevatedButton(
              onPressed: () {
                // Ajoutez ici la logique d'authentification avec Facebook
              },
              child: const Text('Login with Facebook'),
            ),
          ],
        ),
      ),
    );
  }
}