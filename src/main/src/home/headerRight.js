//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Services from "../services/services";
import styleBase from "../../styles/Styles";

// create a component
class HeaderRight extends Component {
  share() {
    this.props.actionShare();
  }

  render() {
    return (
      <View
        style={[styleBase.alignCentered, { justifyContent: "space-between" }]}
      >
        <TouchableOpacity
          onPress={() => this.share()}
          style={{ marginHorizontal: 10 }}
        >
          <Icon name="file-download" size={30} color={"#FFF"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.share()}
          style={{ marginHorizontal: 10 }}
        >
          <Icon name="share" size={30} color={"#FFF"} />
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
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default HeaderRight;
