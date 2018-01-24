import React, {Component} from "react";
import {Card, Icon} from "react-native-elements";
import {Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import colors from "../../config/constants/colors";
import Email from "./Email";
import Separator from "./Separator";
import Tel from "./Tel";
import Localisation from "./localisation";
import UserData from "./userData";
import ActionButton from 'react-native-action-button';

import {MessagePromptWithAnnuler} from "../../components/modal";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisible: true
    };
  }
  componentDidMount() {
    if (this.props.role !== "confirmé") {
      this.removeModal()
    }
  };
  goBack = () => {
    this.props.navigation.navigate("Home");
  };

  removeModal() {
    this.setState({
      messageVisible: false
    });
  }

  goToValidation() {
    this.removeModal();
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Validation", data);
  }

  goToPay(){
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Home", data);
  }
  goToAchat(){
    const { user_id, username } = this.props.navigation.state.params;
    let data = {
      user_id,
      username
    };
    this.props.navigation.navigate("Charger", data);
  }
  goToSteps = () => {
    if (this.props.role === "confirmé")
      this.props.navigation.navigate("EditInfo", { user_id: this.props.code });
    else this.removeModal();
  };

  renderHeader = () => {
    const { avatar, avatarBackground, name, solde } = this.props;
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
              {this.props.username + " (" + this.props.code + ")"}
            </Text>
            <TouchableOpacity>
              <Icon
                name="edit"
                underlayColor="transparent"
                iconStyle={styles.navigationIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerColumn}>
            {!avatar ? (
              <Image
                style={styles.userImage}
                source={require("../../assets/images/avatar-placeholder.png")}
              />
            ) : (
                <Image
                  onPress={console.log("Image pressed")}
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
              Solde : {this.props.solde + " Ar"}
            </Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>{this.props.role}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        {this.state.messageVisible ? (
          <MessagePromptWithAnnuler
            onRequestClose={() => this.removeModal()}
            action={() => { this.goToValidation() }}
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

  renderActionButton(){
    return(
      <ActionButton buttonColor="rgba(231,76,60,1)">
        {this.props.role === "confirmé"
          ? (
            <ActionButton.Item buttonColor='#9b59b6' title="Modifier" onPress={() => this.props.navigation.navigate("EditInfo", { user_id: this.props.code }) }>
              <Icon name="md-create" style={styles.actionButtonIcon} color={"white"} type={"ionicon"}/>
            </ActionButton.Item>
          )
          :(
            <ActionButton.Item buttonColor='#9b59b6' title="Activer mon compte" onPress={() => this.goToValidation()}>
              <Icon name="md-checkmark" color={"#fff"} type={"ionicon"}/>
            </ActionButton.Item>
          )}
        <ActionButton.Item buttonColor='#3498db' title="Payer/Envoyer" onPress={() => this.goToPay()}>
          <Icon name="ios-qr-scanner" color={"#fff"} type={"ionicon"}/>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Recharger" onPress={() => this.goToAchat()}>
          <Icon name="md-cart" color={"#fff"} type={"ionicon"}/>
        </ActionButton.Item>
      </ActionButton>
    )
  }


  onPressTel() {}
  onPressSms() {}
  renderTel = () => (
    <View style={styles.telContainer}>
      <Tel
        index={0}
        key={"tel-1"}
        name={"Mobile"}
        number={this.props.tels}
        onPressSms={this.onPressSms}
        onPressTel={this.onPressTel}
      />
    </View>
  );
  onPressEmail() { }
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
  );

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {this.renderHeader()}
        <ScrollView style={styles.scroll}>
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
      </View>
    );
  }
}
Profil.propTypes = {
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
    borderColor: colors.$secondaryColor,
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

export default Profil;
