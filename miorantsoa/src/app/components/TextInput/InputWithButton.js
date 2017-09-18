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
    onPress,
    buttonText,
    editable = true,
    keyboardType,
    autoFocus,
    secureTextEntry,
    maxLength
  } = props;

  const containerStyles = [styles.container];
  const underlayColor = color(styles.$buttonBackroundColorBase).darken(
    styles.$buttonBackroundColorModifier
  );

  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        underlayColor="#e2e2e2"
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.border} />
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        onEndEditing={this.props.onEndEditing}
        {...props}
        maxLength={maxLength}
      />
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number
};

export default InputWithButton;
