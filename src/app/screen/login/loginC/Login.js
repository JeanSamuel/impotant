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
      saving: false,
      data : null
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
          this.setState({
            data : response
          })
          this.changeSpinnerVisibility(false);
          notif.loginForExpoToken(response.username);
          this.props.navigation.navigate("RegisterPin", response);
        })
        .catch(error => {});
    }
  }

  handleFingerPrintSuccess() {
    this.props.navigation.navigate("Drawer", this.state.data);
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
        <FingerprintRequest
          waitTextColor="rgba(22, 160, 133,1.0)"
          onFingerprintSuccess={console.log("OK")}
        />
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
