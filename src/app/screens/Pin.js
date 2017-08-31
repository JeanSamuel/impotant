import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator
} from "react-native";
import { Content, Button, Form, Input } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Logo, LogoMini } from "../components/Logo";
import { InputWithButton, SimpleInput } from "../components/TextInput";
import { Container } from "../components/Container";
import Services from "../utils/services";

class Pins extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        isLoading: false,
        pin: "",
        userPin: "2240"
      });
  }
  handlePinInput = text => {
    this.setState({ pin: text });
    if (text.length === 4) {
      this.setState({ isLoading: true });
      services = new Services();
      console.log("========Pin entered=========", this.state.userPin);
      if (text === this.state.userPin) {
        this.setState({ pin: text });
        services.getData("user_id").then(user_id => {
          console.log(user_id);
          this.props.navigation.navigate("Drawer", { user_id: user_id });
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({ isLoading: false, pin: "" });
      }
    }
  };

  render() {
    let MainComponent = null;
    return (
      <Container>
        <Spinner
          size="large"
          textContent="En attente de chargement..."
          visible={this.state.isLoading}
          overlayColor="rgba(52, 73, 94,0.8)"
          textStyle={{ color: "#fafafa", fontWeight: "300" }}
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
              fontWeight: "600"
            }}
          >
            Enter your PIN here
          </Text>
          <SimpleInput
            buttonText="$"
            keyboardType="numeric"
            autoFocus={true}
            onChangeText={this.handlePinInput}
            secureTextEntry={true}
            value={this.state.pin}
            maxLength={4}
            style={{
              flex: 1,
              textAlign: "center",
              paddingLeft: 0,
              fontSize: 24
            }}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
export default Pins;
