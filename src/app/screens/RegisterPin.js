//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Logo, LogoMini } from "../components/Logo";
import { Container } from "../components/Container";
import { MyInput } from "../components/TextInput";
import Services from "../utils/services";

// create a component

const source = require("../images/logo.png");
class RegisterPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Créer un code PIN",
      isPin2: false,
      isLoading: false,
      pin1: "",
      pin2: ""
    };
  }

  handlePinInput_1 = text => {
    console.log("ddata#########");
    this.setState({ pin1: text });
    if (text.length === 4) {
      this.setState({
        isPin2: !this.state.isPin2,
        text: "Confirmer votre code PIN"
      });
    }
  };

  handlePinInput_2 = text => {
    this.setState({ pin2: text });
    console.log("input 2 toggled");
    console.log("Toggle input2", this.state.pin1);
    if (text.length === 4) {
      if (text == this.state.pin1) {
        services = new Services();
        this.setState({ isLoading: true });
        services.saveData("pin", this.state.pin1).then(() => {
          services.getData("user_id").then(user_id => {
            console.log(user_id);
            this.setState({ isLoading: !this.state.isLoading });
            this.props.navigation.navigate("Drawer", { user_id: user_id });
          });
        });
      } else {
        console.log("Tsy mitovy");
        this.refs.toast.show("Pin non correspondant", 1000);
      }
    }
  };
  render() {
    return (
      <Container>
        <Spinner
          animation="slide"
          size="large"
          visible={this.state.isLoading}
        />
        <KeyboardAvoidingView behavior="padding">
          <LogoMini
            style={{
              marginBottom: 50
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#fff",
              fontWeight: "300"
            }}
          >
            {this.state.text}
          </Text>

          {this.state.isPin2
            ? <MyInput
                keyboardType="numeric"
                autoFocus={true}
                value={this.state.pin2}
                onChangeText={this.handlePinInput_2}
                secureTextEntry={true}
                maxLength={4}
              />
            : <MyInput
                keyboardType="numeric"
                autoFocus={true}
                onChangeText={this.handlePinInput_1}
                secureTextEntry={true}
                maxLength={4}
              />}
        </KeyboardAvoidingView>
        <Toast
          ref="toast"
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
      </Container>
    );
  }
}

//make this component available to the app
export default RegisterPin;
