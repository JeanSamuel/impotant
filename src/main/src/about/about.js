//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class WarningConnexion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="signal-wifi-off" size={40} />
        <Text>Erreur lors de la connexion aux serveurs</Text>
        <Text>Veuillez verifiez votre connexion</Text>
        <Text>Ou réessayer un peu plus tard</Text>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 195, 199,1.0)"
  }
});

//make this component available to the app
export default WarningConnexion;
