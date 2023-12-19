import 'package:flutter/material.dart';

class AuthState with ChangeNotifier {
  String _accessToken = "null";

  String get accessToken => _accessToken;

  set accessToken(String token) {
    _accessToken = token;
    notifyListeners();
  }
}