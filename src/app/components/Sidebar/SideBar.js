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
// import I18n from "ex-react-native-i18n";

// create a component
const drawerCover = require("./images/cover.png");
const drawerImage = require("./images/logo-kitchen-sink.png");

const datas = [
  {
    name: "Activity",
    route: "Home",
    icon: "book",
    bg: "#C5F442"
  },
  {
    name: "Adress",
    route: "Home",
    icon: "bookmarks",
    bg: "#477EEA"
  },
  {
    name: "Merchant Map",
    route: "Home",
    icon: "map",
    bg: "#477EEA"
  },
  {
    name: "Settings",
    route: "Home",
    icon: "settings",
    bg: "#C5F442"
  },
  {
    name: "About",
    route: "Home",
    icon: "information-circle",
    bg: "#477EEA"
  },
  {
    name: "Logout",
    route: "Logout",
    icon: "log-out"
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
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover}>
            <Image square style={styles.drawerImage} source={drawerImage} />
          </Image>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}
