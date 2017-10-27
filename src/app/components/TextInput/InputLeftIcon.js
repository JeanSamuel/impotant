import React, { PropTypes } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Keyboard,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import color from "color";
import styles from "./styles";
import AutoComplete from "react-native-autocomplete-input";

class InputLeftIcon extends React.Component {
  render() {
    const containerStyles = [styles.container];

    if (this.props.editable === false) {
      containerStyles.push(styles.containerDisabled);
    }

    return (
      <View style={containerStyles}>
        {this.props.autoComplete ? (
          <AutoComplete
            inputContainerStyle={[styles.input, this.props.style]}
            containerStyle={[styles.autocompleteContainer]}
            data={[
              "Apple",
              "Banana",
              "Orange",
              "Strawberry",
              "Lemon",
              "Cantaloupe",
              "Peach",
              "Mandarin",
              "Date",
              "Kiwi"
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
          />
        ) : (
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
            onEndEditing={this.props.onEndEditing}
          />
        )}

        <View style={styles.border} />
        <TouchableHighlight
          onPress={this.props.onPress}
          style={[styles.iconButton, { justifyContent: "center" }]}
        >
          <View>
            <Icon name={this.props.iconName} size={30} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default InputLeftIcon;
