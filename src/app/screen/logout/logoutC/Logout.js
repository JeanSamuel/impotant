//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Services from "../../../services/services";
import NotifServices from "../../../services/notificationServices";

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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
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
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default Logout;
