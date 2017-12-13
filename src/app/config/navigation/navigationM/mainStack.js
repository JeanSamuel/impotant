import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import Drawer from "./drawer";
import Services from "../../../services/utils/services";
import { Starter, Loader, AppSync } from "../../../screen/listScreenM";
// import Starter from "../../../screen/starter";


class MainStack extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

//make this component available to the app
export default MainStack;

const MainNavigator = new StackNavigator(
  {
    Handler: {
      screen: Loader
    },
    Starter: {
      screen: Starter
    },
    Drawer: {
      screen: Drawer
    },
    AppSync: {
      screen: AppSync
    }
  },
  {
    initialRouteName: "AppSync",
    navigationOptions: {
      header: null
    }
  }
);
