//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MyQrCode from "../../components/qrCode";
import { NotificationServices, SyncServices } from "../../services";
import Services from "../../services/services";
import { Notifications } from "expo";

// create a component
class AppSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textStatus: "Préparation",
      textStatus2: "pour la synchronisation",
      textHelp: "",
      value: "",
      isSetted: false,
      isSynchronised: false,

      notification: {}
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    this.dismissAlert();
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    console.log("====================================");
    console.log("ty le notification", notification);
    console.log("====================================");
    this.setState({ notification: notification });
    try {
      let userData = this.synchronisation(notification);
      this.saveData(userData)
        .then(() => {
          this.props.navigation.navigate("drawer");
        })
        .catch(error => {
          console.log("====================================");
          console.log("error saving userdata");
          console.log("====================================");
          throw error;
        });
    } catch (error) {
      console.log("====================================");
      console.log("ato njay ary eh");
      console.log("====================================");
      throw error;
    }
  };

  synchronisation(notification) {
    console.log("====================================");
    console.log("debut synchronisation");
    console.log("====================================");
    let syncServices = new SyncServices();
    let isDataOk = syncServices.checkData(notification);
    let userData = null;
    if (isDataOk) {
      this.setState({
        isSynchronised: true,
        textStatus: "Synchronisation...",
        textStatus2: "alias : " + notification.data.alias,
        textHelp: ""
      });
      try {
        userData = syncServices.getUserData(notification.data);
        console.log("====================================");
        console.log("fin synchronisation");
        console.log(userData);
        console.log("====================================");
        return userData;
      } catch (error) {
        console.log("====================================");
        console.log("connexion error");
        console.log("====================================");
        throw error;
      }
    }
  }

  async saveData(userData) {
    let services = new Services();
    console.log("====================================");
    console.log(userData);
    console.log("====================================");
    try {
      await services.saveData("userData", JSON.stringify(userData));
      console.log("====================================");
      console.log("apres n sauvegarde");
      console.log("====================================");
      return;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      throw error;
    }
  }

  async componentDidMount() {
    if (!this.state.isSetted) {
      var token = await new NotificationServices().getExpoToken();
      console.log("====================================");
      console.log("token", token);
      console.log("====================================");
      this.setState({
        isSetted: true,
        value: token,
        textStatus: "Prêt",
        textStatus2: "",
        textHelp: "Prenez en photo avec l'application AriaryClient"
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{this.state.textStatus}</Text>
          <Text style={styles.title2}>{this.state.textStatus2}</Text>
        </View>

        <View style={styles.body}>
          {this.state.isSetted && !this.state.isSynchronised ? (
            <MyQrCode value={this.state.value} />
          ) : null}

          <Text style={styles.textHelp}>{this.state.textHelp}</Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  titleContainer: {
    marginBottom: 20
  },
  title1: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "100"
  },
  title2: {
    textAlign: "center"
  },
  textHelp: {
    marginTop: 15
  }
});

//make this component available to the app
export default AppSync;
