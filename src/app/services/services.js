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
import configs from "../configs/data/dataM";
import { FormValidationMessage } from "react-native-elements";
import { Icon } from "react-native-elements";
import FormData from "FormData";
import Toast from "react-native-easy-toast";
import { RegisterServices } from "./";
import config from "../configs/data/config";
import { Notifications } from "expo";

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

  async getExpoToken() {
    this.getData('expToken')
    .then(response =>{
      if(response == null){
        return response;
      }else{
        return Notifications.getExpoPushTokenAsync()
        .then(token =>{
          this.saveData('expToken', token);
          return token
        })
      }
    })
    
    return token;
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
    return await this.getUserName(token);
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
   try {
    let OauthCode = await this.extractOauthCode(webViewState.url);
    let tokenData = await this.getToken(OauthCode);
    await this.saveTokenData(tokenData);
    return await this.getUserName(tokenData.access_token);
   } catch (error) {
    let myerror = new Error(response.error);
    console.log('error', error);
    myerror.message = "erreur during login";
   }
  }

  async saveTokenData(tokenData){
    await this.saveData('access_token', tokenData.access_token)
    await this.saveData('refresh_token', tokenData.refresh_token)
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
    formData.append("grant_type", configs.grant_type_Oauth);
    formData.append("scope", configs.scope);
      var data = {
        method: "POST",
        body: formData
      };
    return await fetch(url, data)
    .then(response => response.json())
    .then(responseJSON =>{
      console.log('====================================');
      console.log('token by Oauth', responseJSON);
      console.log('====================================');
      if(!responseJSON.error){
        return responseJSON;
      }else{
        let myerror = new Error(response.error);
        myerror.message = "erreur getting token by OauthCode";
        throw myerror;
      }
    })
    .catch(error =>{
      let myerror = new Error(error);
      myerror.message = "erreur services getting token by OauthCode";
      throw myerror;
    })
    
  }


  /**
   * Implémentation du fetch par défaut our ajouter un header avec token
   * @param {*} url 
   * @param {*} data 
   */
  async myFetch(url, data){
    let access_token = await this.getData('access_token')
      if(access_token != null){

        if(data.headers == null){
          data.headers = {
            Authorization: "Bearer " + access_token
          };
        }else{
          let headers = data.headers;
          headers.Authorization = "Bearer " + access_token;
          data.headers = headers
        }
        return await fetch(url, data);
      }
  }

  /**
   * get token using refresh_token after register or sync or expired token
   * @param {*} refresh_token 
   */
  async getTokenByRefreshToken(refresh_token){
    await this.saveData('refresh_token', refresh_token);
    var url = configs.BASE_URL_Oauth + "oauth2/token";
    var formData = new FormData();
    formData.append("refresh_token", refresh_token);
    formData.append("client_id", configs.client_id);
    formData.append("client_secret", configs.client_secret);
    formData.append("grant_type", configs.grant_type_refresh);
    var data = {
      method: "POST",
      body: formData
    };
    return await fetch(url, data)
    .then(response =>response.json())
    .then(responseJSON =>{
      if(!responseJSON.error){
        this.saveData('access_token', responseJSON.access_token);
        this.saveData('refresh_token', responseJSON.refresh_token)
        .then(answer =>{
          return responseJSON.access_token;
        })
      }else{
        let myerror = new Error(responseJSON.error);
        console.log(error);
        myerror.message = "erreur getting refresh_token";
        throw myerror;
      }
    })
    .catch(error =>{
      let myerror = new Error(error);
      myerror.message = "erreur services during refresh_token";
      throw myerror;
    })
    
  }

  async getUserData(pseudo){
    var url = configs.NEW_BASE_URL + "src/userData.php";
    var formData = new FormData();
    formData.append("pseudo", pseudo);
    var data = {
      method: "GET",
      body: formData
    };
    return this.myFetch(url, data)
    .then(response => response.json())
    .then(responseJSON =>{
      console.log('====================================');
      console.log('userData', responseJSON);
      console.log('====================================');
      if(!responseJSON.error){
        if (responseJSON.id_account !== null) {
          this.saveData("userData", responseJSON)
          .then(answer =>{
            return responseJSON
          })
        } else {
          console.log('error', error);
          let myerror = new Error(responseJSON.error);
          myerror.message = "erreur getting userData";
          throw myerror;
        }
        
      }else{
        console.log('error', error);
        let myerror = new Error(responseJSON.error);
        myerror.message = "erreur services getting userData";
        throw myerror;
      }
    })
    .catch(error =>{
      console.log('error', error);
      let myerror = new Error(error);
      myerror.message = "erreur services getting userInfo";
      throw myerror;
    })
  }

  async getUserName(token) {
    var url = configs.BASE_URL_Oauth + "oauth2/userinfo?access_token=" + token;
    return this.fetch(url, { method: "GET" })
    .then(response => response.json())
    .then(responseJSON =>{
      console.log('====================================');
      console.log('userInfo', responseJSON);
      console.log('====================================');
      if(!responseJSON.error){
        var userInfo = "";
        if (responseJSON.id_account !== null) {
          this.saveData("user_id", responseJSON.user_id);
          userInfo = responseJSON.user_id;
          return userInfo;
        } else {
          let myerror = new Error(responseJSON.error);
          myerror.message = "utilisateur inconnu";
          throw myerror;
        }
        
      }else{
        let myerror = new Error(responseJSON.error);
        myerror.message = "erreur getting userInfo";
        throw myerror;
      }
    })
    .catch(error =>{
      console.log('error', error);
      let myerror = new Error(error);
      myerror.message = "erreur services getting userInfo";
      throw myerror;
    })
  }


  static formatNumber(number) {
    numeral.locale("fr");
    dataformat = numeral(number).format();
    return dataformat;
  }


  /**
   * Demander la solde d'un utilisateur
   * @param {*} id_account 
   */
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
            this.saveData("solde", JSON.stringify(responseJSON.value))
            .then(answer =>{
              return responseJSON;
            })
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
