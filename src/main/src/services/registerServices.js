//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

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

  async saveAccount(accountId) {
    let url = "http://ariary.vola.mg/UserRestController.php";
    var formData = new FormData();
    formData.append("accountId", accountId);
    var response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {})
      .catch(error => {
        throw error;
      });
  }
}

//make this component available to the app
export default RegisterServices;
