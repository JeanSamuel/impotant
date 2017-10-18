//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "expo";
import configs from "../configs/data/dataM";
import Services from './services'

// create a component
class SyncServices extends Component {
  checkData(response) {
    if (response.data.type == "sync") {
      let services = new Services();
      services.saveData('access_token', response.data.token);
      return true;
    } else {
      return false;
    }
  }

  synchronise(id_account, expToken, device_id, alias) {
    let url = configs.NEW_BASE_URL + "src/beginSync.php";
    var formData = new FormData();
    formData.append("id_account", id_account);
    formData.append("expToken", expToken);
    formData.append("device_id", device_id);
    formData.append("alias", alias);
    var data = {
      method: "POST",
      body: formData
    };

    new Services().myFetch(url, data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          try {
            let services = new Services();
            return response.data;
          } catch (error) {
            let myerror = new Error(error);
            myerror.message = "Une erreur est survenue veuillez réessayer";
            throw myerror;
          }
        } else if (response.status == 405) {
          let num = Services.getRandomNumber();
          let error = new Error(response.statusText);
          error.message =
            "Ce nom est déjà utilisé, veuillez choisir un autre (essayez avec : " +
            accountId +
            num;
          error.response = response;

          throw error;
        } else {
          let error = new Error(response.statusText);
          error.message =
            "Une erreur est survenue lors de la connexion aux serveurs";
          error.response = response;

          throw error;
        }
      })
      .catch(error => {
        console.log("====================================");
        console.log("error when synchronised");
        console.log("====================================");
        throw error;
      });
  }

  getUserData(data) {
    let url = configs.NEW_BASE_URL + "src/userData.php";

    let formData = new FormData();
    formData.append("id_account", data.id_account);
    let dataPOST = {
      method: "POST",
      body: formData
    };

    return new Services().myFetch(url, dataPOST)
    .then(response => response.json())
    .then(responseJSON => {
      console.log('====================================');
      console.log('userData', responseJSON);
      console.log('====================================');
      return responseJSON;
    })
    .catch(error =>{
      console.log("erreur aty synServices", error);
      throw error;
    })
    
    
  }
}

//make this component available to the app
export default SyncServices;
