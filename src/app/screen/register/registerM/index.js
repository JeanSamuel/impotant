//import liraries
import React, { Component } from "react";
import {} from "react-native";
import { StackNavigator } from "react-navigation";
import Step1 from "./step1";
import Step2 from "./step2";
import { Assistant } from "../../assistance";

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
    },
    Assistant: {
      screen: Assistant
    }
  },
  {
    headerMode: "none"
  }
);
//make this component available to the app
export default NewUser;
