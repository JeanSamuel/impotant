//import liraries
import React, { Component } from "react";
import { View } from "react-native";

// create a component
class Separator extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: "rgba(149, 165, 166,0.5)",
          borderBottomWidth: 1
        }}
      />
    );
  }
}

//make this component available to the app
export default Separator;
