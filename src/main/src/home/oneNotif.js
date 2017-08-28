//import liraries
import React, { Component } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { width, height } from "Dimensions";
import EStyleSheet from "react-native-extended-stylesheet";

const mark = require("../../images/icons/logo-pro.png");
// create a component
class OneNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: (
        <Image
          source={this.props.imageSource}
          resizeMode="contain"
          style={{ height: "50%", width: "100%", marginTop: 10 }}
        />
      )
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.markContainer}>
              <Image source={mark} style={styles.mark} resizeMode="center" />
            </View>
            <Text style={styles.titleText}>
              {this.props.title}
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>
              {this.props.body}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          {this.state.image}
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  textContainer: {
    width: "100%",
    height: 40,
    flex: 1
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10
  },
  titleText: {
    fontSize: 22,
    textAlign: "center"
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20
  },
  bodyText: { textAlign: "center", paddingHorizontal: 20, fontSize: 15 },
  imageContainer: {
    width: "100%",
    backgroundColor: "#FFF"
  },
  markContainer: {
    width: "100%",
    height: "50%"
  },
  mark: {
    width: "100%",
    height: "100%"
  }
});

//make this component available to the app
export default OneNotif;
