import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  CustomKey, Handler, Landing, Login, Pin, Register, RegisterName, RegisterPin, RegisterPwd, Review
} from "../../../screen/index";
import Drawer from "./Drawer";
import { Notifications } from "expo";
import DropdownAlert from "react-native-dropdownalert";
import { Utils } from '../../../services';
import Profil from "../../../screen/profil";

class Navigateur extends Component {
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
    this.setState({ notification: notification });
    this.showAlert(notification);
  };

  handleRequestCallback(err, response) {
    if (err != null) {
      this.dropdown.alertWithType("error", "Error", err);
    }
  }

  receptionAlert(notification){
    let data = notification.data;
    if(data.type !== "reception"){
      return "";
    }
    let title = "Reception de "+data.amount;
    let message = "Vous avez reçu "+data.amount+" Ar de la part de "+data.from;
    this.dropdown.alertWithType("info",title, message)
  }
  envoieAlert(notification){
    let data = notification.data;
    if(data.type !== "envoie"){
      return "";
    }
    let title = "Envoie de "+data.amount;
    let message = "Vous avez envoyer "+data.amount+" Ar à "+data.from;
    this.dropdown.alertWithType("info",title, message)
  }

  transfertAlert(notification){
    let str =  "";
    let type = "info";
    let title = "" ;
    if(notification.data.type !== "transfert"){
      return "";
    }
    if (notification.data.result === 'success') {
      title = notification.data.title ? notification.data.title : "";
      let expo = this.state.notification.data.expo;
      if (expo === 'sent') {
        str = 'Vous avez reçu une somme de ' + Utils.formatNumber(notification.data.amount);
        str = str + " Ariary, veuillez consulter l'historique pour voir le détail";
      } else {
        str = "Le transfert d'une somme de " + Utils.formatNumber(notification.data.amount);
        str = str + ' Ariary vers le compte ';
        str = str + notification.data.tel + ' est effectué  avec succès';
      }
    } else {
      str = 'Le transfert  de ' + Utils.formatNumber(notification.data.amount) + ' Ar à echoué';
      type =  "error"
    }
    this.dropdown.alertWithType(type,title, str);
  }
  achatAlert(notification){
    if(notification.data.type !== "achat"){
      return ""
    }
    let title = "Rechargement de compte";
    if(notification.data.result === "success"){
      this.dropdown.alertWithType("success",title,"Votre compte a été crédité de "+ Utils.formatNumber(notification.data.amount)+" Ar");
      return true;
    }
    this.dropdown.alertWithType("error", title, "L'achat de "+Utils.formatNumber(notification.data.amount) +" Ar a échoué");
  }
  showAlert(notification) {
    this.receptionAlert(notification);
    this.envoieAlert(notification);
    this.receptionAlert(notification);
    this.achatAlert(notification);
    this.transfertAlert(notification);
  }

  dismissAlert = () => {
    this.dropdown.onClose();
  };

  onClose(data) {
    //console.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          onClose={data => this.onClose(data)}
          containerStyle={{ marginTop: 20 }}
          closeInterval={5000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Navigateur;

const MainNavigator = new StackNavigator(
  {
    Handler: {
      screen: Handler,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Landing: {
      screen: Landing,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Home"
      })
    },
    CustomKey: {
      screen: CustomKey,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Review: {
      screen: Review,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Pin: {
      screen: Pin,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    RegisterPin: {
      screen: RegisterPin,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Register"
      })
    },
    RegisterName: {
      screen: RegisterName
    },
    RegisterPwd: {
      screen: RegisterPwd
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Register"
      })
    },
    Profil: {
      screen: Profil,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Profil"
      })
    }
  },
  {
    initialRouteName: "Handler",
    /*cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }*/
  }
);
