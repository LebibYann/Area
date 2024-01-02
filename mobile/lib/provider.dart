import 'package:flutter/material.dart';

class AuthState with ChangeNotifier {
  String _accessToken = "";
  String _email = "";
  String? _profileImagePath;

  String get accessToken => _accessToken;
  String get email => _email;
  String? get profileImagePath => _profileImagePath;

  set accessToken(String token) {
    _accessToken = token;
    notifyListeners();
  }

  set email(String email) {
    _email = email;
    notifyListeners();
  }

  set profileImagePath(String? path) {
    _profileImagePath = path;
    notifyListeners();
  }
}
