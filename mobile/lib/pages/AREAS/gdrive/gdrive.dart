import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/json.dart';
import 'package:mobile/pages/AREAS/actions.dart';
import 'package:mobile/pages/AREAS/triggers.dart';
import 'dart:core';

const Color gdriveBlue = Color(0xFF3D6EC9);

class GdriveAREA extends StatelessWidget {
  const GdriveAREA({Key? key}) : super(key: key);

  void _launchURL(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> actions =
        JsonDataSingleton().getServiceActions('gdrive');
    final List<Map<String, dynamic>> reactions =
        JsonDataSingleton().getServiceReactions('gdrive');

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Google Drive',
            style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildCard(),
              const SizedBox(height: 32.0),
              _buildSectionTitle('Triggers'),
              ..._buildButtons(context, actions, true),
              const SizedBox(height: 16.0),
              _buildSectionTitle('Actions'),
              ..._buildButtons(context, reactions, false),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCard() {
    return Card(
      color: gdriveBlue,
      elevation: 10.0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.asset('assets/AREA/gdrive.png', height: 100.0),
            const SizedBox(height: 8.0),
            const Text(
                'Google Drive lets you store and access your files anywhere - on the web, on your hard drive, or on the go. Applets let you send the most important information into your Google Drive, automatically.',
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
            'https://accounts.google.com/ServiceLogin?service=wise&passive=true&continue=http%3A%2F%2Fdrive.google.com%2F%3Futm_source%3Den&utm_medium=button&utm_campaign=web&utm_content=gotodrive&usp=gtd&ltmpl=drive&ec=asw-drive-globalnav-signin',
            gdriveBlue),
        _buildUrlButton(
            'Visit', 'https://www.google.com/intl/fr/drive/', gdriveBlue),
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
      BuildContext context, List<Map<String, dynamic>> items, bool isTrigger) {
    return items.map((item) {
      return ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => isTrigger
                  ? TriggerDetails(
                      color: 0xFF3D6EC9,
                      service: 'Google Drive',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {},
                      logoPath: 'assets/AREA/gdrive.png',
                    )
                  : ActionsDetails(
                      color: 0xFF3D6EC9,
                      service: 'Google Drive',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {
                      },
                      logoPath: 'assets/AREA/gdrive.png',
                    ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: gdriveBlue,
          onPrimary: Colors.white,
        ),
        child: Text(item['name']),
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
