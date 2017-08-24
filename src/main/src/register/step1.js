//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";
import Services from "../services/services";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Icon, Button } from "react-native-elements";
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
      warning: null,
      withError: false
    };
  }

  componentDidMount() {
    var type = Services.getRandomIntoArray(data.type);
    var name = Services.getRandomIntoArray(data.name);
    this.setState({ value: type + " " + name });
  }

  editFinished() {
    this.checkInputError();
    Keyboard.dismiss();
  }

  checkInputError() {
    let status = true;
    if (this.state.value == "") {
      this.setState({
        warning: <WarningInput warningText="Le nom ne doit pas être vide" />,
        withError: true
      });
    } else {
      this.setState({ warning: null });
      status = false;
    }

    return status;
  }

  goToStep2() {
    if (this.checkInputError()) {
      this.refs.input.focus();
      Keyboard.dismiss();
    } else {
      this.props.navigation.navigate("Step2", { name: this.state.value });
    }
  }

  setValue(value) {
    this.setState({ value });
  }

  setWarning(warning) {
    this.setState({
      warning
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
              {this.state.warning}
            </View>
            <KeyboardSpacer />
          </TouchableOpacity>

          <View>
            <Text>
              Cliquez sur <Text style={{ fontWeight: "bold" }}>
                suivant
              </Text>{" "}
              pour valider le compte
            </Text>
          </View>
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
