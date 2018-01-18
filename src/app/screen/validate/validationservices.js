import React, { Component } from "react";
import { Utils } from "../../services";

const utils = new Utils();

export default class Services extends Component {
  vaildEmail = email => {
    try {
      new Utils()._isValidMail(email);
    } catch (error) {}
  };
}
