//import liraries
import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import DrawerContent from "./drawerContent";
import { Icon } from "react-native-elements";
import {
  Home,
  History,
  About,
  Settings
} from "../../../screen/listScreenM";

// DrawerNavigator path

const drawerRoutes = {
  First: {
    path: "/",
    screen: Home
  },
  Fifth : {
    path : '/settings',
    screen : Settings
  },
  Third: {
    path: "/sent",
    screen: History
  },  
  Fourth: {
    path: "/",
    screen: About 
  }
};

// DrawerNavigator configuration

const drawerConfigs = {
  initialRouteName: "Fifth",
  drawerPosition: "left",
  contentOptions: {
    activeBackgroundColor: "#bdc3c7",
    activeTintColor: "#FFF",
    style: { marginTop: 0 }
  },
  headerMode: "screen",
  contentComponent: props =>  {
     var copyprops = Object.assign({}, props); 
     copyprops.items = copy.items.filter( item => item.key !== 'login' )
      return ( <ScrollView> <DrawerItems { ...copyprops }/> </ScrollView> )
     }

  // contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={drawerRoutes} />,
};

export default DrawerNavigator(drawerRoutes, drawerConfigs);
