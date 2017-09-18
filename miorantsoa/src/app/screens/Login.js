//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  WebView
} from "react-native";
import { AppLoading } from "expo";
import Spinner from "react-native-loading-spinner-overlay";
import { Container } from "../components/Container";
import Services from "../utils/services";
import NotifServices from "../utils/notifications";
import config from "../config/config";

// create a component
//param envoyer au login : username, password
const uri =
  "http://auth.vola.mg/oauth2/authorize?response_type=code&state=xyz&client_id=ariarynet&redirect_uri=http://auth.vola.mg/index.php/&scope=userinfo";
const return_url = config.OAUTH_RET_URL;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerVisibility: false,
      isLoading: false,
      saving: false
    };
  }
  changeSpinnerVisibility(value) {
    this.setState({ spinnerVisibility: value });
  }

  async _onNavigationStateChange(webview) {
    console.log(webview.url);
    services = new Services();
    notif = new NotifServices();
    if (webview.url != uri) {
      this.setState({ isLoading: !this.state.isLoading });
      var user_id = await services.goLogin(webview);
      this.props.modal();
      notif.initForPushNotificationsAsync(user_id);
      this.props.navigation.navigate("Drawer", { user_id: user_id });
    }
  }
  onErrorLoading(webViewState) {
    console.log("nis erreur de connexion ");
  }

  webviewRenderError = (errorDomain, errorCode, errorDesc) => (
    <View style={styles.container}>
      <Icon name="signal-wifi-off" />
      <Text>Erreur lors de la connexion aux serveurs</Text>
      <Text>Verifiez votre connexion ou</Text>
      <Text>Réessayer un peu plus tard</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Spinner size="large" visible={this.state.isLoading} />
        <WebView
          ref="webview"
          source={{ uri: uri }}
          javaScriptEnabled={true}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          onError={this.onErrorLoading.bind(this)}
          renderError={() => this.webviewRenderError()}
          startInLoadingState
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {}
});

//make this component available to the app
export default Login;
