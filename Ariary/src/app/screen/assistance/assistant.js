//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneNotif from "../home/homeM/oneNotif";
import { Icon, Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { Services } from "../../services";
import { StackNavigator } from "react-navigation";
// import { Assistant_Step1, Assistant_Step2, Assistant_Step3 } from "./";
import Assistant_Step1 from "./steps/assistant_step1";
import Assistant_Step2 from "./steps/assistant_step2";
import Assistant_Step3 from "./steps/assistant_step3";

// create a component
const imageSource = require("../../images/icons/settings2.png");
class Assistant extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      navigation: null
    };
  }

  componentWillMount() {}

  removeAssistant() {
    let services = new Services();
    let returnKey = this.props.navigation.state.params.return;
    let user_id = "inconnu";
    services.removeData("newAtSettings");

    this.props.navigation.navigate(returnKey);
  }

  goToStep1() {
    this.props.navigation.navigate("Assistant_Step1");
  }

  render() {
    return (
      <View style={styles.container}>
        <OneNotif
          remove={this.removeAssistant.bind(this)}
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
    Assistant_Step1: {
      screen: Assistant_Step1
    },
    Assistant_Step2: {
      screen: Assistant_Step2
    },
    Assistant_Step3: {
      screen: Assistant_Step2
    }
  },
  {
    headerMode: "none"
  }
);
export default StackAssistance;
