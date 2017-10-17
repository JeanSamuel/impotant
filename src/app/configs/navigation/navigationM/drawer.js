//import liraries
import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import DrawerContent from "./drawerContent";
import { Icon } from "react-native-elements";
import {
  Home,
  History,
  About
} from "../../../screen/listScreenM";

// DrawerNavigator path

const drawerRoutes = {
  First: {
    path: "/",
    screen: Home
  },
  Third: {
    path: "/sent",
    screen: History
  },  
  Fourth: {
    path: "/",
    screen: About 
  },
  // Sixth: {
  //   path: "/sent2",
  //   screen: Logout, 
  //   navigationOptions : {
  //     title: "Fin de la synchronisation", 
  //     drawerIcon: ({ tintColor }) => (
  //       <Icon name="close" size={25} type="evilicon" />
  //     )
  //   }
  // }
};

// DrawerNavigator configuration

const drawerConfigs = {
  initialRouteName: "First",
  drawerPosition: "left",
  contentOptions: {
    activeBackgroundColor: "#bdc3c7",
    activeTintColor: "#FFF",
    style: { marginTop: 0 }
  },
  headerMode: "screen",
  contentComponent: props => (
    <ScrollView>
      <DrawerContent />
      <DrawerItems {...props} />
    </ScrollView>
  )

  // contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={drawerRoutes} />,
};

export default DrawerNavigator(drawerRoutes, drawerConfigs);
