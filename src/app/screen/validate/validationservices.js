import React, { Component } from "react";
import { Utils } from "../../services";

const regex = /^([a-zA-Z0-9_-]){4,}$/;
class Services extends Component {
  checkMail(value) {
    try {
      Utils._isValidMail(value);
      return 0;
    } catch (error) {
      return error;
    }
  }
  checkPass(checkPass) {
    try {
      Utils._isValidPass(checkPass);
      return 0;
    } catch (error) {
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

  checkName(value) {
    let checked = this.checkSimpleData(value);
    checked ? null : (checked = this.checkNameFormation(value));
    return checked;
  }

  checkNameFormation(value) {
    let ret = 0;
    value = value.trim();
    value.split(" ").length > 1
      ? null
      : (ret = "Ce champ doit contenir au moins 2 mots (nom et prénoms)");
    return ret;
  }

  checkSimpleData(value) {
    if (value) {
      return 0;
    } else {
      return "Ce champ est obligatoire";
    }
  }

  checkSimpleData2(value) {
    if (value) {
      return 0;
    } else {
      return "(Cette partie est requise)";
    }
  }

  parsePhone(phoneNumber) {
    try {
      let parsed = Utils._parsePhone(phoneNumber, "mg");
      return parsed;
    } catch (error) {
      throw error;
    }
  }

  checkPhone(phone) {
    try {
      Utils.validatePhoneNumer(phone);
      return 0;
    } catch (error) {
      return error;
    }
  }

  checkDateN(date) {
    return this.checkSimpleData(date);
  }
}

export default Services;
