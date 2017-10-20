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
  ScrollView,
  BackHandler
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import { DrawerMenu } from "../../../components/drawerMenu";
import MyQrCode from "../../../components/qrCode";
import { styleBase } from "../../../styles";
import styles from "./homeStyles";
import Toast from "react-native-easy-toast";
import Services from "../../../services/services";
import HomeServices from "../../../services/homeServices";
import data from "../../../configs/data/dataM";
import GoToStore from "./goToStore";
import HeaderRight from "./headerRight";
import Intro from "./intro";
import Test from "../../../components/qrCode";

const listText = data.message;
const timer = null;
const self = null;
class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      type: "trans",
      data: {
        currency: "Toavina",
        userId: ""
      },
      amount: "",
      isInvalidData: false,
      actualText: null,
      timer: null
    };
    this._checkBackAndroid = this._checkBackAndroid.bind(this);
  }

  static navigationOptions = {
    headerStyle: styleBase.header,
    headerTitleStyle: styleBase.headerTitle,
    drawerLabel: "Accueil",
    titleStyle: styleBase.headerTitle,
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" size={25} type="simpleLineIcon" />
    )
  };

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
      .getData("userData")  
      .then(responseJSON => {
        if (responseJSON != null) {
          let response = JSON.parse(responseJSON);
          this.setState({
            data: {
              currency: "Ar",
              userId: response.pseudo
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
    BackHandler.addEventListener("hardwareBackPress", this._checkBackAndroid);
    this.checkUserData();
    this.addTextDefault();
    this.showIntro();
    this.startTimer();
  }
  
  _checkBackAndroid() {
    let routName = this.props.navigation.state.routeName;
    if (routName == "Starter" || routName == "First") {
      return false;
    } else {
      // this.props.navigation.goBack();
      return true;
    }
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  showIntro() {
    let services = new Services();
    services
      .getData("newAtHome")
      .then(response => {
        if (response != null) {
          this.props.navigation.navigate("Intro");
        } else {
          console.log("ol efa membre hatry ny ela");
        }
      })
      .catch(error => {
        console.log("error maka anle iz ao");
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
    }, 7000);
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

  setUpdate(amount) {
    amount = amount.replace(/ /g, "");
    if (!isNaN(amount)) {
      amount = HomeServices.refactAmount(amount);
      this.setState({
        amount: amount
      });
    }
  }

  copyToClipBoard() {}

  render() {
    return (
      <View style={styles.container}>
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
                <View style={styles.amountCurrency}>
                  <Text
                    style={{
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontSize: 30
                    }}
                  >
                    {this.state.data.currency}
                  </Text>
                </View>
                <View style={styles.amountBody}>
                  <TextInput
                    ref="input"
                    value={this.state.amount}
                    style={styles.amount}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setUpdate(text)}
                    autoFocus={true}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>

          {/* QR Code   */}
          <View style={styles.row}>
            <MyQrCode value={this.generateQrCodeText()} />
            {this.state.actualText}
          </View>
        </ScrollView>
        <GoToStore />
      </View>
    );
  }
}

export default new StackNavigator({
  HomeM: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.user_id,
      headerLeft: <DrawerMenu navigation={navigation} keyboard={Keyboard} />,
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <HeaderRight
            actionShare={() =>
              Services._shareMessage(self.generateQrCodeText())}
            navigation={navigation}
          />
        </View>
      )
    })
  },
  Intro: {
    screen: Intro,
    navigationOptions: {
      headerMode: "none"
    }
  }
});
