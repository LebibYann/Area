import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:io';

import 'package:mobile/pages/home/home.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPage createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {

final TextEditingController _emailTEC = TextEditingController();
final TextEditingController _passwordTEC = TextEditingController();
final Uri url = Uri.parse('https://discord.com/api/oauth2/authorize?client_id=1183869804822671380&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8083%2Fdiscord%2Fcallback&scope=identify');

void handleCallback() {
  HttpServer.bind('127.0.0.1', 8083).then((server) {
    server.listen((HttpRequest request) async {
      String authorizationCode = request.uri.queryParameters['code'] ?? '';
      await server.close();
      print('Authorization Code: $authorizationCode');
    });
  });
}

launchURL(Uri url) async {
  if (await canLaunchUrl(url)) {
    await launchUrl(url);
  } else {
    print ("Could not launch $url");
  }
}

discordAuth() async {
  launchURL(url);
  handleCallback();
}

nav() {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const HomePage()),
  );
}

postAuth(String mail, String password)async{
  try{
    var responce = await http.post(Uri.parse("http://localhost:8080/auth/login"),
    body: {
      "email": mail,
      "password": password
    });
    print(responce.body);
    nav();
  }catch(e){
    print(e);
  }  
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'AREA',
          style: TextStyle(fontSize: 100.0, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        toolbarHeight: 200.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: TextFormField(
                controller: _emailTEC,
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: TextFormField(
                controller: _passwordTEC,
                decoration: InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
                obscureText: true,
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => postAuth(_emailTEC.text, _passwordTEC.text),
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
              ),
              child: const Text(
                'Login',
                style: TextStyle(fontSize: 40.0),
              ),
            ),
            TextButton(
              onPressed: () => postAuth(_emailTEC.text, _passwordTEC.text), //ici mettre la fonction signup
              style: TextButton.styleFrom(
                primary: Colors.black,
              ),
              child: const Text('Sign Up'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => nav(),
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/logo/google_logo.png',
                    height: 20.0,
                  ),
                  const SizedBox(width: 8.0),
                  const Text(
                    'Login with Google',
                    style: TextStyle(fontSize: 20.0),
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () => discordAuth(),
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.discord,
                    color: Colors.white,
                  ),
                  SizedBox(width: 8.0),
                  Text(
                    'Login with Discord',
                    style: TextStyle(fontSize: 20.0),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}