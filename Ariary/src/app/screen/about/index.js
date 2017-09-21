//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { styleBase } from "../../styles";
import { StackNavigator } from "react-navigation";
import DrawerMenu from "../../components/drawerMenu";
import { Icon } from "react-native-elements";

// create a component
class MyClass extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            elevation: 1000,
            backgroundColor: "red",
            height: 150,
            position: "absolute",
            top: -20,
            left: 0
          }}
        >
          <Text style={{ fontSize: 40 }}>Toavina</Text>
        </View>
        <Text>MyClass</Text>
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

//make this component available to the app
const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    MyClass: {
      screen: MyClass,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerMenu navigation={navigation} keyboard={Keyboard} />,
      title: "About",
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={25} type="ionicon" />
      ),
      titleStyle: styleBase.headerTitle
    })
  }
);
export default StackSettings;
