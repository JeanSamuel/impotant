import React, { PropTypes } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Keyboard
} from "react-native";
import color from "color";
import styles from "./styles";

const InputWithButton = props => {
  const {
    editable = true,
    keyboardType,
    autoFocus,
    secureTextEntry,
    maxLength
  } = props;

  const containerStyles = [styles.container];

  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }

  return (
    <View style={containerStyles}>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        {...props}
        maxLength={maxLength}
      />
    </View>
  );
};

InputWithButton.propTypes = {
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number
};

export default InputWithButton;
