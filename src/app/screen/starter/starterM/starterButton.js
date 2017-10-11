//import liraries
import React, { Component } from "react";
import { View } from "react-native";
import { DoubleLineButton } from "../../../components/button";

class StarterButton extends Component {
  synchronise() {
    this.props.navigation.navigate("AppSync");
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
          action={() => this.synchronise()}
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
