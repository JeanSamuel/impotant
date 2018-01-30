//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  WebView,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { AuthSession } from 'expo'
import Spinner from 'react-native-loading-spinner-overlay';
import Services from '../../services/utils/services';
import NotificationServices from '../../services/user/notificationServices';
import styleBase from '../../assets/styles/styles';
import { WarningConnexion } from '../../components/warning/index';
import { Button } from 'react-native-elements';
import data from '../../config/data/dataM';

// const { width, height } = Dimensions.get("window");
const uri = `${data.BASE_URL_Oauth}oauth2/authorize` +
  `?response_type=code&client_id=${data.client_id}&redirect_uri=${encodeURIComponent(data.redirect_uri)}&scope=userinfo&state=xyz`;
// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerVisibility: false,
      saving: false,
      data: null,
    };
  }

  changeSpinnerVisibility(value) {
    this.setState({ spinnerVisibility: value });
  }

  async _onNavigationStateChange(webViewState) {
    var service = new Services();
    var notif = new NotificationServices();
    this.changeSpinnerVisibility(true);
    if (webViewState.url != uri && !this.state.saving) {
      this.setState({ saving: true });
      service
        .goLogin(webViewState)
        .then(response => {
          this.setState({
            data: response,
          });
          this.changeSpinnerVisibility(false);
          notif.loginForExpoToken(response.username);
          this.props.navigation.navigate('RegisterPin', response);
        })
        .catch(error => {console.log("Error login",error) });
    }
  }

  _handleLoginAsync = async () => {
    let result = await AuthSession.startAsync({
      authUrl: uri
    })
  }
  onErrorLoading(webViewState) { }

  webviewRenderError = (errorDomain, errorCode, errorDesc) =>
    <WarningConnexion />;

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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <ActivityIndicator
              animating={this.state.spinnerVisibility}
              size="large"
            />
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
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webview: { flex: 1 },
  buttonContainer: {},
  buttonText: {
    fontSize: 20,
    color: 'rgba(52, 73, 94,1.0)',
  },
});

//make this component available to the app
export default Login;
