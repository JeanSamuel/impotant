// //import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { Icon } from "react-native-elements";
import Style from "../../styles/MainStyles";
import Services from "../services/services";
import IconBadge from "react-native-icon-badge"; // 1.1.3
import { Notifications } from "expo";

// create a component
class DrawerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifExpo: null,
      notification: {},
      title: "transaction",
      message: "Vous venez de recevoir 1500 Ar",
      number: 0
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  componentDidMount() {
    let services = new Services();
    this.getNumberUnread();
  }

  getNumberUnread() {
    let services = new Services();
    if (this.props.navigation.state.routeName == "History") {
      let num = 0;
      services.saveData("numberBadge", num.toString());
    } else {
      services
        .getData("numberBadge")
        .then(response => {
          if (response != null) {
            this.setState({ number: this.state.number + parseInt(response) });
          } else {
            this.setState({ number: 0 });
          }
        })
        .catch(error => {
          this.setState({ number: 0 });
        });
    }
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    let services = new Services();
    this.setState({ notification: notification });
    this.setState({
      number: this.state.number + 1
    });
    services.saveData("numberBadge", this.state.number.toString());
  };

  checkNumberNewTransaction() {}

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.navigate("DrawerOpen");
          }}
        >
          {this.state.number == 0 ? (
            <Icon name="menu" color="white" size={30} />
          ) : (
            <IconBadge
              MainElement={<Icon name="menu" color="white" size={35} />}
              BadgeElement={
                <Text style={{ color: "#FFF", fontSize: 12 }}>
                  {this.state.number}
                </Text>
              }
              IconBadgeStyle={{
                position: "absolute",
                top: 1,
                right: 0,
                minWidth: 20,
                height: 20,
                marginLeft: 10,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FF0000"
              }}
            />
          )}
        </TouchableOpacity>
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
export default DrawerButton;
