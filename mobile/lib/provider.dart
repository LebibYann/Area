import 'package:flutter/material.dart';

class AuthState with ChangeNotifier {
  String _accessToken = "";
  String _email = "";

  String get accessToken => _accessToken;
  String get email => _email;

  set accessToken(String token) {
    _accessToken = token;
    notifyListeners();
  }

  set email(String email) {
    _email = email;
    notifyListeners();
  }
}
