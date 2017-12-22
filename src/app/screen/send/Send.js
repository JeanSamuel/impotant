//import liraries
import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Button, Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import headStyle from "../../assets/styles/stylesC/headerStyle";
import sendStyle from "../../assets/styles/stylesC/sendStyle";
import { InputLeftButton } from "../../components/TextInput";
import { IconBadge } from "../../components/icon";
import { BarCodeScanner, Permissions } from "expo";
import Services from "../../services/utils/services";
import inputStyles from "../../components/TextInput/styles";
import AutoComplete from "react-native-autocomplete-input";
import { HistoryServices } from "../../services";
import _ from "lodash";
import To from "./To";
import { SendLoader } from "../../components/loader";
import Header from "../../components/Header/Header";
import HeaderRight from "../history/headerRight";
import DrawerMenu from "../../components/drawerMenu/drawerMenu";
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
  _handleBarCodeRead = data => {
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
          <Header
            leftComponent={<DrawerMenu navigation={this.props.navigation} />}
            headerText={"20 Ar"}
            rightComponent={<IconBadge navigation={this.props.navigation} />}
          />
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
                    this.setState({ amount: Services.formatNumber(amount) })
                  }
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
      header: () => null
    })
  },
  To: {
    screen: To,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
  // History: {
  //   screen: History,
  //   navigationOptions: ({ navigation }) => ({
  //     header: () => null
  //   })
  // }
});
export default NestedSendStack;
