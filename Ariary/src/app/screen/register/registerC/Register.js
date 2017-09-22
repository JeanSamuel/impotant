//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Container } from "../../../components/ContainerC";
import { Header } from "../../../components/Header";
import { RoundedButton } from "../../../components/Buttons";
import { Footer } from "../../../components/Footer";
import styles from "../../../styles/stylesC/registerStyles";

// create a component
class Register extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ flex: 0.3 }} />
        <Image
          style={styles.images}
          source={require("../../../components/Logo/images/logo.png")}
        />
        <Footer>
          <View style={[styles.containerWidth, { alignSelf: "center" }]}>
            <Text style={[styles.text, { color: "#aaa" }]}>
              Appuyer sur "Accepter et Continuer" pour continuer votre
              inscription et accepter les
            </Text>
            <TouchableOpacity>
              <View>
                <Text
                  style={[styles.text, styles.linkText, { marginBottom: 20 }]}
                >
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
          </View>
        </Footer>
      </View>
    );
  }
}

//make this component available to the app
export default Register;
