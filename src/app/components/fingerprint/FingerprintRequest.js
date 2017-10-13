//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Fingerprint } from "expo";
import { Icon } from "react-native-elements";
// import colors from "../../constants/Colors";
// create a component
class FingerprintRequest extends Component {
  state = {
    hasFingerprintAuth: null,
    authError: null,
    authStatus: null // valid values are null, 'wait', 'success', and 'fail'
  };
  componentDidMount() {
    Fingerprint.hasHardwareAsync().then(hasHardware => {
      hasHardware &&
        Fingerprint.isEnrolledAsync().then(hasFingerprintAuth => {
          this.setState({ hasFingerprintAuth });
          this.authFunction();
        });
    });
  }

  authFunction = async () => {
    try {
      let result =
        Platform.OS === "ios"
          ? await Fingerprint.authenticateAsync("Use your finger to process")
          : await Fingerprint.authenticateAsync();

      if (result.success) {
        this.setState(
          { authStatus: "success" },
          this.props.onFingerprintSuccess()
        );
      } else {
        this.setState({
          authStatus: "fail",
          authError: result.error
        });
        console.log("Fingerprint Auth Failed", result);
      }
    } catch (err) {
      console.error("authFunction Error", err);
    }
  };

  getAuthStatement = () => {
    const displayText = this.getMessage(this.state.authStatus); // this.getMessage(this.state.authStatus);
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "rgba(255,255,255,0.8)",
          paddingHorizontal: 10,
          borderRadius: 12
        }}
      >
        <Icon
          type="ionicon"
          name={displayText.icon}
          size={25}
          color={displayText.color}
        />
        <Text
          style={{
            fontSize: 20,
            color: displayText.color,
            paddingLeft: 10
          }}
        >
          {displayText.text}
        </Text>
      </View>
    );
  };
  getMessage = status => {
    const waitText = {
      icon: "md-finger-print",
      color: this.props.waitTextColor,
      text: "Waiting for fingerprint..."
    };
    const successText = {
      icon: "md-checkmark-circle",
      color: "#2aa421",
      text: "Success! "
    };
    const failText = {
      icon: "md-alert",
      color: "#c71c1f",
      text: this.state.authError
    };

    if (status === "success") return successText;
    if (status === "fail") return failText;
    return waitText;
  };
  render() {
    return (
      <View style={{ padding: 10 }}>
        {this.state.hasFingerprintAuth ? this.getAuthStatement() : null}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default FingerprintRequest;
