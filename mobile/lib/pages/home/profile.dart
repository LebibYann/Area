import 'package:flutter/material.dart';
import '../login/login.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:provider/provider.dart';
import 'package:mobile/provider.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  XFile? _image;

  Future<void> _pickImage() async {
    final ImagePicker _picker = ImagePicker();
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);

    if (image != null) {
      // Mettez à jour AuthState avec le nouveau chemin d'image
      Provider.of<AuthState>(context, listen: false).profileImagePath =
          image.path;
    }
  }

  Widget _buildProfileHeader(BuildContext context) {
    final authState = Provider.of<AuthState>(context);
    FileImage? profileImage;
    if (authState.profileImagePath != null) {
      profileImage = FileImage(File(authState.profileImagePath!));
    }
    return Column(
      children: [
        const SizedBox(height: 32),
        CircleAvatar(
          radius: 50,
          backgroundColor: Colors.grey,
          backgroundImage: profileImage,
          child: profileImage == null
              ? const Icon(Icons.person, size: 50, color: Colors.white)
              : null,
        ),
        const SizedBox(height: 5),
        ElevatedButton(
          onPressed: _pickImage,
          child: Text(
            'MODIFY',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
          ),
          style: ElevatedButton.styleFrom(
            primary: Colors.white,
            onPrimary: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          authState.email,
          style: const TextStyle(fontSize: 26, color: Colors.black),
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          _buildProfileHeader(context),
          const SizedBox(height: 24),
          _buildOptionsList(context),
        ],
      ),
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
      physics: const NeverScrollableScrollPhysics(),
      itemCount: options.length,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(
          title: Text(
            options[index],
            style: const TextStyle(
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
