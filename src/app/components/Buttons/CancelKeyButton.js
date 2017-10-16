//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
// create a component
class CancelKeyButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#193441"
        onPress={this.props.onPress}
        style={styles.inputButton}
      >
        <View>
          <Icon name="backspace" color="#fff" />
        </View>
      </TouchableHighlight>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  inputButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#193441"
  }
});

//make this component available to the app
export default CancelKeyButton;
