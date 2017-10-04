import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Alert
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Fingerprint } from "expo";
import { Logo, LogoMini } from "../../../components/Logo";
import { InputWithButton, SimpleInput } from "../../../components/TextInput";
import { Container } from "../../../components/ContainerC";
import Services from "../../../services/services";
import styles from "../../../styles/stylesC/registerStyles";

const { width } = Dimensions.get("window");
class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pin: "",
      userPin: "",
      haveFingerprint: false,
      errorMessage: null,
      user_id: ""
    };
  }

  async componentDidMount() {
    let services = new Services();
    user_id = await services.getData("user_id");
    user_pin = await services.getData("pin");
    haveFingerprint = await Services.haveFingerprint();
    this.setState({ haveFingerprint: haveFingerprint });

    if (user_pin !== null) {
      this.setState({ userPin: user_pin, user_id: user_id });
    } else {
      Alert.alert("Erreur", "L' utilisateur n'a pas encore de Pin enregistrer");
    }
    this.setState({ isLoading: false });
  }

  handlePinInput = text => {
    this.setState({ pin: text, errorMessage: null });
    if (text.length === 4) {
      if (text === this.state.userPin) {
        this.props.navigation.navigate("Drawer", {
          user_id: this.state.user_id
        });
      } else {
        this.setState({ errorMessage: this.renderErrorMessage(), pin: "" });
      }
    }
  };

  renderErrorMessage() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Le Pin que vous avez entrer n'est pas valide
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <Spinner
          textContent="En attente de chargement..."
          visible={this.state.isLoading}
          overlayColor="rgba(52, 73, 94,0.8)"
          textStyle={{ color: "#fafafa", fontWeight: "300" }}
        />
        {this.state.haveFingerprint ? (
          Services.renderFingerPrintPromptAsync()
        ) : (
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
                />
              </View>
              {this.state.errorMessage}
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
export default Pin;
