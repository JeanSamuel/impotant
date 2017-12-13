//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import sendStyle from "../../assets/styles/stylesC/sendStyle";

// create a component
const { width, height } = Dimensions.get("screen");
class SendLoader extends Component {
  constructor(props) {
    super(props);
    this._width = new Animated.Value(0);
  }
  componentWillMount() {
    this.animtedValue = new Animated.Value(width / 2);
  }
  componentDidMount() {
    Animated.timing(this._width, {
      toValue: width
    }).start();
  }
  render() {
    const animatedStyle = {
      height: height / 5,
      width: this._width,
      backgroundColor: "red"
    };
    if (this.props.loading) {
      return (
        <View style={[styles.container, {}]}>
          <View style={styles.formPlaceholder} />
          <View style={styles.cameraPlaceholder} />
        </View>
      );
    }
    return null;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formPlaceholder: {
    height: height / 5,
    width: width,
    backgroundColor: "#dddddd"
  },
  cameraPlaceholder: {
    height: height - height / 5,
    width: width,
    backgroundColor: "#E6e6e6"
  }
});

//make this component available to the app
export default SendLoader;
