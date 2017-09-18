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
  ActivityIndicator,
  Alert
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
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
import { MyButton } from "../../components/button";
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

  componentWillMount() {
    var name = Services.getRandomIntoArray(data.name);
    var num = Services.getRandomNumber();
    this.setState({
      value: name + num,
      message: this.readyMessage()
    });
  }

  editFinished() {
    this.checkInputError();
    Keyboard.dismiss();
  }

  checkInputError() {
    if (this.state.value == "") {
      this.setMessage(
        <WarningInput warningText={"Le nom ne peut pas être vide"} />
      );
      return false;
    }
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

  setValue(newValue) {
    this.setState({
      value: newValue.replace(/ /g, "")
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

  confirm() {
    if (!this.checkInputError()) {
      this.refs.input.focus();
      Keyboard.dismiss();
    } else {
      Alert.alert(
        "Création de compte",
        "Créer un compte sous le nom de " + this.state.value,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.goToStep2() }
        ],
        { cancelable: false }
      );
    }
  }

  goToStep2() {
    this.createLoader("Enregistrement en cours");
    let regServices = new RegisterServices();
    regServices
      .saveAccount(this.state.value)
      .then(response => {
        this.removeLoader();
        this.props.navigation.navigate("Step2", { user_id: this.state.value });
      })
      .catch(error => {
        this.removeLoader();
        this.setMessage(<WarningInput warningText={error.message} />);
      });
  }

  readyMessage() {
    return (
      <View>
        <Text>
          Cliquez sur <Text style={{ fontWeight: "bold" }}>Suivant</Text> pour
          enregistrer le compte
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
        <View>{this.state.modal}</View>
        <Image
          style={[styles.header, { height: "15%" }]}
          source={backHeader}
          resizeMode="cover"
        >
          <View style={[styleBase.centered, { paddingTop: 20 }]}>
            <Text style={[styles.logoTextInline, styleBase.textWhiteCentered]}>
              Ariary.net
            </Text>
            <Text
              style={[
                styleBase.textWhiteCentered,
                { fontSize: 35, backgroundColor: "transparent" }
              ]}
            >
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
                  Nous allons vous créer un compte Ariary
                </Text>
              </View>
            </View>
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  Nous avons déjà donné un nom à ce compte. Vous pouvez le
                  modifier si vous le souhaiter
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
                onChangeText={text => this.setValue(text)}
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
            <View style={styleBase.centered}>{this.state.message}</View>
            <KeyboardSpacer />
          </TouchableOpacity>
        </ScrollView>
        <View>
          <MyButton
            text="J'enregistre mon compte"
            action={this.confirm.bind(this)}
            color="rgba(230, 126, 34,1.0)"
            textLoading="Enregistrement..."
          />
          <Button
            title="Retour"
            backgroundColor="transparent"
            textStyle={style.retourButtonText}
            onPress={this.returnStarter.bind(this)}
            underlayColor="#FFF"
          />
        </View>
      </View>
    );
  }
}
const style = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  retourButtonText: {
    color: "rgba(52, 73, 94,1.0)",
    fontSize: 18
  },
  webview: { flex: 1 },
  buttonContainer: {}
});

//make this component available to the app
export default Step1;
