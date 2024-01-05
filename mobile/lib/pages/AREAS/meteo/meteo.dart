import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/json.dart';
import 'package:mobile/pages/AREAS/actions.dart';
import 'package:mobile/pages/AREAS/triggers.dart';

const Color theme_color = Color(0xFF8fe0ff);

class MeteoAREA extends StatelessWidget {
  const MeteoAREA({Key? key}) : super(key: key);

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
        JsonDataSingleton().getServiceActions('meteo');
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Meteo',
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
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCard() {
    return Card(
      color: theme_color,
      elevation: 10.0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.asset('assets/AREA/meteo.png', height: 100.0),
            const SizedBox(height: 8.0),
            const Text(
                'Your personal weather data dashboard.',
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
            'Visit', 'https://ambientweather.net/', theme_color),
        _buildUrlButton('Connect', 'https://ambientweather.com/customer/account/login/referer/aHR0cHM6Ly9hbWJpZW50d2VhdGhlci5jb20v/', theme_color)
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
                      color: 0xFF8fe0ff,
                      service: 'Meteo',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {},
                      logoPath: 'assets/AREA/meteo.png',
                    )
                  : ActionsDetails(
                      color: 0xFF8fe0ff,
                      service: 'Meteo',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {},
                      logoPath: 'assets/AREA/meteo.png',
                    ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: theme_color,
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
