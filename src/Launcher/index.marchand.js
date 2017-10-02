//import liraries
import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import MainStack from "./app/configs/navigation/navigationM/mainStack";
import EStyleSheet from "react-native-extended-stylesheet";
<<<<<<< HEAD
=======
import { setJSExceptionHandler } from "react-native-exception-handler";
>>>>>>> 47f74c47e7b6d8b565d5b7732edc5586dabec80a
import { Font } from "expo";

EStyleSheet.build({ outline: 0 });
// create a component

<<<<<<< HEAD
=======
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

>>>>>>> 47f74c47e7b6d8b565d5b7732edc5586dabec80a
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
