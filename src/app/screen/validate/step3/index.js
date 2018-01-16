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
import { Header } from "../allSteps";

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
    this.props.navigation.navigate("AttachInfo");
  };
  render() {
    return (
      <View style={styles.container}>
        <Header position={2} title="Contact" />
        <ScrollView behavior="padding" style={styles.body}>
          <View style={styles.formular}>
            <FormLabel containerStyle={styles.inputLabel}>
              Numéro de téléphone : *
            </FormLabel>
            <FormInput
              ref="input"
              onChangeText={this.someFunction}
              underlineColorAndroid="transparent"
              autoFocus={true}
              containerStyle={styles.input}
            />
            <FormValidationMessage />
          </View>

          <View style={styles.formular}>
            <FormLabel containerStyle={styles.inputLabel}>Email : *</FormLabel>
            <FormInput
              ref="input"
              onChangeText={this.someFunction}
              underlineColorAndroid="transparent"
              autoFocus={true}
              containerStyle={styles.input}
            />
            <FormValidationMessage />
          </View>

          <View style={styles.formular}>
            <FormLabel containerStyle={styles.inputLabel}>
              Adresse : *
            </FormLabel>
            <FormInput
              ref="input"
              onChangeText={this.someFunction}
              underlineColorAndroid="transparent"
              containerStyle={styles.input}
            />
            <FormValidationMessage />
          </View>
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Text />
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
    paddingBottom: 20,
    backgroundColor: "white",
    flex: 1
  },
  formular: { marginVertical: 0 },
  input: {
    backgroundColor: "rgba(189, 195, 199,0.1)",
    borderColor: "rgba(189, 195, 199,0.5)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginLeft: 20,
    marginVertical: 0,
    height: 40
  },
  inputLabel: {},
  buttonLeft: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
