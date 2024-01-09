import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/json.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/provider.dart';
import 'package:provider/provider.dart';

class CreatePage extends StatelessWidget {
  String selectedAction = "";
  int numberOfParametersAction = -1;
  int idAction = -1;
  int idActionEvent = -1;
  String selectedReaction = "";
  int numberOfParametersReaction = -1;
  int idReaction = -1;
  int idReactionEvent = -1;
  List<String> params = [];
  bool ifThisSelected = false;
  List<TextEditingController> controllers = [];

  postArea(BuildContext context) async {
    try {
      String urlAction = "http://localhost:8080/actions/$idAction/$idActionEvent";
      String urlReaction = "http://localhost:8080/actions/$idReaction/$idReactionEvent";
      final auth = Provider.of<AuthState>(context, listen: false);
      final token = auth.accessToken;

      Map<String, dynamic> jsonMapAction = {};
      for (int i = 0; i < numberOfParametersAction; i++) {
        jsonMapAction['field${i + 1}'] = controllers[i].text;
      }
      var jsonAction = jsonEncode(jsonMapAction);
      Map<String, dynamic> jsonMapReaction = {};
      for (int i = numberOfParametersAction; i < numberOfParametersAction + numberOfParametersReaction; i++) {
        jsonMapReaction['param${i - numberOfParametersAction + 1}'] = controllers[i].text;
      }
      var jsonReaction = jsonEncode(jsonMapReaction);

      var responseAction = await http.post(Uri.parse(urlAction),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonAction);
      var responseReaction = await http.post(Uri.parse(urlReaction),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonReaction);

      if (responseAction.statusCode == 201 && responseReaction.statusCode == 201) {
        Map<String, dynamic> responseMapAction = jsonDecode(responseAction.body);
        int idAction = responseMapAction['id'];
        Map<String, dynamic> responseMapReaction = jsonDecode(responseReaction.body);
        int idReaction = responseMapReaction['id'];

        print(idAction);
        print(idReaction);

        var responseArea = await http.post(Uri.parse(urlAction),
        headers: {
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'triggerId': idAction,
          'actionId': idReaction,
        }));

        if (responseArea.statusCode == 201) {
          print('Area created!');
        } else {
          print('Area failed!');
        }
      } else if (responseAction.statusCode == 401 && responseReaction.statusCode == 401){
        print('Request failed: Status ${responseAction.statusCode}: ${responseAction.body} && ${responseReaction.statusCode}: ${responseReaction.body}');
      } else {
        print('Request failed: Status ${responseAction.statusCode}: ${responseAction.body} && ${responseReaction.statusCode}: ${responseReaction.body}');
        print ("please go to the exploration page to connect your account to the service");
      }
      // Navigator.of(context).pop();
    } catch (e) {
      print(e);
    }
  }

  String _createJsonBody(List<String> fieldValues) {
  Map<String, dynamic> jsonMap = {};
  for (int i = 0; i < fieldValues.length; i++) {
    jsonMap['field${i + 1}'] = fieldValues[i];
  }

  // Convert the map to JSON
  return jsonEncode(jsonMap);
}

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
                  style: TextStyle(color: Colors.white),
                ),
              ),
              backgroundColor: Colors.red,
              duration: Duration(seconds: 3),
            ),
          );
        }
      },
      style: TextButton.styleFrom(
        primary: Colors.black,
        backgroundColor: isFilled ? Colors.black : Colors.transparent,
        minimumSize: const Size(double.infinity, 90),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
          side: isFilled ? BorderSide.none : BorderSide(color: Colors.black),
        ),
        padding: const EdgeInsets.symmetric(vertical: 0),
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

  Widget _buildForm(String name, List<String> fileds, BuildContext context) {
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
            postArea(context);
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
      controllers.add(controller);

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
    List<String> services = JsonDataSingleton().getAllServices();

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          title: const Center(
            child: Text(
              'Choose a service',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 23,
              ),
            ),
          ),
          titlePadding: const EdgeInsets.fromLTRB(24.0, 24.0, 24.0, 0.0),
          contentPadding: const EdgeInsets.fromLTRB(24.0, 12.0, 24.0, 24.0),
          content: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                const Divider(
                  color: Colors.black,
                  thickness: 2,
                ),
                ListBody(
                  children: services.map((serviceName) {
                    return Container(
                      margin: const EdgeInsets.symmetric(vertical: 2.0),
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: Colors.black,
                          width: 3.0,
                        ),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: ListTile(
                        title: Text(
                          serviceName,
                          style: const TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.bold,
                            fontSize: 25,
                          ),
                        ),
                        onTap: () {
                          Navigator.of(context).pop();
                          _showServiceActionsOrReactionsDialog(
                              context, serviceName, isAction);
                        },
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> _showServiceActionsOrReactionsDialog(
      BuildContext context, String serviceName, bool isAction) async {
    List<Map<String, dynamic>> options = isAction
        ? JsonDataSingleton().getServiceActions(serviceName)
        : JsonDataSingleton().getServiceReactions(serviceName);

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(isAction ? 'Select an Action' : 'Select a Reaction'),
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
                      numberOfParametersAction = JsonDataSingleton().countParametersInAction(selectedAction);
                      idAction = JsonDataSingleton().getServiceId(serviceName);
                      idActionEvent = JsonDataSingleton().getEventIdInService(serviceName, selectedAction);
                      params += JsonDataSingleton().getParameterNamesInAction(selectedAction);
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
                      ifThisSelected = false;
                      selectedReaction = option['name'];
                      numberOfParametersReaction = JsonDataSingleton().countParametersInAction(selectedReaction);
                      idReaction = JsonDataSingleton().getServiceId(serviceName);
                      idReactionEvent = JsonDataSingleton().getEventIdInService(serviceName, selectedReaction);
                      params += JsonDataSingleton().getParameterNamesInAction(selectedReaction);
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
                                      params, context)
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
