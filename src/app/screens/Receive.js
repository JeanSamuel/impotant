//import liraries
import React, { Component } from "react";
import QRCode from "react-native-qrcode";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Form, Input, Item, Label, Content } from "native-base";

// create a component
class Receive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  render() {
    return (
      <KeyboardAvoidingView>
        <View>
          <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Touchez pour copier l' adresse.
            </Text>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Vous pouvez le partager par mail ou par SMS à vos expéditeurs
            </Text>
            <QRCode
              value={this.state.amount}
              size={200}
              bgColor="#020202"
              fgColor="white"
              style={{ marginVertical: 20 }}
            />
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Amount</Label>
              <Input
                placeholder="Enter amount"
                enablesReturnKeyAutomatically={true}
                returnKeyType="done"
                keyboardType="numeric"
                onChangeText={amount => this.setState({ amount })}
                autoFocus={true}
                style={{ paddingHorizontal: 10 }}
              />
            </Item>
          </Form>
          <Text>
            {this.state.amount}
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10
  }
});

//make this component available to the app
export default Receive;
