import React, { Component } from "react";
import { Utils } from "../../services";

const regex = /^([a-zA-Z0-9_-]){4,}$/;
class Services extends Component {
  checkMail(value) {
    try {
      Utils._isValidMail(value);
      return 0;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return error;
    }
  }
  checkPass(checkPass) {
    try {
      Utils._isValidPass(checkPass);
      return 0;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return error;
    }
  }
  checkPseudo(checkPseudo) {
    if (regex.test(checkPseudo)) {
      return 0;
    } else {
      return "Le nom doit comporter au minimum 4 caractères, sans espace et/ou caractères spéciaux";
    }
  }
  checkPassAgain(pass, passAgain) {
    if (pass == passAgain) {
      return 0;
    } else {
      return "Mots de passe non identiques";
    }
  }

  checkName(value) {}

  checkSimpleData(value) {
    if (value) {
      return 0;
    } else {
      return "Ce champ est obligatoire";
    }
  }

  parsePhone(phoneNumber) {
    // return Utils._parsePhone(phoneNumber, "MGA");
    return phoneNumber;
  }

  checkPhone(phone) {
    try {
      Utils.validatePhoneNumer(phone);
      return 0;
    } catch (error) {
      return error;
    }
  }

  checkDateN(date) {}
}

export default Services;
