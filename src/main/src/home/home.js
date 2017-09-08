//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Clipboard,
  Keyboard,
  Share,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { StackNavigator } from "react-navigation";
import QRCode from "react-native-qrcode-svg";
import { Icon } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import DrawerButton from "../navigation/drawerButton";
import styles from "../../styles/HomeStyles";
import styleBase from "../../styles/Styles";
import Toast from "react-native-easy-toast";
import Services from "../services/services";
import HomeServices from "../services/homeServices";
import TextArray from "../../data/textHome";
import GoToStore from "./goToStore";
import HeaderRight from "./headerRight";
import Notification from "./notification";

const listText = TextArray.message;
const service = new Services();
const timer = null;
const self = null;
class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      type: "vola",
      data: {
        currency: "Ar",
        userId: ""
      },
      amount: "",
      jsonData: "0",
      isInvalidData: false,
      warning: null,
      actualText: null,
      timer: null,
      notification: null
    };
  }

  generateQrCodeText() {
    amount = "0";
    if (this.state.amount !== "") {
      amount = this.state.amount.replace(/ /g, "");
    }
    let myData = {
      t: this.state.type,
      c: this.state.data.currency,
      u: this.state.data.userId,
      a: amount
    };
    var dataJSON = JSON.stringify(myData);
    return dataJSON;
  }

  checkUserData() {
    let services = new Services();
    services
      .getData("user_id")
      .then(response => {
        if (response != null) {
          this.setState({
            data: {
              currency: "Ar",
              userId: response
            }
          });
        } else {
          this.setState({ data: { userId: "inconnu" } });
        }
      })
      .catch(response => {
        this.setState({ data: { userId: "inconnu" } });
      });
  }

  componentWillMount() {
    this.checkUserData();
    this.setJsonData(this.generateQrCodeText());
    this.addTextDefault();
    this.startTimer();
    this.showNotification();
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  showNotification() {
    let services = new Services();
    service
      .getData("newAtHome")
      .then(response => {
        if (response != null) {
          this.setState({
            notification: <Notification />
          });
        }
      })
      .then(error => {
        console.log("ol efa membre hatry ny ela");
      });
  }

  addTextDefault() {
    this.setState({
      actualText: <Text style={styles.qrText}>{listText[0]}</Text>
    });
  }

  startTimer() {
    timer = setInterval(() => {
      this.changeMessageText();
    }, 10000);
  }

  changeMessageText() {
    var value = Services.getRandomIntoArray(listText);
    if (value === this.state.actualText) {
      value = this.changeMessageText();
    }
    this.setState({
      actualText: <Text style={styles.qrText}>{value}</Text>
    });
  }

  setJsonData(jsonData) {
    this.setState({ jsonData });
  }

  setUpdate(amount) {
    amount = amount.replace(/ /g, "");
    if (!isNaN(amount)) {
      amount = HomeServices.refactAmount(amount);
      this.setState({
        amount: amount,
        jsonData: this.generateQrCodeText(),
        warning: null
      });
    }
  }

  getJsonData() {
    return this.state.jsonData;
  }

  copyToClipBoard() {
    Clipboard.setString(this.generateQrCodeText());
    this.refs.toast.show("Copié dans le presse-papier!!");
  }

  render() {
    let logoFromFile = require("../../images/icons/logo.png");

    return (
      <View style={styles.container}>
        <View>{this.state.notification}</View>
        <ScrollView>
          <View>{this.state.sharing}</View>
          <Toast
            ref="toast"
            position="top"
            positionValue={20}
            fadeInDuration={750}
            fadeOutDuration={1000}
            activeOpacity={0.5}
          />
          <View>
            <View style={styles.amountContainer}>
              <KeyboardAvoidingView style={styles.inputWarp}>
                <TextInput
                  ref="input"
                  value={this.state.amount}
                  style={styles.amount}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setUpdate(text)}
                  autoFocus={true}
                />
                <Text
                  style={{
                    textAlignVertical: "center",
                    textAlign: "left",
                    fontSize: 30
                  }}
                >
                  {" "}
                  Ar
                </Text>
              </KeyboardAvoidingView>
              <View>{this.state.warning}</View>
            </View>
          </View>

          {/* QR Code   */}
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={() => this.copyToClipBoard()}
            >
              <QRCode
                value={this.generateQrCodeText()}
                logo={logoFromFile}
                size={160}
                logoSize={40}
              />
            </TouchableOpacity>
            {this.state.actualText}
          </View>
        </ScrollView>
        <GoToStore />
      </View>
    );
  }
}

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackHome = new StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.user_id,
      drawerLabel: "Accueil",
      headerRight: (
        <HeaderRight
          actionShare={() => Services._shareMessage(self.generateQrCodeText())}
        />
      ),
      titleStyle: styleBase.headerTitle,
      drawerIcon: ({ tintColor }) => <Icon name="home" size={30} />,
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);

//make this component available to the app
export default stackHome;
