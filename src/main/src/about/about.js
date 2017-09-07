//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { Button } from "react-native-elements";
import ExpoNotif from "../notification/";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";

// create a component

const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Info",
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};

class About extends Component {
  handleRequestCallback(err, response) {
    if (err != null) {
      this.dropdown.alertWithType("error", "Error", err);
    }
  }

  componentDidMount() {
    // this.showAlert();
  }

  onClose(data) {
    console.log("====================================");
    console.log("data", data);
    console.log("====================================");
    // data = {type, title, message, action}
    // action means how the alert was dismissed. returns: automatic, programmatic, tap, pan or cancel
  }

  showAlert() {
    const random = Math.floor(10000);
    const title = data.title + " #" + random;
    this.dropdown.alertWithType(data.type, title, data.message);
  }
  dismissAlert = () => {
    this.dropdown.onClose();
  };
  onClose(data) {
    console.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
        <Button title="click me" onPress={() => this.showAlert()} />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
          containerStyle={{ marginTop: 20 }}
        />
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

const stackHome = new StackNavigator(
  {
    About: {
      screen: About,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: "test",
      drawerLabel: "About",
      headerRight: <Text>B</Text>,
      titleStyle: styleBase.headerTitle
    })
  }
);

export default stackHome;
