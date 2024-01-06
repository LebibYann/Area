import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/pages/AREAS/actions.dart';
import 'package:mobile/json.dart';
import 'dart:core';

const Color gmailBlue = Color(0xFF3D6EC9);

class GmailAREA extends StatelessWidget {
  const GmailAREA({Key? key}) : super(key: key);

  void _launchURL(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> reactions =
        JsonDataSingleton().getServiceReactions('gmail');
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Gmail',
            style: TextStyle(
                fontSize: 28.0,
                fontWeight: FontWeight.bold,
                fontFamily: 'Italic')),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildCard(),
              const SizedBox(height: 32.0),
              _buildSectionTitle('Actions'),
              ..._buildButtons(context, reactions),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCard() {
    return Card(
      color: gmailBlue,
      elevation: 10.0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.asset('assets/AREA/gmail.png', height: 100.0),
            const SizedBox(height: 8.0),
            const Text('Connect Gmail to send emails to yourself and others.',
                style: TextStyle(fontSize: 16.0, color: Colors.white)),
            const SizedBox(height: 16.0),
            _buildConnectVisitButtons(),
          ],
        ),
      ),
    );
  }

  Row _buildConnectVisitButtons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildUrlButton(
            'Connect',
            'https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin&theme=glif',
            gmailBlue),
        _buildUrlButton(
            'Visit', 'https://www.google.com/intl/fr/gmail/about/', gmailBlue),
      ],
    );
  }

  Widget _buildUrlButton(String text, String url, Color color) {
    return ElevatedButton(
      onPressed: () => _launchURL(url),
      style: ElevatedButton.styleFrom(primary: Colors.white, onPrimary: color),
      child: Text(text),
    );
  }

  List<Widget> _buildButtons(
      BuildContext context, List<Map<String, dynamic>> actions) {
    return actions.map((action) {
      return ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ActionsDetails(
                color: 0xFF3D6EC9,
                service: 'Gmail',
                triggerName: action['name'],
                description: action['description'],
                onActionTap: () {
                  // Your action code here
                },
                logoPath: 'assets/AREA/gmail.png',
              ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: gmailBlue,
          onPrimary: Colors.white,
        ),
        child: Text(action['name']),
      );
    }).toList();
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(title,
          style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
    );
  }
}
