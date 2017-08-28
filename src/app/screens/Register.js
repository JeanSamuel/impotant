//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { RoundedButton } from "../components/Buttons";
import { Footer } from "../components/Footer";
import styles from "../styles/registerStyles";

// create a component
class Register extends Component {
  render() {
    return (
      <Container>
        <Header headerText="Bienvenue sur Ariary.net" />
        <Image
          style={styles.images}
          source={require("../components/Logo/images/logo.png")}
        />
        <Footer>
          <Text style={styles.text}>
            Appuyer sur "Accepter et Continuer" pour accepter les
          </Text>
          <TouchableOpacity>
            <View>
              <Text style={styles.linkText}>
                Conditions d' utilisation de Ariary.net
              </Text>
            </View>
          </TouchableOpacity>
          <RoundedButton
            text="Accepter et Continuer"
            style={{
              marginHorizontal: 15,
              marginBottom: 15,
              backgroundColor: "#1e9228"
            }}
            onPress={() => {
              this.props.navigation.navigate("RegisterName");
            }}
          />
        </Footer>
      </Container>
    );
  }
}

//make this component available to the app
export default Register;
