import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import { Alert, RefreshControl, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import colors from "../../config/constants/colors";
import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";
import Localisation from "./localisation";
import UserData from "./userData";
import ActionButton from 'react-native-action-button';
import { MessagePromptWithAnnuler, MessagePrompt } from "../../components/modal";
import Services from "../../services/utils/services";
import Utils from "../../services/utils/Utils";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisible: false,
      refreshing: false,
      loading: false,
      avatar: undefined,
      avatarBackground: null,
      name: undefined,
      solde: 0,
      code: undefined,
      role: undefined,
      test: undefined,
      birthday: undefined,
      tels: undefined,
      emails: undefined,
      adresse: undefined,
      ville: undefined,
      pays: undefined,
      cin: undefined
    };
  }
  componentWillMount() {
    const { avatar, birthday, avatarBackground, name, solde, code, role, test, emails, tels, adresse, ville, pays, cin } = this.props;
    this.setState({
      loading: false,
      birthday: birthday,
      avatar: avatar,
      avatarBackground: avatarBackground,
      name: name,
      solde: solde,
      code: code,
      role: role,
      tels: tels,
      test: test,
      emails: emails,
      adresse: adresse,
      ville: ville,
      pays: pays,
      cin: cin
    })
  }
  removeModal() {
    this.setState({
      messageVisible: !this.state.messageVisible,
    });
  }
  refreshData() {
    this.setState({ refreshing: true });
    this.props.refresh();
    this.setState({ refreshing: false });
  }
  goToValidation(test) {
    if (!test) {
      this.removeModal();
    }
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Validation", data);
  }
  goToRetrait() {
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Retrait", data);
  }
  goToPay() {
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Home", data);
  }
  goToAchat() {
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Charger", data);
  }
  goToSteps() {
    if (this.state.test === "ROLE_CLIENT_VALIDE" || this.state.test === "ROLE_VALIDATION")
      this.props.navigation.navigate("EditInfo", { user_id: this.state.code });
    else {
      this.removeModal();
    }
  }

  renderHeader() {
    const { avatar, avatarBackground, name, solde, code, role } = this.state;
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require("../../assets/images/profil-background.png")}
        >
          <View style={styles.navigation}>
            <Icon
              name="ios-menu"
              type="ionicon"
              underlayColor="transparent"
              iconStyle={styles.navigationIcon}
              onPress={() => {
                this.props.navigation.navigate("DrawerOpen");
              }}
            />
            <Text style={styles.userNameText}>
              {this.props.username + " (" + code + ")"}
            </Text>
            <Icon
              name="ios-create-outline"
              type="ionicon"
              underlayColor="transparent"
              iconStyle={[styles.navigationIcon, { color: '#fff' }]}
              onPress={() => {
                this.goToSteps();
              }}
            />
          </View>

          <View style={styles.headerColumn}>
            {!avatar ? (
              <Image
                style={styles.userImage}
                source={require("../../assets/images/avatar-placeholder.png")}
              />
            ) : (
                <Image
                  style={styles.userImage}
                  source={{ uri: avatar }}
                />
              )}
            <Text
              style={[
                styles.userNameText,
                {
                  borderBottomWidth: 1,
                  paddingBottom: 0,
                  borderBottomColor: "#fff"
                }
              ]}
            >
              Solde : {solde + " Ar"}
            </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>{role}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderLocal() {
    return <View style={styles.telContainer}>
      <Localisation city={this.state.ville} country={this.state.pays} address={this.state.adresse} edit={this.goToSteps.bind(this)} />
    </View>
  }

  getCIN() {
    let cin = this.state.cin;
    let cinnumber = Utils.getNumeric(cin.trim());
    return Services.formatNumber(cinnumber);
  }
  renderUser() {
    return <View style={styles.telContainer}>
      <UserData name={this.state.name} birthday={this.state.birthday} edit={this.goToSteps.bind(this)} cin={this.getCIN()} />
    </View>
  }
  renderActionButton() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        {(this.state.test !== "ROLE_CLIENT_VALIDE" && this.state.test !== "ROLE_VALIDATION")
          ? (<ActionButton.Item textStyle={{ color: '#9b59b6', fontWeight: '800' }} buttonColor='#9b59b6' title="Activer mon compte" onPress={() => this.goToValidation(true)}>
            <Icon name="md-checkmark" color={"#fff"} type={"ionicon"} />
          </ActionButton.Item>) : (
            <ActionButton.Item textStyle={{ color: '#9b59b6', fontWeight: '800' }} buttonColor='#9b59b6' title="Modifier" onPress={() => this.props.navigation.navigate("EditInfo", { user_id: this.props.code })}>
              <Icon name="md-create" style={styles.actionButtonIcon} color={"white"} type={"ionicon"} />
            </ActionButton.Item>
          )
        }
        <ActionButton.Item textStyle={{ color: '#3498db', fontWeight: '800' }} buttonColor='#3498db' title="Payer/Envoyer" onPress={() => this.goToPay()}>
          <Icon name="ios-qr-scanner" color={"#fff"} type={"ionicon"} />
        </ActionButton.Item>
        <ActionButton.Item textStyle={{ color: '#1abc9c', fontWeight: '800' }} buttonColor='#1abc9c' title="Recharger" onPress={() => this.goToAchat()}>
          <Icon name="md-cart" color={"#fff"} type={"ionicon"} />
        </ActionButton.Item>
        <ActionButton.Item textStyle={{ color: '#00cf7e', fontWeight: '800' }} buttonColor='#00cf7e' title="Faire un retrait" onPress={() => this.goToRetrait()}>
          <Icon name="md-cash" color={"#fff"} type={"ionicon"} />
        </ActionButton.Item>
      </ActionButton>
    )
  }
  onPressTel() { }
  onPressSms() { }
  renderTel() {
    return <View style={styles.telContainer}>
      <Tel
        index={0}
        key={"tel-1"}
        name={"Mobile"}
        number={this.state.tels}
        onPressSms={this.goToSteps.bind(this)}
        onPressTel={this.goToSteps.bind(this)}
      />
    </View>
  }
  onPressEmail() { }
  renderEmail() {
    return <View style={styles.telContainer}>
      <Email
        key={"email-1"}
        index={0}
        name={"E-mail"}
        email={this.state.emails}
        onPressEmail={this.goToSteps.bind(this)}
      />
    </View>
  }
  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {this.renderHeader()}
        <ScrollView style={styles.scroll} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshData.bind(this)}
          />
        }>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
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
        {this.renderActionButton()}
        {this.state.messageVisible ? (
          <MessagePromptWithAnnuler
            onRequestClose={() => this.removeModal()}
            action={() => { this.goToValidation(false) }}
            iconName={"warning"}
            loading={false}
            text={
              "Nous vous invitons à valider votre compte pour profiter pleinement des offres"
            }
            title={"Validation"}
            color={"#FF9521"}
          />
        ) : null}
      </View>
    );
  }
  componentDidMount() {
    if (this.state.test !== undefined && this.state.test === "ROLE_CLIENT_TEMP") this.removeModal();
  }
}

Profile.propTypes = {
  refresh: PropTypes.func,
  avatar: PropTypes.string,
  avatarBackground: PropTypes.string,
  name: PropTypes.string,
  birthday: PropTypes.string,
  address: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string
  }),
  emails: PropTypes.string,
  tels: PropTypes.string,
  role: PropTypes.string
};
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
    //borderColor: colors.$secondaryColor,
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
  },
  actionButtonIcon: {
    height: 22
  },
});

export default Profile;