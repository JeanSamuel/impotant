import React, { PropTypes } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
// import styles from "./containerStyles";

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
