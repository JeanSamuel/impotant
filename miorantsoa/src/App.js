import React from "react";
import App from "./app/index";
import { Root } from "native-base";
import { StatusBar, ActivityIndicator, Alert, Text, BackHandler } from "react-native";
import { Container } from "./app/components/Container";
import {setJSExceptionHandler} from 'react-native-exception-handler';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        The app will close.
        `,
      [{
        text: 'Ok',
        onPress: () => {
          BackHandler.exitApp()
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler,true);

export default class Apk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const Main = App;
    {
      if (this.state.fontLoaded === true) {
        return (
          <Root>
            <StatusBar hidden={true} />
            <App />
          </Root>
        );
      } else {
        return (
          <Container>
            <ActivityIndicator size="large" />
          </Container>
        );
      }
    }
  }
}
