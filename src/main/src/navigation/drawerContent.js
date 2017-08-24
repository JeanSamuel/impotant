import React, { Component } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../styles/Styles";
import axios from "axios";
import { Icon } from "react-native-elements";
import Services from "../services/services";

const mark = require("../../images/icons/logo-pro.png");

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solde: "",
      report: "null",
      ownerId: 0,
      ownerName: "Toavina Ralambosoa",
      date: ""
    };
    this.checkSolde();
  }

  getReport() {
    return this.state.report;
  }

  async checkSolde() {
    var user_id = await new Services().getData("user_id");
    this.setState({
      ownerId: user_id,
      ownerName: user_id
    });
    var url = "http://ariary.vola.mg/balance/" + this.state.ownerId;
    axios
      .get(url)
      .then(response => {
        console.log("userSolde", response.data);
        this.setState({ report: response.data.value });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let logoFromFile = require("../../images/icons/user.png");
    let reportFormated = Services.formatNumber(this.getReport());
    return (
      <View style={{ elevation: 10 }}>
        <View style={styles.container}>
          <View>
            <View
              style={{
                marginTop: 2,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View>
                <Image
                  source={mark}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={[styles.textWhiteRight, { fontSize: 25 }]}>
                  Marchand Vola
                </Text>
                <View>
                  <Text style={[styles.textWhiteRight, { fontSize: 35 }]}>
                    {reportFormated} Ar
                  </Text>
                  <Text style={styles.textWhiteRight}>
                    {this.state.ownerName}
                  </Text>
                  <Text style={styles.textWhiteRight}>
                    du 2017-08-01 10:20:09
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: 150,
    backgroundColor: "rgba(41, 128, 185,1.0)",
    padding: 20
  },
  textWhiteRight: { fontSize: 20, color: "#fff", textAlign: "right" }
});
