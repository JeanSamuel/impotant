//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Share
} from "react-native";
// import styleBase from "../../styles/Styles";
import configs from "../configs/data/dataM";

import { FormValidationMessage } from "react-native-elements";
import { Icon } from "react-native-elements";
import FormData from "FormData";
import Toast from "react-native-easy-toast";
import { RegisterServices } from "./";

// create a component
class Services extends Component {
  static _shareMessage(value) {
    Share.share({
      message: value
    }).then(this._showResult);
  }

  _showResult(result) {
    Alert.alert("Alert Title");
  }

  /**
     * Choisir entre aller ver le login ou tout de suite la page d'accueil s'il est déjà connecté
     */
  async getInitialRoutes() {
    var isLogged = await this.isLogged();
    var response = "Starter";
    if (isLogged) response = "DrawerExample";

    return response;
  }

  /**
     * On check si il y a déjà un compte connecté ou non
     */
  async isLogged() {
    var oAuthCode = await this.getData("oauthCode");
    if (oAuthCode === null) {
      return false;
    }
    return true;
  }

  /**
     * Mise en forme d'un nombre (sous format string)
     * @param {*} number 
     */
  static formatNumber(number) {
    var dataformat = String(number).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
    dataformat = dataformat.replace("-", "");
    var value = parseFloat(number);
    var sign = "";
    if (value < 0) {
      sign = "- ";
    }
    dataformat = sign + dataformat;
    return dataformat;
  }

  // static waiting() {
  //   return (
  //     <View style={styleBase.error}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // static createError(text) {
  //   return (
  //     <View style={styleBase.error}>
  //       <Icon name="warning" size={15} color={styleBase.color} />
  //       <Text style={styleBase.errorText}>{text}</Text>
  //     </View>
  //   );
  // }

  async saveData(key, value) {
    console.log("ty le key", key);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("amty key ty", key);
      console.log("error", error);
      throw "something went wrong when saving data";
    }
  }

  async getData(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("la clé n'existe pas");
    }
  }

  /**
     * Vider des données
     */
  async logout() {
    await AsyncStorage.clear(err => {
      console.log("misy tsy nety", err);
    });
  }

  async removeAll() {
    try {
      await AsyncStorage.removeAll();
    } catch (error) {
      console.log("Erreur lors de la supression");
    }
  }

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Erreur lors de la supression");
    }
  }

  async isNewUser(user_id) {
    await this.saveData("newAtHome", "yes");
    await this.saveData("newAtSettings", "yes");
    await this.saveData("numberBadge", "1");
  }

  /**
     * liste  des webservices à faire et les données à stocké lors d'une connexion
     * @param {*} webViewState : l'etat actuel dela fenetre de login (Webview)
     */
  async goLogin(webViewState) {
    var OauthCode = await this.extractOauthCode(webViewState.url);
    var token = await this.getToken(OauthCode);
    return await this.getUserInfo(token);
  }

  static getRandomIntoArray(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  static getRandomNumber() {
    return Math.floor(Math.random() * 100 + 1);
  }

  /**
     * 
     * @param {*} uri the url contains the Oauth Code 
     * then save this into storage
     */
  async extractOauthCode(uri) {
    var myData = uri.replace("=", " ").replace("&", " ");
    var dataArray = myData.split(" ");
    await this.saveData("oauthCode", dataArray[1]);
    return dataArray[1];
  }

  /**
     * get token using Oauth code stored into AsynStorage
     */
  async getToken(oauthCode) {
    console.log("====================================");
    console.log("Base_url", configs.BASE_URL_Oauth);
    console.log("====================================");
    var url = configs.BASE_URL_Oauth + "oauth2/token";
    var formData = new FormData();
    formData.append("code", oauthCode);
    formData.append("client_id", "ariarynet");
    formData.append("client_secret", "ariarynetpass");
    formData.append("redirect_uri", configs.BASE_URL_Oauth + "index.php/");
    formData.append("grant_type", "authorization_code");
    formData.append("scope", "userinfo");
    var data = {
      method: "POST",
      body: formData
    };
    const response = await fetch(url, data);
    const json = await response.json();
    await this.saveData("token", json.access_token);
    return json.access_token;
  }

  /**
     * Take data user with token
     */
  async getUserInfo(token) {
    var url = configs.BASE_URL_Oauth + "oauth2/userinfo?access_token=" + token;
    var response = await fetch(url, { method: "GET" });
    var json = await response.json();
    var userInfo = "";
    if (json.user_id !== null) {
      await this.saveData("user_id", json.user_id);
      userInfo = json.user_id;
    } else {
      throw "user_id null";
    }
    return userInfo;
  }

  async checkSolde(user_id) {
    // var url = loginData.BASE_URL + "balance/aa031";
    var url = configs.BASE_URL + "balance/" + user_id;
    try {
      var response = await fetch(url, { method: "GET" });
      var json = await response.json();
      if (json.accountId != null) {
        await this.saveData("solde", JSON.stringify(json));
        return json;
      } else {
        let error = new Error(response.statusText);
        error.message = json.error;
        error.response = response;
        throw error;
      }
    } catch (error) {
      let error = new Error(response.statusText);
      error.message = json.error;
      error.response = response;
      throw error;
    }
  }
}

//make this component available to the app
export default Services;
