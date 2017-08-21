//import liraries
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./buttonStyles";
import PropTypes from "prop-types";

// create a component
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      text: this.props.text
    };
  }

  makeAction() {
    this.props.action();
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.newUserButton, { backgroundColor: this.state.color }]}
        activeOpacity={0.7}
        onPress={() => this.makeAction()}
      >
        <View style={[styles.buttonContent]}>
          <Text style={[{ color: "white" }, styles.buttonText]}>
            {this.state.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func
};

//make this component available to the app
export default Button;
