import 'package:flutter/material.dart';

class TriggerDetails extends StatelessWidget {
  final String service;
  final String triggerName;
  final String description;
  final String actionText;
  final VoidCallback onActionTap;
  final String logoPath;

  const TriggerDetails({
    Key? key,
    required this.service,
    required this.triggerName,
    required this.description,
    required this.actionText,
    required this.onActionTap,
    required this.logoPath,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(service),
        centerTitle: true,
        titleTextStyle: TextStyle(
            fontSize: 30, color: Colors.black, fontWeight: FontWeight.bold),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            color: Color(0xFFE1306C),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 18.0),
                  child: Image.asset(logoPath, height: 100),
                ),
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  height: 75,
                  width: double.infinity,
                ),
                Text(
                  triggerName,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 23.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  maxLines: 2,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16.0),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'About this trigger',
              style: TextStyle(fontSize: 22.0, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              description,
              style: const TextStyle(fontSize: 16.0),
            ),
          ),
          const SizedBox(height: 32.0),
          Center(
            child: ElevatedButton(
              onPressed: () => onActionTap(),
              child: Text(actionText),
            ),
          ),
        ],
      ),
    );
  }
}
