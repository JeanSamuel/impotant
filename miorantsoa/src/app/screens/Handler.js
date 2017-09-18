//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Services from "../utils/services";
import Pin from "./Pin";
import Home from "./Home";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newUser: null,
      navigation: this.props.navigation
    };
  }

  componentDidMount() {
    services = new Services();
    services.getData("user_id").then(user_id => {
      console.log(user_id);
      this.setState({ isLoading: false, newUser: true });
      if (user_id != null) {
        this.setState({ newUser: false, isLoading: false });
      }
    });
  }
  render() {
    {
      console.log(this.state.navigation);
      if (this.state.isLoading) {
        return <ActivityIndicator />;
      } else {
        if (this.state.newUser) {
          return <Home navigation={this.state.navigation} />;
        } else {
          return <Pin navigation={this.state.navigation} />;
        }
      }
    }
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
