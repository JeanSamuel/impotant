//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

import "moment/locale/fr";

moment.locale("fr");

// create a component
class HeaderHistory extends Component {
  getMomentFormat1(actualDate) {
    return moment(actualDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  render() {
    console.log("====================================");
    console.log("====================================");
    let sectionData = this.props.sectionData;
    let actualDate = JSON.parse(sectionData[0].date.split(" ")[0]);

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
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default HeaderHistory;
