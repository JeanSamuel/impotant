//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import MyQrCode from "../../components/qrCode";
import { NotificationServices, SyncServices } from "../../services";
import Services from "../../services/services";
import { Notifications, Constants } from "expo";
import { Button } from "react-native-elements";

// create a component
class AppSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textStatus: "Préparation",
      textStatus2: "pour la synchronisation",
      textHelp: "",
      token: "",
      deviceId : Constants.deviceName,
      qrvalue : "",
      isSetted: false,
      isSynchronised: false,

      notification: {}
    };
    this._generateValue = this.generateQrValue.bind(this)
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  
  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
      let response = this.synchronisation(notification)
      .then(response =>{
        let services = new Services();
        services.saveData('userData', JSON.stringify(response))
        .then(answer =>{
          let data = {
            user_id: response.pseudo
          };
          this.props.navigation.navigate('Drawer', data)
        })
        
      }).catch(error => {
        console.log('misy erreur synchronisation');

      })
      
  };

  synchronisation(notification) {
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

      let response = syncServices.getUserData(notification.data)
        return response;
    }
  }

  generateQrValue (token){
    let value = {
      'type' : 'sync',
      'expToken' : token,
      'deviceName' : this.state.deviceId
    }
    this.setState({qrvalue : JSON.stringify(value)})
  }

  async componentDidMount() {
    if (!this.state.isSetted) {
      let token = await new NotificationServices().getExpoToken();
      this.generateQrValue(token);
      this.setState({
        isSetted: true,
        token: token,
        textStatus: "Prêt",
        textStatus2: "",
        textHelp: "Prenez en photo avec l'application AriaryClient"
      });
    }
  }

  return() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView  contentContainerStyle={styles.bodyContainer} >
          <View style={styles.titleContainer}>
            <Text style={styles.title1}>{this.state.textStatus}</Text>
            <Text style={styles.title2}>{this.state.textStatus2}</Text>
          </View>

          <View style={styles.body}>
            {this.state.isSetted && !this.state.isSynchronised ? (
              <MyQrCode value={this.state.qrvalue} />
            ) : null}

            <Text style={styles.textHelp}>{this.state.textHelp}</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            title="Retour"
            backgroundColor="transparent"
            underlayColor="#000"
            large
            textStyle={styles.buttonText}
            onPress={() => this.return()}
          />
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
  bodyContainer : {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  buttonText: {
    fontSize: 20,
    color: "rgba(52, 73, 94,1.0)"
  }
});

//make this component available to the app
export default AppSync;
