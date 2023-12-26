import 'package:flutter/material.dart';
import 'package:mobile/json.dart';

class CreatePage extends StatelessWidget {

  const CreatePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create'),

      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildRoundedButton(context, 'If This', true),
            _buildConnectingBar(),
            _buildRoundedButton(context, 'Then That', false),
          ],
        ),
      ),
    );
  }

  Widget _buildRoundedButton(BuildContext context, String text, bool isFilled) {
    return TextButton(
      onPressed: () {
        _showOptionsDialog(context, isFilled);
      },
      style: TextButton.styleFrom(
        primary: Colors.black,
        backgroundColor: isFilled ? Colors.black : Colors.transparent,
        minimumSize: Size(double.infinity, 90),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
          side: isFilled ? BorderSide.none : BorderSide(color: Colors.black),
        ),
        padding: EdgeInsets.symmetric(vertical: 0),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: isFilled ? Colors.white : Colors.black,
          fontSize: 35.0,
        ),
      ),
    );
  }

  Future<void> _showOptionsDialog(BuildContext context, bool isAction) async {
  List<Map<String, dynamic>> options = isAction
      ? JsonDataSingleton().getAllActions()
      : JsonDataSingleton().getAllReactions();

  return showDialog<void>(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(isAction ? 'Choose an Action' : 'Choose a Reaction'),
        content: SingleChildScrollView(
          child: ListBody(
            children: options.map((option) {
              return ListTile(
                title: Text(option['name']),
                subtitle: Text(option['description']),
                onTap: () {
                  // Gérer la sélection de l'action ou réaction ici
                  if (isAction) {
                    String selectedAction = option['name'];
                    print(selectedAction);
                  } else {
                    String selectedReaction = option['name'];
                    print(selectedReaction);
                  }
                  Navigator.of(context).pop();
                },
              );
            }).toList(),
          ),
        ),
      );
    },
  );
}

  Widget _buildConnectingBar() {
    return Container(
      width: double.infinity,
      height: 24,
      color: Colors.transparent,
      child: VerticalDivider(
        color: Colors.grey.shade400,
        thickness: 2,
        width: 10,
      ),
    );
  }
}
