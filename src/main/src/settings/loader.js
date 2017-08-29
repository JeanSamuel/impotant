//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard
} from "react-native";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";
import { Icon } from "react-native-elements";
import Settings from "./settings";
import Assistant from "../assistance/assistant";

// create a component
class LoaderSettings extends Component {
  static navigationOptions = navigation => {
    return {
      title: "Paramètres",
      drawerLabel: "Paramètres",
      drawerIcon: ({ tintColor }) => <Icon name="settings" size={25} />,
      titleStyle: styleBase.headerTitle,
      headerRight: <Icon name="help" color="#ecf0f1" size={30} />
    };
  };
  goBack() {
    this.props.navigation.navigate("Settings");
  }

  componentDidMount() {
    this.props.navigation.navigate("Assistant", {
      remove: this.goBack.bind(this)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
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
    backgroundColor: "rgba(236, 240, 241,1.0)"
  }
});

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    LoaderSettings: {
      screen: LoaderSettings,
      navigationOptions
    },
    Assistant: {
      screen: Assistant,
      navigationOptions: {
        header: null
      }
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);
export default StackSettings;
