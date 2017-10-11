import React from "react";
import {
  StatusBar,
  ActivityIndicator,
  Alert,
  Text,
  BackHandler,
  View
} from "react-native";
import { Notifications } from "expo";
import EStyleSheet from "react-native-extended-stylesheet";
import { Container } from "./app/components/ContainerC";
import DropdownAlert from "react-native-dropdownalert";
import { setJSExceptionHandler } from "react-native-exception-handler";
import Navigator from "./app/configs/navigation/navigationC/routes";

EStyleSheet.build({
  // outline: 1,
  $primaryBlue: "#34495e",
  $white: "#FFFFFF",
  $lightGray: "#E6E6E6",
  $border: "#E2E2E2",
  $primaryColor: "#128FB5",
  $inputText: "#797979",
  $darkText: "#343434",
  $primaryGreen: "#1e9228",
  $inputBG: "rgba(250,250,250,0.8)"
});

const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};

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

export default class Apk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Arial: require("./app/font/arial.ttf")
    });
    this.setState({ fontLoaded: true });
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
    let debutMessage = "Vous venez d'envoyer' ";
    let finMessage = " Ar à ";
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
    const Main = Navigator;
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
