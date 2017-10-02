import React from "react";
import {
  StatusBar,
  ActivityIndicator,
  Alert,
  Text,
  BackHandler,
  View
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Container } from "./app/components/ContainerC";
import { setJSExceptionHandler } from "react-native-exception-handler";
import Navigator from "./app/configs/navigation/navigationC/routes";
import DropdownAlert from "react-native-dropdownalert";
import { Notifications } from "expo";
EStyleSheet.build({
  $primaryBlue: "#34495e",
  $white: "#FFFFFF",
  $lightGray: "#F0F0F0",
  $border: "#E2E2E2",
  $inputText: "#797979",
  $darkText: "#343434",
  $primaryGreen: "#1e9228",
  $inputBG: "rgba(250,250,250,0.8)"
});

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      "Unexpected error occurred",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}

        The app will close.
        `,
      [
        {
          text: "Ok",
          onPress: () => {
            BackHandler.exitApp();
          }
        }
      ]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler);

const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};
export default class Apk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }
  componentDidMount() {
    Expo.Font
      .loadAsync({
        Arial: require("./app/font/arial.ttf")
      })
      .then(() => {
        this.setState({ fontLoaded: true });
      });
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
    const sender = notification.data.otherUser;
    let debutMessage = "Vous venez d'envoyer ";
    let finMessage = " Ar à ";

    // if (notification.data.title == "Envoi d'argent") {
    //   debutMessage = "Vous venez d'envoyer ";
    //   finMessage = " Ar à ";
    // }
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
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <Navigator />
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              onClose={data => this.onClose(data)}
              containerStyle={{ marginTop: 20 }}
              closeInterval={5000}
            />
          </View>
        ) : (
          <Container>
            <ActivityIndicator size="large" />
          </Container>
        )}
      </View>
    );
  }
}
