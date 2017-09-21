//import liraries
import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables
} from "native-base";

import styles from "./styles";
import I18n from "ex-react-native-i18n";
import { Notifications } from "expo";
import translation from "./translation";
import Services from "../../utils/services";

// create a component
const drawerCover = require("../../images/4.jpg");
const drawerImage = require("./images/logo-kitchen-sink.png");

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
    return (
      <Container>
        <Content
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover}>
            {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}
            <Icon
              name="contact"
              style={{ color: "#fff", fontSize: 100, margin: 30 }}
              color="#fff"
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                marginTop: 50,
                marginRight: 30
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  backgroundColor: "transparent",
                  fontSize: 30
                }}
              >
                {this.props.navigation.state.params.user_id}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  backgroundColor: "transparent",
                  fontSize: 20
                }}
              >
                {Services.formatNumber(this.state.solde)} {this.state.currency}
              </Text>
            </View>
          </Image>
          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{
                      fontSize: 26,
                      width: 30,
                      color: data.bg
                    }}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
