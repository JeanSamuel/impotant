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
  goToStep2 = () => {
    this.props.navigation.navigate("Step2");
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={2} title="Pièces justificatifs" />
        <ScrollView behavior="padding" style={styles.body} />
        <View style={styles.piecesjointes}>
          <View>
            <Icon
              reverse
              name="cloud-upload"
              color="#517fa4"
              type="font-awesome"
            />
          </View>
          <Text h4>Importer votre CIN ou Passeport</Text>
        </View>
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
            onPress={this.goToStep2}
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
    justifyContent: "space-between",
    backgroundColor: "rgba(189, 195, 199,0.3)",
    margin: 20,
    padding: 10
  }
});
