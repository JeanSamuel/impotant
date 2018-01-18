import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import Validation from "./app/screen/validate";
import Profil from "./app/screen/profil";

export default class Index extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar hidden={true} />
        <Profil />
      </View>
    );
  }
}
