//import liraries
import React, { Component } from "react";
import numeral from "numeral";
import fr from "numeral/locales";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Share,
  Platform
} from "react-native";
import { Fingerprint } from "expo";
// import styleBase from "../../styles/Styles";
import configs from "../configs/data/dataM";

import { FormValidationMessage } from "react-native-elements";
import { Icon } from "react-native-elements";
import FormData from "FormData";
import Toast from "react-native-easy-toast";
import { RegisterServices } from "./";

import config from "../configs/data/config";
// create a component
class Services extends Component {
  static _shareMessage(valueBrute) {
    let value = JSON.parse(valueBrute);
    let message = "ariary://" + value.u + ":" + value.a + value.c;
    Share.share({
      title: "Information de transaction",
      message: message,
      url: "www.facebook.com"
    }).then(this._showResult);
  }

  renderPlaceholderPage() {
    return (
      <View>
        <Text>Vous n'avez pas encore de contact enregistrer</Text>
      </View>
    );
  }

  async goLogin(webViewState) {
    var OauthCode = await this.extractOauthCode(webViewState.url);
    var token = await this.getToken(OauthCode);
    return await this.getUserInfo(token);
  }

  login(username, password) {
    formdata = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    data = {
      method: "POST",
      body: formData
    };
    return fetch();
  }

  async logout() {
    let keys = ["token", "oauthCode", "user_id", "adress", "history", "pin"];
    try {
      await AsyncStorage.multiRemove(keys, err => {
        console.log("misy tsy nety");
      });
    } catch (error) {
      console.log("la clé n'existe plus");
    }
  }

  /**
     * Mise en forme d'un nombre (sous format string)
     * @param {*} number 
     */
  static formatNumberM(number) {
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

  async saveData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);

    } catch (error) {
      console.log(error);
      throw "something went wrong when saving data";
    }
  }

  saveData2(key, value) {
    return AsyncStorage.setItem(key, value);
  }

  getData2(key) {
    return AsyncStorage.getItem(key);
  }

  async getData(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
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
    var url = configs.BASE_URL_Oauth + "oauth2/token";
    var formData = new FormData();
    formData.append("code", oauthCode);
    formData.append("client_id", configs.client_id);
    formData.append("client_secret", configs.client_secret);
    formData.append("redirect_uri", configs.BASE_URL_Oauth + "index.php/");
    formData.append("grant_type", configs.grant_type);
    formData.append("scope", configs.scope);
    var data = {
      method: "POST",
      body: formData
    };
    const response = await fetch(url, data);
    const json = await response.json();
    await this.saveData("access_token", json.access_token);
    return json.access_token;
  }

  async myFetch(url, data){
    let access_token = await this.getData('access_token')
      if(access_token != null){
        let headers =  {
          Authorization: "Bearer " + access_token
        }
        data.headers = headers;
        return await fetch(url, data);
      }
  }

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
  static formatNumber(number) {
    numeral.locale("fr");
    dataformat = numeral(number).format();
    return dataformat;
  }
  
  checkSolde(id_account) {
    // var url = loginData.BASE_URL + "balance/aa031";
    var url = configs.BASE_URL + "balance/" + 1;
    let data = {
      method: "GET"
    }
      return this.myFetch(url, data)
      .then(response => response.json())
      .then(responseJSON =>{
        
          if (responseJSON.accountId != null) {
            this.saveData("solde", JSON.stringify(responseJSON.value));
            return responseJSON;
          } else {
            return {
              value : 0
            }
            let error = new Error(response.statusText);
            error.message = json.error;
            error.response = response;
            throw error;
          }
        })
      .catch(error =>{
      })

    
  }

  static async haveFingerprint() {
    let isEnroled = false;
    let haveFingerprint = await Fingerprint.hasHardwareAsync();
    if (haveFingerprint) {
      isEnroled = await Fingerprint.isEnrolledAsync();
    }
    return isEnroled;
  }
  static async renderFingerPrintPromptAsync(messageIos) {
    if (Plateform.OS === "android") {
      (await Fingerprint.authenticateAsync())
        ? alert("authenticated")
        : alert("not authenticated");
    }
    if (Platform.OS === "ios") {
      (await Fingerprint.authenticateAsync(messageIos))
        ? alert("authenticated")
        : alert("not authenticated");
    }
  }
}
export default Services;
