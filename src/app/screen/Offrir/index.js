//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
  Modal
} from "react-native";
import {
  Header,
  Icon,
  FormInput,
  FormLabel,
  CheckBox,
  SearchBar,
  Button
} from "react-native-elements";
import Mybutton from "../../components/Buttons/SamButton";
import { loginCss, baseStyle, configStyles } from "../../styles/index";
import { Utils, UserService, OffrirService } from "../../services";
import config from "../../config/data/dataM";
const BASE_URL = config.ARIARY_BASE_URL;

import styles from "./style";
// create a component
class Offrir extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      amount: 0,
      recipient: "",
      password: "",
      sender: "",
      erreur: "",
      balence: "",
      modalVisible: false,
      userinfo: null,
      message: "",
      username: ""
    };
  }
  async componentWillMount() {
    try {
      let dataUser = await Utils.getItem("userData");
      if (dataUser == null) {
        this.props.navigation.navigate("Loader");
      }
      let userData = JSON.parse(dataUser);
      this.setState({
        userinfo: userData,
        sender: userData.code,
        username: userData.username
      });
    } catch (error) {
      console.log(error);
    }
  }

  _cancelTransfer() {
    this.props.navigation.navigate("Profile");
  }

  _confirmTransfer() {
    if (!this._isEmptyField()) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous  transferer " +
          this.getAmount() +
          " au numéro de compte " +
          this.state.recipient +
          " ?",
        [
          { text: "Annuller", onPress: () => _cancelTransfer() },
          { text: "Je Confirme", onPress: () => this._validerOffre() }
        ]
      );
    } else {
      this.setState({ loading: false });
      Alert.alert("Erreur survennue", "Tous les champs sont requis");
    }
  }
  _isEmptyField() {
    return this._isEmptyAmount() || this._isEmptyRecipient();
  }
  _isEmptyAmount() {
    return this.state.amount == null || this.state.amount == "";
  }
  _isEmptyRecipient() {
    return this.state.recipient == null || this.state.recipient == "";
  }
  _isEmptyPassword() {
    return this.state.password == null || this.state.password == "";
  }
  async _validerOffre() {
    let url = BASE_URL + "transaction";
    try {
      let r = UserService.getRoles(this.state.userinfo.roles[0]);
      if (r == 1) {
        Alert.alert(
          "Inscrivez-vous",
          "Vous devez vous inscrire si vous voulez utiliser cette service",
          [
            { text: "Pas maintenant", onPress: () => this.Annuler() },
            { text: "S'inscrire", onPress: () => this.goToInscriptionPage() }
          ]
        );
      } else {
        this.setState({ loading: true });
        await UserService.verifyUser(
          this.state.username,
          this.state.password,
          this
        );
        await OffrirService._validerOffre(this);
        this.setState({ modalVisible: false });
        this.props.navigation.navigate("Profile");
      }
    } catch (error) {
      Alert.alert("Erreur survennue", error.toString());
    } finally {
      this.setState({ loading: false });
    }
  }
  async loadConfig() {
    await UserService.loadConfig(this);
  }

  goToInscriptionPage() {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("Inscription", {
      data: this.state.username
    });
  }

  _renderPasswordView() {
    if (!this._isEmptyField()) {
      this.setState({ modalVisible: true });
    } else {
      Alert.alert(
        "Info",
        "Veuillez compléter les informations démandées s'il vous plait"
      );
    }
  }
  Annuler() {
    this.setState({
      modalVisible: false,
      amount: "",
      recipient: "",
      message: ""
    });
    this._cancelTransfer();
  }
  async closeModal() {
    if (this.state.password == null || this.state.password == "") {
      Alert.alert(
        "Annuelation",
        "Voulez-vous bien annuler le transfert de  " +
          this.getAmount() +
          " Ariary ?",
        [
          { text: "non", onPress: () => this.setState({ modalVisible: true }) },
          { text: "Oui", onPress: () => this.Annuler() }
        ]
      );
    } else {
      this._confirmTransfer();
    }
  }
  async initTransfer() {
    try {
      await this._validerOffre();
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  getAmount() {
    return Utils.formatNumber(this.state.amount);
  }
  handleActionLeft() {
    this.props.navigation.navigate("DrawerOpen");
  }
  renderCenterComponent() {
    return (
      <View style={baseStyle.headerBodyView}>
        <Text style={baseStyle.textHeader}>Transfert</Text>
      </View>
    );
  }
  renderRightComponent() {
    return (
      <View style={baseStyle.headerRightView}>
        <Mybutton
          iconName="share-alt"
          type="font-awesome"
          onPress={() => Utils.ShareApp()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
        <Mybutton
          iconName="settings"
          type="material-icon"
          onPress={() => this.loadConfig()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
      </View>
    );
  }
  renderLeftComponent() {
    return (
      <Mybutton
        iconName="bars"
        type="font-awesome"
        onPress={() => this.handleActionLeft()}
        styleBtn={[baseStyle.btnLeftHeader]}
      />
    );
  }
  renderFormsTransfert() {
    return (
      <View>
        <FormLabel containerStyle={{ marginTop: 8 }}>Montant</FormLabel>
        <FormInput
          onChangeText={montant => this.setState({ montant })}
          keyboardType="phone-pad"
          placeholder="Entrer le montant"
          value={this.state.montant}
          returnKeyLabel="next"
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Envoyé à</FormLabel>
        <FormInput
          placeholder="Numéro de compte Ariary.net"
          onChangeText={recipient => this.setState({ recipient })}
          value={this.state.recipient}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Commentaire</FormLabel>
        <FormInput
          onChangeText={message => this.setState({ message })}
          placeholder="Ajouter un commentaire"
          value={this.state.message}
          onEndEditing={() => {
            this._renderPasswordView();
          }}
        />
        <Button
          onPress={() => this._renderPasswordView()}
          icon={{ name: "done" }}
          buttonStyle={{ marginTop: 15, backgroundColor: "#00BF9A" }}
          title="Valider"
        />
      </View>
    );
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff", flex: 1 }]}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView>
          <View style={test.headingContainer}>
            <Icon color="white" name="pets" size={42} />
            <Text style={test.heading}>Offrir à un ami</Text>
          </View>
          {this.renderFormsTransfert()}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: false })}
            style={test.tch}
          >
            <View style={test.v1}>
              <View style={test.v2}>
                <Text style={{ textAlign: "center" }}>
                  Entrer votre mot de passe pour confirmer le transfert de{" "}
                  {this.state.amount} Ariary au numéro de compte{" "}
                  {this.state.recipient}
                </Text>
              </View>
              <View style={[{ padding: 10, height: 60 }]}>
                <TextInput
                  placeholder="Mot de passe de confirmation"
                  autoFocus={true}
                  secureTextEntry
                  style={[
                    loginCss.input,
                    { textAlign: "center", borderRadius: 10, height: 50 }
                  ]}
                  onChangeText={password => {
                    this.setState({ password: password });
                  }}
                  onEndEditing={() => {
                    this.closeModal();
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {this.state.loading && (
            <View style={configStyles.indicator}>
              <ActivityIndicator
                size="large"
                animating={true}
                color="#00BF9A"
              />
            </View>
          )}
        </Modal>
        {this.state.loading && (
          <View style={configStyles.indicator}>
            <ActivityIndicator size="large" animating={true} color="#00BF9A" />
          </View>
        )}
      </View>
    );
  }
}

// define your styles
const test = StyleSheet.create({
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00BF9A"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22,
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  tch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  v1: { width: "80%", backgroundColor: "white", borderRadius: 10 },
  v2: {
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});

//make this component available to the app
export default Offrir;
