import React from "react";
import { Notifications } from "expo";
import { Text, View } from "react-native";
import DropdownAlert from "react-native-dropdownalert";

export default class AppContainer extends React.Component {
  state = {
    notification: {},
    title: "transaction",
    message: "Vous venez de recevoir 1500 Ar"
  };

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  makeAction() {
    this.props.action();
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    this.createTextNotif();
    // this.showAlert();
    console.log("====================================");
    console.log("notif", this.state.notification);
    console.log("====================================");
  };

  createTextNotif() {}

  showAlert() {
    const random = Math.floor(10000);
    this.dropdown.alertWithType("info", this.state.title, this.state.message);
  }

  dismissAlert = () => {
    this.dropdown.onClose();
  };

  onClose(data) {
    console.log(data);
  }

  render() {
    return (
      <View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
        />
      </View>
    );
  }
}
