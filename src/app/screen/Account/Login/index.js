import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  StatusBar,
  WebView,
  Animated,
  Easing
} from "react-native";
import { Icon } from "react-native-elements";
import { loginCss } from "../../../assets/styles";
import PropTypes from "prop-types";
import { Utils, UserService, AuthentificationService } from "../../../services";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
// create a component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: "0deg",
      url: "",
      uri: "http://54.229.79.45/AriaryNet/Login/",
      token: null,
      account_id: null,
      loading: false
    };
  }
  _isEmptyField() {
    return (
      this.state.username == null ||
      this.state.password == null ||
      this.state.username == "" ||
      this.state.password == ""
    );
  }
  Cancel() {
    this.props.navigation.goBack();
  }
  onSuccess = async () => {
    if (this.state.token != null) {
      this.setState({ loading: true });
      try {
        await AuthentificationService.doLogin(this);
        this.setState({ loading: true });
        await AuthentificationService._logout(1);
        this.setState({ loading: true });
        this.props.navigation.navigate("App", { avatar: null });
      } catch (error) {
        Alert.alert("Erreur", error.toString());
      }
      this.setState({ loading: false });
    }
  };

  componentWillUnmount() {
    this.setState({ loading: false });
  }
  onChageUrl(navState) {
    let url = navState.url;
    this.setState({ url: url });
    try {
      let testToken = url.indexOf("token");
      if (testToken !== -1) {
        let pre_data = url.split("?");
        let temp = pre_data[1].split("&");
        let token = temp[0].split("=")[1];
        let code = temp[1].split("=")[1];
        this.setState({ token: token, account_id: code });
      }
    } catch (error) {
      console.log(error);
    }
  }
  renderErrorConnection() {
    return (
      <View style={styles.errorCon}>
        <Icon name="signal-wifi-off" />
        <Text>Erreur lors de la connexion aux serveurs</Text>
        <Text>Verifiez votre connexion ou</Text>
        <Text>Réessayer un peu plus tard</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            width: "95%",
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              height: 480,
              backgroundColor: "white"
            }}
          >
            <WebView
              ref="webview"
              startInLoadingState={true}
              source={{ uri: "http://54.229.79.45/AriaryNet/Login/" }}
              style={{ backgroundColor: "white" }}
              scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onNavigationStateChange={this.onChageUrl.bind(this)}
              onLoadEnd={this.onSuccess}
              renderError={this.renderErrorConnection}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              alignContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => this.Cancel()}
              style={{
                width: "49%",
                backgroundColor: "#00BF9A",
                marginRight: "1%"
              }}
            >
              <Text style={{ textAlign: "center", padding: 15, color: "#fff" }}>
                Annuler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Inscription", { data: null });
              }}
              style={{
                width: "49%",
                backgroundColor: "#00BF9A",
                marginLeft: "1%"
              }}
            >
              <Text style={{ textAlign: "center", padding: 15, color: "#fff" }}>
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading && (
          <View
            style={{
              backgroundColor: "rgba(44, 62, 80,0.4)",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <ActivityIndicator size="large" animating={true} color="#fff" />
            <Text style={{ color: "white" }}>Authentification encours...</Text>
          </View>
        )}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(54,34,30,0.4)"
  },
  errorCon: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 195, 199,1.0)"
  }
});

//make this component available to the app
export default Login;
