import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { Header, TextInput } from "../allSteps";
import Services from "../validationservices";
import Colors from "../../../config/constants/colors";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pseudo: "",
      pass: "",
      passAgain: "",
      emailError: false,
      pseudoError: false,
      passError: false,
      passAgainError: false
    };
  }

  checkValidation = () => {
    let services = new Services();
    this.setState({ emailError: services.checkMail(this.state.email) });
    this.setState({ pseudoError: services.checkPseudo(this.state.pseudo) });
    this.setState({ passError: services.checkPass(this.state.pass) });
    this.setState({
      passAgainError: services.checkPassAgain(
        this.state.pass,
        this.state.passAgain
      )
    });
  };

  sommeError = () => {
    if (
      this.state.emailError === 0 &&
      this.state.pseudoError === 0 &&
      this.state.passError === 0 &&
      this.state.passAgainError === 0
    ) {
      return true;
    }

    return false;
  };
  // Validation
  validMail() {
    this.pseudo.focus();
  }
  validPseudo() {
    this.pass.focus();
  }
  validPass() {
    this.passAgain.focus();
  }

  validAll() {
    this.checkValidation();
    let somme = this.sommeError();
    if (somme) {
      this.goToNextStep();
    }
  }

  // handling
  _handleEmail = email => {
    this.setState({
      email,
      emailError: false
    });
  };

  _handlePseudo = pseudo => {
    this.setState({
      pseudo,
      pseudoError: false
    });
  };

  _handlePass = pass => {
    this.setState({
      pass,
      passError: false
    });
  };

  _handleAll = passAgain => {
    this.setState({ passAgain, passAgainError: false });
  };

  createDataForNextStep = () => {
    return {
      connexion: {
        email: this.state.email,
        pseudo: this.state.pseudo,
        identifiant: "AA015",
        password: this.state.pass
      }
    };
  };

  goToNextStep = () => {
    let data = this.createDataForNextStep();
    this.props.navigation.navigate("Step2", data);
  };

  renderEmail = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>Email : *</FormLabel>
        <FormInput
          value={this.state.mail}
          onChangeText={this._handleEmail}
          underlineColorAndroid="transparent"
          autoFocus
          containerStyle={styles.input}
          keyboardType={"email-address"}
          returnKeyType={"next"}
          ref={input => (this.email = input)}
          onSubmitEditing={() => this.validMail()}
        />
        {this.state.emailError ? (
          <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderPseudo = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>Pseudo : *</FormLabel>
        <FormInput
          value={this.state.pseudo}
          onChangeText={this._handlePseudo}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          keyboardType={"email-address"}
          returnKeyType={"next"}
          ref={input => (this.pseudo = input)}
          onSubmitEditing={() => this.validPseudo()}
        />
        {this.state.pseudoError ? (
          <FormValidationMessage>
            {this.state.pseudoError}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderPass = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          mot de passe : *
        </FormLabel>
        <FormInput
          value={this.state.pass}
          onChangeText={this._handlePass}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          returnKeyType={"next"}
          ref={input => (this.pass = input)}
          onSubmitEditing={() => this.validPass()}
        />
        {this.state.passError ? (
          <FormValidationMessage>{this.state.passError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderPassAgain = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          Retapez le mot de passe : *
        </FormLabel>
        <FormInput
          value={this.state.passwordAgain}
          onChangeText={this._handleAll}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          ref={input => (this.passAgain = input)}
          onSubmitEditing={this.checkValidation}
        />
        {this.state.passAgainError ? (
          <FormValidationMessage>
            {this.state.passAgainError}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={0} title="Information connexion" />
        <ScrollView behavior="padding" style={styles.body}>
          {this.renderEmail()}
          {this.renderPseudo()}
          {this.renderPass()}
          {this.renderPassAgain()}
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={this.goToNextStep}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Etape suivante"
            backgroundColor={Colors.$secondaryColor}
            onPress={this.validAll.bind(this)}
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
  formular: { marginVertical: 0 },
  input: {
    backgroundColor: "rgba(189, 195, 199,0.1)",
    borderColor: "rgba(189, 195, 199,0.5)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginLeft: 20,
    marginVertical: 0,
    height: 40
  },
  inputLabel: {}
});
