//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import config from "../../config/data/config";
import configs from "../../config/data/dataM";
import moment from "moment";
import Services from "../utils/services";
import {Utils} from "../index";

// create a component
// const transaction_url = config.CUSTOM_BASE_URL + "transaction";
//const transaction_url = configs.NEW_BASE_URL + "src/transaction.php";
const transaction_url = configs.ARIARY_BASE_URL + "transaction";
class QrServices extends Component {
  /**
   *
   * @param {*} data
   */
  readQrData(data) {
    //console.log("From service", data.a);
    const qrData = data;
    let type = qrData.t;
    let currency = qrData.c;
    let user = qrData.u;
    let amount = qrData.a;
    return_data = {
      type: type,
      currency: currency,
      user: user,
      amount: amount
    };
    return return_data;
  }

  /**
   *
   * @param {*} qrData
   * @param {*} access_token
   * @param {*} user_id
   */
  isDataValid(qrData) {
    if (qrData.type !== null && qrData.type == "trans") {
      if (
        qrData.currency === null ||
        qrData.user === null ||
        qrData.amount === null
      ) {
        return false;
      }
      return true;
    }
  }

  async performTransation(
    amount,
    senderId,
    currency,
    recipientId,
    access_token
  ) {
    const url = transaction_url;
    let services = new Services();
    let formData = new FormData();
    let device_token = await Utils.registerForPushNotificationsAsync();
    formData.append("amount", amount);
    formData.append("senderId", senderId);
    formData.append("recipientId", recipientId);
    formData.append("currency", currency);
    formData.append("comment", "Transfert");
    formData.append("type","expo");
    formData.append("token",device_token);
    let data = {
      method: "POST",
      body: formData
    };
    //console.log("Transaction data: " + JSON.stringify(data));
    return fetch(url, data)
      .then(response => response.json())
      .then(responseJson => {
        console.log("performTransaction: "+responseJson);
        return responseJson;
      })
      .catch(error => {
        console.log("performTransaction erreur aty aloha", error);
        throw error;
      });
  }
}
export default QrServices;
