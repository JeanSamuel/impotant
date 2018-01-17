import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { Header, TextInput, DatePicker } from "../allSteps";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  someFunction = () => {};
  goToStep3 = () => {
    this.props.navigation.navigate("Step3");
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={1} title="Information utilisateur" />
        <ScrollView behavior="padding" style={styles.body}>
          <TextInput label="Nom et prénoms" reference="nom" focus={true} />
          <TextInput label="CIN ou Passeport" reference="nom" focus={true} />
          <DatePicker label="date de naissance" reference="dateN" />
          <TextInput
            label="Téléphone"
            reference="phone"
            keyboardType="numeric"
          />
          <TextInput label="Adresse" reference="adresse" />
          <TextInput label="Ville" reference="ville" />
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={this.goToStep2}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Etape suivante"
            backgroundColor="#01C89E"
            onPress={this.goToStep3}
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
