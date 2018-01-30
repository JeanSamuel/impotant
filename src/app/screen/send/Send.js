//import liraries
import React, { Component } from "react";
import { ActivityIndicator, BackHandler, Dimensions, Keyboard, Platform, StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import sendStyle from "../../assets/styles/stylesC/sendStyle";
import { InputLeftButton, InputLeftIcon } from "../../components/TextInput";
import { IconBadge } from "../../components/icon";
import { BarCodeScanner, Permissions } from "expo";
import Services from "../../services/utils/services";
import inputStyles from "../../components/TextInput/styles";
import AutoComplete from "react-native-autocomplete-input";
import { HistoryServices, UserService } from "../../services";
import _ from "lodash";
import To from "./To";
import { SendLoader } from "../../components/loader";
import Header from "../../components/Header/Header";
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
      validationMessageAmount: false,
      validationMessageUser: false,
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
    services.getData("userData").then(user_id => {
      services.getData("pin").then(pin => {
        if (user_id === null || pin === null) {
          this.props.navigation.navigate("Handler");
        } else {
          services.getData("userInfo").then(userInfo =>{
            let ui=JSON.parse(userInfo)
            this.setState({ loading: false, loggedIn: true, solde: ui.solde });
          })
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
      // //console.log("End Entering amount", this.state.user);fsd
      this.navigateToReview(
        this.state.user,
        this.state.accountName,
        this.state.amount,
        this.state.user_id,
        this.state.user
      );
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
      validationMessageUser: false,
      validationMessageAmount: false,
      desabled: false
    });
  }

  onResetAction = () => {
    this.initState();
  };

  onContinueAction = () => {
    if (this.state.amount == 0) {
      console.log("Amount 0");
      this.setState({ validationMessageAmount: "Veuillez spécifier un montant valide" });
    }
    if (this.state.user === "") {
      console.log("User vide");
      this.setState({ validationMessageUser: "Veuillez entrer un adresse avant de continuer" });
    }
    if (this.state.user !== "" && this.state.amount != 0) {
      this.navigateToReview(
        this.state.user,
        this.state.accountName,
        this.state.amount,
        this.state.user_id,
        this.state.user
      );
    }
  };
  _handleBarCodeRead = data => {
    let qdata = Object();
    qdata = data.data;
    //let qdata = data.data;
    // //console.log(qdata);
    if (qdata.includes("trans")) {
      this.setState({ cameraEnabled: false });
      let readData = JSON.parse(qdata);
      this.setState({
        amount: readData.a,
        currency: readData.c,
        user: readData.u,
        type: readData.t
      });
      this.setState({ isEditable: false });
      if (readData.a == 0) {
        this.setState({ cameraEnabled: false });
        this._toNextStep(readData.u, readData.n);
      }
      if (readData.a != 0 && readData.u) {
        this.navigateToReview(
          readData.u,
          this.state.accountName,
          Services.reformatNumber(readData.a),
          this.state.user_id,
          readData.n
        );
      }
    } else {
      alert("Veuillez scanner un Qr Code valide");
    }
  };

  navigateToReview(user, username, amount, user_id, receiver_name) {
    this.setState({ cameraEnabled: false });
    this.props.navigation.navigate("Review", {
      user: user,
      username: username,
      amount: amount,
      user_id: user_id,
      receiver_name: receiver_name,
      onGoBack: () => {
        this.setState({ cameraEnabled: true });
      }
    });
  }

  _toNextStep(receiver, receiver_name) {
    Keyboard.dismiss();
    if (receiver) {
      if (!this.state.isEditable) {
        this.setState({ validationMessageAmount: "operation impossible : Vous ne pouvez pas modifier un montant déjà scanné. Réinitialisez le champ avant de continuer" });
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
      this.setState({ validationMessageUser: "Veuillez spécifier un adresse avant de continuer" });
    }
  }
  findUser(query) {
    if (query === "") {
      return [];
    }
    const { data } = this.state;
    const regex = new RegExp(query.trim(), "i");
    //console.log(data.filter(item => item.key.search(regex) >= 0));
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
        <View style={sendStyle.container}>
          {this.renderHeader()}
          {this.state.loading ? (
            <SendLoader loading={this.state.loading} />
          ) : (
              <View style={{ flex: 1 }}>
                {!this.state.cameraEnabled ? null : this.renderBarCode()}
                {this.renderSendForm(users, user)}
                {this.renderBottomControl()}
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

  renderHeader() {
    return <Header
      leftComponent={<DrawerMenu navigation={this.props.navigation} />}
      headerText={""+this.state.solde+" Ar"}
      rightComponent={<IconBadge navigation={this.props.navigation} />}
    />;
  }

  renderBottomControl() {
    return (
      <View style={sendStyle.buttonContainer}>
        <Button
          buttonStyle={sendStyle.controlButton}
          icon={{ name: "clear-all", size: 25, color: "#474B51" }}
          onPress={this.onResetAction}
        />
        <Button
          buttonStyle={sendStyle.controlButton}
          icon={{
            name: this.state.flashIcon,
            size: 25,
            color: "#474B51"
          }}
          onPress={this.toggleFlash}
        />
        <Button
          buttonStyle={sendStyle.controlButton}
          icon={{ name: "send", size: 25, color: "#474B51" }}
          onPress={this.onContinueAction}
        />
      </View>
    );
  }

  renderSendForm(users, user) {
    return (
      <View style={sendStyle.formContainer}>
        <InputLeftIcon
          iconName="ios-bookmarks-outline"
          iconType="ionicon"
          placeholder="Envoyer à: Tel , Adresse ..."
          onChangeText={user => this.setState({ user, validationMessageUser: false })}
          value={this.state.user}
          returnKeyType="next"
          blurOnSubmit={false}
          validationMessage={this.state.validationMessageUser}
        />
        <InputLeftButton
          buttonText={this.state.currency}
          value={this.state.amount}
          placeholder="Montant"
          keyboardType="numeric"
          returnKeyType="done"
          editable={this.state.isEditable}
          validationMessage={this.state.validationMessageAmount}
          /*onFocus={() => {
          this._toNextStep(this.state.user);
        }}*/
          onChangeText={amount =>
            this.setState({ amount: Services.formatNumber(amount), validationMessageAmount: false })
          }
          onEndEditing={this.handleDoneEditing}
        />
      </View>
    );
  }

  renderBarCode() {
    return (
      <BarCodeScanner
        onBarCodeRead={this._handleBarCodeRead}
        torchMode={this.state.flashOn}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}

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
});
export default NestedSendStack;
