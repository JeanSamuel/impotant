//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Icon
} from "react-native";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { Form, Input, Item, Label, Content, Button } from "native-base";
import { Container } from "../components/Container";
import { InputWithButton, SimpleInput } from "../components/TextInput";
import QrServices from "../utils/qrservices";
import { MyModal } from "../components/Modal";
import { RoundedButton } from "../components/Buttons";
import Toast, { DURATION } from "react-native-easy-toast";
import Services from "../utils/services";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
class Send extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      user_id: "miorantsoa",
      oauth_code: "",
      amount: 0,
      currency: "MGA",
      user: "",
      type: "",
      hasCameraPermission: null,
      modalVisible: false,
      modal: null,
      modalData: null,
      isLoading: true,
      pin: "",
      isEditable: true
    };
  }

  initState() {
    this.setState({
      amount: 0,
      user: "",
      type: "",
      currency: "MGA",
      isEditable: true
    });
  }
  componentDidMount() {
    this._requestCameraPermission();
    this.setState({ isLoading: false });
    console.log("Props view ######", this.props);
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  deepAccessUsingString(obj, key) {
    return key.split(".").reduce((nestedObject, key) => {
      if (nestedObject && key in nestedObject) {
        return nestedObject[key];
      }
      return undefined;
    }, obj);
  }

  _handleBarCodeRead = data => {
    services = new QrServices();
    let qdata = Object();
    qdata = data.data;
    readData = JSON.parse(qdata);
    this.setState({
      amount: readData.a,
      currency: readData.c,
      user: readData.u,
      type: readData.t
    });
    this.setState({ isEditable: false });
    if (readData.a == 0) {
      console.log(readData.a);
      this.createModal();
    }
  };

  //On transaction request : The app perform 3 step:
  //1: Open a prompt to enter pin -> method this.promptPin
  //2: Pin verification -> onContinueAction
  //3: Perform transaction -> performTransaction
  onContinueAction = () => {
    if (this.state.amount == 0 || this.state.user === "") {
      $message = "";
    } else {
      this.promptPin();
    }
  };

  onResetAction = () => {
    this.initState();
  };

  performTransaction = () => {
    this.setState({ isLoading: true });
    console.log("process transaction");
    services = new QrServices();
    services
      .performTransation(
        this.reformatNumber(this.state.amount),
        this.state.user_id,
        this.state.currency,
        this.state.user,
        this.state.oauth_code
      )
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        this.initState();
        this.setState({ isLoading: false });
        this.refs.toast.show("Transaction success", 1000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  removeModal = () => {
    this.setState({ modal: null });
  };

  handleEndEnteringAmountModal = () => {
    console.log(this.state.amount);
  };

  formatNumber = number => {
    rep = Services.formatNumber(number);
    return rep;
  };

  reformatNumber(number) {
    return number.replace(/[ ,]/g, "");
  }

  acceptTransaction(text) {}
  createModal() {
    this.setState({
      modal: (
        <MyModal
          visibility={true}
          remove={this.removeModal}
          height={height - 50}
          data={
            <View style={styles.modalContainer}>
              <Text
                style={{
                  color: "#fff",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  fontSize: 18,
                  fontWeight: "500",
                  marginVertical: 20,
                  textAlign: "center",
                  marginHorizontal: 50
                }}
              >
                Enter the amount you want to send
              </Text>
              <SimpleInput
                style={styles.simpleInput}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={amount =>
                  this.setState({ amount: Services.formatNumber(amount) })}
                onEndEditing={() => {
                  console.log(this.state.amount);
                  this.removeModal();
                }}
              />
            </View>
          }
        />
      )
    });
  }

  promptPin() {
    this.setState({
      modal: (
        <MyModal
          visibility={true}
          remove={this.removeModal}
          data={
            <View style={styles.modalContainer}>
              <Text
                style={{
                  color: "#fff",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  fontSize: 18,
                  fontWeight: "500",
                  marginVertical: 20,
                  textAlign: "center",
                  marginHorizontal: 50
                }}
              >
                Enter your PIN to confirm the transaction
              </Text>
              <SimpleInput
                onChangeText={text => {
                  this.setState({ pin: text });
                  if (text.length === 4) {
                    console.log(text);
                    if (text === "2240") {
                      this.performTransaction();
                      this.removeModal();
                    } else {
                      Alert.alert(
                        "Credential error",
                        "The pin you have entered is not valid",
                        [
                          {
                            text: "Try again",
                            onPress: () => this.setState({ pin: "" })
                          },
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          }
                        ]
                      );
                    }
                  }
                }}
                style={styles.simpleInput}
                placeholder="Enter your PIN here"
                autofocus={true}
                keyboardType="numeric"
                returnKeyType="done"
                secureTextEntry={true}
              />
            </View>
          }
        />
      )
    });
  }

  focusNextField = id => {
    this.inputs[id].focus();
  };

  render() {
    console.log(this.props.navigation);
    if (this.state.isLoading === true) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Content>
          {this.state.hasCameraPermission === null
            ? <Text>Requesting for camera permission</Text>
            : this.state.hasCameraPermission === false
              ? <Text>Camera permission is not granted</Text>
              : <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: height,
                    width: width,
                    alignSelf: "center"
                  }}
                />}
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(120,144,156 ,0.5)"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "90%",
                height: 40,
                borderRadius: 3,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 11,
                alignSelf: "center"
              }}
            >
              <TextInput
                placeholder="Username"
                onChangeText={user => this.setState({ user })}
                underlineColorAndroid="transparent"
                value={this.state.user}
                style={{
                  height: 40,
                  flex: 1,
                  fontSize: 16,
                  paddingHorizontal: 8,
                  color: "#797979",
                  fontSize: 18,
                  fontWeight: "500"
                }}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.refs.two.focus();
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                width: "90%",
                height: 40,
                borderRadius: 3,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 11,
                alignSelf: "center"
              }}
            >
              <TextInput
                ref="two"
                underlineColorAndroid="transparent"
                placeholder="Amount"
                style={{
                  height: 40,
                  flex: 1,
                  fontSize: 16,
                  paddingHorizontal: 8,
                  fontSize: 24,
                  color: "#797979"
                }}
                editable={this.state.isEditable}
                value={"" + this.state.amount}
                onChangeText={amount =>
                  this.setState({ amount: Services.formatNumber(amount) })}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(120,144,156 ,0.5)"
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: 50,
                marginVertical: 30
              }}
              onPress={this.onResetAction}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#fff"
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 50,
                marginVertical: 30
              }}
              onPress={this.onContinueAction}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#fff"
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.modal}
          <Toast
            ref="toast"
            position="top"
            positionValue={20}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
          />
        </Content>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center"
  },
  modalContainer: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#1e88ff",
    height: height / 2,
    width: width - 20
  },
  simpleInput: {
    flex: 1,
    textAlign: "center",
    paddingLeft: 0,
    fontSize: 18
  }
});

//make this component available to the app
export default Send;
