//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import DrawerExample from './components/src/slideBar/drawer';
import Login from './components/src/login/login';
import TestShare from './components/src/login/login2';

// create a component
class Index extends Component {
  render() {
    return (
      <View style = {{flex : 1}}>
        <StatusBar hidden = {true} />
        <TestShare />
      </View>
      
    );
  }
}


//make this component available to the app
export default Index;
