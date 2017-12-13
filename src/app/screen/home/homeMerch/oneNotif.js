//import liraries
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { height } from "Dimensions";
import { styleBase } from "../../../assets/styles";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
const textColor = "rgba(236, 240, 241,1.0)";
const image = require("../../../assets/images/icons/bonus.png");
class OneNotif extends Component {
  action() {
    this.props.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity style={styles.close} onPress={() => this.action()}>
            <Text style={[styleBase.textWhite, styles.closeText]}>PASSER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <Image
              source={this.props.imageSource}
              resizeMode="center"
              style={styles.imageStyle}
            />
          </View>
          <View
            style={[
              styles.textContainer,
              { flexDirection: "column", justifyContent: "flex-end" }
            ]}
          >
            <Text style={styles.textTitle}>{this.props.title}</Text>
            <Text style={styles.textBody}>{this.props.body}</Text>
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 73, 94,1.0)"
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  closeContainer: { padding: 20 },
  close: {},
  closeText: { textAlign: "right", fontSize: 20 },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: height * "20%"
  },
  imageStyle: {
    marginTop: "20%",
    width: "100%",
    height: "80%"
  },
  textContainer: { flex: 1, paddingHorizontal: 20 },
  textTitle: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  textBody: {
    color: "#FFF",
    textAlign: "center",
    paddingHorizontal: 30
  }
});

//make this component available to the app
export default OneNotif;
