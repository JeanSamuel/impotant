import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Keyboard,
  Button
} from "react-native";
import { Icon, FormValidationMessage } from "react-native-elements";
import color from "color";
import styles from "./styles";
import AutoComplete from "react-native-autocomplete-input";

class InputLeftIcon extends React.Component {
  render() {
    const containerStyles = [styles.container];
    const inputSyle = [styles.input,this.props.style];
    let placeholderColor = "rgba(121, 121, 121, 0.5)";
    if (this.props.editable === false) {
      containerStyles.push(styles.containerDisabled);
    }
    if(this.props.validationMessage){
      containerStyles.push(styles.containerError);
      placeholderColor = "rgba(255, 36, 35, 0.5)";
    }

    return (
      <View>
        <View style={containerStyles}>
          <TextInput
            style={inputSyle}
            value={this.props.value}
            autoFocus={this.props.autoFocus}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            returnKeyType={this.props.returnKeyType}
            secureTextEntry={this.props.secureTextEntry}
            maxLength={this.props.maxLength}
            underlineColorAndroid="transparent"
            placeholder={this.props.placeholder}
            editable={this.props.editable}
            placeholderTextColor = {placeholderColor}
            onEndEditing={this.props.onEndEditing}
          />
          <View style={styles.border} />
          <TouchableHighlight
            onPress={this.props.onPress}
            style={[styles.iconButton, { justifyContent: "center" }]}
          >
            <View>
              <Icon
                name={this.props.iconName}
                size={30}
                type={this.props.iconType}
              />
            </View>
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

export default InputLeftIcon;
