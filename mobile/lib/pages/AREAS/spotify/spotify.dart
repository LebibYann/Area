import 'package:flutter/material.dart';
// import 'package:url_launcher/url_launcher.dart';

const Color spotifyGreen = Color(0xFF1DB954);

class SpotifyAREA extends StatelessWidget {
  const SpotifyAREA({Key? key}) : super(key: key);

  // void _launchURL(String url) async {
  //   if (await canLaunch(url)) {
  //     await launch(url);
  //   } else {
  //     throw 'Could not launch $url';
  //   }
  // }

  @override
  Widget build(BuildContext context) {
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
              ..._buildButtons([
                'New followed show',
                'New saved album',
                'New recently played track'
              ], spotifyGreen),
              _buildSuggestionButton(),
              const SizedBox(height: 32.0),
              _buildSectionTitle('Actions'),
              ..._buildButtons([
                'Skip track',
                'Pause playback',
                'Follow a playlist',
              ], spotifyGreen),
              _buildSuggestionButton(),
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
      onPressed: () {},
      // onPressed: () => _launchURL(url),
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
