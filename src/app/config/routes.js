import React from "react";
import { StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Home from "../screens/Home";
import Main from "../screens/Main";
import Receive from "../screens/Receive";
import SideBar from "../components/Sidebar/SideBar";
import Pins from "../screens/Pin";
import Handler from "../screens/Handler";
import Register from "../screens/Register";
import RegisterName from "../screens/RegisterName";
import Logout from "../screens/Logout";

const Drawer = DrawerNavigator(
  {
    Home: {
      screen: Main,
      header: navigation => ({
        tintColor: "#e91e63"
      })
    },
    Options: { screen: Main },
    About: { screen: Main },
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
export default StackNavigator({
  Handler: {
    screen: Handler
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
      header: () => null,
      headerTitle: "Drawer"
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      headerTitle: "Register"
    })
  },
  RegisterName: {
    screen: RegisterName,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      headerTitle: "Register"
    })
  },
  Pin: {
    screen: Pins,
    navigationOptions: ({ navigation }) => ({
      header: () => null,
      headerTitle: "Pin"
    })
  }
});
