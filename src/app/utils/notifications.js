import React, { Component } from "react";
import { Constants } from "expo";
import { Permissions, Notifications } from "expo";
import Services from "./services";

const PUSH_INIT = "http://ariary.vola.mg/exp_token/init.php";
const PUSH_STOP = "http://ariary.vola.mg/exp_token/disconnect.php";
export default class NotifServices extends Component {
  async imBackNotification() {
    var services = new Services();
    var token = await services.getData("expo_token");
  }

  async registerForPushNotificationsAsync(username) {
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
    var token = await Notifications.getExponentPushTokenAsync();
    await this.saveExpoToken(token);
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

  async sendTokenToServer($URL, $body) {}

  async stopNotification() {
    var services = new Services();
    var token = await services.getData("expo_token");
    var formData = new FormData();
    formData.append("token", token);
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