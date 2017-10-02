import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  Icon,
  Platform,
  View,
  Button
} from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import {
  Home,
  History,
  Login,
  Logout,
  Main,
  Pin,
  RegisterName,
  RegisterPin,
  RegisterPwd,
  To,
  Adresses,
  AppStarter,
  Send,
  Handler,
  Register
} from "../../../screen/indexScreen";
import Drawer from "./Drawer";

export default StackNavigator(
  {
    Handler: {
      screen: Handler,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Landing: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Home"
      })
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    RegisterPin: {
      screen: RegisterPin
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Register"
      })
    },
    RegisterName: {
      screen: RegisterName
    },
    RegisterPwd: {
      screen: RegisterPwd
    }
  },
  { initialRouteName: "Handler" }
);
