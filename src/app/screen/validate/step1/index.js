import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { Header, TextInput } from "../allSteps";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  someFunction = () => {};
  goToNextStep = () => {
    this.props.navigation.navigate("Step2");
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={0} title="Information connexion" />
        <ScrollView behavior="padding" style={styles.body}>
          <TextInput
            label="Email"
            reference="email"
            focus={true}
            keyboardType="email-address"
          />

          <TextInput label="Pseudo" reference="pseudo" />
          <TextInput label="Mot de passe" reference="pass" secureTextEntry />
          <TextInput
            label="Veuillez entrez de nouveau le mot de passe"
            reference="passagain"
            secureTextEntry
          />
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={this.goToNextStep}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Etape suivante"
            backgroundColor="#01C89E"
            onPress={this.goToNextStep}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  buttonLeft: {
    backgroundColor: "rgba(189, 195, 199,0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});
