//import liraries
import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class Row extends Component {
  static propTypes = {
    accountId: PropTypes.number,
    date: PropTypes.string
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.accountId}</Text>
          <Text>{this.props.date}</Text>
        </View>
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
export default Row;
