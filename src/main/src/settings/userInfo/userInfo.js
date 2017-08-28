//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Icon } from "react-native-elements";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";

// create a component
class UserInfo extends Component {
  static navigationOptions = navigation => {
    return {
      title: "user Info",
      drawerLabel: "Mon compte",
      drawerIcon: ({ tintColor }) => <Icon name="account-circle" size={25} />,
      titleStyle: styleBase.headerTitle,
      headerRight: <Icon name="help" color="#ecf0f1" size={30} />
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>UserInfo</Text>
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

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackUserInfo = new StackNavigator(
  {
    UserInfo: {
      screen: UserInfo,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);

//make this component available to the app
export default stackUserInfo;
