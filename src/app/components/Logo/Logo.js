import React from "react";
import { Image, View, Text } from "react-native";

import styles from "./styles";

const mark = require("./images/logo.png");

const Logo = () =>
  <View style={styles.markWrap}>
    <Image source={mark} style={styles.containerImage} resizeMode="contain" />
    <Text style={styles.logoText}>Ariary.net Client</Text>
  </View>;

export default Logo;
