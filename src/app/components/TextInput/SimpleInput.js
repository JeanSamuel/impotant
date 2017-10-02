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

class InputWithButton extends React.Component {
  render() {
    const containerStyles = [styles.container];

    if (this.props.editable === false) {
      containerStyles.push(styles.containerDisabled);
    }

    return (
      <View style={containerStyles}>
        <TextInput
          style={[styles.input, this.props.style]}
          value={this.props.value}
          autoFocus={this.props.autoFocus}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.secureTextEntry}
          onEndEditing={this.props.onEndEditing}
          maxLength={this.props.maxLength}
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder}
          editable={this.props.editable}
        />
      </View>
    );
  }
}

InputWithButton.propTypes = {
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number
};

export default InputWithButton;
