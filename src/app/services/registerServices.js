//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "expo";
import { Permissions, Notifications } from "expo";
import NotifServices from "./notificationServices";
import Services from "./services";
import configs from "../configs/data/dataM";

const regex = /^([a-zA-Z0-9_-]){4,}$/;
// create a component
class RegisterServices extends Component {
  checkInputError(value) {
    if (regex.test(value)) {
      return true;
    } else {
      throw "Le nom doit comporter au minimum 4 caractères, sans espace ou caractères spéciaux";
    }
  }

  /**
   * Generate expo-token and send it to server with the account name
   * @param {*} accountId the username of the account
   */
  async saveAccount(accountId) {
    var notifServices = new NotifServices();
    var token = await new Services().getExpoToken();
    await notifServices.initForPushNotificationsAsync(accountId);

    let url = configs.BASE_URL + "UserRestController.php";
    var formData = new FormData();
    formData.append("accountId", accountId);
    formData.append("expo_token", token);
    var response = await new Services().myFetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          try {
            let services = new Services();
            services.saveData("user_id", accountId);
          } catch (error) {
            let myerror = new Error(error);
            myerror.message = "Une erreur est survenue veuillez réessayer";
            throw myerror;
          }
        } else if (response.status == 405) {
          let num = Services.getRandomNumber();
          let error = new Error(response.error);
          error.message =
            "Ce nom est déjà utilisé, veuillez choisir un autre (essayez avec : " +
            accountId +
            num;
          error.response = response;

          throw error;
        } else {
          let error = new Error(response.error);
          error.message =
            "Une erreur est survenue lors de la connexion aux serveurs";
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
