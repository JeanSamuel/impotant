//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AppIntro from "react-native-app-intro";

// create a component
class AppStarter extends Component {
  onSkipBtnHandle = index => {
    Alert.alert("Skip");
    //console.log(index);
  };
  doneBtnHandle = () => {
    Alert.alert("Done");
  };
  nextBtnHandle = index => {
    Alert.alert("Next");
    //console.log(index);
  };
  onSlideChangeHandle = (index, total) => {
    //console.log(index, total);
  };
  render() {
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        skipBtnLabel="Passer"
        doneBtnLabel="Terminer"
      >
        <View style={[styles.slide, { backgroundColor: "#fa931d" }]}>
          <View level={10}>
            <Text style={styles.text}>Page 1</Text>
          </View>
          <View level={15}>
            <Text style={styles.text}>Page 1</Text>
          </View>
          <View level={8}>
            <Text style={styles.text}>Page 1</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#a4b602" }]}>
          <View level={-10}>
            <Text style={styles.text}>Page 2</Text>
          </View>
          <View level={5}>
            <Text style={styles.text}>Page 2</Text>
          </View>
          <View level={20}>
            <Text style={styles.text}>Page 2</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#fa931d" }]}>
          <View level={8}>
            <Text style={styles.text}>Page 3</Text>
          </View>
          <View level={0}>
            <Text style={styles.text}>Page 3</Text>
          </View>
          <View level={-10}>
            <Text style={styles.text}>Page 3</Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#a4b602" }]}>
          <View level={5}>
            <Text style={styles.text}>Page 4</Text>
          </View>
          <View level={10}>
            <Text style={styles.text}>Page 4</Text>
          </View>
          <View level={15}>
            <Text style={styles.text}>Page 4</Text>
          </View>
        </View>
      </AppIntro>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    padding: 15
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

//make this component available to the app
export default AppStarter;
