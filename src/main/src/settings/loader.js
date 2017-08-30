//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";
import { Icon } from "react-native-elements";
import Settings from "./settings";
import Assistant from "../assistance/assistant";

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions
    },
    Assistant: {
      screen: Assistant,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />,
      title: "Paramètres",
      drawerIcon: ({ tintColor }) => <Icon name="settings" size={25} />,
      titleStyle: styleBase.headerTitle
    })
  }
);
export default StackSettings;
