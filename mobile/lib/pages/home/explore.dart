import 'package:flutter/material.dart';
import 'package:mobile/pages/AREAS/instagram.dart';
import 'package:mobile/pages/AREAS/facebook.dart';
import 'package:mobile/pages/AREAS/discord.dart';
import 'package:mobile/pages/AREAS/spotify.dart';
import 'package:mobile/pages/AREAS/gdrive.dart';
import 'package:mobile/pages/AREAS/gmail.dart';

class ExplorePage extends StatelessWidget {
  ExplorePage({Key? key}) : super(key: key);
  final List<String> areaNames = [
    'instagram',
    'facebook',
    'discord',
    'spotify',
    'gdrive',
    'gmail'
  ];

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
                    if (areaNames[index] == 'instagram') {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const InstagramAREA()),
                );
              } else if (areaNames[index] == 'facebook') {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const FacebookAREA()),
                );
              } else if (areaNames[index] == 'discord') {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const DiscordAREA()),
                );
              } else if (areaNames[index] == 'spotify') {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const SpotifyAREA()),
                );
              } else if (areaNames[index] == 'gdrive') {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const GdriveAREA()),
                );
              } else {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const GmailAREA()),
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
