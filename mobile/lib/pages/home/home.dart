import 'package:flutter/material.dart';
import 'package:mobile/pages/home/my_area.dart';
import 'package:mobile/pages/home/explore.dart';
import 'package:mobile/pages/home/create.dart';
import 'package:mobile/pages/home/activity.dart';
import 'package:mobile/pages/home/profile.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 2;

  void changePage(int index) {
    setState(() {
      _currentIndex = index;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Center(
        child: _buildPage(_currentIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home, color: Colors.black,),
            label: 'My AREA',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search, color: Colors.black,),
            label: 'Explore',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle, color: Colors.black,),
            label: 'Create',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment, color: Colors.black,),
            label: 'Activity',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person, color: Colors.black,),
            label: 'Profile',
          ),
        ],
        selectedItemColor: Colors.black,
      ),
    );
  }

  Widget _buildPage(int index) {
    switch (index) {
      case 0:
        return const MyAreaPage();
      case 1:
        return ExplorePage();
      case 2:
        return CreatePage();
      case 3:
        return const ActivityPage();
      case 4:
        return const ProfilePage();
      default:
        return Container();
    }
  }
}
