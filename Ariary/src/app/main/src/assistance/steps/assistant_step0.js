//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneNotif from "../../home/oneNotif";
import { Icon, Button } from "react-native-elements";
import Services from "../../services/services";

// create a component
const imageSource = require("../../../images/icons/settings2.png");
class Assistant extends Component {
  constructor(props) {
    super(props);
  }

  removeAssistant() {
    this.props.navigation.goBack();
  }

  goToStep1() {
    this.props.navigation.navigate("Assistant_Step1");
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

export default Assistant;
