//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import History from "../history/historyM";
import headStyle from "../../styles/stylesC/headerStyle";
import To from "./To";
// create a component
class Send extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Send</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

const NestedSendStack = StackNavigator({
  Send: {
    screen: Send,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home-outline" size={25} type="ionicon" />
      ),
      title: "Home",
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: { color: "#fff" },
      headerLeft: (
        <View
          style={{
            alignContent: "center",
            marginHorizontal: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View
          style={{
            alignContent: "center",
            marginRight: 10
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("History", {
                user_id: navigation.state.params.user_id
              })}
          >
            <Icon name="back-in-time" type="entypo" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )
    })
  },
  To: {
    screen: To
  },
  History: {
    screen: History,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
});
export default NestedSendStack;
