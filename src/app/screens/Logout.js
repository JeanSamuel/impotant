//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Container } from "../components/Container";
import Services from "../utils/services";

// create a component
class Logout extends Component {
  componentDidMount() {
    services = new Services();
    services.logout().then(() => {
      this.props.navigation.navigate("Landing");
    });
  }
  render() {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
}

//make this component available to the app
export default Logout;
