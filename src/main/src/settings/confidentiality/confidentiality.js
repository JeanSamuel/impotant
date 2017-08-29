//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Row, RowValue, Separator, RowTitle } from "../../../components/row";
import styleBase from "../../../styles/Styles";
import { Icon } from "react-native-elements";

// create a component
const self = null;
class Confidentiality extends Component {
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
          title="Conditions et confidentialités"
          help={"Conditions d'utilisation et politiques de confidentialité"}
        />
        <RowValue
          menu="Droit et résponsabilité"
          value="Condition que vous acceptez en utilisant l'application"
          action={() => console.log("zertyu")}
          noNext={true}
        />
        <RowValue
          menu="Politique d'utilisation des données"
          value="Les informations que nous recevons et les utilisations"
          action={() => console.log("zertyu")}
          noNext={true}
        />
        <RowValue
          menu="La loi malgache"
          value="Les responsabilités de chacun vis à vis de la loi malgache"
          action={() => console.log("zertyu")}
          noNext={true}
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
export default Confidentiality;
