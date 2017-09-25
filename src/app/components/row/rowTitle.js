//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class RowTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.help}>{this.props.help}</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginTop: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(68, 72, 79)"
  },
  help: {
    color: "rgba(149, 165, 166,1.0)"
  }
});

//make this component available to the app
export default RowTitle;
