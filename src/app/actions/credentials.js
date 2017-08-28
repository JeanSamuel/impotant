//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class Credentials extends Component {
  async saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw "something went wrong when saving data";
    }
  }

  async getData(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }
}

//make this component available to the app
export default Credentials;
