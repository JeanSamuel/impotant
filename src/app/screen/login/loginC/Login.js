//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  WebView,
  ActivityIndicator,
  ScrollView
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Services from "../../../services/services";
import NotificationServices from "../../../services/notificationServices";
import styleBase from "../../../styles/styles";
import { WarningConnexion } from "../../../components/warning";
import { Button } from "react-native-elements";
import data from "../../../configs/data/dataM";
import { FingerprintRequest } from "../../../components/fingerprint";

// const { width, height } = Dimensions.get("window");
const uri = data.uri;
// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerVisibility: false,
      saving: false
    };
  }

  changeSpinnerVisibility(value) {
    this.setState({ spinnerVisibility: value });
  }

  async _onNavigationStateChange(webViewState) {
    var service = new Services();
    var notif = new NotificationServices();
    if (webViewState.url != uri && !this.state.saving) {
      this.changeSpinnerVisibility(true);
      this.setState({ saving: true });
      service
        .goLogin(webViewState)
        .then(response => {
          let data = {
            user_id: response
          };
          this.changeSpinnerVisibility(false);
          notif.loginForExpoToken(response);
          this.props.navigation.navigate("RegisterPin", data);
        })
        .catch(error => {});
    }
  }

  handleFingerPrintSuccess() {
    this.props.navigation.navigate("Drawer", { user_id: user_id });
  }
  onErrorLoading(webViewState) {}

  webviewRenderError = (errorDomain, errorCode, errorDesc) => (
    <WarningConnexion />
  );

  return() {
    this.props.navigation.goBack();
  }

  render() {
    errorView = (
      <View>
        <Text>Erreur de connexion</Text>
      </View>
    );
    return (
      <View style={styles.container}>
        <FingerprintRequest />
        <View style={{ flex: 1 }}>
          <View>
            <Spinner
              visible={this.state.spinnerVisibility}
              textStyle={{ color: "#FFF" }}
            />
          </View>
          <WebView
            source={{ uri: uri }}
            style={styles.webview}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            renderLoading={this.renderLoading}
            onError={this.onErrorLoading.bind(this)}
            renderError={() => this.webviewRenderError()}
            startInLoadingState
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Retour"
            backgroundColor="transparent"
            underlayColor="#000"
            large
            textStyle={styles.buttonText}
            onPress={() => this.return()}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  webview: { flex: 1 },
  buttonContainer: {},
  buttonText: {
    fontSize: 20,
    color: "rgba(52, 73, 94,1.0)"
  }
});

//make this component available to the app
export default Login;
