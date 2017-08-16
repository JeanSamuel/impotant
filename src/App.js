//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MainStack from './components/src/navigation/mainStack';
import Sharing from './components/src/sharing/sharing';



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
