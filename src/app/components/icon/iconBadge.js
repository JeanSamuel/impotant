//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { Icon } from "react-native-elements";
import IconBadge from "react-native-icon-badge"; // 1.1.3
import { Notifications } from "expo";
import Services from "../../services/services";

// create a component
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
      number: 0
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    if(notification.data.type == 'transaction'){
      let services = new Services();
      this.setState({ notification: notification });
      this.setState({
        number: this.state.number + 1
      });
      services.saveData("numberBadge", this.state.number.toString());
    } 
  };

  componentDidMount() {
    this.getNumberUnread();
  }

  async getNumberUnread() {
    let services = new Services();
    if (this.props.navigation.state.routeName == "History") {
      let num = 0;
      await services.saveData("numberBadge", num.toString());
    } else {
      await services
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

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          this.props.navigation.navigate("Third");
        }}
      >
        <IconBadge
          MainElement={
            <View>
              <Icon
                name="ios-paper-outline"
                color="white"
                size={35}
                type="ionicon"
                style={{
                  paddingRight: 10
                }}
              />
            </View>
          }
          BadgeElement={
            <Text style={{ color: "#FFF", fontSize: 12 }}>
              {this.state.number}
            </Text>
          }
          IconBadgeStyle={{
            width: 20,
            height: 20,
            backgroundColor: "#FF0000"
          }}
          Hidden={this.state.number == 0}
        />
      </TouchableOpacity>
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
export default MyClass;
