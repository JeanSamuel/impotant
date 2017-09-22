//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import {
  Home,
  Adresses,
  Main,
  AppStarter,
  Send,
  To,
  History,
  Logout
} from "../../../screen/indexScreen";
import SideBar from "../../../components/Sidebar/SideBar";

//make this component available to the app
const NestedSendStack = StackNavigator({
  Send: {
    screen: Send
  },
  To: {
    screen: To
  },
  History: {
    screen: History
  }
});

export default DrawerNavigator(
  {
    Home: {
      screen: NestedSendStack,
      header: () => null
    },
    Adresses: {
      screen: Adresses
    },
    Options: { screen: Main },
    About: { screen: AppStarter },
    Logout: { screen: Logout }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);
