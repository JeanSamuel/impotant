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
  Senf,
  History,
  Login,
  Logout,
  Pin,
  To,
  Adresses,
  AppStarter,
  Landing,
  Send,
  Handler
} from "../../../screen/indexScreen";
import RegisterPin from "../../../screen/register/registerC/RegisterPin";
import Register from "../../../screen/register/registerC/Register";
import RegisterName from "../../../screen/register/registerC/RegisterName";
import RegisterPwd from "../../../screen/register/registerC/RegisterPwd";
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
      screen: Landing,
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
    Pin: {
      screen: Pin,
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
