import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { Text, Button, Avatar } from "react-native-elements";
import { Header, Card, Separator } from "../allSteps";
import PropTypes from "prop-types";
import Colors from "../../../config/constants/colors";
import { ImageUpload } from "../../../services";

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

  ValidateChange = () => {
    const { pieces, user, connexion } = this.props.navigation.state.params;
    ImageUpload.doUpload(pieces.userPhoto, pieces.cinPhoto, connexion, user)
      .then(response => {
        console.log("====================================");
        console.log("nety tsara misy ah", response);
        console.log("====================================");
      })
      .catch(error => {
        console.log("====================================");
        console.log("this is the error", error);
        console.log("====================================");
      });
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
      <View style={styles.piecesjointesContainer}>
        <View style={styles.piecesjointes} onPress={this.uploadPhoto}>
          <View>
            <Avatar
              medium
              source={{
                uri: pieces.userPhoto
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.pieceTextCOntainer}>
            <Text style={styles.pieceText}>Votre photo de profil</Text>
          </View>
        </View>
        <View style={styles.piecesjointes} onPress={this.uploadPhoto}>
          <View>
            <Avatar
              medium
              source={{
                uri: pieces.cinPhoto
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.pieceTextCOntainer}>
            <Text style={styles.pieceText}>Votre CIN/Passeport</Text>
          </View>
        </View>
      </View>
    );
  };

  goToNextStep = () => {};

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
            backgroundColor={Colors.$secondaryColor}
            onPress={this.ValidateChange}
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
  },
  piecesjointes: {
    flexDirection: "row",
    backgroundColor: "rgba(189, 195, 199,0.3)",
    padding: 10,
    marginBottom: 20
  },
  pieceTextCOntainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  pieceText: {
    fontWeight: "bold",
    fontSize: 15
  },
  piecesjointesContainer: {
    margin: 20
  }
});
