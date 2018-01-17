//import liraries
import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { DrawerItems, DrawerNavigator } from "react-navigation";
import {
  Logout,
  MainAchat,
  Offrir,
  ProfileAriary,
  Receive,
  Send,
  History
} from "../../../screen/index";
import { Icon } from "react-native-elements";
import About from "../../../screen/about";
import Charger from "../../../screen/charger";
import Profil from "../../../screen/profil";
import DrawerContent from "../navigationMerch/drawerContent";
import colors from '../../../config/constants/colors'

//make this component available to the app
const { width } = Dimensions.get("screen");
export default DrawerNavigator(
  {
    Home: {
      screen: Send,
      navigationOptions: ({ navigation }) => ({
        title: "Payer",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-qr-scanner"
            size={28}
            type="ionicon"
            color={tintColor}
          />
        ),
        header: () => null
      })
    },
    Wallet: {
      screen: Receive,
      navigationOptions: ({ navigation }) => ({
        title: "Recevoir",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-rose-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },
    Charger: {
      screen: Charger,
      navigationOptions: ({ navigation }) => ({
        title: "Charger",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-filing-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },
    History: {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        title: "A propos",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-information-circle-outline"
            type="ionicon"
            size={28}
          />
        ),
        header: () => null
      })
    },
    Profil: {
      screen: Profil,
      navigationOptions: ({ navigation }) => ({
        title: "Profil",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-contact-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },

    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        title: "Déconnexion",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-log-out" type="ionicon" size={28} />
        ),
        header: () => null
      })
    }
  },
  {
    initialRouteName: "Home",
    drawerWidth: width - 50,
    contentOptions: {
      activeTintColor: colors.$darkColor,
      // activeBackgroundColor: "",
      itemStyle: {
        paddingLeft: 15
      },
      labelStyle: {
        fontWeight: "200"
      }
    },
    contentComponent: props => (
      <ScrollView>
        <DrawerContent navigation={props.navigation} />
        <DrawerItems {...props} />
      </ScrollView>
    )
  }
);
