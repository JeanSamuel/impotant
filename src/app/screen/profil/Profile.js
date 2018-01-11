import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";

import mainColor from "./constants";

import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";
import Localisation from "./localisation";
import UserData from "./userData";

class Contact extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired
    }).isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    tels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
      })
    ).isRequired
  };

  state = {
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.emails)
  };

  onPressPlace = () => {
    console.log("place");
  };

  onPressTel = number => {
    Linking.openURL(`tel:${number}`).catch(err => console.log("Error:", err));
  };

  onPressSms = () => {
    console.log("sms");
  };

  onPressEmail = email => {
    Linking.openURL(`mailto:${email}?subject=subject&body=body`).catch(err =>
      console.log("Error:", err)
    );
  };

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country }
    } = this.props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar
              }}
            />
            <Text style={styles.userNameText}>Manaka02 (AA012)</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>Confirmé</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderLocal = () => (
    <View style={styles.telContainer}>
      <Localisation name={"test"} />
    </View>
  );

  renderUser = () => (
    <View style={styles.telContainer}>
      <UserData name={"test"} />
    </View>
  );
  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        );
      }}
    />
  );

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        );
      }}
    />
  );

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderUser()}
            {Separator()}
            {this.renderLocal()}
            {Separator()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0
  },
  container: {
    flex: 1
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1
      },
      android: {
        alignItems: "center"
      }
    })
  },
  placeIcon: {
    color: "white",
    fontSize: 26
  },
  scroll: {
    backgroundColor: "#FFF"
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 20
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row"
  },
  userCityRow: {
    backgroundColor: "transparent"
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center"
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center"
  }
});

export default Contact;
