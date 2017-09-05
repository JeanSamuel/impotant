//import liraries
import React, { Component } from "react";
import { AsyncStorage, View, Text } from "react-native";
import numeral from "numeral";
// create a component
class Services extends Component {
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
  async logout() {
    let keys = ["token", "oauthCode", "user_id", "adress"];
    try {
      await AsyncStorage.multiRemove(keys, err => {
        console.log("misy tsy nety");
      });
    } catch (error) {
      console.log("la clé n'existe plus");
    }
  }

  /**
         * 
         * @param {*} uri the url contains the Oauth Code 
         * then save this into storage
         */
  async extractOauthCode(uri) {
    oauthCode = this.get(uri, "code");
    await this.saveData("oauthCode", oauthCode);
    return oauthCode;
  }

  get(url, name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regexS = "[?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) return "";
    else return results[1];
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

  /**
         * get token using Oauth code stored into AsynStorage
         */
  async getToken(oauthCode) {
    var url = "http://auth.vola.mg/oauth2/token";
    var formData = new FormData();
    formData.append("code", oauthCode);
    formData.append("client_id", "ariarynet");
    formData.append("client_secret", "ariarynetpass");
    formData.append("redirect_uri", "http://auth.vola.mg/index.php/");
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
  async getUserInfo(token) {
    var url = "http://auth.vola.mg/oauth2/userinfo?access_token=" + token;
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
    dataformat = numeral(number).format();
    return dataformat;
  }
}
export default Services;
