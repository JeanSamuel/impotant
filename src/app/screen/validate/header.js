import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { Text } from "react-native-elements";
import PropTypes from "prop-types";

const labels = ["Connexion", "Personnel", "Pièces jointes", "Succès"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: "#01C89E",
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: "#01C89E",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#01C89E",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#01C89E",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 11,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#01C89E",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#01C89E",
  fontWeight: "10"
};

export default class componentName extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  };

  render = () => {
    const { position, title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text h3>Validation de compte</Text>
          <Text style={styles.soustitle}>
            Validez et profitez pleinement des services Ariary.net
          </Text>
        </View>

        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={position}
            labels={labels}
            stepCount={4}
          />
        </View>

        <View style={styles.bodytitle}>
          <Text style={styles.bodytitletext}>{title}</Text>
          <Text style={[styles.bodytitleStep, styles.bodytitletext]}>
            Etape {position + 1} - 4
          </Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "rgba(189, 195, 199,0.2)"
  },
  title: {
    alignItems: "center",
    marginBottom: 10
  },
  soustitle: {
    color: "grey",
    fontSize: 12
  },
  body: {},
  bodytitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: "white",
    paddingTop: 15
  },
  bodytitletext: {
    fontWeight: "bold",
    fontSize: 20
  },
  bodytitleStep: { color: "#01C89E" },
  stepIndicator: { paddingBottom: 5 }
});
