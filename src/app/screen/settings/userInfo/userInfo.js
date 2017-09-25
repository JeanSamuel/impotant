//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RowValue, Separator, RowTitle } from "../../../components/row";
import { styleBase } from "../../../styles";

// create a component
const self = null;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    self = this;
  }

  goBack() {
    this.props.navigation.navigate("Settings");
  }

  render() {
    return (
      <View style={styles.container}>
        <RowTitle title="Profil d'utilisateur" />
        <RowValue
          menu="Pseudo"
          value={this.props.user_id}
          action={() => console.log("zertyu")}
          noNext={true}
        />
        <Separator />
        <RowValue
          menu="Nom"
          value="non défini"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Adresse e-mail"
          value="non défini"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Téléphone"
          value="non défini"
          action={() => console.log("zertyu")}
        />
        <Separator />
        <RowValue
          menu="Date de naissance"
          value="non défini"
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
