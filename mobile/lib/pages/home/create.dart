import 'package:flutter/material.dart';
import 'package:mobile/json.dart';

class CreatePage extends StatelessWidget {
  String selectedAction = "";
  int numberOfParametersAction = -1;
  String selectedReaction = "";
  int numberOfParametersReaction = -1;
  List<String> params = [];
  bool ifThisSelected = false;

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
        if (!ifThisSelected && isFilled || (ifThisSelected && !isFilled)) {
          _showOptionsDialog(context, isFilled);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Center(
                child: Text(
                  "Chose an action first !",
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.white),
                ),
              ),
              backgroundColor: Colors.red,
              duration: const Duration(seconds: 3),
            ),
          );
        }
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

  Widget _buildForm(String name, List<String> fileds) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          name,
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        _buildFormFields(fileds),
        ElevatedButton(
          onPressed: () {
            // Fonction appelée lorsque le bouton est pressé
          },
          child: const Text('create'),
        ),
      ],
    );
  }

  Widget _buildFormFields(List<String> fileds) {
    List<Widget> formFields = [];

    for (var field in fileds) {
      TextEditingController controller = TextEditingController();

      formFields.add(
        TextFormField(
          controller: controller,
          decoration: InputDecoration(labelText: field),
        ),
      );

      formFields.add(SizedBox(height: 8));
    }

    return Column(
      children: formFields,
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
                    if (isAction) {
                      ifThisSelected = true;
                      selectedAction = option['name'];
                      numberOfParametersAction = JsonDataSingleton()
                          .countParametersInAction(selectedAction);
                      params += JsonDataSingleton()
                          .getParameterNamesInAction(selectedAction);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Center(
                            child: Text(
                              "$selectedAction choosen!",
                              textAlign: TextAlign.center,
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                          backgroundColor: Colors.green,
                          duration: const Duration(seconds: 3),
                        ),
                      );
                    } else {
                      selectedReaction = option['name'];
                      numberOfParametersReaction = JsonDataSingleton()
                          .countParametersInAction(selectedReaction);
                      params += JsonDataSingleton()
                          .getParameterNamesInAction(selectedReaction);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Center(
                            child: Text(
                              "$selectedReaction choosen!",
                              textAlign: TextAlign.center,
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                          backgroundColor: Colors.green,
                          duration: const Duration(seconds: 3),
                        ),
                      );
                    }
                    Navigator.of(context).pop();
                    if (numberOfParametersReaction != -1 &&
                        numberOfParametersAction != -1) {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => Scaffold(
                            appBar: AppBar(
                              title: const Text(
                                  'Finish your creation by filling informations!'),
                            ),
                            body: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Column(
                                children: [
                                  _buildForm(
                                      '$selectedAction with $selectedReaction',
                                      params)
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    }
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
