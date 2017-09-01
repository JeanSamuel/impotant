//import liraries
import React, { Component } from "react";
import {} from "react-native";
import { StackNavigator } from "react-navigation";
import Step1 from "../register/step1";
import Step2 from "../register/step2";

const NewUser = new StackNavigator(
  {
    Step1: {
      screen: Step1,
      navigationOptions: {
        headerMode: "none"
      }
    },
    Step2: {
      screen: Step2
    }
  },
  {
    headerMode: "none"
  }
);
//make this component available to the app
export default NewUser;
