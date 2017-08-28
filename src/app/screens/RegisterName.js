//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";

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
      <Container style={styles.container}>
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
          <View style={styles.inline}>
            <MyButton
              text="Retour"
              style={{ width: 120 }}
              onPress={() => {
                console.log(this.props);
                this.props.navigation.goBack;
              }}
            />
            <MyButton text="Continuer" style={{ width: 120 }} />
          </View>
        </Footer>
      </Container>
    );
  }
}

// define your styles

//make this component available to the app
export default RegisterName;
