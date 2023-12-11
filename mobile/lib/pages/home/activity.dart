import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ActivityPage extends StatelessWidget {
  const ActivityPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Obtenir la date actuelle
    final now = DateTime.now();
    // Formatter la date en format 'jour, mois jourNumber, heure:minute'
    final formattedDate = DateFormat('d MMMM, HH:mm').format(now);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Activity'),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: const TextStyle(
          color: Colors.black,
          fontSize: 25,
          fontWeight: FontWeight.bold
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(26.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16.0),
              
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Welcome!',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.white
                    ),
                  ),
                  Text(
                    formattedDate,
                    style: const TextStyle(
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey), // Bordure grise
                borderRadius: BorderRadius.circular(12.0), // Bordures arrondies
                color: Colors.white, // Fond blanc
                boxShadow: [ // Ombre sous le conteneur
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 1,
                    blurRadius: 5,
                    offset: const Offset(0, 3), // changes position of shadow
                  ),
                ],
              ),
              child: const Text(
                'Turn on an Applet to bring your activity feed to life!',
                style: TextStyle(
                  fontSize: 16,
                ),
                textAlign: TextAlign.center, // Centrez le texte dans le conteneur
              ),
            ),
            // Ajoutez d'autres Widgets ici pour le reste de votre contenu, comme une liste des activités.
          ],
        ),
      ),
    );
  }
}
