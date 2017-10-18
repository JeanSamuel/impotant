//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  BackHandler,
  Alert
} from "react-native";
import { NotificationServices } from "../../../services";
import Services from "../../../services/services";

// create a component
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this._checkBackAndroid = this._checkBackAndroid.bind(this);
  }

  componentWillMount() {
    var services = new Services();
    BackHandler.addEventListener("hardwareBackPress", this._checkBackAndroid);
    services.getData("userData").then(userData => {
      if (userData === null) {
        this.props.navigation.navigate("Starter");
      } else {
        dataParsed = JSON.parse(userData);
        let data = {
          user_id : dataParsed.pseudo
        }
        this.props.navigation.navigate("Drawer", data);
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._checkBackAndroid
    );
  }

  _checkBackAndroid() {
    let routName = this.props.navigation.state.routeName;
    if (routName == "Starter" || routName == "First") {
      return true;
    } else {
      // this.props.navigation.goBack();
      return false;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  }
});

//make this component available to the app
export default Loader;
