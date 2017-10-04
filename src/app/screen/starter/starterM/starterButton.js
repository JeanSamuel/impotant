//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DoubleLineButton } from "../../../components/button";
import data from "../../../configs/data/dataM";

// create a component
const uri = data.BASE_URL;
class StarterButton extends Component {
  createNewUser() {
    this.props.navigation.navigate("NewUser");
  }

  goToLogin() {
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View>
        {/* <DoubleLineButton
          action={() => this.createNewUser()}
          firstLine="Je suis NOUVEAU"
          secondLine="Je n'ai pas encore de compte"
          color="rgba(22, 160, 133,1.0)"
          navigation={this.props.navigation}
        /> */}
        {/* <DoubleLineButton
          action={() => this.goToLogin(uri)}
          firstLine="J'ai déjà un compte"
          secondLine="Je me connecte sur Ariary.net"
          color="rgba(41, 128, 185,1.0)"
        /> */}
        <DoubleLineButton
          action={() => this.goToLogin(uri)}
          firstLine="Synchronisation"
          secondLine="avec une application Ariary.net"
          color="rgba(22, 160, 133,1.0)"
        />
      </View>
    );
  }
}

//make this component available to the app
export default StarterButton;
