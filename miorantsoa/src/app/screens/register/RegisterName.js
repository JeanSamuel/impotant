//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import { Button } from "native-base";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { RoundedButton, MyButton } from "../../components/Buttons";
import { Icon } from "react-native-elements";
import styles from "../../styles/registerStyles";
import { InputWithButton } from "../../components/TextInput";

// create a component
const { width } = Dimensions.get("window");
let errorMessage = "Nom d'utilisateur non valide";
class RegisterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      hasError: false
    };
  }
  handleContinue() {
    console.log("continue");
    if (this.state.username.length === 0) {
      this.setState({ hasError: true });
      errorMessage = "Ne laisser pas le champ vide";
    } else {
      this.props.navigation.navigate("RegisterPwd", {
        username: this.state.username
      });
    }
  }
  handleInput = text => {
    this.setState({ username: text });
  };
  handleRefresh() {
    console.log("refesshh");
    this.setState({ username: "", hasError: false });
  }
  handleEndEditing() {
    console.log("End editing", this.state.username.length);
    if (this.state.username.length === 0) {
      this.setState({ hasError: true });
      errorMessage = "Ne laisser pas le champ vide";
    } else if (this.state.username.length < 4) {
      this.setState({ hasError: true });
      errorMessage = "Doit comporter au moins 4 caractères";
    }
  }
  render() {
    const inputStyle = [
      {
        width: width - 70,
        borderStyle: "solid",
        borderBottomWidth: 1,
        height: 50,
        marginTop: 20
      }
    ];
    if (this.state.hasError) {
      inputStyle.push({ borderColor: "red" });
    }
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <View style={{ flex: 0.6 }} />
            <Text style={styles.titleText}>
              Choisissez votre nom d'utilisateur
            </Text>
            <Text
              style={[
                styles.text,
                styles.textWidth,
                { color: "#aaa", marginTop: 20, alignSelf: "center" }
              ]}
            >
              Renseigner le nom d'utilisateur que vous aimeriez avoir pour
              pouvoir vous enregistrer en tant qu'utilisateur Ariary.net.
            </Text>
            <View style={inputStyle}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  marginTop: 20,
                  marginVertical: 10,
                  marginRight: 5,
                  paddingHorizontal: 10
                  //backgroundColor: "#000"
                }}
                onPress={() => this.handleRefresh()}
              >
                <View>
                  <Icon name="refresh" color="#aaa" />
                </View>
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Nom d'utilisateur"
                onChangeText={username => {
                  this.setState({ username: username, hasError: false });
                  console.log(username);
                }}
                onEndEditing={() => {
                  this.handleEndEditing();
                }}
                value={this.state.username}
                style={{
                  //height: 50,
                  fontSize: 16,
                  paddingHorizontal: 10,
                  marginTop: 20,
                  width: width - 120
                }}
              />
            </View>
            {this.state.hasError ? (
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 10,
                  color: "red"
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
        <Footer>
          <View style={[styles.inline, { alignContent: "space-between" }]}>
            <Button
              rounded
              block
              style={{ marginBottom: 10, backgroundColor: "#1e9228" }}
              onPress={() => {
                this.handleContinue();
              }}
              disabled={this.state.hasError}
            >
              <Text style={[styles.text, { fontSize: 18, color: "#fff" }]}>
                Enregistrer et continuer
              </Text>
            </Button>
            {/* <Button
              rounded
              block
              style={{ backgroundColor: "transparent" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={[styles.text, { fontSize: 18, color: "#000" }]}>
                Revenir en arrière
              </Text>
            </Button> */}
          </View>
        </Footer>
      </View>
    );
  }
}

// define your styles

//make this component available to the app
export default RegisterName;
