//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "expo";
import { Permissions, Notifications } from "expo";
import NotifServices from "./notificationServices";

const regex = /^([a-zA-Z0-9_ -]){4,}$/;
// create a component
class RegisterServices extends Component {
  checkInputError(value) {
    if (regex.test(value)) {
      return true;
    } else {
      throw "Le nom doit comporter au minimum 4 caractères et sans caractères spéciaux";
    }
  }

  /**
   * Generate expo-token and send it to server with the account name
   * @param {*} accountId the username of the account
   */
  async saveAccount(accountId) {
    var notifServices = new NotifServices();
    var token = await Notifications.getExponentPushTokenAsync();
    await notifServices.saveExpoToken(token);

    let url = "http://ariary.vola.mg/UserRestController.php";
    var formData = new FormData();
    formData.append("accountId", accountId);
    formData.append("expo_token", token);
    var response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log("eto ah");
        } else if (response.status == 405) {
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
}

//make this component available to the app
export default RegisterServices;
