//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DrawerNavigator, StackNavigator, DrawerItems } from "react-navigation";
import {
  Adresses,
  AppStarter,
  Send,
  To,
  History,
  Logout,
  ProfileAriary,
  MainAchat,
  Offrir
} from "../../../screen/indexScreen";
import { Icon } from "react-native-elements";
import {
  //History,
  Settings,
  Home
} from "../../../screen/listScreenM";
import About from "../../../screen/about";
import DrawerContent from "../navigationM/drawerContent";

//make this component available to the app

export default DrawerNavigator(
  {
    Home: {
      screen: Send,
      navigationOptions: ({ navigation }) => ({
        title: "Envoyer",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home-outline" size={25} type="ionicon" />
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
    Wallet: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Recevoir",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cash-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    Profile: {
      screen: ProfileAriary,
      navigationOptions: ({ navigation }) => ({
        title: "Profile",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cash-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    Achat: {
      screen: MainAchat,
      navigationOptions: ({ navigation }) => ({
        title: "Dépôt",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cash-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    Offrir: {
      screen: Offrir,
      navigationOptions: ({ navigation }) => ({
        title: "Offrir",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cash-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    // Adresses: {
    //   screen: Adresses,
    //   navigationOptions: ({ navigation }) => ({
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="ios-book-outline" size={25} type="ionicon" />
    //     ),
    //     header: () => null
    //   })
    // },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        title: "A propos",
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
        title: "Déconnexion",
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
