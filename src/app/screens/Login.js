//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  WebView
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Container } from "../components/Container";
import Services from "../utils/services";
import NotifServices from "../utils/notifications";

// create a component
const uri =
  "http://auth.vola.mg/oauth2/authorize?response_type=code&state=pending&client_id=ariarynet&redirect_uri=http://auth.vola.mg/index.php/&scope=userinfo";
const return_url = "http://auth.vola.mg/index.php/";
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
    <View>
      <Text>No Internet Connection</Text>
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
