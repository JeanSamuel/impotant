import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { Notifications} from "expo";
import { StackNavigator } from "react-navigation";
import Drawer from "./drawer";
import Services from "../../../services/services";
import { Starter, Loader, AppSync } from "../../../screen/listScreenM";
// import Starter from "../../../screen/starter";


class MainStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {}
    };
  }

  componentWillMount() {
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    this.showAlert(notification);
  };

  showAlert(notification) {
    const title = 'Transaction';
    const amount = notification.data.amount;
    const sender = notification.data.otherUser;
    let debutMessage = "Vous venez de recevoir ";
    let finMessage = " Ar de la part de ";

    if (notification.data.title == "Envoi d'argent") {
      debutMessage = "Vous venez d'envoyer ";
      finMessage = " Ar à ";
    }
    const message = debutMessage + amount + finMessage + sender;
    this.dropdown.alertWithType('info', title, message);
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
        <MainNavigator />
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
export default MainStack;

const MainNavigator = new StackNavigator(
  {
    Handler: {
      screen: Loader
    },
    Starter: {
      screen: Starter
    },
    Drawer: {
      screen: Drawer
    },
    AppSync: {
      screen: AppSync
    }
  },
  {
    initialRouteName: "Handler",
    navigationOptions: {
      header: null
    }
  }
);
