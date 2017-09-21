//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Services from "./services";
import moment from "moment";
import "moment/locale/fr";
import _ from "lodash";
import data from "../configs/data/dataM";

moment.locale("fr");
// create a component
class HistorySevices extends Component {
  /**
     *@type string de fromat 'YYYY-MM-DD' 
     *@return string de type 'YYYY-MM-DD'
     */
  getMomentFormat1 = function(actualDate) {
    return moment(actualDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  };

  async getHistory(user_id) {
    // let url = loginData.BASE_URL + "transaction/aa031";
    let url = data.BASE_URL + "transaction/" + user_id;

    try {
      var response = await fetch(url, { method: "GET" });
      var responseJson = await response.json();
      this.saveHistory(JSON.stringify(responseJson));
      return responseJson;
    } catch (error) {
      console.log("erreur getHistory", error);
      throw error;
    }
  }

  async getOldHistory() {
    let services = new Services();
    try {
      let data = await services.getData("history");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveHistory(history) {
    let services = new Services();
    try {
      services.saveData("history", history);
      try {
        services.removeData("numberBadge");
      } catch (error) {
        console.log("il n'y a pas de nouveau transaction");
      }
    } catch (error) {
      throw error;
    }
  }

  /**
     *@description transformer une date sous un autre format
     *@type string de fromat 'YYYY-MM-DD' 
     *@return string de type 'dddd Do MMMM YYYY'
     *@example dimanche 9 juillet 2017
     */
  getMomentFormat2 = function(actualDate) {
    return moment(actualDate, "YYYY-MM-DD").format("dddd Do MMMM YYYY");
  };

  /**
     *@description transforme une tableau de données en une tableau 2 dimensions groupée par date
     *@argument data : le table de départ
     */
  refactHistory(data) {
    return _.groupBy(data, h =>
      moment(h.date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  }
}

//make this component available to the app
export default HistorySevices;
