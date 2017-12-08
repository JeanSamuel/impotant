//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  Modal,
  Platform
} from "react-native";
import FlagResource from "../../../assets/flags";
import {
  FormInput,
  FormLabel,
  CheckBox,
  SearchBar,
  Button,
  Icon
} from "react-native-elements";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import { AchatService, UserService, Utils } from "../../../services";
import { configStyles, loginCss } from "../../../styles/index";

// create a component
class ViaMobileMoney extends Component {
  constructor() {
    super();
    this.state = {
      montant: "",
      password: "",
      phone: "",
      account_id: "",
      username: "",
      loading: false,
      erreur: null,
      haserror: false,
      result: null,
      count: 0,
      initstate: null,
      interval: null,
      modalVisible: false,
      modalInstruction: false,
      instruction: {
        title: "",
        contenue: ""
      }
    };
  }

  async _proceedSell() {
    try {
      await AchatService._initAchat(this.props.activity, this);
      let inst = AchatService.getInstructionByMobileMoneyPhoneNumber(
        this.state.phone
      );
      this.setState({ modalInstruction: true, instruction: inst });
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  validatePhoneNumer() {
    try {
      this.setState({ haserror: false });
      AchatService.validatePhoneNumer(this.state.phone);
      this._renderPasswordView();
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }

  changeTextPhone(text) {
    try {
      var ret = AchatService._parsePhone(text, "mg");
      this.setState({ phone: ret });
    } catch (error) {
      this.setState({ phone: text });
    }
  }
  changeTextMontant(text) {
    try {
      var ret = Utils.formatNumber(text);
      this.setState({ montant: ret });
    } catch (error) {
      this.setState({ phone: text });
    }
  }
  async componentWillMount() {
    try {
      const dataUser = await Utils.getItem("userData");
      if (dataUser == null) {
        this.props.navigation.navigate("Loader");
      }
      console.log(JSON.parse(dataUser));
      let userData = JSON.parse(dataUser);
      this.setState({
        userinfo: userData,
        account_id: userData.code,
        username: userData.username
      });
      this.setState({ data: userData });
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  }
  _confirmAchat() {
    Alert.alert(
      "Confirmation",
      "Voulez-vous bien confirmer l'achat de  " +
        this.getAmount() +
        " Ariary ?",
      [
        {
          text: "Annuller",
          onPress: () =>
            this.props.activity.props.navigation.navigate("Profile")
        },
        { text: "Je Confirme", onPress: async () => await this.initAchat() }
      ]
    );
  }
  isEmptyFiled() {
    return (
      this.state.montant != "" &&
      this.state.phone != null &&
      this.state.montant != null &&
      this.state.phone != ""
    );
  }
  _renderPasswordView() {
    if (this.isEmptyFiled()) {
      try {
        AchatService.validatePhoneNumer(this.state.phone);
        this.setState({ modalVisible: true });
      } catch (error) {
        Alert.alert("Erreur", error.toString());
      }
    } else {
      Alert.alert(
        "Info",
        "Veuillez compléter les information démandées avant de valider"
      );
    }
  }
  async initAchat() {
    try {
      let r = UserService.getRoles(this.state.userinfo.roles[0]);
      if (r == 1) {
        Alert.alert(
          "Inscrivez-vous",
          "Vous devez vous inscrire si vous voulez bénéficier cette service",
          [
            { text: "Pas maintenant", onPress: () => this.Annuler() },
            { text: "S'inscrire", onPress: () => this.goToInscriptionPage() }
          ]
        );
      } else {
        await UserService.verifyUser(
          this.state.username,
          this.state.password,
          this
        );
        this.setState({ modalVisible: false });
        await this._proceedSell();
      }
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  goToInscriptionPage() {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("Inscription", {
      data: this.state.username
    });
  }
  Annuler() {
    this.setState({ modalVisible: false, montant: "", phone: "" });
  }
  async closeModal() {
    if (this.state.password == null || this.state.password == "") {
      Alert.alert(
        "Annulation",
        "Voulez-vous bien annuler l'achat de  " +
          this.getAmount() +
          " Ariary ?",
        [
          { text: "non", onPress: () => this.setState({ modalVisible: true }) },
          { text: "Oui", onPress: () => this.Annuler() }
        ]
      );
    } else {
      this._confirmAchat();
    }
  }
  getAmount() {
    return Utils.formatNumber(this.state.montant);
  }
  renderInstructionView() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalInstruction}
        onRequestClose={() => {
          this.setState({ modalInstruction: false });
        }}
      >
        <TouchableOpacity
          onPress={() => this.setState({ modalInstruction: false })}
          style={stl.modalContainer}
        >
          <View style={stl.modalViewContainer}>
            <View style={stl.v1}>
              <Text style={stl.text1}>{this.state.instruction.title}</Text>
            </View>
            <View style={{ padding: 20 }}>
              <Text>{this.state.instruction.contenue}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Profile")}
              style={stl.btnOk}
            >
              <Text style={stl.textOk}>Ok</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
  renderModal() {
    return (
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
          style={stl.showModal}
        >
          <View style={stl.mv1}>
            <View style={stl.mv2}>
              <Text style={{ textAlign: "center" }}>
                Entrer votre mot de passe pour confirmer l'achat de
                {this.getAmount()} Ariary
              </Text>
            </View>
            <View style={[{ padding: 10, height: 60 }]}>
              <TextInput
                ref={ref => this.password}
                placeholder="Mot de passe de confirmation"
                autoFocus={true}
                secureTextEntry
                style={[loginCss.input, stl.mv3]}
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
            <ActivityIndicator size="large" animating={true} color="#666" />
          </View>
        )}
      </Modal>
    );
  }
  renderFormsAchat() {
    return (
      <View>
        <FormLabel containerStyle={{ marginTop: 8 }}>
          Montant (en Ariary)
        </FormLabel>
        <FormInput
          onChangeText={montant => this.setState({ montant })}
          keyboardType="phone-pad"
          placeholder="en Ariary(1 Bon = 1 Ariary)"
          value={this.state.montant}
          returnKeyLabel="next"
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>
          Numéro mobile money
        </FormLabel>
        <FormInput
          keyboardType="phone-pad"
          placeholder="Entrer numéro mobile money"
          onChangeText={this.changeTextPhone.bind(this)}
          onEndEditing={this.validatePhoneNumer.bind(this)}
          value={this.state.phone}
          returnKeyLabel="next"
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
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={stl.headingContainer}>
          <Icon color="white" name="pets" size={42} />
          <Text style={stl.heading}>Via Mobile Money</Text>
          <Text style={[stl.heading, { fontSize: 12 }]}>
            Avec Ariary.net, acheter des bons d'achat via votre compte mobile
            money
          </Text>
        </View>
        <View style={stl.ctn}>
          <View>
            {this.state.haserror && (
              <Text style={{ color: "red", textAlign: "center", padding: 20 }}>
                {this.state.erreur}
              </Text>
            )}
          </View>
        </View>
        {this.renderFormsAchat()}
        {this.renderModal()}
        {this.renderInstructionView()}
      </ScrollView>
    );
  }
}
const stl = StyleSheet.create({
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
  labelContainerStyle: {
    marginTop: 8
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalViewContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10
  },
  v1: {
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  text1: {
    textAlign: "center",
    paddingHorizontal: 20,
    color: "#009688"
  },
  btnOk: {
    justifyContent: "center",
    backgroundColor: "#eee",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  textOk: {
    textAlign: "center",
    color: "#009688",
    alignSelf: "center",
    padding: 15
  },

  showModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  mv1: { width: "80%", backgroundColor: "white", borderRadius: 10 },
  mv2: {
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  mv3: { textAlign: "center", borderRadius: 10, height: 50 },
  ctn: {
    justifyContent: "center",
    alignContent: "center",
    padding: 15
  }
});
//make this component available to the app
export default ViaMobileMoney;
