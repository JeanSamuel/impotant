//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Container } from "../components/Container";
import Services from "../utils/services";
import NotifServices from "../utils/notifications";

// create a component
class Logout extends Component {
  componentDidMount() {
    services = new Services();
    norifService = new NotifServices();
    services.logout().then(() => {
      norifService.stopNotification(this.props.navigation.state.params.user_id);
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
