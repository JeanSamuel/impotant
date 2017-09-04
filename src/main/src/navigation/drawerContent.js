import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../styles/Styles";
import axios from "axios";
import { Icon } from "react-native-elements";
import Services from "../services/services";

const mark = require("../../images/icons/logo-pro.png");
const back = require("../../images/backHeader.jpg");

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solde: "",
      ownerId: 0,
      ownerName: "",
      date: "",
      date: ""
    };
    this.checkSolde();
  }

  getSolde() {
    return this.state.solde;
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
        this.setState({
          solde: response.data.value,
          date: response.data.date
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  refresh() {}

  render() {
    let logoFromFile = require("../../images/icons/user.png");
    let soldeFormated = Services.formatNumber(this.getSolde());
    return (
      <View style={styles.container}>
        <Image source={back} style={styles.imageBack} resizeMethod="scale">
          <View
            style={[
              styles.logoContainer,
              {
                flexDirection: "row",
                justifyContent: "space-between"
              }
            ]}
          >
            <Icon
              name="account-circle"
              size={50}
              color="rgba(26, 188, 156,1.0)"
            />
            <View />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Text style={styleBase.textWhiteBold}>
                {this.state.ownerName}
              </Text>
              <Text style={styleBase.textWhiteBold}>
                Solde : <Text style={{ fontSize: 18 }}>{soldeFormated} Ar</Text>
              </Text>
              <Text style={styleBase.textWhiteBold}>du {this.state.date}</Text>
            </View>
            <TouchableOpacity
              style={[
                styleBase.centered,
                styles.refreshContainer,
                { alignContent: "flex-end" },
                { transform: [{ rotate: "10 deg" }] }
              ]}
            >
              <Icon
                name="refresh"
                size={30}
                color="#FFF"
                containerStyle={styleBase.centered}
                onPress={() => this.refresh()}
              />
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: 170
  },
  imageBack: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingTop: 10
  },
  logoContainer: {
    height: "50%"
  },
  logo: {
    height: "100%"
  },
  textWhiteRight: { fontSize: 20, color: "#fff", textAlign: "right" },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    width: "70%"
  },
  refreshContainer: {
    width: "20%"
  }
});
