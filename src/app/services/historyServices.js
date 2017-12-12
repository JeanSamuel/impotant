//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Services from "./services";
import moment from "moment";
import "moment/locale/fr";
import _ from "lodash";
import config from "../config/data/dataM";

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

  checkHistoryError(data) {
    if (data.length > 0) {
      let oneData = data[0];
      if (!oneData.id) {
        return [];
      }
      return data;
    } else {
      return data;
    }
  }

  async getHistory(user_id) {
    if (user_id == null) {
      return [];
    }
    let url = config.NEW_BASE_URL + "src/transaction.php?account-id=" + user_id;
    console.log("====================================");
    console.log("début maka history ", user_id);
    console.log("====================================");

    try {
      return new Services()
        .myFetch(url, { method: "GET" })
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.error != 0) {
            let dataChecked = this.checkHistoryError(responseJSON);
            this.saveHistory(JSON.stringify(dataChecked));
            return dataChecked;
          } else {
            console.log("====================================");
            console.log("erreur de données getHistory", responseJSON);
            console.log("====================================");
            return [];
          }
        })
        .catch(error => {
          throw new Services().createError(
            error,
            "erreur services getting History"
          );
        });
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

  groupHistory(history) {
    return _.groupBy(history, h =>
      moment(h.date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  }

  /**
   *@description transforme une tableau de données en une tableau 2 dimensions groupée par date
   *@argument data : le table de départ
   */
  refactHistory(data) {
    return _.groupBy(data, h =>
      moment(h.date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  }
  groupRecipientId(data) {
    return _.groupBy(data, h => h.recipientId);
  }

  getSentTransactionData(data, senderId) {
    return _.filter(data, h => {
      return h.senderId == senderId;
    });
  }

  getReceivedTransaction(data, recipientId) {
    return _.filter(data, h => {
      return h.recipientId == recipientId;
    });
  }
}

//make this component available to the app
export default HistorySevices;
