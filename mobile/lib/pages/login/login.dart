import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
// import 'package:provider/provider.dart';
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


postAuth2(String token, String url) async {
  try{
    var responce = await http.post(Uri.parse(url),
    body: {
      "code": token,
    });
    print("responce.body= ${responce.body}");
    nav();
  }catch(e){
    print(e);
  }  
}

void handleCallback(String auth) {
  HttpServer.bind('127.0.0.1', 8081).then((server) {
    server.listen((HttpRequest request) async {
      String authorizationCode = request.uri.queryParameters['code'] ?? '';
      await server.close(force: true);
      if (auth == "Google") {
        await postAuth2(authorizationCode, "http://localhost:8080/oauth2/google");
      } else if (auth == "Discord") {
        await postAuth2(authorizationCode, "http://localhost:8080/oauth2/discord");
      }
      // print('Authorization Code: $authorizationCode');
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

oauth2(String auth) async {
  if (auth == "Google") {
    final clientId = dotenv.env['VITE_GOOGLE_CLIENT_ID'];
    final Uri GoogleUrl = Uri.parse('https://accounts.google.com/o/oauth2/v2/auth?client_id=$clientId&redirect_uri=http://localhost:8081/login/auth/google&access_type=offline&response_type=code&scope=openid%20profile%20email&include_granted_scopes=true');
    launchURL(GoogleUrl);
    handleCallback(auth);
  } else if ( auth == "Discord") {
    final Uri DiscordUrl = Uri.parse('https://discord.com/api/oauth2/authorize?client_id=1184305079029878785&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Fauth%2Fdiscord&scope=identify');
    launchURL(DiscordUrl);
    handleCallback(auth);
  } else {
    print("Error oauth not existing !");
  }
}

nav() {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const HomePage()),
  );
}

postAuth(String mail, String password, String url)async{
  try{
    var responce = await http.post(Uri.parse(url),
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
              onPressed: () => postAuth(_emailTEC.text, _passwordTEC.text, "http://localhost:8080/auth/login"),
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
              onPressed: () => postAuth(_emailTEC.text, _passwordTEC.text, "http://localhost:8080/auth/register"),
              style: TextButton.styleFrom(
                primary: Colors.black,
              ),
              child: const Text('Sign Up'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => oauth2("Google"),
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
              onPressed: () => oauth2("Discord"),
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