//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import EStyleSheet from "react-native-extended-stylesheet";

import "moment/locale/fr";

moment.locale("fr");

// create a component
class HeaderHistory extends Component {
  getMomentFormat1(actualDate) {
    return moment(actualDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  getMomentFormat2 = function(actualDate) {
    return moment(actualDate, "YYYY-MM-DD").format("dddd Do MMMM YYYY");
  };

  render() {
    let sectionData = this.props.sectionData;
    if (sectionData.length == 0) return <View />;
    else {
      let dateOfSection = sectionData[0].date.split(" ")[0];
      let section = this.getMomentFormat1(dateOfSection);
      let response = null;
      let today = "Aujourd'hui";
      if (moment().isSame(section, "d")) {
        response = (
          <View style={styles.sectionHeaderNow}>
            <Text
              style={[styles.sectionHeaderTitle, styles.sectionHeaderTitleNow]}
            >
              {today}
            </Text>
          </View>
        );
      } else {
        response = (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>
              {this.getMomentFormat2(section)}
            </Text>
          </View>
        );
      }
      return <View>{response}</View>;
    }
  }
}

// // define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  sectionHeaderTitle: {
    textAlign: "center",
    fontSize: 15
  },
  sectionHeader: {
    paddingTop: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(127, 140, 141,0.2)"
  },

  sectionHeaderTitleNow: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF"
  },
  sectionHeaderNow: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgba(127, 140, 141,0.8)"
  }
});

//make this component available to the app
export default HeaderHistory;
