import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

import mainColor from "./constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  emailColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  emailIcon: {
    color: mainColor,
    fontSize: 30
  },
  emailNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  emailNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200"
  },
  emailRow: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center"
  },
  emailText: {
    fontSize: 16
  },
  iconRow: {
    flex: 2,
    justifyContent: "center"
  }
});

const Email = containerStyle => (
  <TouchableOpacity onPress={() => console.log("GG")}>
    <View style={[styles.container]}>
      <View style={styles.iconRow}>
        <Icon
          name="home"
          underlayColor="transparent"
          iconStyle={styles.emailIcon}
          onPress={() => console.log("GG")}
        />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>58 Avenue Andrianampoinimerina</Text>
        </View>
        <View style={styles.emailNameColumn}>
          <Text style={styles.emailNameText}>Analakely, Antananarivo 101</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Email.defaultProps = {
  containerStyle: {},
  name: null
};

export default Email;
