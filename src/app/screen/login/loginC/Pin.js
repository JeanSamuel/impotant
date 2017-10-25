import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Dimensions,
  Alert
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Fingerprint } from "expo";
import { Logo, LogoMini } from "../../../components/Logo";
import { InputWithButton, SimpleInput } from "../../../components/TextInput";
import { Container } from "../../../components/ContainerC";
import { FingerprintRequest } from "../../../components/fingerprint";
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
      user_id: null
    };
  }

  async componentDidMount() {
    let services = new Services();
    user_pin = await services.getData("pin");
    haveFingerprint = await Services.haveFingerprint();
    this.setState({ haveFingerprint: haveFingerprint });

    if (user_pin !== null) {
      this.setState({ userPin: user_pin });
    } else {
      Alert.alert("Erreur", "L' utilisateur n'a pas encore de Pin enregistrer");
    }
    this.setState({ isLoading: false });
  }

  handlePinInput = text => {
    this.setState({ pin: text, errorMessage: null });
    if (text.length === 4) {
      Keyboard.dismiss();
      if (text === this.state.userPin) {
        this.props.navigation.navigate("Drawer", this.props.userData);
      } else {
        this.setState({ errorMessage: this.renderErrorMessage(), pin: "" });
      }
    }
  };
  handleFingerPrintSuccess = () => {
    this.props.navigation.navigate("Drawer", this.props.userData);
  };

  renderErrorMessage() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Le Pin que vous avez entré n'est pas valide
        </Text>
      </View>
    );
  }

  async renderFingerPrintPromptAsync(messageIos) {
    if (Plateform.OS === "android") {
      console.log("====================================");
      console.log("user_id aty am PIN", this.state.user_id);
      console.log("====================================");
      (await Fingerprint.authenticateAsync())
        ? this.props.navigation.navigate("Drawer", this.state.user_id)
        : alert("FingerPrint Authentication failed");
    }
    if (Platform.OS === "ios") {
      console.log("====================================");
      console.log("user_id aty am PIN", this.state.user_id);
      console.log("====================================");
      (await Fingerprint.authenticateAsync(messageIos))
        ? this.props.navigation.navigate("Drawer", this.state.user_id)
        : alert("TouchID Authentication failed");
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        {this.state.haveFingerprint ? (
          <FingerprintRequest
            waitTextColor="rgba(22, 160, 133,1.0)"
            onFingerprintSuccess={this.handleFingerPrintSuccess}
          />
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
