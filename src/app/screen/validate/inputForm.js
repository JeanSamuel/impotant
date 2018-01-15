import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

const TextInput = ({
  label,
  references,
  focus,
  keyboardType,
  secureTextEntry
}) => (
  <View style={styles.formular}>
    <FormLabel containerStyle={styles.inputLabel}>{label} : *</FormLabel>
    <FormInput
      onChangeText={this.someFunction}
      underlineColorAndroid="transparent"
      autoFocus={focus}
      containerStyle={styles.input}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
    <FormValidationMessage />
  </View>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool
};

TextInput.defaultProps = {
  focus: false,
  keyboardType: "default",
  secureTextEntry: false
};

export default TextInput;

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
