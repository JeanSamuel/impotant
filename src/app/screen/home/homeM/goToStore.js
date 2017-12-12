//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { width, height } from "Dimensions";
import { styleBase } from "../../../styles";
import AppLink from "react-native-app-link";
// create a component
class GoToStore extends Component {
  goToStore() {
    AppLink.openInStore("id529379082", "me.lyft.android")
      .then(() => {
        console.log("vita");
      })
      .catch(err => {
        // handle error
      });
  }

  render() {
    let store = require("../../../assets/images/icons/appStore.jpg");
    if (Platform.OS == "android") {
      store = require("../../../assets/images/icons/playStore.jpg");
    }
    return (
      <View style={[styleBase.centered, { paddingBottom: 10 }]}>
        <Text style={{ color: "#7f8c8d" }}>Pour envoyer de l'argent</Text>
        <Text style={{ color: "#7f8c8d" }}>
          L'application{" "}
          <Text onPress={() => this.goToStore()} style={{ color: "blue" }}>
            AriaryClient{" "}
          </Text>
          est disponible sur Store
        </Text>
        <TouchableOpacity onPress={() => this.goToStore()}>
          <Image
            source={store}
            resizeMode="center"
            style={{ width: 150, height: 50 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//make this component available to the app
export default GoToStore;
