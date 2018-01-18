import React, { Component } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { Login } from "../login/index";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    // reference: PropTypes.function,
    focus: PropTypes.bool,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.string,
    nextTarget: PropTypes.object
  };

  static defaultProps = {
    focus: false,
    keyboardType: "default",
    secureTextEntry: false,
    placeholder: "",
    returnKeyType: "next"
  };

  GoNextTarget = () => {
    const { reference, nextTarget } = this.props;
    reference.focus();
  };

  test = () => {
    this.input2.focus();
  };

  render = () => {
    const {
      label,
      focus,
      keyboardType,
      secureTextEntry,
      placeholder,
      returnKeyType,
      reference,
      nextTarget
    } = this.props;

    console.log("====================================");
    console.log(reference);
    console.log("====================================");
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>{label} : *</FormLabel>
        <FormInput
          onChangeText={this.someFunction}
          underlineColorAndroid="transparent"
          autoFocus={focus}
          containerStyle={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          ref={input => (this.input1 = input)}
          onSubmitEditing={this.test}
        />

        <FormInput
          onChangeText={this.someFunction}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          ref={input => (this.input1 = input)}
          // onSubmitEditing={() => this.GoNextTarget(nextTarget)}
        />
        <FormValidationMessage />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  formular: { marginVertical: 0 },
  input: {
    backgroundColor: "rgba(189, 195, 199,0.1)",
    borderColor: "rgba(189, 195, 199,0.5)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginLeft: 20,
    marginVertical: 0,
    height: 40
  },
  inputLabel: {},
  buttonLeft: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
