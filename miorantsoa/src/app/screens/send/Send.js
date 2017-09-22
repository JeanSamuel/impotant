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
  Platform,
  ToastAndroid,
  BackHandler
} from "react-native";
import { Icon } from "react-native-elements";
import { Constants, BarCodeScanner, Permissions } from "expo";
import { Form, Input, Item, Label, Content, Button, Header } from "native-base";
import { Container } from "../../components/Container";
import regStyles from "../../styles/registerStyles";
import {
  InputWithButton,
  SimpleInput,
  MyInput,
  InputLeftButton,
  InputLeftIcon
} from "../../components/TextInput";
import QrServices from "../../utils/qrservices";
import UserServices from "../../utils/userServices";
import { MyModal } from "../../components/Modal";
import { RoundedButton } from "../../components/Buttons";
import Toast, { DURATION } from "react-native-easy-toast";
import Services from "../../utils/services";
import { Ionicons } from "@expo/vector-icons";
import headStyle from "../../styles/headerStyle";
import { LogoMini } from "../../components/Logo";
import config from "../../config/config";
const { height, width } = Dimensions.get("window");

class Send extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      flashOn: "off",
      isFlashOn: false,
      flashIcon: "flash-off",
      // let senderId = "aa031";
      //let recipientId = "aa063";
      user_id: this.props.navigation.state.params.user_id,
      oauth_code: "",
      amount: "",
      currency: "Ar",
      user: "",
      type: "",
      hasCameraPermission: null,
      modalVisible: false,
      modal: null,
      modalData: null,
      isLoading: true,
      hasPin: false,
      pin: "",
      savedPin: "",
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
            marginHorizontal: 10
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
            marginRight: 10
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("History", {
                user_id: navigation.state.params.user_id
              })}
          >
            <Icon name="back-in-time" type="entypo" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: { color: "#fff" }
    };
  };

  initState() {
    this.setState({
      amount: "",
      user: "",
      type: "",
      currency: "Ar",
      isEditable: true
    });
  }

  handlePinVerification = async () => {
    services = new Services();
    pin = await services.getData("pin");
    console.log(" ty le navigation", this.props);
    if (pin === null) {
      console.log("pin vide");
      this.props.navigation.navigate("RegisterPin");
    } else {
      this.setState({ hasPin: true, savedPin: pin });
    }
  };

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return false;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return false;
    });
  }

  componentDidMount() {
    this._requestCameraPermission();
    this.handlePinVerification();
    this.setState({ isLoading: false });
    console.log("Props view ######", this.props);
    console.log(config.CUSTOM_BASE_URL);
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  _handleBarCodeRead = data => {
    services = new QrServices();
    let qdata = Object();
    qdata = data.data;
    console.log(qdata);
    if (qdata.includes("vola")) {
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
      if (readData.a !== 0 && readData.u) {
        this.createModal();
      }
    }
  };

  //On transaction request : The app perform 3 step:
  //1: Open a prompt to enter pin -> method this.promptPin
  //2: Pin verification -> onContinueAction
  //3: Perform transaction -> performTransaction
  onContinueAction = () => {
    if (this.state.amount == 0 || this.state.user === "") {
      Alert.alert(
        "An error happened",
        "Vérifier les données que vous avez entrez"
      );
    } else {
      this.promptPin();
    }
  };

  onResetAction = () => {
    this.initState();
  };

  performTransaction = async () => {
    this.setState({ isLoading: true });
    console.log("process transaction");
    services = new QrServices();
    userServices = new UserServices();
    rep = await services.performTransation(
      this.reformatNumber(this.state.amount),
      this.state.user_id,
      this.state.currency,
      this.state.user,
      this.state.oauth_code
    );

    repString = JSON.stringify(rep);
    console.log(repString);
    if (repString.includes("success")) {
      userServices
        .saveAdress(this.state.user_id, this.state.user)
        .then(response => {
          console.log(response);
          this.setState({ isLoading: false });
          Platform.OS == "android"
            ? ToastAndroid.show("Transaction success", ToastAndroid.SHORT)
            : this.refs.toast.show("Transaction success", 1000);
          this.initState();
        });
    } else {
      Alert.alert("Erreur de transaction", "Votre transaction n'a pas abouti");
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSelect = data => {
    this.setState({ data });
    console.log("ato izy zao");
  };

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

  toggleFlash = () => {
    toggleFlash = !this.state.isFlashOn;
    this.setState({ isFlashOn: toggleFlash });
    if (toggleFlash) {
      this.setState({ flashOn: "on", flashIcon: "flash-on" });
    } else {
      this.setState({ flashOn: "off", flashIcon: "flash-off" });
    }
  };

  isFieldEmpty = () => {
    return this.state.user.trim() == "" && this.state.amount == "";
  };
  acceptTransaction(text) {}
  createModal() {
    this.setState({
      modal: (
        <Modal visible={true} onRequestClose={() => this.removeModal()}>
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
                onChangeText={amount =>
                  this.setState({ amount: Services.formatNumber(amount) })}
                onEndEditing={() => {
                  console.log(this.state.amount);
                  this.removeModal();
                }}
              />
            </View>
          </View>
        </Modal>
      )
    });
  }

  promptInformation = () => {
    this.setState({
      modal: (
        <Modal visible={true} onRequestClose={() => this.removeModal()}>
          <View style={styles.container}>
            <Text>Info</Text>
          </View>
        </Modal>
      )
    });
  };

  handlePinInput = text => {
    this.setState({ pin: text });
    if (text.length === 4) {
      console.log(text);
      console.log("pin local ", this.state.savedPin);
      if (text === this.state.savedPin) {
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
  };
  promptPin() {
    this.setState({
      modal: (
        <Modal
          visible={true}
          onRequestClose={() => this.removeModal()}
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
              Entrer votre PIN pour confirmer le transfert de{" "}
              {this.state.amount} {this.state.currency} à {this.state.user}
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
                onChangeText={this.handlePinInput}
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
                //value={this.state.pin}
                keyboardType="numeric"
                returnKeyType="done"
                secureTextEntry={true}
              />
            </View>
          </View>
        </Modal>
      )
    });
  }

  focusNextField = id => {
    this.inputs[id].focus();
  };

  handleDoneEditing() {
    if (this.state.amount > 0 && this.state.user.length != 0) {
      console.log("End Entering amount", this.state.user);
      this.promptPin();
    }
  }

  handleBackHardwareButton() {
    console.log("Hardware back button");
  }

  render() {
    console.log("navigation ", this.props.navigation);
    if (this.state.isLoading === true) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (this.state.hasPin) {
      return (
        <Container style={styles.container}>
          <Content
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            {this.state.hasCameraPermission === null ? (
              <Text>Requesting for camera permission</Text>
            ) : this.state.hasCameraPermission === false ? (
              <Text>Camera permission is not granted</Text>
            ) : (
              <BarCodeScanner
                torchMode={this.state.flashOn}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  height: height - 50,
                  width: width,
                  alignSelf: "center"
                }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(52, 73, 94,0.7)" //"#607D8B"
              }}
            >
              <InputLeftIcon
                iconName="expand-more"
                onPress={() => {
                  console.log("Expand");
                  this.props.navigation.navigate("To", {
                    onGoBack: data => {
                      console.log(data);
                      this.setState({ user: data });
                    },
                    user_id: this.state.user_id
                  });
                }}
                placeholder="Username"
                onChangeText={user => this.setState({ user })}
                value={this.state.user}
                returnKeyType="none"
                blurOnSubmit={false}
              />
              <InputLeftButton
                buttonText={this.state.currency}
                value={"" + this.state.amount}
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyType="done"
                editable={this.state.isEditable}
                onChangeText={amount =>
                  this.setState({ amount: Services.formatNumber(amount) })}
                onEndEditing={() => {
                  this.handleDoneEditing();
                }}
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
                backgroundColor: "rgba(52, 73, 94,0.7)" //"#607D8B"
              }}
            >
              <Button
                style={styles.controlButton}
                color="#448aff"
                onPress={this.onResetAction}
              >
                <Icon name="clear-all" size={30} color="#fafafa" />
              </Button>
              <Button
                style={styles.controlButton}
                color="#448aff"
                onPress={this.toggleFlash}
              >
                <Icon name={this.state.flashIcon} size={30} color="#fafafa" />
              </Button>
              <Button
                style={styles.controlButton}
                onPress={this.promptInformation}
              >
                <Icon name="info" size={30} color="#fafafa" />
              </Button>
              <Button
                style={[styles.controlButton]}
                onPress={this.onContinueAction}
              >
                <Icon name="send" size={30} color="#fafafa" />
              </Button>
            </View>
            {this.state.modal}
            {Platform.OS == "ios" ? (
              <Toast
                ref="toast"
                position="top"
                positionValue={20}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
              />
            ) : (
              <View />
            )}
          </Content>
        </Container>
      );
    }
    return null;
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
    fontSize: 24
  },
  headerStyle: {
    backgroundColor: "#1e8887"
  },
  controlButton: {
    marginHorizontal: 50,
    marginVertical: 30,
    backgroundColor: "transparent" ///"rgba(52, 73, 94,1.0)" // "#448aff"
  },
  touchableButton: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center"
  }
});

//make this component available to the app
export default Send;
