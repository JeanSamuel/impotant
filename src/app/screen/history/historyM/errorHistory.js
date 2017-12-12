//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styleBase } from "../../../styles";
import EStyleSheet from "react-native-extended-stylesheet";

const errorIcon = require("../../../assets/images/icons/no-conection-256.png");
// create a component
class Error extends Component {
  render() {
    let syncStyle = null;
    if (this.props.isSynchronised)
      syncStyle = { backgroundColor: "rgba(230, 126, 34,1.0)" };
    return (
      <View style={[style.connexionError, styleBase.centered, syncStyle]}>
        {!this.props.isSynchronised ? (
          <Icon name="warning" color="white" size={15} />
        ) : (
          <View />
        )}
        <Text style={style.connexionErrorText}> {this.props.text}</Text>
      </View>
    );
  }
}

const style = EStyleSheet.create({
  connexionError: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 76, 60,1.0)",
    paddingVertical: 3
  },
  connexionErrorText: {
    color: "white",
    textAlign: "center"
  }
});

//make this component available to the app
export default Error;
