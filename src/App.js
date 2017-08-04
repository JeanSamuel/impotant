//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
// import DrawerExample from './components/src/navigation/drawer';
import Login from './components/src/login/login';
import Login2 from './components/src/login/login2';
import Drawer from './components/src/navigation/drawer';
import MainStack from './components/src/navigation/mainStack';
import TestShare from './components/src/login/login2';

// create a component
class Index extends Component {

  
  

  render() {
    return (
      <View style = {{flex : 1}}>
        <StatusBar hidden = {true} />
        <MainStack />
      </View>
      
    );
  }
}


//make this component available to the app
export default Index;
