import React from "react";
import { Image, View, Text } from "react-native";

import styles from "./styles";

const mark = require("./images/logo.png");

class LogoMini extends React.Component {
  render() {
    return (
      <View style={[styles.markWrap, this.props.style]}>
        <Image
          source={mark}
          style={styles.containerImage}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default LogoMini;
