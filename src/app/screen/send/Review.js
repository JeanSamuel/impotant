//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import QrServices from "../../services/qrservices";

// create a component
const { height, width } = Dimensions.get("window");
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      amount: this.props.navigation.state.params.amount,
      user: this.props.navigation.state.params.user,
      currency: "Ar"
    };
  }

  _handleContinue() {
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
        alert("succées");
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.reviewBox}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.amountReview}>{this.state.amount}</Text>
              <Text style={{ fontSize: 35, marginBottom: 30 }}>
                {this.state.currency}
              </Text>
            </View>
            <View style={styles.informationBox}>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Vous allez envoyer {this.state.amount} {this.state.currency} à{" "}
                {this.state.user}
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
        </ScrollView>

        <TouchableHighlight
          style={{
            justifyContent: "center",
            backgroundColor: "#193441",
            height: 50,
            width: width
          }}
          onPress={() => {
            this._handleContinue();
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
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
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
