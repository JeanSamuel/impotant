//import liraries
import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";

// create a component
const Header = ({ headerText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {headerText}
      </Text>
    </View>
  );
};

Header.propTypes = {
  headerText: PropTypes.string
};

//make this component available to the app
export default Header;
