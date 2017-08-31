//import liraries
import React, { Component } from "react";
import {} from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      text: this.props.text,
      disabled: false,
      textLoading: this.props.textLoading
    };
  }

  makeAction() {
    this.props.action();
  }

  render() {
    return (
      <Button
        title={this.state.text}
        textStyle={style.nextButtontext}
        backgroundColor={this.state.color}
        onPress={() => this.makeAction()}
        underlayColor="#FFF"
        buttonStyle={{ borderRadius: 20 }}
      />
    );
  }
}
const style = EStyleSheet.create({
  nextButtontext: {
    fontSize: 20,
    fontWeight: "bold"
  },
  disabled: {
    backgroundColor: "rgba(230, 126, 34,1.0)"
  }
});

MyButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func
};

//make this component available to the app
export default MyButton;
