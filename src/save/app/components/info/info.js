//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#2c3e50"
  },
  title: {
    textAlign: "left",
    color: "#95a5a6",
    fontSize: 20
  },
  value: {
    textAlign: "left",
    color: "white",
    fontSize: 30
  }
});

//make this component available to the app
export default Info;
