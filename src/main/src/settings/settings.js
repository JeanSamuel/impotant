//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ListView,
  ScrollView
} from "react-native";
import { Row, RowValue, Separator } from "../../components/row";
import { UserInfo, Security, Confidentiality } from "./";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";
import { Icon } from "react-native-elements";

// create a component
class Settings extends Component {
  static navigationOptions = navigation => {
    return {
      title: "Paramètres",
      drawerLabel: "Paramètres",
      drawerIcon: ({ tintColor }) => <Icon name="settings" size={25} />,
      titleStyle: styleBase.headerTitle,
      headerRight: <Icon name="help" color="#ecf0f1" size={30} />
    };
  };

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <UserInfo />
          <Security />
          <Confidentiality />
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(236, 240, 241,1.0)",
    paddingBottom: 20
  }
});

//make this component available to the app
const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackSettings = new StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);
export default stackSettings;
