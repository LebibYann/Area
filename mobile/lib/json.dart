import 'dart:convert';
import 'dart:ffi';
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

  List<String> getAllServices() {
    if (jsonData != null) {
      final List<dynamic> services = jsonData!['server']['services'];
      List<String> allServices = [];

      for (var service in services) {
        if (service.containsKey('name')) {
          allServices.add(service['name']);
        }
      }

      return allServices;
    } else {
      return [];
    }
  }

  int countParametersInAction(String actionName) {
    if (jsonData != null) {
      final List<dynamic> services = jsonData!['server']['services'];
      int parameterCount = 0;

      for (var service in services) {
        final List<dynamic> actions = service['actions'] ?? [];
        final List<dynamic> reactions = service['reactions'] ?? [];
        final List<dynamic> allActions = [...actions, ...reactions];

        for (var action in allActions) {
          if (action['name'] == actionName) {
            for (int i = 1; i <= 4; i++) {
              final paramName = 'param$i';
              if (action.containsKey(paramName)) {
                parameterCount++;
              }
            }
          }
        }
      }

      return parameterCount;
    } else {
      return 0;
    }
  }

  List<String> getParameterNamesInAction(String actionName) {
  if (jsonData != null) {
    final List<dynamic> services = jsonData!['server']['services'];
    List<String> parameterNames = [];

    for (var service in services) {
      final List<dynamic> actions = service['actions'] ?? [];
      final List<dynamic> reactions = service['reactions'] ?? [];
      final List<dynamic> allActions = [...actions, ...reactions];

      for (var action in allActions) {
        if (action['name'] == actionName) {
          for (int i = 1; i <= 4; i++) {
            final paramName = 'param$i';
            if (action.containsKey(paramName)) {
              parameterNames.add(action[paramName]);
            }
          }
        }
      }
    }

    return parameterNames;
  } else {
    return [];
  }
}

int getServiceId(String serviceName) {
    if (jsonData != null) {
      final List<dynamic> services = jsonData!['server']['services'];

      for (var service in services) {
        if (service.containsKey('name') && service['name'] == serviceName) {
          return service['id'];
        }
      }
      return -1;
    } else {
      return -1;
    }
  }

  int getEventIdInService(String serviceName, String eventName) {
    if (jsonData != null) {
      final List<dynamic> services = jsonData!['server']['services'];

      for (var service in services) {
        if (service.containsKey('name') && service['name'] == serviceName) {
          final List<dynamic> actions = service['actions'] ?? [];
          final List<dynamic> reactions = service['reactions'] ?? [];
          final List<dynamic> allEvents = [...actions, ...reactions];

          for (var event in allEvents) {
            if (event.containsKey('name') && event['name'] == eventName) {
              return event['id'];
            }
          }
          return -1;
        }
      }
      return -1;
    } else {
      return -1;
    }
  }
}