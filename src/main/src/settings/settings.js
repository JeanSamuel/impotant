//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard, ListView } from "react-native";
import { Row } from "../../components/row";
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
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <Row
          text="Mon Compte"
          action={() => console.log("zertyu")}
          iconName="supervisor-account"
        />
        <View
          style={{
            borderBottomColor: "rgba(149, 165, 166,0.5)",
            borderBottomWidth: 1
          }}
        />
        <Row
          text="Connexion et Sécurité"
          action={() => console.log("zertyu")}
          iconName="security"
        />
        <View
          style={{
            borderBottomColor: "rgba(149, 165, 166,0.5)",
            borderBottomWidth: 1
          }}
        />
        <Row
          text="Confidentialité"
          action={() => console.log("zertyu")}
          iconName="security"
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(189, 195, 199,1.0)"
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
