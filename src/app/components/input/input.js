//import liraries
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { width, height } from "Dimensions";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
// create a component
class Input extends Component {
  action() {
    this.props.onChangeText();
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <FormLabel style={styles.labelContainer}>
          <Text style={[styles.labelStyle]}>{this.props.label}</Text>
        </FormLabel>
        <FormInput
          placeholder={this.props.placeholder}
          underlineColorAndroid="transparent"
          onChangeText={() => this.action()}
          inputStyle={[styles.inputStyle]}
        />
        <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  formContainer: {
    width: width
  },
  inputStyle: {
    width: width,
    color: "white",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    paddingLeft: 10
  },
  labelStyle: {
    color: "#FFF"
  }
});

//make this component available to the app
export default Input;
