import React, { PropTypes } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Keyboard
} from "react-native";
import { Button } from "native-base";
import { Icon } from "react-native-elements";
import color from "color";
import styles from "./styles";

class InputLeftIcon extends React.Component {
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
          maxLength={this.props.maxLength}
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder}
          editable={this.props.editable}
        />
        <Button style={styles.iconButton} onPress={this.props.onPress}>
          <Icon name={this.props.iconName} size={25} />
        </Button>
      </View>
    );
  }
}

export default InputLeftIcon;
