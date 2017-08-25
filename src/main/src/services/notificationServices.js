import React, { Component } from "react";
import { Constants } from "expo";
import { Permissions, Notifications } from "expo";
import Services from "../services/services";
import RegisterServices from "../services/registerServices";

const PUSH_INIT = "http://ariary.vola.mg/exp_token/init.php";
const PUSH_STOP = "http://ariary.vola.mg/exp_token/disconnect.php";
const PUSH_REGISTER = "http://ariary.vola.mg/exp_token/createAccount.php";

export default class NotifServices extends Component {
  ExceptionUtilisateur(message) {
    this.message = message;
    this.name = "ExceptionUtilisateur";
  }

  async imBackNotification() {
    var services = new Services();
    var token = await services.getData("expo_token");
  }

  async register(name) {
    var token = await Notifications.getExponentPushTokenAsync();
    await this.saveExpoToken(token);

    var formData = new FormData();
    formData.append("token", token);
    formData.append("username", name);
    var response = await fetch(PUSH_REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        console.log("ty le reponse resaan", response.status);
        if (response.status === 200) {
          let regServices = new RegisterServices();
          regServices.saveAccount(name);
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
    var token = await services.getData("expo_token");
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
      console.log("error", error);
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
