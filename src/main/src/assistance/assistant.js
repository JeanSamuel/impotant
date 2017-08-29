//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneNotif from "../home/oneNotif";
import { Icon, Button } from "react-native-elements";

// create a component
const imageSource = require("../../images/icons/settings2.png");
class Assistant extends Component {
  constructor(props) {
    super(props);
  }
  removeAssistant() {
    console.log("props", this.props);
    if (this.props.navigation.state.params.isNewUser) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.state.params.remove();
    }
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
            backgroundColor="transparent"
            underlayColor="#FFF"
            large
            textStyle={styles.buttonText}
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
    marginBottom: 20
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold"
  }
});

//make this component available to the app
export default Assistant;
