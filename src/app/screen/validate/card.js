import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

const Card = ({ title, value, iconName, data }) => (
  <TouchableOpacity onPress={() => console.log("")}>
    <View style={[styles.container]}>
      <View style={styles.iconRow}>
        <Icon
          name="email"
          underlayColor="transparent"
          iconStyle={styles.cardIcon}
          onPress={() => console.log("")}
        />
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardColumn}>
          <Text style={styles.cardText}>{title}</Text>
        </View>
      </View>
    </View>
    {Object.keys(data).map(function(key, i) {
      return (
        <View style={[styles.container]} key={i}>
          <View style={styles.iconRow} />
          <View style={styles.cardRow} key={i}>
            <View style={styles.cardColumn}>
              <Text style={styles.cardText}>{key}</Text>
            </View>
            <View style={styles.cardNameColumn}>
              <Text style={styles.cardNameText}>{data[key]}</Text>
            </View>
          </View>
        </View>
      );
    })}
  </TouchableOpacity>
);

Card.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

Card.defaultProps = {
  containerStyle: {},
  name: null
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  cardColumn: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  cardIcon: {
    color: "#01C89E",
    fontSize: 30
  },
  cardNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  cardNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200"
  },
  cardRow: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center"
  },
  cardText: {
    fontSize: 16
  },
  iconRow: {
    flex: 2,
    justifyContent: "center"
  }
});
