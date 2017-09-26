//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Landing from "./Landing";
import { Pin } from "../../login/loginC";
import Services from "../../../services/services";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newUser: null
    };
  }

  componentDidMount() {
    services = new Services();
    services.getData("user_id").then(user_id => {
      console.log("ato tsika zao", user_id);
      if (user_id !== null) {
        this.setState({ newUser: false, isLoading: false });
      } else {
        this.setState({ newUser: true, isLoading: false });
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
          <Landing navigation={this.props.navigation} />
        ) : (
          <Pin navigation={this.props.navigation} />
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
