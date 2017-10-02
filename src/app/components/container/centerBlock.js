import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
// import styles from "./containerStyles";
import PropTypes from "prop-types";

const CenterBlock = ({ children }) =>
  <View style={styles.container}>
    {children}
  </View>;

CenterBlock.propTypes = {
  children: PropTypes.any
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

export default CenterBlock;
