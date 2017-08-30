//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneNotif from "../home/oneNotif";
import { Icon, Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import Services from "../services/services";
import { StackNavigator } from "react-navigation";
import { Step1, Step2, Step3 } from "./";

// create a component
const imageSource = require("../../images/icons/settings2.png");
class Assistant extends Component {
  constructor(props) {
    super(props);
  }

  removeAssistant() {
    console.log("navig", this.props.navig);
    let services = new Services();
    services.removeData("newAtSettings");
    this.props.navigation.state.params.close();
  }

  goToStep1() {
    this.props.navigation.navigate("Step1");
  }

  render() {
    return (
      <View style={styles.container}>
        <OneNotif
          remove={() => this.removeAssistant()}
          key="1"
          title={<Text>Bienvenue dans l'assistant de configuration</Text>}
          body={
            <Text>
              Nous allons vous aider dans la configuration de votre compte
            </Text>
          }
          imageSource={imageSource}
        />
        <View style={styles.buttonContainer}>
          <Button
            iconRight
            icon={{ name: "arrow-forward", size: 30 }}
            title="Continuer"
            backgroundColor="rgba(236, 240, 241,0.05)"
            underlayColor="#FFF"
            large
            textStyle={styles.buttonText}
            onPress={() => this.goToStep1()}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 73, 94,1.0)"
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 5
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold"
  }
});

const StackAssistance = new StackNavigator(
  {
    Assistant: {
      screen: Assistant
    },
    Step1: {
      screen: Step1
    },
    Step2: {
      screen: Step2
    },
    Step3: {
      screen: Step2
    }
  },
  {
    headerMode: "none"
  }
);
export default StackAssistance;
