//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Services from "../services/services";
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
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            />
          </View>
        ) : this.state.newUser ? (
          <Home navigation={this.state.navigation} />
        ) : (
          <Pin navigation={this.state.navigation} />
        )}
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
