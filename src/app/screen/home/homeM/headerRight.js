//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Services } from "../../../services";
import { styleBase } from "../../../styles";
import { IconBadge } from "../../../components/icon";

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
        <IconBadge navigation={this.props.navigation} />
        <TouchableOpacity
          onPress={() => this.share()}
          style={{ marginLeft: 20 }}
        >
          <Icon name="share-google" size={30} color={"#FFF"} type="evilicon" />
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
