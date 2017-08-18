//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";

const errorIcon = require("../../images/icons/no-conection-256.png");
// create a component
class Error extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 25 }}>
          <View style={[styleBase.centered, { marginBottom: 10 }]}>
            <Image source={errorIcon} style={styles.mark} />
          </View>
          <View style={styleBase.centered}>
            <Text style={{ color: "rgba(127, 140, 141,1.0)" }}>
              Connection failed
            </Text>
            <Text style={{ color: "rgba(127, 140, 141,1.0)" }}>
              Please, Try again later
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Error;
