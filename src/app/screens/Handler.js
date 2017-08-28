//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Services from "../utils/services";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentWillMount() {
    // this.props.navigation.navigate("Landing");
    services = new Services();
    await services.getData("user_id").then(user_id => {
      console.log(user_id);
      if (user_id != null) {
        this.props.navigation.navigate("Pin");
      } else {
        this.props.navigation.navigate("Landing");
      }
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
export default Handler;
