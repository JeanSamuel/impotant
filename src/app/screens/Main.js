//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container } from "../components/Container";
import { Header } from "native-base";
import Send from "./Send";

// create a component
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("navigation props ", this.props.navigation.state.params);
    return (
      <View style={styles.container}>
        <Send navigation={this.props.navigation} />
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
export default Main;
