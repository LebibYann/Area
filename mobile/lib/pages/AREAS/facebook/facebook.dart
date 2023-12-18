import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

const Color facebookBlue = Color(0xFF4267B2);

class FacebookAREA extends StatelessWidget {
  const FacebookAREA({Key? key}) : super(key: key);

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
        title: const Text(
          'Facebook',
          style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              color: facebookBlue,
              elevation: 10.0,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Image.asset(
                      'assets/AREA/facebook.png',
                      height: 100.0,
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Manage your profile, posting, photos and more with Facebook Applets that work with the world\'s largest social networking site.',
                      style: TextStyle(
                        fontSize: 16.0,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 16.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        ElevatedButton(
                          onPressed: () {
                            _launchURL('https://www.facebook.com/login');
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: facebookBlue,
                          ),
                          child: const Text('Connect'),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            _launchURL('https://facebook.com');
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: facebookBlue,
                          ),
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
            ..._buildTriggerButtons(),
            const SizedBox(height: 15.0),
            ElevatedButton(
              onPressed: () {
                // todo
              },
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
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildTriggerButtons() {
    return [
      ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          primary: facebookBlue,
          onPrimary: Colors.white,
        ),
        child: const Text('Any new post by you'),
      ),
      const SizedBox(height: 15.0),
      ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          primary: facebookBlue,
          onPrimary: Colors.white,
        ),
        child: const Text('You are tagged in a photo'),
      ),
      const SizedBox(height: 15.0),
      ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          primary: facebookBlue,
          onPrimary: Colors.white,
        ),
        child: const Text(
          'New photo post by you',
        ),
      ),
    ];
  }
}
