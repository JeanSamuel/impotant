//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "../../styles/MainStyles";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

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
     *@description mmise en forme de chaque section(jour)
     *@type sectionTitle
     *@argument sectionData : c'est l'ensemble des données dans la section (tableau)
     *@argument sectionID : le numero de la section
     *@return le titre avec mis en forme
     *@example dimanche 9 juillet 2017
     */
  renderSectionHeader(sectionData, sectionID) {
    let actualDate = sectionData[0].date.split(" ")[0];
    let section = this.getMomentFormat1(actualDate);

    let today = "Aujourd'hui";
    if (moment().isSame(section, "d")) {
      section = (
        <View style={styles.sectionHeaderNow}>
          <Text
            style={[styles.sectionHeaderTitle, styles.sectionHeaderTitleNow]}
          >
            {today}
          </Text>
        </View>
      );
    } else {
      section = (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>
            {this.getMomentFormat2(section)}
          </Text>
        </View>
      );
    }
    return <View>{section}</View>;
  }

  /**
     *@description transforme une tableau de données en une tableau 2 dimensions groupée par date
     *@argument data : le table de départ
     */
  refactHistory(data) {
    console.log("data", data);
    var actualDate = data[0].date.split(" ")[0];
    var dataRefactored = [[data[0]]];
    var actualLigne = 0;

    for (var index = 1; index < data.length; index++) {
      var transac = data[index];
      var date = transac.date.split(" ")[0];
      if (date == actualDate) {
        dataRefactored[actualLigne].push(transac);
      } else {
        actualDate = date;
        actualLigne++;
        dataRefactored[actualLigne] = [];
        dataRefactored[actualLigne][0] = transac;
      }
    }
    return dataRefactored;
  }
}

//make this component available to the app
export default HistorySevices;
