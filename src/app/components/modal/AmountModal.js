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
import Services from "../../services/services";
import regStyles from "../../assets/styles/stylesC/registerStyles";
const { height, width } = Dimensions.get("window");

// create a component
class AmountModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={true}
          transparent={true}
          onRequestClose={this.props.onRequestClose}
          onShow={() => {
            this.textInput.focus();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.webViewContainer}>
              <Text style={[styles.text, regStyles.textWidth]}>
                Entrer le montant que vous voullez envoyer
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Montant"
                  ref={input => {
                    this.textInput = input;
                  }}
                  style={[
                    {
                      fontSize: 20,
                      textAlign: "center",
                      paddingHorizontal: 5
                    }
                  ]}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onChangeText={this.props.onChangeText}
                  onEndEditing={this.props.onEndEditing}
                />
              </View>
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
    height: 45,
    width: width - 100,
    paddingVertical: 10,
    alignSelf: "center",
    marginTop: 20
  }
});

//make this component available to the app
export default AmountModal;
