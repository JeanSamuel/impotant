import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  TextInput,
  Dimensions
} from "react-native";
import { Content, Button, Form, Input } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Logo, LogoMini } from "../components/Logo";
import { InputWithButton, SimpleInput } from "../components/TextInput";
import { Container } from "../components/Container";
import Services from "../utils/services";
import styles from "../styles/registerStyles";

const { width } = Dimensions.get("window");
class Pins extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        isLoading: true,
        pin: "",
        userPin: ""
      });
  }

  async componentDidMount() {
    services = new Services();
    pin = await services.getData("pin");
    if (pin !== null) {
      this.setState({ userPin: pin, isLoading: false });
    }
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
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <Spinner
          size="large"
          textContent="En attente de chargement..."
          visible={this.state.isLoading}
          overlayColor="rgba(52, 73, 94,0.8)"
          textStyle={{ color: "#fafafa", fontWeight: "300" }}
        />
        <KeyboardAvoidingView behavior="padding">
          <View>
            <View style={{ flex: 0.8 }} />
            <LogoMini
              style={{
                marginBottom: 20
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#aaa",
                fontWeight: "500"
              }}
            >
              Enter your PIN here
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#aaa",
                borderRadius: 40,
                height: 50,
                width: width - 50,
                paddingVertical: 10,
                alignSelf: "center"
              }}
            >
              <TextInput
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                autoFocus={true}
                onChangeText={this.handlePinInput}
                secureTextEntry={true}
                value={this.state.pin}
                maxLength={4}
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  paddingHorizontal: 5
                }}
                /*style={{
                /flex: 1,
                textAlign: "center",
                paddingLeft: 0,
                fontSize: 24
              }}*/
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default Pins;
