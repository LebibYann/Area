import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/pages/AREAS/triggers.dart';
import 'package:mobile/json.dart';

class InstagramAREA extends StatelessWidget {
  const InstagramAREA({Key? key}) : super(key: key);

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
        JsonDataSingleton().getServiceActions('instagram');
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Instagram',
            style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              elevation: 4.0,
              color: Color(0xFFF3CCFF),
              child: Padding(

                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Image.asset(
                      'assets/AREA/instagram.png',
                      height: 100.0,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Instagram is a beautiful, and fun way to share your life with friends through pictures. Turn on Applets to sync and save all ...',
                      style: TextStyle(fontSize: 16.0),
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        ElevatedButton(
                          onPressed: () {
                            _launchURL('https://instagram.com');
                          },
                          child: const Text('Connect'),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            _launchURL('https://instagram.com');
                          },
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
            ..._buildButtons(context, actions),
          ],
        ),
      ),
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
              builder: (context) => TriggerDetails(
                color: 0xFFF3CCFF,
                service: 'Instagram',
                triggerName: action['name'],
                description: action['description'],
                onActionTap: () {
                  // Your action code here
                },
                logoPath: 'assets/AREA/instagram.png',
              ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          onPrimary: Colors.black,
        ),
        child: Text(action['name']),
      );
    }).toList();
  }
}
