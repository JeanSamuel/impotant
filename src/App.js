//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MainStack from "./main/src/navigation/mainStack";
import EStyleSheet from "react-native-extended-stylesheet";

EStyleSheet.build({ outline: 0 });
// create a component
class Index extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <MainStack />
      </View>
    );
  }
}

//make this component available to the app
export default Index;
