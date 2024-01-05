import 'package:flutter/material.dart';
import 'package:mobile/pages/AREAS/instagram/instagram.dart';
import 'package:mobile/pages/AREAS/facebook/facebook.dart';
import 'package:mobile/pages/AREAS/discord/discord.dart';
import 'package:mobile/pages/AREAS/spotify/spotify.dart';
import 'package:mobile/pages/AREAS/gdrive/gdrive.dart';
import 'package:mobile/pages/AREAS/gmail/gmail.dart';
import 'package:mobile/pages/AREAS/twitter/twitter.dart';
import 'package:mobile/pages/AREAS/github/github.dart';
import 'package:mobile/pages/AREAS/weather/meteo.dart';
import 'package:mobile/pages/AREAS/timer/timer.dart';
import 'package:mobile/json.dart';

class ExplorePage extends StatelessWidget {
  ExplorePage({Key? key}) : super(key: key);
  final List<String> areaNames = JsonDataSingleton().getAllServices();
  final Map<String, Widget> servicePages = {
    'instagram': const InstagramAREA(),
    'facebook': const FacebookAREA(),
    'discord': const DiscordAREA(),
    'spotify': const SpotifyAREA(),
    'gdrive': const GdriveAREA(),
    'gmail': const GmailAREA(),
    'twitter': const TwitterAREA(),
    'github': const GithubAREA(),
    'meteo': const MeteoAREA(),
  };


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AREAS',
          style: TextStyle(fontWeight: FontWeight.bold),),
        centerTitle: true,
      ),

      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 10.0,
          mainAxisSpacing: 10.0,
        ),
        itemCount: areaNames.length,
        itemBuilder: (context, index) {
          final page = servicePages[areaNames[index]];
          return Column(

            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(
                areaNames[index],
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              Expanded(
                child: InkWell(
                  onTap: () {
                    if (page != null) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => page),
                      );
                    }
                  },
                  child: Card(
                    elevation: 5,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Image.asset('assets/AREA/${areaNames[index].toLowerCase()}.png'),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
