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
}