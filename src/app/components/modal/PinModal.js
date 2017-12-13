//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LogoMini } from "../Logo";
import regStyles from "../../assets/styles/stylesC/registerStyles";
// create a component
const { height, width } = Dimensions.get("window");
class PinModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={true}
          onRequestClose={this.props.onRequestClose}
          animationType="slide"
          transparent={true}
          onShow={() => {
            this.textInput.focus();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.webViewContainer}>
              <Text style={[styles.text, regStyles.textWidth]}>
                Entrer votre code PIN pour continuer
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={this.props.onChangeText}
                  ref={input => {
                    this.textInput = input;
                  }}
                  underlineColorAndroid="transparent"
                  style={[
                    {
                      fontSize: 16,
                      textAlign: "center",
                      paddingHorizontal: 5
                    }
                  ]}
                  placeholder="Entrer votre code PIN"
                  autofocus={true}
                  maxLength={4}
                  value={this.props.value}
                  //value={this.state.pin}
                  keyboardType="numeric"
                  returnKeyType="done"
                  secureTextEntry={true}
                />
              </View>
              <View style={{ marginTop: 5 }}>{this.props.errorMessage}</View>
              <View style={styles.bottom}>
                <TouchableOpacity onPress={this.props.onRequestClose}>
                  <Text style={styles.bottomText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    backgroundColor: "#FFF"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,0.9)"
  },
  webViewContainer: {
    width: width - 50,
    height: 200,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 10,
    backgroundColor: "#FFF"
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    color: "#000"
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: width - 50,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#e2e2e2",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    padding: 10
  },
  bottomText: {
    fontSize: 18,
    color: "#409bff"
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    /*borderRadius: 40,*/
    height: 40,
    width: width - 100,
    paddingVertical: 10,
    alignSelf: "center",
    marginTop: 20
  }
});

//make this component available to the app
export default PinModal;
