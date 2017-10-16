import React, { PropTypes } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Keyboard,
  Button
} from "react-native";
import color from "color";
import styles from "./styles";

class InputLeftButton extends React.Component {
  render() {
    const containerStyles = [styles.container];
    const underlayColor = color(styles.$buttonBackroundColorBase).darken(
      styles.$buttonBackroundColorModifier
    );

    if (this.props.editable === false) {
      containerStyles.push(styles.containerDisabled);
    }
    return (
      <View style={containerStyles}>
        <TouchableHighlight
          style={[styles.inputTouch, this.props.style]}
          /* editable={this.props.editable}
          value={this.props.value}
          autoFocus={this.props.autoFocus}
          onFocus={this.props.onFocus}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.secureTextEntry}
          maxLength={this.props.maxLength}
          underlineColorAndroid="transparent"
          onEndEditing={this.props.onEndEditing}
          placeholder={this.props.placeholder} */
          onPress={this.props.onFocus}
        >
          <Text style={[styles.touchText, { lineHeight: 30 }]}>
            {this.props.value == 0 ? this.props.placeholder : this.props.value}
          </Text>
        </TouchableHighlight>
        <View style={styles.border} />
        <TouchableHighlight
          underlayColor={underlayColor}
          onPress={this.props.onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default InputLeftButton;
