//import liraries
import React, { Component } from "react";
import numeral from "numeral";
import fr from "numeral/locales";
import { AsyncStorage, Platform, Share, Text, View } from "react-native";
import { Fingerprint, Notifications } from "expo";
import configs from "../../config/data/dataM";
import FormData from "FormData";
import { RegisterServices } from "../index";

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
    return await this.getData("expToken").then(response => {
      if (response != null) {
        return response;
      } else {
        return Notifications.getExpoPushTokenAsync().then(expToken => {
          this.saveData("expToken", expToken);
          return expToken;
        });
      }
    });
  }

  renderPlaceholderPage() {
    return (
      <View>
        <Text>Vous n'avez pas encore de contact enregistrer</Text>
      </View>
    );
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
    let keys = [
      "token_data",
      "oauthCode",
      "user_id",
      "adress",
      "history",
      "pin"
    ];
    try {
      await AsyncStorage.multiRemove(keys, err => {
        //console.log("after logout");
      });
    } catch (error) {
      //console.log("la clé n'existe plus");
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
      //console.log(error);
      throw "something went wrong when saving data" + key;
    }
  }

  createError(error, message) {
    let myerror = new Error(error);
    myerror.message = message;
    return myerror;
  }

  createErrorWithoutThrow(error, message) {
    //console.log("erreur auto :", error);
    //console.log("erreur perso :", message);
    let myerror = new Error(error);
    myerror.message = message;
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
      //console.log("Erreur lors de la supression");
    }
  }

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      //console.log("Erreur lors de la supression");
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
      console.log(OauthCode);
      let response = await this.getToken(OauthCode);
      return this.getUserInfo(response).then(userInfo => {
        return userInfo;
      });
    } catch (error) {
      console.log(error);
      throw this.createError(error, "erreur during login");
    }
  }


  async saveTokenData(tokenData) {
    now = new Date();
    expireTime = now.setSeconds(now.getSeconds() + tokenData.expires_in);
    tokenData = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expire_in: expireTime
    };
    this.saveData("token_data", JSON.stringify(tokenData));
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
    formData.append("redirect_uri", configs.redirect_uri);
    formData.append("grant_type", configs.grant_type_Oauth);
    formData.append("scope", configs.scope);
    var data = {
      method: "POST",
      body: formData
    };
    return (response = await fetch(url, data)
      .then(response => response.json())
      .then(responseJSON => {
        if (!responseJSON.error) {
          this.saveTokenData(responseJSON);
          return responseJSON.access_token;
        } else {
          console.log(responseJSON.error);
          throw this.createError(
            responseJSON.error,
            "erreur getting token by OauthCode"
          );
        }
      })
      .catch(error => {
        console.log(error);
        throw this.createError(error, "erreur services during refresh_token");
      }));
  }

  async getValidToken() {
    return this.getData("token_data").then(tokenData => {
      let tokenDataJson = JSON.parse(tokenData);
      let expiration = tokenDataJson.expire_in;
      let now = new Date();
      if (expiration > now) {
        //console.log("====================================");
        //console.log("token actuel", tokenDataJson.access_token);
        //console.log("====================================");
        return tokenDataJson.access_token;
      } else {
        this.getTokenByRefreshToken(tokenDataJson.refresh_token).then(token => {
          return token;
        });
      }
    });
  }

  /**
   * Implémentation du fetch par défaut our ajouter un header avec token
   * @param {*} url
   * @param {*} data
   */
  async myFetch(url, data) {
    return this.getValidToken()
      .then(access_token => {
        if (access_token != null) {
          if (data.headers == null) {
            data.headers = {
              Authorization: "Bearer " + access_token
            };
          } else {
            let headers = data.headers;
            headers.Authorization = "Bearer " + access_token;
            data.headers = headers;
          }
          return fetch(url, data);
        }
      })
      .catch(error => {
        throw this.createError(error, "erreur services fetching");
      });
  }

  /**
   * get token using refresh_token after register or sync or expired token
   * @param {*} refresh_token
   */
  async getTokenByRefreshToken(refresh_token) {
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
      .then(response => response.json())
      .then(responseJSON => {
        if (!responseJSON.error) {
          this.saveTokenData(responseJSON).then(answer => {
            return responseJSON.access_token;
          });
        } else {
          throw this.createError(
            responseJSON.error,
            "erreur getting refresh_token"
          );
        }
      })
      .catch(error => {
        throw this.createError(error, "erreur services during refresh_token");
      });
  }

  async getUserData(pseudo) {
    let expToken = await this.getExpoToken();
    var url =
      configs.NEW_BASE_URL +
      "src/userData.php?pseudo=" +
      pseudo.trim() +
      "&expToken=" +
      expToken;
    return this.myFetch(url, { method: "GET" })
      .then(response => response.json())
      .then(responseJSON => {
        if (!responseJSON.error) {
          if (responseJSON.id_account !== null) {
            this.saveData("userData", JSON.stringify(responseJSON));
            return responseJSON;
          } else {
            throw this.createError(
              responseJSON,
              "no id_account in userData response"
            );
          }
        } else {
          throw this.createError(responseJSON.error, "erreur getting userData");
        }
      })
      .catch(error => {
        //console.log("====================================");
        //console.log("Error getting user data", error);
        //console.log("====================================");
        throw this.createError(error, "erreur services getting userData");
      });
  }

  async getUserDetails(account_id) {
    let uri = configs.ARIARY_BASE_URL + "get_details/" + account_id;
    return fetch(uri, { method: "GET" })
      .then(response => response.json())
      .then(responseJSON => {
        if (!responseJSON.error) {
          return responseJSON;
        } else {
          throw this.createError(responseJSON.error, "erreur getting userName");
        }
      })
      .catch(error => {
        throw this.createError(error, "erreur services getting userName");
      });
  }
  async getUserInfo(new_token) {
    let accound_id = "AA012";
    //http://ariary.vola.mg/new_serv/src/access-tokens.php?token=
    var url =
      configs.BASE_URL + "new_serv/src/access-tokens.php?token=" + new_token;
    let uri = configs.ARIARY_BASE_URL + "get_details/" + accound_id;
    return fetch(url, { method: "GET" })
      .then(response => response.json())
      .then(responseJSON => {
        //console.log(responseJSON);
        if (!responseJSON.error) {
          this.saveData("userInfo", JSON.stringify(responseJSON));
          userInfo = {
            user_id: responseJSON.code,
            username: responseJSON.username
          };
          this.saveData("user_id", JSON.stringify(userInfo));
          this.saveData("userData", JSON.stringify(responseJSON));

          return userInfo;
        } else {
          throw this.createError(responseJSON.error, "erreur getting userName");
        }
      })
      .catch(error => {
        throw this.createError(error, "erreur services getting userName");
      });
  }

  static formatNumber(number) {
    numeral.locale("fr");
    dataformat = numeral(number).format();
    return dataformat;
  }

  static reformatNumber(number) {
    return number.replace(/[ ,]/g, "");
  }

  /**
   * Demander la solde d'un utilisateur
   * @param {*} id_account
   */
  checkSolde(id_account) {
    var url = configs.NEW_BASE_URL + "src/balance.php?account-id=" + id_account;
    let data = {
      method: "GET"
    };
    return this.myFetch(url, data)
      .then(response => response.json())
      .then(responseJSON => {
        //console.log("====================================");
        //console.log("solde", responseJSON);
        //console.log("====================================");
        if (!responseJSON.error) {
          this.saveData("solde", JSON.stringify(responseJSON.value));
          return responseJSON;
        } else {
          throw this.createError(responseJSON.error, "erreur getting solde");
        }
      })
      .catch(error => {
        throw this.createError(
          responseJSON.error,
          "erreur services getting solde"
        );
      });
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
