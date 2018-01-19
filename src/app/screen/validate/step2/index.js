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
      name: "",
      cin: "",
      dateN: "",
      phone: "",
      adresse: "",
      ville: "",
      postal: "",
      nameError: false,
      cinError: false,
      adresseError: false,
      villeError: false,
      postalError: false,
      phoneError: false
    };
  }

  componentDidMount = () => {
    console.log("====================================");
    console.log(this.props);
    console.log("====================================");
  };

  checkValidation = () => {
    let services = new Services();
    this.setState({ nameError: services.checkName(this.state.name) });
    this.setState({ cinError: services.checkSimpleData(this.state.cin) });
    this.setState({ dateNError: services.checkDateN(this.state.dateN) });
    this.setState({ phoneError: services.checkPhone(this.state.phone) });
    this.setState({
      adresseError: services.checkSimpleData(this.state.adresse)
    });
    this.setState({ villeError: services.checkSimpleData(this.state.ville) });
    this.setState({ postalError: services.checkSimpleData(this.state.postal) });
  };

  sommeError = () => {
    return (
      this.state.nameError +
      this.state.dateNError +
      this.state.dateNAgainError +
      this.state.cinError
    );
  };
  // Validation
  validName() {
    this.cin.focus();
  }
  validCIN() {
    this.dateN.focus();
  }
  validDateN() {
    this.phone.focus();
  }

  validPhone() {
    this.adresse.focus();
  }

  validAdresse() {
    this.ville.focus();
  }

  validVille() {
    this.postal.focus();
  }

  validAll = () => {
    this.checkValidation();
    let somme = this.sommeError();

    if (somme === 0) {
      console.log("====================================");
      console.log("tafiditr de merde ato ah ", somme);
      console.log("====================================");
      // this.goToNextStep();
    }
  };

  // handling
  _handleName = name => {
    this.setState({
      name,
      nameError: false
    });
  };

  _handleCIN = cin => {
    this.setState({
      cin,
      cinError: false
    });
  };

  _handleDateN = dateN => {
    this.setState({
      dateN,
      dateNError: false
    });
  };

  _handlePhone = phone => {
    this.setState({
      phone: new Services().parsePhone(phone),
      phoneError: false
    });
  };

  _handleAdresse = adresse => {
    this.setState({
      adresse,
      adresseError: false
    });
  };

  _handleVille = ville => {
    this.setState({
      ville,
      villeError: false
    });
  };

  _handlePostal = postal => {
    this.setState({
      postal,
      postalError: false
    });
  };

  _handleAll = dateNAgain => {
    this.setState({ dateNAgain, dateNAgainError: false });
  };

  createDataForNextStep = () => {
    const { connexion } = this.props.navigation.state.params;

    console.log("====================================");
    console.log(connexion);
    console.log("====================================");

    return {
      connexion: connexion,
      user: {
        nom: this.props.nom,
        cin: this.props.cin,
        dateN: this.props.dateN,
        phone: this.props.phone,
        adresse: this.props.adresse,
        ville: this.props.ville,
        postal: this.props.postal
      }
    };
  };

  goToNextStep = () => {
    let data = this.createDataForNextStep();
    this.props.navigation.navigate("Step2", data);
  };

  renderName = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          Nom et prénom : *
        </FormLabel>
        <FormInput
          value={this.state.name}
          onChangeText={this._handleName}
          underlineColorAndroid="transparent"
          autoFocus
          containerStyle={styles.input}
          returnKeyType={"next"}
          ref={input => (this.name = input)}
          onSubmitEditing={() => this.validName()}
        />
        {this.state.nameError ? (
          <FormValidationMessage>{this.state.nameError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderCIN = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          CIN ou passeport : *
        </FormLabel>
        <FormInput
          value={this.state.cin}
          onChangeText={this._handleCIN}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          returnKeyType={"next"}
          ref={input => (this.cin = input)}
          onSubmitEditing={() => this.validCIN()}
        />
        {this.state.cinError ? (
          <FormValidationMessage>{this.state.cinError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderDateN = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          Date de naissance : *
        </FormLabel>
        <FormInput
          value={this.state.dateN}
          onChangeText={this._handleDateN}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          returnKeyType={"next"}
          ref={input => (this.dateN = input)}
          onSubmitEditing={() => this.validDateN()}
        />
        {this.state.dateNError ? (
          <FormValidationMessage>{this.state.dateNError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderPhone = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>Téléphone : *</FormLabel>
        <FormInput
          value={this.state.phone}
          onChangeText={this._handlePhone}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          returnKeyType={"next"}
          ref={input => (this.phone = input)}
          keyboardType={"number-pad"}
          onSubmitEditing={() => this.validPhone()}
        />
        {this.state.phoneError ? (
          <FormValidationMessage>{this.state.phoneError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderAdresse = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>Adresse : *</FormLabel>
        <FormInput
          value={this.state.adresse}
          onChangeText={this._handleAdresse}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          returnKeyType={"next"}
          ref={input => (this.adresse = input)}
          onSubmitEditing={() => this.validAdresse()}
        />
        {this.state.adresseError ? (
          <FormValidationMessage>
            {this.state.adresseError}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderVille = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>Ville : *</FormLabel>
        <FormInput
          value={this.state.ville}
          onChangeText={this._handleVille}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          returnKeyType={"next"}
          ref={input => (this.ville = input)}
          onSubmitEditing={() => this.validVille()}
        />
        {this.state.villeError ? (
          <FormValidationMessage>{this.state.villeError}</FormValidationMessage>
        ) : null}
      </View>
    );
  };

  renderPostal = () => {
    return (
      <View style={styles.formular}>
        <FormLabel containerStyle={styles.inputLabel}>
          Code Postal : *
        </FormLabel>
        <FormInput
          value={this.state.hpostal}
          onChangeText={this._handlePostal}
          underlineColorAndroid="transparent"
          containerStyle={styles.input}
          secureTextEntry
          ref={input => (this.postal = input)}
          onSubmitEditing={this.checkValidation}
        />
        {this.state.postalError ? (
          <FormValidationMessage>
            {this.state.postalError}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={1} title="Information utilisateur" />
        <ScrollView behavior="padding" style={styles.body}>
          {this.renderName()}
          {this.renderCIN()}
          {this.renderDateN()}
          {this.renderPhone()}
          {this.renderAdresse()}
          {this.renderVille()}
          {this.renderPostal()}
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
            onPress={this.validAll}
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
