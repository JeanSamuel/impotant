import React, { Component } from "react";
import PropTypes from "prop-types";
import { StackNavigator } from "react-navigation";
import { View } from "react-native";
import { Step1, Step2, Step3, Step4 } from "./allSteps";

class ValidationScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StackSettings />
      </View>
    );
  }
}

const StackSettings = new StackNavigator(
  {
    Step1: {
      screen: Step1
    },
    Step2: {
      screen: Step2
    },
    Step3: {
      screen: Step3
    },
    Step4: {
      screen: Step4
    }
  },
  {
    initialRouteName: "Step2",
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
);

export default ValidationScreen;
