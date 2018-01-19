import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Icon
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { NavigationActions } from "react-navigation";
import { Header } from "../allSteps";
import userData from "../data.json";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  goToNextStep = () => {
    let data = {
      connexion: userData.connexion,
      user: userData.user,
      pieces: userData.pieces
    };
    this.props.navigation.navigate("Step4", data);
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={2} title="Pièces justificatifs" />
        <ScrollView behavior="padding" style={styles.body}>
          <View style={styles.piecesjointesContainer}>
            <View style={styles.piecesjointes}>
              <View>
                <Icon reverse name="user" color="#517fa4" type="font-awesome" />
              </View>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importer votre photo d'identité
                </Text>
              </View>
            </View>
            <FormValidationMessage>Trop volumineux</FormValidationMessage>
          </View>
          <View style={styles.piecesjointesContainer}>
            <View style={styles.piecesjointes}>
              <View>
                <Icon
                  reverse
                  name="id-card-o"
                  color="#517fa4"
                  type="font-awesome"
                />
              </View>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importer votre CIN ou Passeport
                </Text>
                <Text style={styles.pieceText}>(Recto-Verso)</Text>
              </View>
            </View>
          </View>
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
            title="Validation"
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
  },
  piecesjointes: {
    flexDirection: "row",
    backgroundColor: "rgba(189, 195, 199,0.3)",

    padding: 10
  },
  piecesjointesContainer: {
    margin: 20
  },
  pieceTextCOntainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  pieceText: {
    fontWeight: "bold",
    fontSize: 15
  }
});
