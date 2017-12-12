//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const logoFromFile = require("../../assets/images/icons/logo.png");
// create a component
class QrCode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.value}
          logo={logoFromFile}
          size={180}
          logosize={35}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

//make this component available to the app
export default QrCode;
