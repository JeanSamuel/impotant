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
      line1: this.props.firstLine,
      line2: this.props.secondLine
    };
  }

  makeAction() {
    this.props.action();
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.bouttonBase, { backgroundColor: this.state.color }]}
        onPress={() => this.makeAction()}
      >
        <Text style={[styles.buttonMainText, styles.textWhiteBold]}>
          {this.state.line1}
        </Text>
        <Text style={[styles.buttonSecondtext, styles.textWhite]}>
          {this.state.line2}
        </Text>
        
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  action: PropTypes.func
};

//make this component available to the app
export default Button;
