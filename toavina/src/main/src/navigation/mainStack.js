import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { Notifications } from "expo";
import { StackNavigator } from "react-navigation";
import DrawerExample from "./drawer";
import Starter from "../starter/starter";
import Loader from "../starter/loader";
import Login from "../login/login";
import NewUser from "../register/newUser";
import Services from "../services/services";

// create a component
const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};
class Launcher extends Component {
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
    console.log("====================================");
    console.log("notification", notification);
    console.log("navigation", this.props);
    console.log("====================================");
    this.showAlert(notification);
  };

  showAlert(notification) {
    const title = data.title;
    const amount = notification.data.amount;
    const sender = notification.data.otherUser;
    let debutMessage = "Vous venez de recevoir ";
    let finMessage = " Ar de la part de ";

    if (notification.data.title == "Envoi d'argent") {
      debutMessage = "Vous venez d'envoyer ";
      finMessage = " Ar à ";
    }
    const message = debutMessage + amount + finMessage + sender;
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
      <View style={styles.container}>
        <MainStack />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
          containerStyle={{ marginTop: 20 }}
          closeInterval={5000}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

//make this component available to the app
export default Launcher;

const MainStack = new StackNavigator(
  {
    Loader: {
      screen: Loader
    },
    Starter: {
      screen: Starter
    },
    NewUser: {
      screen: NewUser
    },
    DrawerExample: {
      screen: DrawerExample
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Loader",
    navigationOptions: {
      header: null
    }
  }
);
