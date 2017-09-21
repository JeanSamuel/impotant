//import liraries
import React, { Component } from "react";
import { ScrollView } from "react-native";
import { DrawerNavigator, DrawerItems } from "react-navigation";
import DrawerContent from "./drawerContent";
import {
  Home,
  History,
  Settings,
  Logout,
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
  Fifth: {
    path: "/sent1",
    screen: Settings
  },
  Fourth: {
    path: "/",
    screen: About
  },
  Sixth: {
    path: "/sent2",
    screen: Logout
  }
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

const DrawerExample = DrawerNavigator(drawerRoutes, drawerConfigs);

export default DrawerExample;
