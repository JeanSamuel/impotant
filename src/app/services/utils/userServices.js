//import liraries
import React, { Component } from "react";
import Services from './services'

// create a component
const URL = "http://ariary.vola.mg/UserRestController.php?adress";
const GET_URL = "http://ariary.vola.mg/UserRestController.php?adress";
class UserServices extends Component {
  saveAdress(accountId, addressAccountId) {
    var formData = new FormData();
    formData.append("accountId", accountId);
    formData.append("adress_account_id", addressAccountId);
    var data = {
      method: "POST",
      body: formData
    };
    return new Services().myFetch(URL, data);
  }

  getAdresses(accountId) {
    return new Services().myFetch(GET_URL + "&&accountId=" + accountId, { method: "GET" });
  }

}

//make this component available to the app
export default UserServices;
