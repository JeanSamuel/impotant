import React from "react";
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
import {FormValidationMessage} from 'react-native-elements'

class InputLeftButton extends React.Component {
  render() {
    const containerStyles = [styles.container];
    const inputSyle = [styles.input,this.props.style];
    let placeholderColor = "rgba(121, 121, 121, 0.5)";
    const underlayColor = color(styles.$buttonBackroundColorBase).darken(
      styles.$buttonBackroundColorModifier
    );

    if (this.props.editable === false) {
      containerStyles.push(styles.containerDisabled);
    };
    if(this.props.validationMessage){
      console.log("Amount 0");
      containerStyles.push(styles.containerError);
      placeholderColor = "rgba(255, 36, 35, 0.5)";
    }
    return (
      <View>
        <View style={containerStyles}>
          <TextInput
            style={inputSyle}
            editable={this.props.editable}
            value={this.props.value}
            autoFocus={this.props.autoFocus}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            returnKeyType={this.props.returnKeyType}
            secureTextEntry={this.props.secureTextEntry}
            maxLength={this.props.maxLength}
            underlineColorAndroid="transparent"
            onEndEditing={this.props.onEndEditing}
            placeholder={this.props.placeholder}
            placeholderTextColor = {placeholderColor}
          />
          <View style={styles.border} />
          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this.props.onPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{this.props.buttonText}</Text>
          </TouchableHighlight>
        </View>
        {this.props.validationMessage
          ? (
            <FormValidationMessage containerStyle={styles.formValidation} >
              {this.props.validationMessage}
            </FormValidationMessage>
          )
          : null}
      </View>
    );
  }
}

export default InputLeftButton;
