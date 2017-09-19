// //import liraries
import React, { Component } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { Icon } from "react-native-elements";

// create a component
class DrawerButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.navigate("DrawerOpen");
          }}
        >
          <Icon
            name="ios-menu-outline"
            color="white"
            size={30}
            type="ionicon"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//make this component available to the app
export default DrawerButton;
