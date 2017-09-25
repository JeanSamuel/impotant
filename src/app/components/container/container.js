import React  from "react";
import { View } from "react-native";
import styles from "./containerStyles";
import PropTypes from "prop-types";

const Container = ({ children }) =>
  <View style={styles.container}>
    {children}
  </View>;

Container.propTypes = {
  children: PropTypes.any
};
export default Container;
