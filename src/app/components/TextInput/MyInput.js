//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import styles from "./styles";

// create a component
class MyInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.myInputContainer, this.props.containerStyle]}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder}
          style={[styles.myInput, this.props.inputStyle]}
          editable={this.props.editable}
          value={this.props.value}
          autoFocus={this.props.autoFocus}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.secureTextEntry}
          maxLength={this.props.maxLength}
        />
      </View>
    );
  }
}

//make this component available to the app
export default MyInput;
