import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Navigation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BOnjour</Text>
        <Text>BOnjour</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  header: {
    backgroundColor: "rgba(0,0,0,0)",
    paddingVertical: 15,
    flexDirection: "row"
  }
});
