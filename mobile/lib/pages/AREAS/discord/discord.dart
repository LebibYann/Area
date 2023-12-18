import 'package:flutter/material.dart';
// import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/pages/AREAS/triggers.dart';
import 'package:mobile/pages/AREAS/actions.dart';

const Color discordBlue = Color(0xFF7289DA);

class DiscordAREA extends StatelessWidget {
  const DiscordAREA({Key? key}) : super(key: key);

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
        title: const Text(
          'Discord',
          style: TextStyle(fontSize: 28.0, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              color: discordBlue,
              elevation: 10.0,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Container(
                      child: Image.asset(
                        'assets/AREA/discord.png',
                        height: 100.0,
                      ),
                    ),
                    const SizedBox(height: 8.0),
                    const Text(
                      'Join the community, chat with friends, voice chat, and more with Discord integrations.',
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
                            // _launchURL('https://discord.com/login');
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: discordBlue,
                          ),
                          child: const Text('Connect'),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            // _launchURL('https://discord.com/');
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.white,
                            onPrimary: discordBlue,
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
            ..._buildTriggerButtons(context),
            const SizedBox(height: 16.0),
            const Text(
              'Actions',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16.0),
            ..._buildActionsButtons(context),
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
                      color: 0xFF7289DA,
                      service: 'Discord',
                      triggerName: 'New pinned message in a channel',
                      description:
                          'This Trigger fires when a new message is pinned in a channel you select',
                      actionText: 'Add this trigger',
                      onActionTap: () {
                        // Your action code here
                      },
                      logoPath: 'assets/AREA/discord.png',
                    )),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: discordBlue,
          onPrimary: Colors.white,
        ),
        child: const Text('New pinned message in a channel'),
      ),
      const SizedBox(height: 15.0),
      ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => TriggerDetails(
                      color: 0xFF7289DA,
                      service: 'Discord',
                      triggerName: 'New message in a channel',
                      description:
                          'This Trigger fires when a new message is posted in a channel you select',
                      actionText: 'Add this trigger',
                      onActionTap: () {
                        // Your action code here
                      },
                      logoPath: 'assets/AREA/discord.png',
                    )),
          );
        },
        style: ElevatedButton.styleFrom(
          primary: discordBlue,
          onPrimary: Colors.white,
        ),
        child: const Text('New message in a channel'),
      ),
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
    ];
  }
}

List<Widget> _buildActionsButtons(BuildContext context) {
  return [
    ElevatedButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => ActionsDetails(
                    color: 0xFF7289DA,
                    service: 'Discord',
                    triggerName: 'Post a message to a channel',
                    description:
                        'This action will send a message from the IFTTT Bot to the channel you specify',
                    actionText: 'Add this action',
                    onActionTap: () {
                      // Your action code here
                    },
                    logoPath: 'assets/AREA/discord.png',
                  )),
        );
      },
      style: ElevatedButton.styleFrom(
        primary: discordBlue,
        onPrimary: Colors.white,
      ),
      child: const Text('Post a message to a channel'),
    ),
    const SizedBox(height: 15.0),
    ElevatedButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => ActionsDetails(
                    color: 0xFF7289DA,
                    service: 'Discord',
                    triggerName: 'Post a rich message to a channel',
                    description:
                        'This action will send a rich message from the IFTTT Bot to the channel you specify',
                    actionText: 'Add this action',
                    onActionTap: () {
                      // Your action code here
                    },
                    logoPath: 'assets/AREA/discord.png',
                  )),
        );
      },
      style: ElevatedButton.styleFrom(
        primary: discordBlue,
        onPrimary: Colors.white,
      ),
      child: const Text('Post a rich message to a channel'),
    ),
    const SizedBox(height: 15.0),
    ElevatedButton(
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
      child: const Text('Suggest a new action',
          style: TextStyle(fontWeight: FontWeight.bold)),
    ),
  ];
}
