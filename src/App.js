//import liraries
import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator, Alert } from "react-native";
import MainStack from "./app/configs/navigation/navigationM/mainStack";
import EStyleSheet from "react-native-extended-stylesheet";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { Font } from "expo";

EStyleSheet.build({ outline: 0 });
// create a component

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

setJSExceptionHandler(errorHandler, true);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Arial: require("./app/font/arial.ttf")
    });
    this.setState({ isLoaded: true });
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <MainStack />
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}

//make this component available to the app
export default Index;
