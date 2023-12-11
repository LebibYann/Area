import 'package:flutter/material.dart';

class MyAreaPage extends StatelessWidget {
  const MyAreaPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Divider(
            height: 20,
            indent: 20,
            endIndent: 20,
            color: Colors.grey,
          ),
        Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Container(
              margin: const EdgeInsets.only(top: 20.0),
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(13.0),
                color: Colors.black,
              ),
              child: const Text(
                'Save time and money by making the internet work for you! We believe you might like...',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ]
      ),
    );
  }
}