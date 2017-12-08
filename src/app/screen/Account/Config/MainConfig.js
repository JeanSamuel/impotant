//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  ScrollView
} from "react-native";
import { Icon, Header, List, ListItem } from "react-native-elements";
import PropTypes from "prop-types";

import styles from "./styles";
import { loginCss, baseStyle } from "../../../styles";
import { Utils, UserService } from "../../../services";

import MyButton from "../../../components/Buttons/SamButton";

// create a component
class MainConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ispinner: false,
      data: {
        code: "",
        mail: "",
        nom: "",
        phone: "",
        solde: "",
        username: "",
        birthday: "",
        roles: ""
      },
      params: null,
      allparams: null,
      isTemp: true
    };
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }
  async componentWillMount() {
    this.setState({ loading: true });
    let data = this.props.navigation.state.params.dataUser;
    this.setState({
      data: data.dataUser,
      params: data.params,
      isTemp: data.isTemp,
      allparams: data
    });
    this.setState({ loading: false });
  }
  async setDataOnrefresh() {
    try {
      const dataUser = await Utils.getItem("dataUser");
      let userData = JSON.parse(dataUser);
      let account_id = userData.code;
      const userinfo = await UserService.getUserInfo(account_id, this);
      let test = userinfo.roles[0];
      let params = {
        account_id: userinfo.code,
        pseudo: userinfo.username
      };
      this.setState({
        data: userinfo,
        isTemp: UserService.getRoles(test),
        params: params
      });
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  async _onRefresh() {
    this.setState({ ispinner: true });
    await this.setDataOnrefresh();
    this.setState({ ispinner: false });
  }
  getAmount() {
    return Utils.formatNumber(this.state.data.solde);
  }
  handleActionLeft() {
    this.props.navigation.goBack();
  }

  getMessage() {
    let key = this.state.isTemp;
    switch (key) {
      case 1:
        return "Actuellement, vous utilisez un compte temporaire. Pour l'instant, vous pouvez recevoir de l'argent. Veuillez completer vos informations pour bénéficier tous les services d'Ariary.net.";
        break;
      case 2:
        return "Actuellement, vous pouvez déjà acheter des bons d'achat, payer en ligne ou en envoyer à vos amis. Mais pour pouvoir recevoir des bons d'achat, il vous faudra valider votre compte.";
        break;
      case 3:
        return "Felicitation, votre compte est  désormais validé. Vous avez un accès total aux services offert par Arairy.net. Vous pouvez modifier vos identité où vous êtes, quand vous voulez.";
        break;
    }
  }
  onPressAction(url, params) {
    if (this.state.isTemp == 3) {
      Alert.alert(
        "Information",
        "Nous vous invitons à mettre à jour votre compte pour pouvoir modifier vos informations"
      );
    } else {
      if (params != null) {
        this.props.navigation.navigate(url, { data: params });
      }
      this.props.navigation.navigate(url, this.state.params);
    }
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
              <Text style={baseStyle.textHeader}>Paramètres</Text>
            </View>
          }
          rightComponent={
            <View style={baseStyle.headerRightView}>
              <Mybutton
                type="font-awesome"
                iconName="share-alt"
                onPress={() => Utils.ShareApp()}
                styleBtn={baseStyle.btnLeftHeader}
              />
              <Mybutton
                iconName="md-refresh"
                type="ionicon"
                onPress={() => this._onRefresh()()}
                styleBtn={baseStyle.btnLeftHeader}
              />
            </View>
          }
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.ispinner}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={test.headingContainer}>
            <Icon color="white" name="settings" size={42} />
            <Text style={test.heading}>Configuration du compte</Text>
            <Text style={[test.heading, { fontSize: 12 }]}>
              {this.getMessage()}
            </Text>
          </View>
          {this.renderListConfig(
            "Pseudo",
            this.state.data.username,
            <View
              style={[
                test.leftIcon,
                {
                  backgroundColor: "green"
                }
              ]}
            >
              <Icon size={20} color="#fff" name="person" type="material-icon" />
            </View>,
            "MainConfig",
            null
          )}
          {this.renderListConfig(
            "Email",
            this.state.data.mail,
            <View style={[test.leftIcon, { backgroundColor: "#FF9501" }]}>
              <Icon size={20} color="#fff" name="mail" type="material-icon" />
            </View>,
            "EditMail",
            null
          )}

          {this.renderListConfig(
            "Téléphone",
            this.state.data.phone,
            <View style={[test.leftIcon, { backgroundColor: "#4CDA64" }]}>
              <Icon type="material-icon" size={20} color="#fff" name="call" />
            </View>,
            "EditPhone",
            null
          )}

          {this.renderListConfig(
            "Date de naissance",
            this.state.data.birthday,
            <View style={[test.leftIcon, { backgroundColor: "#FF9501" }]}>
              <Icon
                type="material-icon"
                size={20}
                color="#fff"
                name="date-range"
              />
            </View>,
            "EditBirthday",
            null
          )}

          {this.renderListConfig(
            "Mot de passe",
            "......",
            <View
              style={[
                test.leftIcon,
                { backgroundColor: "rgba(231, 76, 60,1.0)" }
              ]}
            >
              <Icon type="material-icon" size={20} color="#fff" name="lock" />
            </View>,
            "EditPassword",
            null
          )}

          {this.state.isTemp != 3 && (
            <View style={{ backgroundColor: "#eee", padding: 15 }}>
              <Text style={test.textDevider}>Avancée</Text>
            </View>
          )}
          {this.state.isTemp == 1 && (
            <View>
              {this.renderListConfig(
                "Completer mes informations",
                "Veuillez completer votre inscription en vous inscrivant sur Ariary.net",
                <View
                  style={[
                    test.leftIcon,
                    { backgroundColor: "rgba(231, 76, 60,1.0)" }
                  ]}
                >
                  <Icon
                    type="material-icon"
                    size={20}
                    color="#fff"
                    name="person"
                  />
                </View>,
                "Inscription",
                this.state.pseudo
              )}
            </View>
          )}
          {this.state.isTemp == 2 && (
            <View>
              {this.renderListConfig(
                "Validation compte",
                "Pour bénéficier de tous les services,veuillez compléter vos informations et valider votre compte",
                <View
                  style={[
                    test.leftIcon,
                    { backgroundColor: "rgba(231, 76, 60,1.0)" }
                  ]}
                >
                  <Icon
                    type="material-icon"
                    size={20}
                    color="#fff"
                    name="done"
                  />
                </View>,
                "Validation",
                null
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  renderListConfig(title, subtitle, lefticon, url, params) {
    return (
      <ListItem
        onPress={() => this.onPressAction(url, params)}
        onLongPress={() => this.onPressAction(url, params)}
        title={title}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>{subtitle}</Text>
          </View>
        }
        leftIcon={lefticon}
      />
    );
  }
}

// define your styles
const test = StyleSheet.create({
  leftIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 5,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  textDevider: {
    alignSelf: "flex-end",
    fontSize: 18,
    color: "#666",
    paddingRight: 15
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "#666"
  },
  textEdit: {
    color: "rgba(52, 152, 219, 1.0)"
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00BF9A"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22,
    textAlign: "center"
  },
  labelContainerStyle: {
    marginTop: 8
  }
});
//make this component available to the app
export default MainConfig;
