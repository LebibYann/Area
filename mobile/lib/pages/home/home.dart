import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
      ),
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
        unselectedLabelStyle: const TextStyle(color: Colors.black),
      ),
    );
  }

  Widget _buildPage(int index) {
    switch (index) {
      case 0:
        // Page pour 'My AREA'
        return const Center(
          child: Text('My AREA Page'),
        );
      case 1:
        // Page pour 'Explore'
        return const Center(
          child: Text('Explore Page'),
        );
      case 2:
        // Page pour 'Create'
        return const Center(
          child: Text('Create Page'),
        );
      case 3:
        // Page pour 'Activity'
        return const Center(
          child: Text('Activity Page'),
        );
      case 4:
        // Page pour 'Profile'
        return const Center(
          child: Text('Profile Page'),
        );
      default:
        return Container();
    }
  }
}