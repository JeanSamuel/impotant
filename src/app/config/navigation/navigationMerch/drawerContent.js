import React, { Component } from "react";
import {
  Animated,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import Services from "../../../services/utils/services";
import { Notifications } from "expo";

const back = require("../../../assets/images/backHeader.jpg");
const logoFromFile = require("../../../assets/images/icons/user.png");
import { styleBase } from "../../../assets/styles";
import colors from "../../../config/constants/colors";
const bg = require("../../../assets/images/1.jpg");
export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      solde: "",
      account_id: 0,
      avatar:
        "https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232442-stock-illustration-male-default-placeholder-avatar-profile.jpg",
      alias: "",
      username: "",
      date: "",
      animation: "",
      isrefreshing: false,
      notification: {}
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    let services = new Services();
    services
      .getData("userInfo")
      .then(response => {
        if (response != null) {
          console.log(response);

          let dataParsed = JSON.parse(response);
          let usname = dataParsed.nom;
          if (usname == null || usname == "") {
            usname = dataParsed.username;
          }
          this.setState({
            username: usname,
            avatar: dataParsed.avatar,
            account_id: dataParsed.code
          });
          if (dataParsed.avatar == undefined) {
            this.setState({
              avatar:
                "https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232442-stock-illustration-male-default-placeholder-avatar-profile.jpg"
            });
          }
          this.checkSolde();
        } else {
          this.setState({
            username: "unassigned",
            account_id: 0
          });
        }
      })
      .catch(error => {
        services.createError(error, "erreur response getting solde");
      });
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this.checkSolde();
  };

  getSolde() {
    return this.state.solde;
  }

  checkSolde() {
    console.log("mandalo at am checkSolde v");

    let services = new Services();
    let response = services
      .checkSolde(this.state.account_id)
      .then(response => {
        this.setState({
          solde: response.value,
          date: response.date,
          isrefreshing: false
        });
      })
      .catch(error => {
        this.checkOldSolde();
      });
  }

  checkOldSolde() {
    let services = new Services();
    services
      .getData("solde")
      .then(response => {
        if (response.value != null) {
          this.setState({
            solde: response.value,
            date: response.date,
            isrefreshing: false
          });
        } else {
          this.setState({
            solde: "N/A",
            date: "N/A",
            isrefreshing: false
          });
        }
      })
      .catch(error => {
        this.setState({
          solde: "N/A",
          date: "N/A",
          isrefreshing: false
        });
      });
  }

  refresh() {
    this.checkSolde();
  }

  goToProfil() {
    this.props.navigation.navigate("Profil");
  }

  render() {
    let soldeFormated = Services.formatNumber(this.getSolde());
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageBack}
          blurRadius={Platform.OS == "ios" ? 6 : 3}
          source={bg}
        >
          <Avatar
            large
            rounded
            source={{ uri: this.state.avatar }}
            onPress={this.goToProfil.bind(this)}
            activeOpacity={0.7}
          />
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 16, color: "#fff" }}>
                {this.state.username} ({this.state.account_id})
              </Text>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={styleBase.textWhiteBold}>
                  <Text style={{ fontSize: 30 }}>{soldeFormated} Ar</Text>
                </Text>
                <TouchableOpacity
                  style={[
                    styleBase.centered,
                    styles.refreshContainer,
                    { alignContent: "flex-end" }
                  ]}
                  activeOpacity={0.4}
                  onPress={this.refresh.bind(this)}
                >
                  <Animatable.View
                    ref="spinner"
                    animation={this.state.isrefreshing ? "rotate" : ""}
                    iterationCount={"infinite"}
                    Easing={"linear"}
                  >
                    <Icon
                      name="refresh"
                      size={30}
                      color="#fff"
                      containerStyle={styleBase.centered}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: 180,
    borderBottomWidth: 2,
    borderBottomColor: "$border"
  },
  imageBack: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoContainer: {
    height: "100%"
  },
  logo: {
    height: "100%"
  },
  textWhiteRight: { fontSize: 20, color: "#fff", textAlign: "right" },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20
  },
  textContainer: {
    width: "80%"
  },
  refreshContainer: {
    width: "20%"
  }
});
