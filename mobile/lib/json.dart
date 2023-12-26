import 'dart:convert';
import 'package:http/http.dart' as http;

class JsonDataSingleton {
  static final JsonDataSingleton _singleton = JsonDataSingleton._internal();
  Map<String, dynamic>? jsonData;

  factory JsonDataSingleton() {
    return _singleton;
  }

  JsonDataSingleton._internal();

  Future<void> fetchData() async {
    final response = await http.get(Uri.parse('http://localhost:8080/about.json'));

    if (response.statusCode == 200) {
      jsonData = json.decode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }

  List<Map<String, dynamic>> getServiceActions(String serviceName) {
    if (jsonData != null) {
      final service = jsonData!['server']['services']
          .firstWhere((service) => service['name'] == serviceName, orElse: () => {});

      return service.containsKey('actions') ? List.from(service['actions']) : [];
    } else {
      return [];
    }
  }

  List<Map<String, dynamic>> getAllActions() {
  if (jsonData != null) {
    final List<dynamic> services = jsonData!['server']['services'];
    List<Map<String, dynamic>> allActions = [];

    for (var service in services) {
      if (service.containsKey('actions')) {
        allActions.addAll(List.from(service['actions']));
      }
    }

    return allActions;
  } else {
    return [];
  }
}


  List<Map<String, dynamic>> getServiceReactions(String serviceName) {
    if (jsonData != null) {
      final service = jsonData!['server']['services']
          .firstWhere((service) => service['name'] == serviceName, orElse: () => {});

      return service.containsKey('reactions') ? List.from(service['reactions']) : [];
    } else {
      return [];
    }
  }

  List<Map<String, dynamic>> getAllReactions() {
  if (jsonData != null) {
    final List<dynamic> services = jsonData!['server']['services'];
    List<Map<String, dynamic>> allActions = [];

    for (var service in services) {
      if (service.containsKey('reactions')) {
        allActions.addAll(List.from(service['reactions']));
      }
    }

    return allActions;
  } else {
    return [];
  }
}

}