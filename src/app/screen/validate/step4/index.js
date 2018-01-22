import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ListView
} from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Icon
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { Header, TextInput, Card, Separator } from "../allSteps";
import PropTypes from "prop-types";

const deviceWidth = Dimensions.get("window").width;

export default class Step4 extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = () => ({
    connexion: PropTypes.shape({
      email: PropTypes.string.isRequired,
      pseudo: PropTypes.string.isRequired,
      identifiant: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      nom: PropTypes.string.isRequired,
      cin: PropTypes.string.isRequired,
      dateN: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      adresse: PropTypes.string.isRequired,
      ville: PropTypes.string.isRequired
    }).isRequired,
    pieces: PropTypes.shape({
      userPhoto: PropTypes.string.isRequired,
      cinPhoto: PropTypes.string.isRequired
    }).isRequired
  });

  someFunction = () => {};
  goToNextStep = () => {
    this.props.navigation.navigate("Profil");
  };

  renderConnexion = () => {
    const { connexion } = this.props.navigation.state.params;
    return (
      <Card data={connexion} title={"Connexion"} iconName={"verified-user"} />
    );
  };

  renderUser = () => {
    const { user } = this.props.navigation.state.params;
    return <Card data={user} title={"Utilisateur"} iconName={"contacts"} />;
  };

  renderPieces = () => {
    const { pieces } = this.props.navigation.state.params;
    return (
      <View />
      // <Card data={pieces} title={"Pièces jointes"} iconName={"add-a-photo"} />
    );
  };

  goToNextStep = () => {
    console.log("====================================");
    console.log("mankato", this.props.navigation);
    console.log("====================================");
  };

  render() {
    return (
      <View style={styles.container}>
        <Header position={3} title="Vos informations" />
        <ScrollView behavior="padding" style={styles.body}>
          {this.renderConnexion()}
          {Separator()}
          {this.renderUser()}
          {Separator()}
          {this.renderPieces()}
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={() => this.props.navigation.goBack()}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Je valide ces informations"
            backgroundColor="#01C89E"
            onPress={this.goToNextStep}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  buttonLeft: {
    backgroundColor: "rgba(189, 195, 199,0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  corpsContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  BouttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  card: {
    margin: 20
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20
  }
});
