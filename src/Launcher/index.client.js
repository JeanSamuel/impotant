import React from "react";
import {ActivityIndicator, Alert, BackHandler, StatusBar, View} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {Container} from "./app/components/ContainerC";
import {setJSExceptionHandler} from "react-native-exception-handler";
import Navigator from "./app/config/navigation/navigationClient/routes";
import colors from './app/config/constants/colors'

EStyleSheet.build(colors);

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
    //console.log(e); // So that we can see it in the ADB logs in case of Android if needed
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
      Arial: require("./app/assets/font/arial.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
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
