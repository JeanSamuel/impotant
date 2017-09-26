//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
import { LogoMini } from "../Logo";
import regStyles from "../../styles/stylesC/registerStyles";
// create a component
const { height, width } = Dimensions.get("window");
class PinModal extends Component {
  render() {
    return (
      <Modal
        visible={true}
        onRequestClose={this.props.onRequestClose}
        animationType="slide"
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.2 }} />
          <View>
            <LogoMini />
          </View>
          <View style={{ flex: 0.3 }} />
          <Text
            style={[
              styles.text,
              regStyles.textWidth,
              {
                textAlign: "center",
                alignSelf: "center",
                fontSize: 20,
                color: "#aaa"
              }
            ]}
          >
            Entrer votre PIN pour confirmer le transfert de {this.props.amount}{" "}
            {this.props.currency} à {this.props.user}
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#aaa",
              borderRadius: 40,
              height: 50,
              width: width - 50,
              paddingVertical: 10,
              alignSelf: "center",
              marginTop: 20
            }}
          >
            <TextInput
              onChangeText={this.props.onChangeText}
              underlineColorAndroid="transparent"
              style={[
                {
                  fontSize: 20,
                  textAlign: "center",
                  paddingHorizontal: 5
                }
              ]}
              placeholder="Enter your PIN here"
              autofocus={true}
              maxLength={4}
              value={this.props.value}
              //value={this.state.pin}
              keyboardType="numeric"
              returnKeyType="done"
              secureTextEntry={true}
            />
          </View>
        </View>
      </Modal>
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
export default PinModal;
