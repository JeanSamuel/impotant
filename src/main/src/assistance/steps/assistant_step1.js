//import liraries
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { width, height } from "Dimensions";
import { StepIndicator } from "../../../components/stepIndicator";
import { Input } from "../../../components/input";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class Step1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StepIndicator />
        <View style={styles.body}>
          <Text style={styles.title}>Informations utilisateurs</Text>
          <Text style={styles.titleHelp}>
            Veuillez entrer des données conformes à votre acte de naissance ou
            votre CIN
          </Text>
          <View>
            <Input
              label="nom"
              onChangeText={() => console.log("nom")}
              placeholder="Votre nom"
            />
            <Input
              label="Prénoms"
              onChangeText={() => console.log("prenom")}
              placeholder="vos prénoms"
            />
            <Input
              label="Date de naissance"
              onChangeText={() => console.log("dateNaissance")}
              placeholder="jj/mm/yyyy"
            />
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    paddingTop: 20
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold"
  },
  titleHelp: {
    color: "#FFF"
  }
});

//make this component available to the app
export default Step1;
