//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Keyboard, Image } from "react-native";
import AppIntro from "react-native-app-intro";
import data from "../../../configs/data/dataM";
import { Services } from "../../../services";
import { styleBase } from "../../../styles";

// create a component

const image1 = require("../../../images/icons/bonus.png");
const image2 = require("../../../images/icons/bonus.png");
const image3 = require("../../../images/icons/bonus.png");
class MyClass extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    Keyboard.dismiss();
    let services = new Services();
    services.removeData("newAtHome");
  }

  onSkipBtnHandle = index => {
    console.log(index);
    this.props.navigation.goBack();
  };
  doneBtnHandle = () => {
    this.props.navigation.goBack();
  };
  nextBtnHandle = index => {
    console.log(index);
  };
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  };
  render() {
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        skipBtnLabel={
          <Text style={{ textAlign: "left", marginRight: 20 }}>Passer</Text>
        }
        doneBtnLabel={
          <Text style={{ textAlign: "right", paddingLeft: 20 }}>Terminer</Text>
        }
      >
        <View style={[styles.slide, { backgroundColor: "#34495e" }]}>
          <View style={[styles.logoContainer]}>
            <Image source={image1} style={styles.mark} resizeMode="center" />
          </View>
          <View level={10}>
            <Text style={styles.text}>
              Bienvenue sur l'application AriaryPro
            </Text>
          </View>
          <View level={15}>
            <Text style={styles.description}>
              Un bonus de 500 ar vient d'être versé sur nouveau compte
            </Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#34495e" }]}>
          <View style={[styles.logoContainer]}>
            <Image source={image1} style={styles.mark} resizeMode="center" />
          </View>
          <View level={10}>
            <Text style={styles.text}>Recevez de l'argent de vos proches</Text>
          </View>
          <View level={15}>
            <Text style={styles.description}>
              En utilisant l'application AriaryClient, prenez le code en photo.
            </Text>
          </View>
          <View level={15}>
            <Text style={styles.description}>
              {" "}
              Et hop! Il ne vous rete plus qu'à attendre.
            </Text>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: "#34495e" }]}>
          <View style={[styles.logoContainer]}>
            <Image source={image1} style={styles.mark} resizeMode="center" />
          </View>
          <View level={10}>
            <Text style={styles.text}>Recevez de l'argent même de loin</Text>
          </View>
          <View level={15}>
            <Text style={styles.description}>
              Partagez votre identifiant par e-mail
            </Text>
          </View>
          <View level={15}>
            <Text style={styles.description}>
              {" "}
              réseaux sociaux et même plus pour recevoir encore plus d'argent.
            </Text>
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
    textAlign: "center",
    fontWeight: "bold"
  },
  description: {
    paddingTop: 20,
    color: "#fff",
    fontSize: 17,
    textAlign: "center"
  },
  logoContainer: {
    width: 200,
    height: 200
  },
  mark: {
    width: 200,
    height: 200
  }
});

//make this component available to the app
export default MyClass;
