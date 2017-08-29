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
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { Form, Input, Item, Label, Content, Button, Header } from "native-base";
import { Container } from "../components/Container";
import { InputWithButton, SimpleInput, MyInput } from "../components/TextInput";
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
    self = this;
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      oauth_code: "",
      amount: "",
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Send",
      headerLeft: (
        <View
          style={{
            alignContent: "center",
            marginHorizontal: 5
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View
          style={{
            alignContent: "center",
            marginRight: 5
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <Icon name="book" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#1976D2"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: { color: "#fff" }
    };
  };

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

  promptInformation = () => {
    this.setState({
      modal: (
        <MyModal
          visibility={true}
          remove={this.removeModal}
          data={
            <Container>
              <Text>Information</Text>
            </Container>
          }
        />
      )
    });
  };

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
    console.log("navigation ", this.props.navigation);
    if (this.state.isLoading === true) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.hasCameraPermission === null
            ? <Text>Requesting for camera permission</Text>
            : this.state.hasCameraPermission === false
              ? <Text>Camera permission is not granted</Text>
              : <BarCodeScanner
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: height - 50,
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
              backgroundColor: "#607D8B"
            }}
          >
            <MyInput
              placeholder="Username"
              onChangeText={user => this.setState({ user })}
              value={this.state.user}
              returnKeyType="none"
              blurOnSubmit={false}
            />
            <MyInput
              value={"" + this.state.amount}
              keyboardType="numeric"
              returnKeyType="done"
              editable={this.state.isEditable}
              onChangeText={amount =>
                this.setState({ amount: Services.formatNumber(amount) })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#607D8B"
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: 50,
                marginVertical: 30
              }}
              onPress={this.onResetAction}
            >
              <Icon name="clear-all" size={30} color="#fafafa" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 50,
                marginVertical: 30
              }}
              onPress={this.promptInformation}
            >
              <Icon name="info" size={30} color="#fafafa" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 50,
                marginVertical: 30
              }}
              onPress={this.onContinueAction}
            >
              <Icon name="send" size={30} color="#fafafa" />
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
      </Container>
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
    backgroundColor: "#FAFAFA",
    height: height / 2,
    width: width - 20
  },
  simpleInput: {
    flex: 1,
    textAlign: "center",
    paddingLeft: 0,
    fontSize: 18
  },
  headerStyle: {
    backgroundColor: "#1e8887"
  }
});

//make this component available to the app
export default Send;
