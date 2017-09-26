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
import Services from "../../services/services";
import regStyles from "../../styles/stylesC/registerStyles";
const { height, width } = Dimensions.get("window");

// create a component
class AmountModal extends Component {
  render() {
    return (
      <Modal visible={true} onRequestClose={this.props.onRequestClose}>
        <View style={styles.container}>
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
            Entrer le montant que vous voullez envoyer
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
              underlineColorAndroid="transparent"
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
        </View>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

//make this component available to the app
export default AmountModal;
