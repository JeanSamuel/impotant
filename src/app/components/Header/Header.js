//import liraries
import React from "react";
import PropTypes from "prop-types";
import {Header} from "react-native-elements"
import styles from "./styles";


// create a component
const MyHeader = ({ headerText, leftComponent, rightComponent }) => {
  return (
    <Header
      style={styles.header}
      leftComponent = {leftComponent}
      centerComponent = {{text: headerText, style:styles.headerText}}
      rightComponent={rightComponent}
    />
  );
};

MyHeader.propTypes = {
  headerText: PropTypes.string,
  leftComponent: PropTypes.any,
  rightComponent: PropTypes.any
};

//make this component available to the app
export default MyHeader;
