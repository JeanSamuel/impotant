//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

// create a component
class InputButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor="#193441"
        onPress={this.props.onPress}
        style={Style.inputButton}
      >
        <Text style={Style.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }
}

// define your styles
const Style = StyleSheet.create({
  inputButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#193441"
  },

  inputButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  }
});

//make this component available to the app
export default InputButton;
