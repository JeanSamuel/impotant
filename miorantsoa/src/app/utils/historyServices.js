//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Services from "./services";
import moment from "moment";
import "moment/locale/fr";
import _ from "lodash";
import config from "../config/config";

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
    let url = config.CUSTOM_BASE_URL + "transaction/" + user_id;
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.saveHistory(JSON.stringify(responseJson));
        return responseJson;
      })
      .catch(error => {
        console.log("erreur aty aloha", error);
        throw error;
      });
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

  groupHistory(history) {
    return _.groupBy(history, h =>
      moment(h.date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  }

  async saveHistory(history) {
    let services = new Services();
    try {
      services.saveData("history", history);
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
    let dataRefactored = [];
    if (data.length != 0) {
      let actualDate = data[0].date.split(" ")[0];
      dataRefactored = [[data[0]]];
      let actualLigne = 0;

      for (var index = 1; index < data.length; index++) {
        let transac = data[index];
        let date = transac.date.split(" ")[0];
        if (date == actualDate) {
          dataRefactored[actualLigne].push(transac);
        } else {
          actualDate = date;
          actualLigne++;
          dataRefactored[actualLigne] = [];
          dataRefactored[actualLigne][0] = transac;
        }
      }
    }
    return dataRefactored;
  }
}

//make this component available to the app
export default HistorySevices;
