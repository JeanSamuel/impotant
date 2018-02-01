import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

import colors from "../../config/constants/colors";

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
    color: colors.$secondaryColor,
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

const Localisation = ({ containerStyle, country, city, address }) => (
  <TouchableOpacity>
    <View style={[styles.container]}>
      <View style={styles.iconRow}>
        <Icon
          name="home"
          underlayColor="transparent"
          iconStyle={styles.emailIcon}
        />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{"Addresses"}</Text>
        </View>
        <View style={styles.emailNameColumn}>
          <Text style={styles.emailNameText}>{city}, {country}</Text>
        </View>
        <View style={styles.emailNameColumn}>
          <Text style={styles.emailNameText}>{address}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Localisation.defaultProps = {
  containerStyle: {},
  name: null,
  city: null,
  country: null,
};

export default Localisation;
