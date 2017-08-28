import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator
} from "react-native";
import { Content, Button, Form, Input } from "native-base";

import { InputWithButton } from "../components/TextInput";
import { Container } from "../components/Container";
import Services from "../utils/services";

class Pins extends React.Component {
  constructor(props) {
    super(props), (this.state = {
      isLoading: false,
      pin: ""
    });
  }
  handlePinInput = text => {
    console.log(text);
    if (text.length === 4) {
      services = new Services();
      this.setState({ isLoading: true });
      this.setState({ pin: text });
      services.getData("user_id").then(user_id => {
        console.log(user_id);
        this.props.navigation.navigate("Drawer", { user_id: user_id });
      });
    }
  };

  render() {
    let MainComponent = null;
    if (this.state.isLoading === true) {
      return (
        <Container>
          <ActivityIndicator size="large" />
        </Container>
      );
    } else {
      return (
        <Container>
          <KeyboardAvoidingView behavior="padding">
            <Text
              style={{
                textAlign: "center",
                fontSize: 28,
                color: "#fff",
                fontWeight: "600"
              }}
            >
              Enter your PIN here
            </Text>
            <InputWithButton
              buttonText="$"
              keyboardType="numeric"
              autoFocus={true}
              onChangeText={this.handlePinInput}
              secureTextEntry={true}
              maxLength={4}
              style={{
                flex: 1,
                textAlign: "center",
                paddingLeft: 0,
                fontSize: 20
              }}
            />
          </KeyboardAvoidingView>
        </Container>
      );
    }
  }
}
export default Pins;
