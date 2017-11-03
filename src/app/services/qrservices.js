//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import config from "../configs/data/config";
import configs from "../configs/data/dataM";
import moment from "moment";
import Services from "./services";

// create a component
// const transaction_url = config.CUSTOM_BASE_URL + "transaction";
const transaction_url = configs.NEW_BASE_URL + "src/transaction.php";
class QrServices extends Component {
  /**
   * 
   * @param {*} data 
   */
  readQrData(data) {
    console.log("From service", data.a);
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
    // const url = transaction_url + "/" + sender_id;
    const url = transaction_url;
    var services = new Services();
    let formData = new FormData();
    formData.append("amount", amount);
    // formData.append("senderId", sender_id);
    formData.append("senderId", senderId);
    // formData.append("recipientId", "AA002");
    formData.append("recipientId", recipientId);
    formData.append("currency", currency);
    formData.append("comment", "Transfert");
    // formData.append("date", moment(new Date()).format("YYYY-MM-DD H:mm:ss"));
    let data = {
      method: "POST",
      body: formData
    };
    console.log("Transaction data: " + JSON.stringify(data));
    return await services
      .myFetch(url, data)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson;
      })
      .catch(error => {
        console.log("erreur aty aloha", error);
        throw error;
      });

    // .then(responseJson => {
    //   return responseJson;
    // })
    // .catch(error => {
    //   console.log("erreur aty aloha", error);
    //   throw error;
    // });
  }

  async handleTransactionResponse(responseJson) {
    console.log(JSON.stringify(responseJson));
  }
}
export default QrServices;
