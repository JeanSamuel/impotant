import React, { Component } from "react";
import { Constants } from "expo";
import { Permissions, Notifications } from "expo";
import Services from "./services";
import RegisterServices from "./registerServices";
import data from "../configs/data/dataM";

const PUSH_INIT = data.BASE_URL + "exp_token/init.php";
const PUSH_STOP = data.BASE_URL + "exp_token/disconnect.php";
const PUSH_REGISTER = data.BASE_URL + "exp_token/createAccount.php";

export default class NotifServices extends Component {
  ExceptionUtilisateur(message) {
    this.message = message;
    this.name = "ExceptionUtilisateur";
  }

  async imBackNotification() {
    var services = new Services();
    var token = await services.getData("expo_token");
  }

  async registerExpoToken(username, token) {
    var formData = new FormData();
    formData.append("token", token);
    formData.append("username", username);
    var response = await fetch(PUSH_REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        if (response.status === 200) {
          console.log("eto ah");
        }
        if (response.status == 405) {
          let error = new Error(response.statusText);
          error.message = "Ce nom est déjà utilisé, veuillez choisir un autre";
          error.response = response;
          throw error;
        } else {
          let error = new Error(response.statusText);
          error.message = "Verifier votre connexion";
          error.response = response;
          throw error;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  async initForPushNotificationsAsync(username) {
    var token = await Notifications.getExpoPushTokenAsync();
    this.saveExpoToken(token);
    const { existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    var services = new Services();
    var formData = new FormData();
    formData.append("token", token);
    formData.append("username", username);
    var response = await fetch(PUSH_INIT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    }).catch(error => {
      let erreur = new Error(response.statusText);
      erreur.response = response;
      console.log("error initialisation Push", erreur);
    });
  }

  async saveExpoToken(expo_token) {
    var services = new Services();
    await services.saveData("expo_token", expo_token);
  }

  async stopNotification(username) {
    var services = new Services();
    var token = await services.getData("expo_token");
    var formData = new FormData();
    formData.append("token", token);
    formData.append("user", username);
    var response = await fetch(PUSH_STOP, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    }).catch(error => {
      console.log("error", error);
    });
    await services.removeData("expo_token");
  }
}
