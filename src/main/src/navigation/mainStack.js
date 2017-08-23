//import liraries
import React, { Component } from "react";
import {} from "react-native";
import { StackNavigator } from "react-navigation";
import DrawerExample from "./drawer";
import Starter from "../starter/starter";
import Loader from "../starter/loader";
import NewUser from "../register/newUser";
import Services from "../services/services";

const MainStack = new StackNavigator(
  {
    Loader: {
      screen: Loader
    },
    Starter: {
      screen: Starter
    },
    NewUser: {
      screen: NewUser
    },
    DrawerExample: {
      screen: DrawerExample
    }
  },
  {
    initialRouteName: "NewUser",
    navigationOptions: {
      header: null
    }
  }
);
//make this component available to the app
export default MainStack;
