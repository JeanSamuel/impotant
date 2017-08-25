//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";
import Services from "../services/services";
import RegisterServices from "../services/registerServices";
import NotifServices from "../services/notificationServices";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Icon, Button } from "react-native-elements";
import { Loader } from "../../components/loader";
import data from "../../data/dataName";
import { WarningInput } from "../../components/warning";
const check = require("../../images/icons/Check.png");
const mark = require("../../images/icons/login2_mark.png");
const backHeader = require("../../images/backHeader.jpg");

// create a component
class Step1 extends Component {
  static navigationOptions = {
    title: "Inscription"
  };
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      alreadyEdit: false,
      message: null,
      withError: false,
      modal: null,
      modalData: null
    };
  }

  componentDidMount() {
    var type = Services.getRandomIntoArray(data.type);
    var name = Services.getRandomIntoArray(data.name);
    this.setState({
      value: type + " " + name,
      message: this.readyMessage()
    });
  }

  editFinished() {
    this.checkInputError();
    Keyboard.dismiss();
  }

  checkInputError() {
    let regService = new RegisterServices();
    try {
      regService.checkInputError(this.state.value);
      this.setMessage(this.readyMessage());
      return true;
    } catch (error) {
      this.setMessage(<WarningInput warningText={error} />);
      return false;
    }
  }

  createLoader(message) {
    this.setState({
      modal: <Loader visibility={true} message={message} />
    });
  }

  removeLoader() {
    this.setState({ modal: null });
  }

  goToStep2() {
    if (!this.checkInputError()) {
      this.refs.input.focus();
      Keyboard.dismiss();
    } else {
      this.createLoader("Enregistrement en cours");
      let notifService = new NotifServices();
      notifService
        .register(this.state.value)
        .then(response => {
          this.removeLoader();
          this.props.navigation.navigate("Step2", { name: this.state.value });
        })
        .catch(error => {
          this.removeLoader();
          console.log("erreur am faran", error);
          this.setMessage(<WarningInput warningText={error.message} />);
        });
    }
  }

  readyMessage() {
    return (
      <View>
        <Text>
          Cliquez sur <Text style={{ fontWeight: "bold" }}>suivant</Text> pour
          valider le compte
        </Text>
      </View>
    );
  }

  setValue(value) {
    this.setState({ value: value.trim() });
  }

  setMessage(value) {
    this.setState({
      message: value
    });
  }

  setEdited() {
    this.setState({ alreadyEdit: true });
  }

  editValue() {
    this.refs.input.focus();
    if (!this.state.alreadyEdit) {
      this.setValue("");
      this.setEdited();
    }
  }

  returnStarter() {
    this.props.navigation.navigate("Starter");
  }

  render() {
    return (
      <View style={styleBase.containerBase}>
        <View>
          {this.state.modal}
        </View>
        <Image
          style={[styles.header, { height: "15%" }]}
          source={backHeader}
          resizeMode="cover"
        >
          <View style={[styleBase.centered, { paddingTop: 20 }]}>
            <Text style={[styles.logoTextInline, styleBase.textWhiteCentered]}>
              Ariary.net
            </Text>
            <Text style={[styleBase.textWhiteCentered, { fontSize: 35 }]}>
              Inscription
            </Text>
          </View>
        </Image>
        <ScrollView contentContainerStyle={[styles.data, styleBase.centered]}>
          <View style={styles.felicitationContainer}>
            <Text style={[styles.felicitation, styleBase.textCenter]}>
              Félicitation
            </Text>
          </View>
          <TouchableOpacity
            style={styles.listChecked}
            onPress={this.editFinished.bind(this)}
            activeOpacity={1}
          >
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  Nous venons de créer un compte pour vous
                </Text>
              </View>
            </View>
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  Nous avons aussi donné un nom à votre entreprise. Vous pouvez
                  le modifier si vous le souhaiter
                </Text>
              </View>
            </View>
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  D'ici quelques secondes, vous pourrez déjà recevoir de
                  l'argent
                </Text>
              </View>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                ref="input"
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                style={styles.input}
                underlineColorAndroid="transparent"
                onSubmitEditing={this.editFinished.bind(this)}
                returnKeyType="go"
              />
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={this.editValue.bind(this)}
                activeOpacity={0.7}
              >
                <Icon name="edit" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styleBase.centered}>
              {this.state.message}
            </View>
            <KeyboardSpacer />
          </TouchableOpacity>
        </ScrollView>
        <View style={[styleBase.alignCentered, styles.newUserButtonContainer]}>
          <Button
            title="Précédent"
            icon={{ name: "arrow-back" }}
            backgroundColor="rgba(230, 126, 34,1.0)"
            onPress={this.returnStarter.bind(this)}
            underlayColor="#FFF"
          />
          <Button
            title="Suivant"
            iconRight
            icon={{ name: "arrow-forward" }}
            backgroundColor="rgba(230, 126, 34,1.0)"
            onPress={this.goToStep2.bind(this)}
            underlayColor="#FFF"
          />
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Step1;
