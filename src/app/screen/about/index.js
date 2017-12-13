//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { styleBase } from "../../assets/styles";
import { StackNavigator } from "react-navigation";
import { DrawerMenu } from "../../components/drawerMenu/";
import { Icon } from "react-native-elements";
import { Info } from "../../components/info";
import EStyleSheet from "react-native-extended-stylesheet";
import { IconBadge } from "../../components/icon";

// create a component
class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AriaryPro</Text>
          <Text style={styles.titlePlus}>
            L'application Ariary.net spécialisée pour les sociétés et les
            marchands
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Info title="Version" value="1.0.0.2" />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    paddingHorizontal: "5%"
  },
  title: {
    fontSize: 30,
    fontWeight: "100",
    color: "white"
  },
  titlePlus: {
    color: "white"
  },
  titleContainer: {
    marginVertical: 20
  }
});

//make this component available to the app
const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    About: {
      screen: About,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerMenu navigation={navigation} keyboard={Keyboard} />,
      headerRight: <IconBadge navigation={navigation} />,
      title: "A propos",
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={25} type="ionicon" />
      ),
      titleStyle: styleBase.headerTitle
    })
  }
);
export default StackSettings;
