import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/pages/AREAS/actions.dart';
import 'package:mobile/pages/AREAS/triggers.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/provider.dart';
import 'package:provider/provider.dart';
import 'dart:io';

import 'package:mobile/json.dart';

const Color gmailred = Color(0xFF7289DA);
const String service = "gmail";
const String Service = "Gmail";

class GmailAREA extends StatelessWidget {
  const GmailAREA({Key? key}) : super(key: key);

  Future<void> postAuth2(String authorizationCode, String url, String redirectUri, BuildContext context) async {
    final auth = Provider.of<AuthState>(context, listen: false);
    final token = auth.accessToken;

    final response = await http.post(
      Uri.parse(url),
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json'
      },
      body: json.encode({
        'code': authorizationCode,
        'redirectUri': redirectUri,
      }),
    );

    // print(authorizationCode);
    // print(token);

    print(response.statusCode);
    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Center(
              child: Text(
                "Connection with $Service success",
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white),
              ),
            ),
            backgroundColor: Colors.green,
            duration: Duration(seconds: 3),
          ),
        );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Center(
              child: Text(
                "Connection with $Service failled",
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white),
              ),
            ),
            backgroundColor: Colors.red,
            duration: Duration(seconds: 3),
          ),
        );
      print('Error during authentication with $Service: ${response.body}');
    }
  }

  void handleCallback(BuildContext context, String redirectUri) async {
    HttpServer.bind('127.0.0.1', 8082).then((server) {
      server.listen((HttpRequest request) async {
        String authorizationCode = request.uri.queryParameters['code'] ?? '';
        await server.close(force: true);
        await postAuth2(authorizationCode, "http://localhost:8080/oauth2/google", redirectUri, context);
      });
    });
  }

  void _launchGithubOAuth(BuildContext context) async {
    final String clientId = dotenv.env['VITE_GOOGLE_CLIENT_ID'] ?? 'fallbackClientId';
    String redirectUri = "http://localhost:8082/login/auth/google";
    final Uri oauthUrl = Uri.parse('https://accounts.google.com/o/oauth2/v2/auth?client_id=$clientId&redirect_uri=$redirectUri&access_type=offline&response_type=code&scope=openid%20profile%20email&include_granted_scopes=true');

    if (await canLaunch(oauthUrl.toString())) {
      await launch(oauthUrl.toString());
      handleCallback(context, redirectUri);
    } else {
      print("Could not launch the OAuth URL");
    }
  }

  void _launchURL(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> actions = JsonDataSingleton().getServiceActions(service);
    final List<Map<String, dynamic>> reactions = JsonDataSingleton().getServiceReactions(service);

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          Service,
          style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              color: gmailred,
              elevation: 10.0,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Container(
                      child: Image.asset(
                        'assets/AREA/$service.png',
                        height: 100.0,
                      ),
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Join the community, chat with friends, voice chat, and more with $Service integrations.',
                      style: TextStyle(
                        fontSize: 16.0,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        ElevatedButton(
                          onPressed: () => _launchGithubOAuth(context),
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: gmailred,
                          ),
                          child: const Text('Connect'),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            _launchURL('https://gmail.com/');
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: gmailred,
                          ),
                          child: const Text('Visit'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 32.0),
            const Text(
              'Triggers',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            ..._buildButtons(context, actions, true),
            const SizedBox(height: 16.0),
            const Text(
              'Actions',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16.0),
            ..._buildButtons(context, reactions, false),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildButtons(
      BuildContext context, List<Map<String, dynamic>> items, bool isTrigger) {
    return items.map((item) {
      return ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => isTrigger
                  ? TriggerDetails(
                      color: 0xFF7289DA,
                      service: Service,
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {},
                      logoPath: 'assets/AREA/$service.png',
                    )
                  : ActionsDetails(
                      color: 0xFF7289DA,
                      service: Service,
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {
                      },
                      logoPath: 'assets/AREA/$service.png',
                    ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: gmailred,
          onPrimary: Colors.white,
        ),
        child: Text(item['name']),
      );
    }).toList();
  }
}
