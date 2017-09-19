//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import config from "../config/config";
import moment from "moment";

// create a component
const transaction_url = config.CUSTOM_BASE_URL + "transaction";
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
    if (qrData.type !== null && qrData.type === "vola") {
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

  performTransation(amount, sender_id, currency, user_id, access_token) {
    var url = transaction_url + "/" + sender_id;
    var formData = new FormData();
    formData.append("amount", amount);
    formData.append("senderId", sender_id);
    formData.append("recipientId", user_id);
    formData.append("currency", currency);
    formData.append("comment", "Transfert");
    formData.append("date", moment(new Date()).format("YYYY-MM-DD H:mm:ss"));
    let data = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token
        // '-origin':
      },
      body: formData
    };
    console.log("waiting for transactions", url);
    return fetch(url, data);
  }

  async handleTransactionResponse(responseJson) {
    console.log(JSON.stringify(responseJson));
  }
}
export default QrServices;
