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
import configureStore from "./app/store/configureStore";

EStyleSheet.build({
  $primaryBlue: "#34495e",
  $white: "#FFFFFF",
  $darkColor: "#1C2E48",
  $lightGray: "#E6E6E6",
  $border: "#E2E2E2",
  // $darkColor: "#1C2E48",
  $darkColor: "#00d07f",
  $primaryColor: "#128FB5",
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

export default class Apk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Arial: require("./app/font/arial.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const Main = Navigator;
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />

            <Navigator />
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
