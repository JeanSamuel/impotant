//import liraries
import React, { Component } from "react";
import {} from "react-native";
import StepIndicator from "react-native-step-indicator";

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};

// create a component
class MyStepIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0
    };
  }

  componentDidMount() {
    this.setState({
      currentPosition: this.props.currentPosition
    });
  }

  getLabels() {
    return;
  }

  render() {
    return (
      <StepIndicator
        customStyles={customStyles}
        currentPosition={this.state.currentPosition}
        labels={[
          "Utilisateur",
          "E-mail",
          "Numéro",
          "Mot de passe",
          "Finalisation"
        ]}
      />
    );
  }
}

//make this component available to the app
export default MyStepIndicator;
