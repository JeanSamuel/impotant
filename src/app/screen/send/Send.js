//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  Modal,
  Alert,
  Keyboard,
  BackHandler,
  ToastAndroid
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Icon, Button } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";
import History from "../history/historyM";
import headStyle from "../../styles/stylesC/headerStyle";
import regStyles from "../../styles/stylesC/registerStyles";
import sendStyle from "../../styles/stylesC/sendStyle";
import QrServices from "../../services/qrservices";
import { InputLeftButton, InputLeftIcon } from "../../components/TextInput";
import { PinModal, AmountModal } from "../../components/modal";
import { IconBadge } from "../../components/icon";
import { BarCodeScanner, Permissions } from "expo";
import Services from "../../services/services";
import inputStyles from "../../components/TextInput/styles";
import AutoComplete from "react-native-autocomplete-input";
import { HistoryServices } from "../../services";
import _ from "lodash";
import To from "./to";
import { SendLoader } from "../../components/loader";
// create a component
const { height, width } = Dimensions.get("window");
class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      amount: "",
      user: "",
      flashIcon: "flash-off",
      flashOn: "off",
      hasFingerPrint: false,
      user_id: this.props.navigation.state.params.user_id,
      accountName: this.props.navigation.state.params.username,
      currency: "Ar",
      errorMessage: null,
      modal: null,
      loggedIn: false,
      loading: true,
      solde: 0,
      cameraEnabled: true,
      isEditable: true,
      hideResult: false,
      data: []
    };
  }

  async componentWillMount() {
    Keyboard.dismiss();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      cameraEnabled: true
    });
    let services = new Services();
    services.getData("user_id").then(user_id => {
      services.getData("pin").then(pin => {
        if (user_id === null || pin === null) {
          this.props.navigation.navigate("Handler");
        } else {
          this.setState({ loading: false, loggedIn: true });
        }
      });
    });
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandler);
    Services.haveFingerprint().then(hasFingerPrint => {
      this.setState({ hasFingerPrint: hasFingerPrint, cameraEnabled: true });
    });
    let historyServices = new HistoryServices();
    historyServices.getOldHistory().then(history => {
      let historyObject = JSON.parse(history);
      this.setState({ data: this.parseHistoryData(historyObject) });
    });
  }

  parseHistoryData(historyData) {
    const historyServices = new HistoryServices();
    history = historyServices.groupRecipientId(historyData);
    history = _.reduce(
      history,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    return history;
  }

  backHandler = () => {
    return true;
  };

  componentWillUnMount() {
    this.setState({ cameraEnabled: false });
    BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
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

  handleDoneEditing = () => {
    if (this.state.amount > 0 && this.state.user.length != 0) {
      // console.log("End Entering amount", this.state.user);
      this.promptPin();
    }
  };

  enableCamera() {
    this.setState({ cameraEnabled: true });
  }

  removeModal() {
    this.setState({ modal: null });
  }

  handleAmountInput = text => {
    this.setState({ amount: Services.formatNumber(text) });
  };

  reformatNumber(number) {
    return number.replace(/[ ,]/g, "");
  }

  performTransaction() {
    this.setState({ loading: true });
    this.removeModal();
    let services = new QrServices();
    services
      .performTransation(
        this.reformatNumber(this.state.amount),
        this.state.user_id,
        this.state.currency,
        this.state.user,
        ""
      )
      .then(rep => {
        // console.log(JSON.stringify(rep));
        let fservices = new Services();
        fservices
          .checkSolde(this.state.user_id)
          .then(response => {
            this.setState({
              solde: response.value,
              loading: false
            });
            Platform.OS == "android"
              ? ToastAndroid.show("Transaction success", ToastAndroid.SHORT)
              : this.refs.toast.show("Transaction success", 1000);
            // this.promptConfirmationModal();
            this.initState();
          })
          .catch(error => {
            // console.log("error");
          });
      });
  }

  renderErrorMessage() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          Le Pin que vous avez entrer n'est pas valide
        </Text>
      </View>
    );
  }

  handlePinInput = text => {
    this.setState({ errorMessage: null });
    if (text.length === 4) {
      let services = new Services();
      services.getData("pin").then(pin => {
        if (pin === text) {
          // console.log("Ataovy le transaction");
          this.performTransaction();
        } else {
          this.setState({ errorMessage: this.renderErrorMessage() });
        }
      });
    }
  };

  async renderFingerPrintPromptAsync(messageIos) {
    if (Plateform.OS === "android") {
      (await Fingerprint.authenticateAsync())
        ? this.performTransaction()
        : alert("FingerPrint Authentication failed");
    }
    if (Platform.OS === "ios") {
      (await Fingerprint.authenticateAsync(messageIos))
        ? this.performTransaction()
        : alert("TouchID Authentication failed");
    }
  }

  promptPin() {
    if (this.state.hasFingerPrint) {
      this.renderFingerPrintPromptAsync();
    } else {
      this.setState({
        modal: (
          <PinModal
            amount={Services.formatNumber(this.state.amount)}
            user={this.state.user}
            currency={this.state.currency}
            onChangeText={this.handlePinInput}
            errorMessage={this.state.errorMessage}
            onRequestClose={() => {
              this.removeModal();
            }}
          />
        )
      });
    }
  }

  prompAmount() {
    this.setState({
      modal: (
        <AmountModal
          onRequestClose={() => {
            this.removeModal();
          }}
          onChangeText={this.handleAmountInput}
          onEndEditing={() => {
            this.removeModal();
            this.promptPin();
          }}
        />
      )
    });
  }

  initState() {
    this.setState({
      amount: "",
      user: "",
      type: "",
      currency: "Ar",
      isEditable: true,
      desabled: false
    });
  }

  onResetAction = () => {
    this.initState();
  };
  promptInformation() {}

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

  promptConfirmationModal() {
    this.setState({
      modal: (
        <Modal
          visible={true}
          transparent={true}
          onRequestClose={() => {
            this.removeModal();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.webViewContainer}>
              <Text style={[styles.text, regStyles.textWidth]}>
                Vous avez transferer {this.state.amount} {this.state.currency} à{" "}
                {this.state.user}. Votre soldes disponible est de{" "}
                {Services.formatNumber(this.state.solde)} {this.state.currency}.
              </Text>
              <View style={styles.bottom}>
                <TouchableOpacity
                  onPress={() => {
                    this.removeModal();
                  }}
                >
                  <Text style={styles.bottomText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )
    });
  }
  _handleBarCodeRead = data => {
    services = new QrServices();
    let qdata = Object();
    qdata = data.data;
    // console.log(qdata);
    if (qdata.includes("trans")) {
      this.setState({ cameraEnabled: false });
      readData = JSON.parse(qdata);
      this.setState({
        amount: readData.a,
        currency: readData.c,
        user: readData.u,
        type: readData.t
      });
      this.setState({ isEditable: false });
      if (readData.a == 0) {
        // // this.prompAmount();
        // console.log(readData);
        this.setState({ cameraEnabled: false });
        this._toNextStep(readData.u, readData.n);
      }
      if (readData.a != 0 && readData.u) {
        // this.promptPin();
        this.setState({ cameraEnabled: false });
        this.props.navigation.navigate("Review", {
          user: readData.u,
          username: this.state.accountName,
          amount: Services.reformatNumber(readData.a),
          user_id: this.state.user_id,
          receiver_name: readData.n
        });
      }
    } else {
      alert("Veuillez scanner un Qr Code valide");
    }
  };
  _toNextStep(receiver, receiver_name) {
    Keyboard.dismiss();
    if (receiver) {
      if (!this.state.isEditable) {
        alert(
          "operation impossible : Vous ne pouvez pas modifier un montant déjà scanné. Réinitialisez le champ avant de continuer"
        );
      } else {
        this.setState({ cameraEnabled: false });
        this.props.navigation.navigate("CustomKey", {
          user: receiver,
          amount: this.state.amount,
          username: this.state.accountName,
          user_id: this.state.user_id,
          receiver_name: receiver_name ? receiver_name : receiver,
          onGoBack: () => {
            this.setState({ cameraEnabled: true });
          }
        });
      }
    } else {
      alert(
        "Operation impossible : Veuillez specifier l'adresse avant de continuer"
      );
    }
  }
  findUser(query) {
    if (query === "") {
      return [];
    }
    const { data } = this.state;
    const regex = new RegExp(query.trim(), "i");
    console.log(data.filter(item => item.key.search(regex) >= 0));
    return data.filter(item => item.key.search(regex) >= 0);
    // console.log(data.filter(item => item.item.key.search(regex) >= 0));
    // return data.filter(mot => mot.search(regex) >= 0);
  }
  render() {
    const { hasCameraPermission, user, data } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const users = this.findUser(user);
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <ActivityIndicator animating={true} />;
    } else {
      return (
        <View style={styles.container}>
          {this.state.loading ? (
            <SendLoader loading={this.state.loading} />
          ) : (
            <View style={{ flex: 1 }}>
              {!this.state.cameraEnabled ? null : (
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  torchMode={this.state.flashOn}
                  barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <View style={sendStyle.formContainer}>
                <View
                  style={{
                    height: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                />
                <View
                  style={[
                    inputStyles.autocompleteContent,
                    {
                      alignSelf: "center",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: 10
                    },
                    inputStyles.autocompleteContainer
                  ]}
                >
                  <AutoComplete
                    data={users}
                    containerStyle={{ alignSelf: "center" }}
                    inputContainerStyle={[
                      {
                        height: 40,
                        flex: 1,
                        paddingHorizontal: 8,
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        borderRadius: 0
                      }
                    ]}
                    style={[inputStyles.input]}
                    listContainerStyle={{ zIndex: 1000 }}
                    underlineColorAndroid="transparent"
                    autoComplete={true}
                    placeholder="Envoyer à: Tel , Adresse ..."
                    onChangeText={user => {
                      this.setState({ user: user, hideResult: false });
                    }}
                    returnKeyType="none"
                    defaultValue={user}
                    listStyle={[
                      inputStyles.listWidth,
                      { borderRadius: 0, borderWidth: 0, zIndex: 1000 }
                    ]}
                    hideResults={this.state.hideResult}
                    data={users}
                    renderItem={data => (
                      <View>
                        {this.state.user_id != data.key ? (
                          <View
                            style={{
                              height: 30,
                              justifyContent: "center",
                              marginHorizontal: 10
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  user: data.key,
                                  hideResult: true
                                });
                              }}
                            >
                              <Text>{data.key}</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    )}
                  />
                </View>

                {/* <InputLeftIcon
                  iconName="expand-more"
                  onPress={() => {
                     this.props.navigation.navigate("To", {
                      onGoBack: data => {
                        console.log(data);
                        this.setState({ user: data });
                      },
                      user_id: this.state.user_id
                    });
                  }}
                  data={users}
                  autoComplete={true}
                  placeholder="Envoyer à: Tel , Adresse ..."
                  onChangeText={user => this.setState({ user })}
                  value={this.state.user}
                  returnKeyType="none"
                  defaultValue={user}
                  data={users}
                  renderItem={data => (
                    <TouchableOpacity
                      onPress={() => this.setState({ user: data })}
                    >
                      <Text>{data}</Text>
                    </TouchableOpacity>
                  )}
                  blurOnSubmit={false}
                /> */}
                <InputLeftButton
                  buttonText={this.state.currency}
                  value={"" + Services.formatNumber(this.state.amount)}
                  placeholder="Montant"
                  keyboardType="numeric"
                  returnKeyType="done"
                  editable={this.state.isEditable}
                  onFocus={() => {
                    this._toNextStep(this.state.user);
                  }}
                  onChangeText={amount =>
                    this.setState({ amount: Services.formatNumber(amount) })}
                  onEndEditing={this.handleDoneEditing}
                />
              </View>
              <View style={sendStyle.buttonContainer}>
                <Button
                  buttonStyle={styles.controlButton}
                  icon={{ name: "clear-all", size: 25, color: "#474B51" }}
                  onPress={this.onResetAction}
                />
                <Button
                  buttonStyle={styles.controlButton}
                  icon={{
                    name: this.state.flashIcon,
                    size: 25,
                    color: "#474B51"
                  }}
                  onPress={this.toggleFlash}
                />
                {/* <Button
              buttonStyle={styles.controlButton}
              onPress={this.promptInformation}
              icon={{ name: "info", size: 25 }}
            >
              <Icon name="info" size={25} color="#fafafa" />
            </Button> */}
                <Button
                  buttonStyle={styles.controlButton}
                  icon={{ name: "send", size: 25, color: "#474B51" }}
                  onPress={this.onContinueAction}
                />
              </View>
            </View>
          )}
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
          ) : null}
        </View>
      );
    }
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignContent: "center"
  },
  // modalContainer: {
  //   alignContent: "center",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#FAFAFA",
  //   height: height / 2,
  //   width: width - 20
  // },
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
    marginVertical: 5,
    backgroundColor: "transparent" ///"rgba(52, 73, 94,1.0)" // "#448aff"
  },
  touchableButton: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center"
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
    paddingTop: 50,
    backgroundColor: "#FFF"
  },
  text: {
    // textAlign: "center",
    alignSelf: "center",
    fontSize: 18,
    marginHorizontal: 5,
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

const NestedSendStack = StackNavigator({
  Send: {
    screen: Send,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home-outline" size={25} type="ionicon" />
      ),
      title: "Envoyer",
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: { color: "#fff" },
      headerLeft: (
        <View
          style={{
            alignContent: "center",
            marginHorizontal: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon
              name="ios-menu-outline"
              color="white"
              size={30}
              type="ionicon"
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View
          style={{
            alignContent: "center"
          }}
        >
          <IconBadge navigation={navigation} />
        </View>
      )
    })
  },
  To: {
    screen: To
  }
  // History: {
  //   screen: History,
  //   navigationOptions: ({ navigation }) => ({
  //     header: () => null
  //   })
  // }
});
export default NestedSendStack;
