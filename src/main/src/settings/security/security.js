//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Row, RowValue, Separator, RowTitle } from "../../../components/row";
import styleBase from "../../../styles/Styles";
import { Icon } from "react-native-elements";

// create a component
const self = null;
class Security extends Component {
  constructor(props) {
    super(props);
    self = this;
  }

  static navigationOptions = navigation => {
    return {
      title: "Connexion et Sécurité",
      drawerLabel: "Paramètres",
      drawerIcon: ({ tintColor }) => <Icon name="settings" size={25} />,
      titleStyle: styleBase.headerTitle,
      headerRight: <Icon name="help" color="#ecf0f1" size={30} />,
      headerLeft: (
        <TouchableOpacity onPress={() => self.goBack()}>
          <Icon name="arrow-back" color="#ecf0f1" size={30} />
        </TouchableOpacity>
      )
    };
  };

  goBack() {
    this.props.navigation.navigate("Settings");
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
