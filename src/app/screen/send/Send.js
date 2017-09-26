//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Icon, Button } from "react-native-elements";
import History from "../history/historyM";
import headStyle from "../../styles/stylesC/headerStyle";
import QrServices from "../../services/qrservices";
import { InputLeftButton, InputLeftIcon } from "../../components/TextInput";
import { PinModal, AmountModal } from "../../components/modal";
import { BarCodeScanner, Permissions } from "expo";
import Services from "../../services/services";
import To from "./To";
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
      user_id: this.props.navigation.state.params.user_id,
      currency: "Ar",
      modal: null,
      isEditable: true
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
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

  handleDoneEditing() {
    console.log("Done editing");
  }

  removeModal() {
    this.setState({ modal: null });
  }

  handleAmountInput = text => {
    this.setState({ amount: Services.formatNumber(text) });
  };

  promptPin() {
    this.setState({
      modal: (
        <PinModal
          amount={this.state.amount}
          user={this.state.user}
          currency={this.state.currency}
          onChangeText={text => {
            console.log(text);
          }}
          onRequestClose={() => {
            this.removeModal();
          }}
        />
      )
    });
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
          }}
        />
      )
    });
  }

  onResetAction = () => {
    this.setState({
      amount: "",
      user: "",
      type: "",
      currency: "Ar",
      isEditable: true
    });
  };
  promptInformation() {
    console.log("show info");
  }
  onContinueAction = () => {
    console.log("continue");
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
        this.prompAmount();
      }
      if (readData.a != 0 && readData.u) {
        console.log(readData.a);
        this.promptPin();
      }
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            torchMode={this.state.flashOn}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFill}
          />
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
              buttonStyle={styles.controlButton}
              icon={{ name: "clear-all", size: 25 }}
              onPress={this.onResetAction}
            >
              <Icon name="clear-all" size={25} color="#fafafa" />
            </Button>
            <Button
              buttonStyle={styles.controlButton}
              icon={{ name: this.state.flashIcon, size: 25 }}
              onPress={this.toggleFlash}
            >
              <Icon name={this.state.flashIcon} size={25} color="#fafafa" />
            </Button>
            {/* <Button
              buttonStyle={styles.controlButton}
              onPress={this.promptInformation}
              icon={{ name: "info", size: 25 }}
            >
              <Icon name="info" size={25} color="#fafafa" />
            </Button> */}
            <Button
              buttonStyle={styles.controlButton}
              icon={{ name: "send", size: 25 }}
              onPress={this.onContinueAction}
            >
              <Icon name="send" size={25} color="#fafafa" />
            </Button>
          </View>
          {this.state.modal}
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
    marginVertical: 5,
    backgroundColor: "transparent" ///"rgba(52, 73, 94,1.0)" // "#448aff"
  },
  touchableButton: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center"
  }
});

const NestedSendStack = StackNavigator({
  Send: {
    screen: Send,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home-outline" size={25} type="ionicon" />
      ),
      title: "Home",
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
      )
    })
  },
  To: {
    screen: To
  },
  History: {
    screen: History,
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
});
export default NestedSendStack;
