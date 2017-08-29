//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Row, RowValue, Separator, RowTitle } from "../../../components/row";
import styleBase from "../../../styles/Styles";
import { Icon } from "react-native-elements";

// create a component
const self = null;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    self = this;
  }

  static navigationOptions = navigation => {
    return {
      title: "Mon compte",
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
        <RowTitle title="Profil d'utilisateur" />
        <RowValue
          menu="Pseudo"
          value="toavina02"
          action={() => console.log("zertyu")}
          noNext={true}
        />
        <Separator />
        <RowValue
          menu="Nom"
          value="Toavina Ralambosoa"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Adresse e-mail"
          value="toavina@nivo.mg"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Téléphone"
          value="+261346781828"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Date de naissance"
          value="24 mai 1995"
          action={() => console.log("zertyu")}
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
export default UserInfo;
