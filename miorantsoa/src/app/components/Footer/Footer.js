//import liraries
import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";

// create a component
const Footer = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

Footer.propTypes = {
  children: PropTypes.any
};
//make this component available to the app
export default Footer;
