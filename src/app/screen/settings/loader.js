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
import {
  Assistant_Step1,
  Assistant_Step2,
  Assistant_Step3,
  Assistant_Step0
} from "../assistance";

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions
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
