//import liraries
import React, { Component } from "react";
import { Image, View } from "react-native";

import styles from "./styles";
import I18n from "ex-react-native-i18n";
import { Notifications } from "expo";
import translation from "./translation";
import Services from "../../services/services";

// create a component
const drawerCover = require("../../assets/images/imgC/4.jpg");
const drawerImage = require("./assets/images/logo-kitchen-sink.png");

I18n.fallbacks = true;
I18n.translations = translation;

const datas = [
  {
    name: I18n.t("activities"),
    route: "Home",
    icon: "book",
    bg: "#C5F442"
  },
  {
    name: I18n.t("address"),
    route: "Adresses",
    icon: "bookmarks",
    bg: "#477EEA"
  },
  {
    name: I18n.t("map"),
    route: "About",
    icon: "map",
    bg: "#477EEA"
  },
  {
    name: I18n.t("settings"),
    route: "Options",
    icon: "settings",
    bg: "#C5F442"
  },
  {
    name: I18n.t("about"),
    route: "About",
    icon: "information-circle",
    bg: "#477EEA"
  },
  {
    name: I18n.t("logout"),
    route: "Logout",
    icon: "log-out",
    bg: "#477EEA"
  }
];
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      isReady: false,
      solde: "N/A",
      date: "N/A",
      currency: "Ar",
      loading: false,
      datas: null
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentDidMount() {
    this.getSoldes();
  }

  _handleNotification = notification => {
    this.getSoldes();
  };

  checkOldSolde() {
    let services = new Services();
    services
      .getData("solde")
      .then(response => {
        if (response.value != null) {
          this.setState({
            solde: response.value,
            loading: false
          });
        } else {
          this.setState({
            solde: "N/A",
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          solde: "N/A",
          loading: false
        });
      });
  }
  async getSoldes() {
    let services = new Services();
    this.setState({ loading: true });
    console.log(this.props.navigation.state.params.user_id);
    services
      .checkSolde(this.props.navigation.state.params.user_id)
      .then(response => {
        this.setState({
          solde: response.value,
          date: response.date,
          currency: "Ar",
          loading: false
        });
      })
      .catch(error => {
        this.checkOldSolde();
      });
  }

  render() {
    return <View />;
  }
}
