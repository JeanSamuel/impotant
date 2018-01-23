import React, { Component } from "react";
import { Card, Icon, Header } from "react-native-elements";
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import mainColor from "./constants";
import { DrawerMenu } from "../../components/drawerMenu/";

import Navigation from "./navigation";
import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";
import Localisation from "./localisation";
import UserData from "./userData";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    avatar: PropTypes.string,
    avatarBackground: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string
    }),
    emails: PropTypes.string,
    tels: PropTypes.string
  };

  state = {
    // telDS: new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // }).cloneWithRows(this.props.tels),
    // emailDS: new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // }).cloneWithRows(this.props.emails)
  };

  goBack = () => {
    this.props.navigation.navigate("Home");
  };

  goToSteps = () => {
    if (this.props.role === "confirmé")
      this.props.navigation.navigate("EditInfo", { user_id: this.props.code });
    else
      this.props.navigation.navigate("Validation");
  };

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      solde
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
          <View style={styles.navigation}>
            <Icon
              name="ios-menu"
              type='ionicon'
              underlayColor="transparent"
              iconStyle={styles.navigationIcon}
              onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
            />
            <Text style={styles.userNameText}>Profil{" (" + this.props.username + " " + this.props.code + ')'}</Text>
            <TouchableOpacity onPress={this.goToSteps}>
              <Icon
                name="edit"
                underlayColor="transparent"
                iconStyle={styles.navigationIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerColumn}>
            <Image 
              style={styles.userImage}
              source={{
                uri: avatar
              }}
            />
            <Text style={[styles.userNameText, {
              borderBottomWidth: 1,
              paddingBottom: 0,
              borderBottomColor: "#fff"
            }]}>Solde: {this.props.solde + " Ar "}</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>{this.props.role}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderLocal = () => (
    <View style={styles.telContainer}>
      <Localisation city={"Antananarivo"} country={"Madagascar"} />
    </View>
  );
  renderUser = () => (
    <View style={styles.telContainer}>
      <UserData name={this.props.name} birthday={this.props.birthday} />
    </View>
  );
  onPressTel() {

  }
  onPressSms() {

  }
  renderTel = () => (
    <View style={styles.telContainer}>
      <Tel index={0} key={"tel-1"} name={"Mobile"} number={this.props.tels} onPressSms={this.onPressSms} onPressTel={this.onPressTel} />
    </View>
    // <ListView
    //   contentContainerStyle={styles.telContainer}
    //   dataSource={this.state.telDS}
    //   renderRow={({ id, name, number }, _, k) => {
    //     return (
    //       <Tel
    //         key={`tel-${id}`}
    //         index={k}
    //         name={name}
    //         number={number}
    //         onPressSms={this.onPressSms}
    //         onPressTel={this.onPressTel}
    //       />
    //     );
    //   }}
    // />
  );
  onPressEmail() {

  }
  renderEmail = () => (
    <View style={styles.telContainer}>
      <Email
        key={"email-1"}
        index={0}
        name={"E-mail"}
        email={this.props.emails}
        onPressEmail={this.onPressEmail}
      />
    </View>
    // <ListView
    //   contentContainerStyle={styles.emailContainer}
    //   dataSource={this.state.emailDS}
    //   renderRow={({ email, id, name }, _, k) => {
    //     return (
    //       <Email
    //         key={`email-${id}`}
    //         index={k}
    //         name={name}
    //         email={email}
    //         onPressEmail={this.onPressEmail}
    //       />
    //     );
    //   }}
    // />
  );

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(0,0,0,0)",
    paddingVertical: 15,
    flexDirection: "row"
  },
  navigationIcon: {
    color: "#FFF",
    fontSize: 30,
    marginHorizontal: 15
  },
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
    paddingTop: 201234
  },
  headerBackgroundImage: {
    paddingBottom: 20
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
    flexDirection: "row",
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
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingVertical: 20
  }
});

export default Contact;
