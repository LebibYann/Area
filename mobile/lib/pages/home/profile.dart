import 'package:flutter/material.dart';
import '../login/login.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          _buildProfileHeader(context),
          SizedBox(height: 24),
          _buildOptionsList(context),
        ],
      ),
    );
  }

  Widget _buildProfileHeader(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 32),
        CircleAvatar(
          radius: 50,
          backgroundColor: Colors.grey,
          child: Icon(
            Icons.person,
            size: 50,
            color: Colors.white,
          ),
        ),
        SizedBox(height: 5),
        ElevatedButton(
          onPressed: () {
            // Gestion du boutton pour modif le profil
          },
          child: Text(
            'MODIFY',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
            ),
          ),
          style: ElevatedButton.styleFrom(
            primary: Colors.white,
            onPrimary: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 10),
          ),
        ),
        SizedBox(height: 12),
        Text(
          'user@outlook.fr',
          style: TextStyle(fontSize: 26, color: Colors.black),
        ),
        SizedBox(height: 16),
      ],
    );
  }

  Widget _buildOptionsList(BuildContext context) {
    final List<String> options = [
      'Account',
      'Refer a friend',
      'My services',
      'Display',
      'Sync options',
      'Evaluate IFTTT',
      'Sign out',
    ];

    return ListView.separated(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: options.length,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          title: Text(
            options[index],
            style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.w900, color: Colors.black),
          ),
          onTap: () {
            if (options[index] == 'Sign out') {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
            }
          },
        );
      },
      separatorBuilder: (BuildContext context, int index) => Divider(),
    );
  }
}
