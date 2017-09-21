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
import Home from "../screens/Home";
import Main from "../screens/Main";
import Send from "../screens/send/Send";
import Receive from "../screens/receive/Receive";
import SideBar from "../components/Sidebar/SideBar";
import Pins from "../screens/Pin";
import Handler from "../screens/Handler";
import Register from "../screens/register/Register";
import RegisterName from "../screens/register/RegisterName";
import Logout from "../screens/Logout";
import History from "../screens/History";
import RegisterPin from "../screens/register/RegisterPin";
import RegisterPwd from "../screens/register/RegisterPwd";
import Adresses from "../screens/adresses/Adresses";
import To from "../screens/send/to";
import AppStarter from "../screens/appStarter/AppStarter";

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

const Drawer = DrawerNavigator(
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
