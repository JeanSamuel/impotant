//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import DrawerExample from './components/src/drawer/Main';

// create a component
class Index extends Component {
  render() {
    return (
      <View style = {{flex : 1}}>
        <StatusBar hidden = {true} />
        <DrawerExample />
      </View>
      
    );
  }
}


//make this component available to the app
export default Index;
