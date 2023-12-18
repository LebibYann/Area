import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/pages/AREAS/triggers.dart';

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
            ..._buildTriggerButtons(context),
          ],
        ),
      ),
    );
  }


  List<Widget> _buildTriggerButtons(BuildContext context) {
    return [
      ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => TriggerDetails(
                      color: 0xFFE1306C,
                      service: 'Instagram',
                      triggerName: 'Any new photo by you',
                      description: 'This Trigger fires every time you share any new photo on Instagram',
                      actionText: 'Add this trigger',
                      onActionTap: () {
                        // Your action code here
                      },
                      logoPath: 'assets/AREA/instagram.png',
                    )),
          );
        },
        child: const Text('Any new photo by you'),
      ),
      const SizedBox(height: 15.0),
      ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => TriggerDetails(
                      color: 0xFFE1306C,
                      service: 'Instagram',
                      triggerName: 'New photo by you with specific hashtag',
                      description: 'This Trigger fires every time you share a photo on Instagram with a hashtag you specify',
                      actionText: 'Add this trigger',
                      onActionTap: () {
                        // Your action code here
                      },
                      logoPath: 'assets/AREA/instagram.png',
                    )
                  ),
          );
        },
        child: const Text('New photo by you with specific hashtag'),
      ),
      const SizedBox(height: 15.0),
      ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => TriggerDetails(
                      color: 0xFFE1306C,
                      service: 'Instagram',
                      triggerName: 'Any video by you',
                      description: 'This Trigger fires every time you share any new video on Instagram',
                      actionText: 'Add this trigger',
                      onActionTap: () {
                        // Your action code here
                      },
                      logoPath: 'assets/AREA/instagram.png',
                    )),
          );
        },
        child: const Text('Any new video by you'),
      ),
    ];
  }
}
