import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  Platform,
  View,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
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
  CustomKey,
  Handler,
  Review
} from "../../../screen/indexScreen";
import headStyle from "../../../styles/stylesC/headerStyle";
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
    CustomKey: {
      screen: CustomKey,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Envoyer à " + navigation.state.params.user,
        headerStyle: headStyle.headerBackground,
        headerTintColor: { color: "#fff" },
        headerTitleStyle: { color: "#fff" },
        headerLeft: (
          <View
            style={{
              alignContent: "center",
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="navigate-before" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )
      })
    },
    Review: {
      screen: Review,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Verifier et envoyer ",
        headerStyle: { backgroundColor: "#193441" },
        headerTintColor: { color: "#fff" },
        headerTitleStyle: { color: "#fff" },
        headerLeft: (
          <View
            style={{
              alignContent: "center",
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="navigate-before" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )
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
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Register"
      })
    }
  },
  { initialRouteName: "Handler" }
);
