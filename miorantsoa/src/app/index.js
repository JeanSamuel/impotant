import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Home from "./screens/Home";
import { Container } from "./components/Container";
import Navigator from "./config/routes";

EStyleSheet.build({
  // outline: 1,
  $primaryBlue: "#34495e",
  $white: "#FFFFFF",
  $lightGray: "#F0F0F0",
  $border: "#E2E2E2",
  $inputText: "#797979",
  $darkText: "#343434",
  $primaryGreen: "#1e9228",
  $inputBG: "rgba(250,250,250,0.8)"
});

export default () => <Navigator />;
