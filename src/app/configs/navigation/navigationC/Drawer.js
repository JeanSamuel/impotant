//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DrawerNavigator, StackNavigator, DrawerItems } from "react-navigation";
import {
  Adresses,
  AppStarter,
  Send,
  To,
  Logout
} from "../../../screen/indexScreen";
import { Icon } from "react-native-elements";
import { History, Settings } from "../../../screen/listScreenM";
import SideBar from "../../../components/Sidebar/SideBar";
import DrawerContent from "../navigationM/drawerContent";

//make this component available to the app

export default DrawerNavigator(
  {
    Home: {
      screen: Send,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-exit-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    Adresses: {
      screen: Adresses,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-exit-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    Options: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-exit-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    About: {
      screen: AppStarter,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-information-circle-outline"
            size={25}
            type="ionicon"
          />
        ),
        header: () => null
      })
    },
    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-exit-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => (
      <ScrollView>
        <DrawerContent />
        <DrawerItems {...props} />
      </ScrollView>
    )
  }
);
