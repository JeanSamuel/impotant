//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MainStack from './components/src/navigation/mainStack';
import Sharing from './components/src/sharing/sharing';
import Header from './components/src/home/header';



// create a component
class Index extends Component {

  
  render() {
    return (
      <View style = {{flex : 1}}>
        <StatusBar hidden = {true} />
        <Header />
      </View>
      
    );
  }
}


//make this component available to the app
export default Index;
