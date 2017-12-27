import React, {Component} from "react";
import {Animated, Text, View, StatusBar,TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import {Icon} from "react-native-elements";
import Services from "../../../services/utils/services";
import {Notifications} from "expo";

const back = require("../../../assets/images/backHeader.jpg");
const logoFromFile = require("../../../assets/images/icons/user.png");
import {styleBase} from '../../../assets/styles';
export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      solde: "",
      account_id: 0,
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
          let dataParsed = JSON.parse(response);
          this.setState({
            username: dataParsed.nom,
            account_id: dataParsed.code
          });
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

  render() {
    let soldeFormated = Services.formatNumber(this.getSolde());
    return (
      <View style={styles.container}>
        <View style={styles.imageBack}>
          <View
            style={[
              styles.logoContainer,
              {
                flexDirection: "row"
              }
            ]}
          >
            <Icon name="account-circle" size={70} color="#00d07f" />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 16, color: "#000" }}>
                {this.state.username}
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
                      color="#000"
                      containerStyle={styleBase.centered}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <View
          style={[
            {
              borderTopWidth: 2,
              borderTopColor: "#E2E2E2",
              height: 40,
              justifyContent: "center"
            }
          ]}
        >
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text>{soldeFormated} Ar</Text>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: 150,
    borderBottomWidth: 2,
    borderBottomColor: "$border",
    '@media android':{
      marginTop: StatusBar.currentHeight
    }
  },
  imageBack: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
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
