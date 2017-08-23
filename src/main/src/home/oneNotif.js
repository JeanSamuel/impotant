//import liraries
import React, { Component } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { width, height } from "Dimensions";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class OneNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: (
        <Image
          source={this.props.imageSource}
          resizeMode="center"
          style={{ height: "60%", width: "100%" }}
        />
      )
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
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
    marginTop: 40,
    marginBottom: 20
  },
  titleText: {
    fontSize: 22,
    textAlign: "center"
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyText: { textAlign: "center", paddingHorizontal: 20, fontSize: 15 },
  imageContainer: {
    width: "100%",
    backgroundColor: "rgba(189, 195, 199,0.7)"
  }
});

//make this component available to the app
export default OneNotif;
