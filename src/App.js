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
  render() {
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
