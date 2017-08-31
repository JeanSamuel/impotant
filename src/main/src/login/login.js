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
import Services from "../services/services";
import styleBase from "../../styles/Styles";
import NotifServices from "../services/notificationServices";
import { WarningConnexion } from "../../components/warning";
import { Button } from "react-native-elements";

// const { width, height } = Dimensions.get("window");
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
      service
        .goLogin(webViewState)
        .then(response => {
          if (this.props.newUser) {
            service.isNewUser();
          }
          let data = {
            user_id: response
          };
          this.changeSpinnerVisibility(false);
          notif.initForPushNotificationsAsync(response);
          this.props.navigation.navigate("DrawerExample", data);
        })
        .catch(error => {
          console.log("error login", error);
        });
    }
  }

  onErrorLoading(webViewState) {
    console.log("nis erreur de connexion ");
  }

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
        <View style={{ flex: 1 }}>
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
