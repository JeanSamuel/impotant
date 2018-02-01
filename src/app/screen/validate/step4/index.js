import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { Text, Button, Avatar } from "react-native-elements";
import { Header, Card, Separator } from "../allSteps";
import PropTypes from "prop-types";
import Colors from "../../../config/constants/colors";
import { ImageUpload, UserService } from "../../../services";
import { MessagePrompt } from "../../../components/modal";
import { Loader } from "../../../components/loader";

const deviceWidth = Dimensions.get("window").width;

export default class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisible: false,
      text:
        "Merci d'avoir validé votre compte, nous vous tenons au courant des changements",
      color: "green",
      icon: "check",
      modal: null,
    };
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

  modalVIsible() {
    this.setState({
      messageVisible: !this.state.messageVisible
    });
  }

  createLoader(message) {
    this.setState({
      modal: <Loader visibility={true} message={message} />
    });
  }

  removeLoader() {
    this.setState({ modal: null });
  }

  ValidateChange = () => {
    this.createLoader('Validation en cours');
    const { pieces, user, connexion } = this.props.navigation.state.params;
    let dataRegister = {
      account_id: connexion.identifiant,
      username: connexion.pseudo,
      name: user.nom,
      firstname: "",
      birthday: user.dateN,
      email: connexion.email,
      phone: user.phone,
      password: connexion.password,
      role: 'simple'
    }
    UserService.updateUserInfo(dataRegister, null).then(response => {
      ImageUpload.doUpload(pieces.userPhoto, pieces.cinPhoto, connexion, user)
        .then(response => {
          UserService.refreshData(connexion.identifiant, null).then(response => {
            this.removeLoader();
            this.modalVIsible();
          }).catch(error => {
            this.setState({
              text: "Une erreur s'est produite lors de la mise à jour de votre onformation",
              color: "red",
              icon: "close"
            });
            this.modalVIsible();
          });
        })
        .catch(error => {
          this.setState({
            text: "il ya eu un erreur lors de la validation " + error.toString(),
            color: "red",
            icon: "close"
          });
          this.modalVIsible();
        });
    })
      .catch(error => {
        this.setState({
          text: "Erreur de la mise à jour des informations " + error.toString(),
          color: "red",
          icon: "close"
        });
        this.modalVIsible();
      });
  };

  returnToHome() {
    const { connexion } = this.props.navigation.state.params;
    this.modalVIsible();
    if (this.state.colo = "green") this.props.navigation.navigate("Drawer", { user_id: connexion.identifiant, username: connexion.pseudo });
  }

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

  goToNextStep = () => { };

  render() {
    return (
      <View style={styles.container}>
        <Header position={3} title="Vos informations" />
        <View>{this.state.modal}</View>
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
            onPress={this.ValidateChange.bind(this)}
          />
        </View>
        {this.state.messageVisible ? (
          <MessagePrompt
            onRequestClose={() => this.returnToHome()}
            iconName={this.state.icon}
            loading={false}
            text={this.state.text}
            title={"Validation"}
            color={this.state.color}
          />
        ) : null}
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
