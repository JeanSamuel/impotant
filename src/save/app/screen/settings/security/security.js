//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RowValue, RowTitle } from "../../../components/row";
import { Constants } from "expo";

// create a component
const self = null;
class Security extends Component {
  goBack() {
    this.props.navigation.navigate("Settings");
  }

  componentDidMount() {
    console.log("====================================");
    console.log("deveice info", Expo.Constants);
    console.log("====================================");
  }

  render() {
    return (
      <View style={styles.container}>
        <RowTitle
          title="Liste des appareils connectés"
          help={
            "Les périphériques qui sont connéctés à votre compte et qui reçoivent des notifications à chaque transaction"
          }
        />
        <RowValue
          menu="Sony XPERIA ZR"
          value="Antananarivo, Madagascar"
          action={() => console.log("zertyu")}
          iconName="phone-android"
          noNext={true}
        />
        <RowValue
          menu="ZTE Blade L110"
          value="Antananarivo, Madagascar"
          action={() => console.log("zertyu")}
          iconName="phone-android"
          noNext={true}
        />
        <RowValue
          menu="PC Windows"
          value="Antananarivo, Madagascar"
          action={() => console.log("zertyu")}
          iconName="computer"
          noNext={true}
        />

        <RowTitle title="Connexion" />
        <RowValue
          menu="Changer mot de passe"
          value="Tous les autres périphériques seront déconnectés"
          action={() => console.log("zertyu")}
          iconName="vpn-key"
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: { paddingHorizontal: 5 }
});

//make this component available to the app
export default Security;
