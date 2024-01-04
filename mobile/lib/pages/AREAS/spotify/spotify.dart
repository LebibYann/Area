import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/json.dart';
import 'package:mobile/pages/AREAS/actions.dart';
import 'package:mobile/pages/AREAS/triggers.dart';

const Color spotifyGreen = Color(0xFF1DB954);

class SpotifyAREA extends StatelessWidget {
  const SpotifyAREA({Key? key}) : super(key: key);

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
        JsonDataSingleton().getServiceActions('spotify');
    final List<Map<String, dynamic>> reactions =
        JsonDataSingleton().getServiceReactions('spotify');
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Spotify',
            style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSpotifyCard(),
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

  Widget _buildSpotifyCard() {
    return Card(
      color: spotifyGreen,
      elevation: 10.0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.asset('assets/AREA/spotify.png', height: 100.0),
            const SizedBox(height: 8.0),
            const Text(
                'Spotify is a digital music service that gives you access to millions of songs. Applets can help you save your discover weekly.',
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
            'https://accounts.spotify.com/fr/login?continue=https%3A%2F%2Fopen.spotify.com%2Fintl-fr',
            spotifyGreen),
        _buildUrlButton(
            'Visit', 'https://open.spotify.com/intl-fr', spotifyGreen),
      ],
    );
  }

  Widget _buildUrlButton(String text, String url, Color color) {
    return ElevatedButton(
      // onPressed: () {},
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
                      color: 0xFF1DB954,
                      service: 'Spotify',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {},
                      logoPath: 'assets/AREA/spotify.png',
                    )
                  : ActionsDetails(
                      color: 0xFF1DB954,
                      service: 'Spotify',
                      triggerName: item['name'],
                      description: item['description'],
                      onActionTap: () {
                      },
                      logoPath: 'assets/AREA/spotify.png',
                    ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: spotifyGreen,
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
