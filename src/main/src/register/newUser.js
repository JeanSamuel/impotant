//import liraries
import React, { Component } from "react";
import {} from "react-native";
import { StackNavigator } from "react-navigation";
import Step1 from "../register/step1";
import Step2 from "../register/step2";
import Assistant from "../assistance/assistant";
import {
  Assistant_Step1,
  Assistant_Step2,
  Assistant_Step3,
  Assistant_Step0
} from "../assistance";

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
    Assistant_Step0: {
      screen: Assistant_Step0
    },
    Assistant_Step1: {
      screen: Assistant_Step1
    },
    Assistant_Step2: {
      screen: Assistant_Step2
    },
    Assistant_Step3: {
      screen: Assistant_Step3
    }
  },
  {
    headerMode: "none"
  }
);
//make this component available to the app
export default NewUser;
