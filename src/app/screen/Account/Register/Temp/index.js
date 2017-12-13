import React, { Component } from "react";
import {
  StatusBar,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Header, Button, Icon } from "react-native-elements";
import PropTypes from "prop-types";
import Mybutton from "../../../../components/Buttons/SamButton";
import { baseStyle, loginCss } from "../../../../assets/styles/index";
import styles from "./styles";
import { Utils, InscriptionService } from "../../../../services";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      phoneNumber: "",
      password: "",
      confpassword: "",
      email: "",
      compte: "",
      solde: 500,
      error: "",
      haserror: false,
      loading: false
    };
  }

  loadInscription() {
    this.props.navigation.navigate("Inscription", { data: null });
  }
  componentDidMount() {
    this.setState({
      email: this.state.pseudo + "@ariary.net"
    });
  }

  async _loginTemp() {
    if (this._isEmptyField()) {
      try {
        await InscriptionService._registrationTemporaire(this);
      } catch (error) {
        Alert.alert("Erreur d'inscription", error);
      }
    } else {
      Alert.alert("Erreur", "Tous les champs sont requis");
    }
  }
  _isEmptyField() {
    return (
      this.state.pseudo != null ||
      this.state.password != null ||
      this.state.pseudo != "" ||
      this.state.confpassword != null ||
      this.state.confpassword != "" ||
      this.state.password != ""
    );
  }
  _validatePass() {
    try {
      Utils._isValidPass(this.state.password);
      this.setState({ haserror: false });
    } catch (error) {
      Alert.alert("Erreur mot de passe", error.toString());
    }
  }
  _confirmPass() {
    if (this.state.password == this.state.confpassword) {
      this.setState({ haserror: false });
    } else {
      Alert.alert(
        "Erreur mot de passe",
        "Les mots de passe ne correspondent pas"
      );
    }
  }

  handleActionLeft() {
    this.props.navigation.navigate("Loader");
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={
            <Mybutton
              iconName="arrow-back"
              onPress={() => this.handleActionLeft()}
              styleBtn={baseStyle.btnLeftHeader}
            />
          }
          centerComponent={
            <View style={baseStyle.headerBodyView}>
              <Text style={baseStyle.textHeader}>Compte Ariary.net</Text>
            </View>
          }
        />
        <ScrollView>
          <View style={styles.contenuetmp}>
            <View style={styles.viewtmp}>
              <View style={styles.titletmp}>
                <View style={loginCss.imageLogin}>
                  <Icon
                    name="user-circle-o"
                    size={120}
                    color="#00BF9A"
                    type="font-awesome"
                  />
                </View>
                <View>
                  <Text style={styles.textHead}>Compte temporaire</Text>
                </View>
              </View>
            </View>
            <View style={loginCss.inputWrap}>
              <View style={loginCss.iconWrap}>
                <View style={loginCss.iconWrap}>
                  <Icon
                    name="user"
                    color="#00BF9A"
                    size={20}
                    type="font-awesome"
                  />
                </View>
              </View>
              <TextInput
                placeholder="Pseudo"
                value={this.state.pseudo}
                style={loginCss.input}
                autoFocus={false}
                onChangeText={pseudo => this.setState({ pseudo })}
                returnKeyType="next"
              />
            </View>
            <View style={loginCss.inputWrap}>
              <View style={loginCss.iconWrap}>
                <Icon
                  type="material-icon"
                  name="lock"
                  size={20}
                  color="#00BF9A"
                />
              </View>
              <TextInput
                placeholder="Mot de passe"
                onChangeText={password => this.setState({ password })}
                secureTextEntry
                style={loginCss.input}
                onEndEditing={() => {
                  this._validatePass();
                }}
              />
            </View>
            <View style={loginCss.inputWrap}>
              <View style={loginCss.iconWrap}>
                <Icon
                  type="material-icon"
                  name="lock"
                  size={20}
                  color="#00BF9A"
                />
              </View>
              <TextInput
                placeholder="Confirmer Mot de passe"
                onChangeText={confpassword => this.setState({ confpassword })}
                secureTextEntry
                style={loginCss.input}
                onEndEditing={() => {
                  this._confirmPass();
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                success
                onPress={() => this._loginTemp()}
                style={{
                  alignSelf: "center",
                  padding: 15,
                  backgroundColor: "#00BF9A"
                }}
              >
                <Text style={styles.textValider}>Continuer</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", margin: 20 }}>
              <TouchableOpacity
                transparent
                onPress={() => this.loadInscription()}
                style={{ alignSelf: "center", padding: 15 }}
              >
                <Text style={styles.textInscrire}>Je veux m'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {this.state.loading && (
          <View style={styles.load}>
            <ActivityIndicator size="large" animating={true} color="#FFF" />
            <Text style={styles.textLoad}>Enregistrement encours...</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Main;
