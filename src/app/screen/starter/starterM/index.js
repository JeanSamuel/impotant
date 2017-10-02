import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
import styles from "./starterStyles";
import styleBase from "../../../styles/styles";
import StarterButton from "./starterButton";
import moment from "moment";

const background = require("../../../images/back3.jpg");
const mark = require("../../../images/icons/logo.png");

const actualDate = moment().get("year");

// create a component
class Starter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
    this._checkBackAndroid = this._checkBackAndroid.bind(this);
  }

  componentWillMount() {
    let navigation = this.props.navigation;
    BackHandler.addEventListener("hardwareBackPress", this._checkBackAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._checkBackAndroid
    );
  }

  _checkBackAndroid() {
    let routName = this.props.navigation.state.routeName;
    if (routName == "Starter" || routName == "First") {
      return true;
    } else {
      // this.props.navigation.goBack();
      return false;
    }
  }

  render() {
    return (
      <View>
        <Image
          source={background}
          style={[styles.background, styleBase.centered]}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={[{ flexGrow: 1 }, styleBase.centered]}
          >
            <View style={[styles.logoContainer, styleBase.centered]}>
              <Image source={mark} style={styles.mark} resizeMode="contain" />
              <View style={styles.logoTextContainer}>
                <Text style={[styleBase.textWhiteCentered, styles.logoText]}>
                  Ariary.net Marchand
                </Text>
              </View>
            </View>
            <View style={styleBase.centered}>
              <StarterButton navigation={this.props.navigation} />
            </View>
          </ScrollView>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              Ariary.net copyright © {actualDate}
            </Text>
          </View>
        </Image>
      </View>
    );
  }
}

// define your styles
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default Starter;
