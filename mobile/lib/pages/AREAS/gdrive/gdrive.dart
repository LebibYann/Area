import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

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
              ..._buildButtons([
                'New file in your folder',
                'New photo in your folder',
                'New video in your folder',
              ], gdriveBlue),
              _buildSuggestionButton(),
              const SizedBox(height: 32.0),
              _buildSectionTitle('Actions'),
              ..._buildButtons([
                'Upload file from URL',
              ], gdriveBlue),
              _buildSuggestionButton(),
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

  List<Widget> _buildButtons(List<String> texts, Color color) {
    return texts
        .map((text) => Padding(
              padding: const EdgeInsets.only(bottom: 15.0),
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                    primary: color, onPrimary: Colors.white),
                child: Text(text),
              ),
            ))
        .toList();
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(title,
          style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
    );
  }
}

Widget _buildSuggestionButton() {
  return ElevatedButton(
    onPressed: () {},
    style: ElevatedButton.styleFrom(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5),
          side: BorderSide(
            color: Colors.black,
            width: 2.0,
          )),
      primary: Colors.white,
      onPrimary: Colors.black,
    ),
    child: const Text('Suggest a new trigger',
        style: TextStyle(fontWeight: FontWeight.bold)),
  );
}
