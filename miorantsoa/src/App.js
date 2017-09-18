import React from "react";
import App from "./app/index";
import { Root } from "native-base";
import { StatusBar, ActivityIndicator } from "react-native";
import { Container } from "./app/components/Container";

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
