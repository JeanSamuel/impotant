//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Modal
} from "react-native";
import { Icon } from "react-native-elements";
import QrServices from "../../services/qrservices";
import Services from "../../services/services";
import { MessagePrompt, PinModal } from "../../components/modal";
import { FingerprintRequest } from "../../components/fingerprint";

// create a component
const { height, width } = Dimensions.get("window");

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      accountName: this.props.navigation.state.params.username,
      receiver_name: this.props.navigation.state.params.username,
      amount: this.props.navigation.state.params.amount,
      user: this.props.navigation.state.params.user,
      haveFingerprint: false,
      messageText: "",
      messageVisible: false,
      loading: true,
      messageTitle: "Hold On!",
      makeTransaction: false,
      error: false,
      iconName: "done",
      color: "",
      currency: "Ar",
      errorMessage: null,
      pin: "",
      modal: null
    };
  }

  componentDidMount() {
    services = new Services();
    services.getData("pin").then(pin => {
      this.setState({ pin: pin });
    });
    Services.haveFingerprint().then(haveFingerprint => {
      this.setState({ haveFingerprint: haveFingerprint });
    });
    services
      .getUserDetails(this.state.user)
      .then(user_info => {
        console.log(user_info);
        this.setState({ receiver_name: user_info.nom });
      })
      .catch(error => {
        alert(error);
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
  _handlePinInput = text => {
    this.setState({ errorMessage: null });
    console.log(text);
    if (text.length === 4) {
      let services = new Services();
      if (this.state.pin === text) {
        // console.log("Ataovy le transaction");
        this.removeModal();
        this._handleContinue();
      } else {
        console.log("error");
        this.setState({ errorMessage: this.renderErrorMessage() });
      }
    }
  };
  removeModal() {
    this.setState({ modal: null, errorMessage: null });
  }
  _promptPin() {
    if (this.state.haveFingerprint) {
      this.setState({ makeTransaction: true });
    } else {
      this.setState({
        modal: (
          <PinModal
            amount={Services.formatNumber(this.state.amount)}
            user={this.state.user}
            currency={this.state.currency}
            onChangeText={this._handlePinInput}
            errorMessage={this.state.errorMessage}
            onRequestClose={() => {
              this.removeModal();
            }}
          />
        )
      });
    }
  }
  _handleContinue() {
    this.setState({
      loading: true,
      color: "#FF9521",
      messageText: "Votre transaction est en cours de validation",
      messageVisible: true
    });
    services = new QrServices();
    let services = new QrServices();
    services
      .performTransation(
        this.state.amount,
        this.state.user_id,
        this.state.currency,
        this.state.user,
        ""
      )
      .then(rep => {
        console.log(rep);
        if (rep.resultat == "success") {
          this.setState({
            loading: false,
            error: false,
            messageTitle: "Success !",
            iconName: "done",
            color: "#00B232",
            messageText:
              "Vous avez envoyé " +
              this.state.amount +
              " " +
              this.state.currency +
              " à " +
              this.state.receiver_name
          });
        }
        if (rep.error != null) {
          this.setState({
            loading: false,
            error: true,
            messageTitle: "Error !",
            iconName: "close",
            color: "#FF2423",
            messageText: rep.error_message
          });
        }
      });
  }

  _hideMessage() {
    this.setState({ messageVisible: !this.state.messageVisible });
    this.props.navigation.navigate("Drawer", {
      user_id: this.state.user_id,
      username: this.state.accountName
    });
  }
  render() {
    const formatedAmount = Services.formatNumber(this.state.amount);
    return (
      <View style={styles.container}>
        {this.state.haveFingerprint && this.state.makeTransaction ? (
          <FingerprintRequest
            waitTextColor="rgba(22, 160, 133,1.0)"
            onFingerprintSuccess={() => this._handleContinue()}
          />
        ) : null}
        <ScrollView>
          <View style={styles.reviewBox}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.amountReview}>{formatedAmount}</Text>
              <Text style={{ fontSize: 35, marginBottom: 30 }}>
                {this.state.currency}
              </Text>
            </View>
            <View style={styles.informationBox}>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Vous allez envoyer {formatedAmount} {this.state.currency} à{" "}
                {this.state.receiver_name}
              </Text>
              <View style={{ marginTop: 10 }}>
                <Text style={{ textAlign: "center", color: "#797979" }}>
                  L'argent sera envoyer dans le compte Ariary.net de la
                  personne. La personne recevra un email, ou une notification à
                  propos de la transaction.
                </Text>
              </View>
            </View>
          </View>
          {this.state.modal}
        </ScrollView>

        <TouchableHighlight
          style={{
            justifyContent: "center",
            backgroundColor: "#193441",
            height: 50,
            width: width
          }}
          onPress={() => {
            this._promptPin();
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              Envoyer maintenant
            </Text>
          </View>
        </TouchableHighlight>
        {this.state.messageVisible ? (
          <MessagePrompt
            onRequestClose={() => this._hideMessage()}
            amount={formatedAmount}
            currency={this.state.currency}
            user={this.state.user}
            iconName={this.state.iconName}
            loading={this.state.loading}
            text={this.state.messageText}
            title={this.state.messageTitle}
            error={this.state.error}
            color={this.state.color}
          />
        ) : null}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,0.9)"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  reviewBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: height / 2,
    width: width - 30
  },
  informationBox: {
    width: width,
    marginTop: 20,
    paddingHorizontal: 25
  },
  amountReview: {
    textAlign: "center",
    fontSize: 75
  }
});

//make this component available to the app
export default Review;
