import 'package:flutter/material.dart';

class InstagramAREA extends StatelessWidget {
  const InstagramAREA({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
      ),
      body: Center(
        // padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              'assets/AREA/instagram.png',
              height: 100.0,
            ),
            const Text(
              'Instagram',
              style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'Description de votre page',
              style: TextStyle(fontSize: 16.0),
            ),
            const SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Action du bouton "Visit" (par exemple, ouvrir une page internet)
                  },
                  child: const Text('Visit'),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Action du bouton "Login" (par exemple, ouvrir une page de connexion)
                  },
                  child: const Text('Login'),
                ),
              ],
            ),
            const SizedBox(height: 32.0),
            const Text(
              'Actions',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            ElevatedButton(
              onPressed: () {
                // Action du bouton sous "Actions"
              },
              child: const Text('Action Button'),
            ),
            const SizedBox(height: 16.0),
            const Text(
              'Réactions',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            ElevatedButton(
              onPressed: () {
                // Action du bouton sous "Réactions"
              },
              child: const Text('Réaction Button'),
            ),
          ],
        ),
      ),
    );
  }
}