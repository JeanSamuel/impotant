// //import liraries
import React, { Component } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { Icon } from "react-native-elements";

// create a component
class DrawerMenu extends Component {
  render() {
    return (
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.navigate("DrawerOpen");
          }}
        >
          <Icon name="ios-menu" color="white" size={30} type="ionicon" />
        </TouchableOpacity>
      </View>
    );
  }
}

//make this component available to the app
export default DrawerMenu;
