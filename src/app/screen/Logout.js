//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Container } from "../components/ContainerC";
import Services from "../services/services";
import NotifServices from "../services/notificationServices";

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
