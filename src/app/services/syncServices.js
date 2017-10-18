//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "expo";
import configs from "../configs/data/dataM";
import Services from './services'

// create a component
class SyncServices extends Component {
  checkDataNotification(response) {
    if (response.data.type == "sync") {
      let services = new Services();
      services.saveData('refresh_token', response.data.refresh_token);
      return true;
    } else {
      return false;
    }
  }

  async synchronise(id_account, expToken, device_id, alias) {
    let refresh_token = await new Services().getData('refresh_token');
    let url = configs.NEW_BASE_URL + "src/beginSync.php";
    var formData = new FormData();
    formData.append("id_account", id_account);
    formData.append("expToken", expToken);
    formData.append("device_id", device_id);
    formData.append("alias", alias);
    formData.append("refresh_token", refresh_token);
    var data = {
      method: "POST",
      body: formData
    };

    new Services().myFetch(url, data)
      .then(response => {
        if(response.error == null){
          return 'ok'
        }else{
          let myerror = new Error(response.error);
          myerror.message = "erreur lors de la synchronisation";
          throw myerror;
        }
      })
      .catch(error => {
        let myerror = new Error(response.error);
        myerror.message = "erreur de service lors de la synchronisation";
        throw myerror;
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
      if(response.error == null){
        return responseJSON;
      }else{
        let myerror = new Error(responseJSON.error);
        myerror.message = "erreur lors de la prise de donnée";
        throw myerror;
      }
      
    })
    .catch(error =>{
      let myerror = new Error(response.error);
      myerror.message = "erreur de service lors de la prise de donnée";
      throw myerror;
    })
    
    
  }
}

//make this component available to the app
export default SyncServices;
