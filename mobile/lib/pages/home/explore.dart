import 'package:flutter/material.dart';
import 'package:mobile/pages/AREAS/instagram.dart';

class ExplorePage extends StatelessWidget {
  ExplorePage({Key? key}) : super(key: key);
  final List<String> areaNames = ['instagram', 'facebook', 'discord', 'spotify', 'gdrive', 'gmail'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AREAS'),
      ),
      body: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 8.0,
          mainAxisSpacing: 8.0,
        ),
        itemCount: areaNames.length,
        itemBuilder: (context, index) {
          return InkWell(
            onTap: () {
              if (areaNames[index] == 'instagram') {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const InstagramAREA()),
                );
              }
            },
            child: Card(
              child: Image.asset('assets/AREA/${areaNames[index]}.png'),
            ),
          );
        },
      ),
    );
  }
}
