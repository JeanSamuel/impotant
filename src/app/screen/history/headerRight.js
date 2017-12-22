//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

// create a component
class HeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.action()}
          activeOpacity={0.3}
        >
          <Icon
            name="ios-search"
            color="#ecf0f1"
            size={30}
            type="ionicon"
          />
        </TouchableOpacity>
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
    alignContent: "center",
    marginHorizontal: 10,
    backgroundColor: "transparent"
  }
});

//make this component available to the app
export default HeaderRight;
