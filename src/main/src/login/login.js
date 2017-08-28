//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  WebView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Icon } from "react-native-elements";
import Services from "../services/services";
import styleBase from "../../styles/Styles";
import NotifServices from "../services/notificationServices";

const { width, height } = Dimensions.get("window");
const uri = Services.loginUrl();
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
    var notif = new NotifServices();
    if (webViewState.url != uri && !this.state.saving) {
      this.changeSpinnerVisibility(true);
      this.setState({ saving: true });
      var user_id = await service.goLogin(webViewState);
      this.props.modal();
      let data = {
        user_id: user_id,
        newUser: this.props.newUser
      };
      notif.initForPushNotificationsAsync(user_id);
      this.props.navigation.navigate("DrawerExample", data);
    }
  }

  onErrorLoading(webViewState) {
    console.log("nis erreur de connexion ");
  }

  webviewRenderError = (errorDomain, errorCode, errorDesc) =>
    <View>
      <Text>No Internet Connection</Text>
    </View>;

  render() {
    errorView = (
      <View>
        <Text>Erreur de connexion</Text>
      </View>
    );
    return (
      <View style={styles.container}>
        <View>
          <Spinner
            visible={this.state.spinnerVisibility}
            textStyle={{ color: "#FFF" }}
          />
        </View>
        <WebView
          ref="webview"
          source={{ uri: uri }}
          style={styles.webview}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          renderLoading={this.renderLoading}
          onError={this.onErrorLoading.bind(this)}
          renderError={() => this.webviewRenderError()}
          startInLoadingState
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {}
});

//make this component available to the app
export default Login;
