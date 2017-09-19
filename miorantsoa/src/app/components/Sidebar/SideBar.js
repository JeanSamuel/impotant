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
import translation from "./translation";

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
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      isReady: false,
      datas: null
    };
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
                marginTop: 60,
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
