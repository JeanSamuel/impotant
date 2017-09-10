//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button } from "native-base";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { RoundedButton, MyButton } from "../components/Buttons";
import styles from "../styles/registerStyles";
import { InputWithButton } from "../components/TextInput";

// create a component
class RegisterName extends Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#E2E2E2" }]}>
        <Header headerText="Bienvenue sur Ariary.net" />
        <KeyboardAvoidingView
          behavior="padding"
          style={{ alignContent: "flex-end", alignContent: "flex-end" }}
        >
          <Text style={styles.text}>
            Veuillez renseigner votre nom pour pouvoir vous enregistrer en tant
            qu'utilisateur
          </Text>
          <InputWithButton buttonText="" />
          <InputWithButton buttonText="" />
        </KeyboardAvoidingView>
        <Footer>
          <View style={[styles.inline, { alignContent: "space-between" }]}>
            <Button
              rounded
              block
              style={{ marginBottom: 10, backgroundColor: "#e4795f" }}
            >
              <Text style={[styles.text, { fontSize: 18 }]}>
                Enregistrer et continuer
              </Text>
            </Button>
            <Button rounded block style={{ backgroundColor: "transparent" }}>
              <Text style={[styles.text, { fontSize: 18, color: "#000" }]}>
                Revenir en arrière
              </Text>
            </Button>
          </View>
        </Footer>
      </View>
    );
  }
}

// define your styles

//make this component available to the app
export default RegisterName;
