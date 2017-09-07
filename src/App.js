//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MainStack from "./main/src/navigation/mainStack";
import EStyleSheet from "react-native-extended-stylesheet";
import DropdownAlert from "react-native-dropdownalert";
import { Notifications } from "expo";

EStyleSheet.build({ outline: 0 });
// create a component
const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {}
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    this.dismissAlert();
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    this.showAlert(notification);
  };

  showAlert(notification) {
    const title = data.title;
    const amount = notification.data.amount;
    const sender = notification.data.from;
    const message =
      "Vous venez de recevoir " + amount + " Ar de la part de " + sender;
    this.dropdown.alertWithType(data.type, title, message);
  }
  dismissAlert = () => {
    this.dropdown.onClose();
  };
  onClose(data) {
    console.log(data);
  }

  handleRequestCallback(err, response) {
    if (err != null) {
      this.dropdown.alertWithType("error", "Error", err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <MainStack />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
          containerStyle={{ marginTop: 20 }}
          closeInterval={20000}
        />
      </View>
    );
  }
}

//make this component available to the app
export default Index;
