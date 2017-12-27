//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Notifications } from "expo";
import DropdownAlert from "react-native-dropdownalert";
import Services from '../../services/utils/services'

// create a component

const MAIN_INFO_COLOR = "rgba(236, 240, 241,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  amount : 2000,
  sender : 'Toavina',
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};

class Alert extends Component {

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

      showAlert(notification) {
          //console.log('====================================');
          //console.log('ty le notificatoin', notification);
          //console.log('====================================');
        const title = data.title;
        const amount = data.amount;
        const sender = data.otherUser;
        let debutMessage = "Vous venez d'envoyer' ";
        let finMessage = " Ar à ";
        const message = debutMessage + amount + finMessage + sender;
        this.dropdown.alertWithType(data.type, title, message);
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

// define your styles
const styles = StyleSheet.create({
    container: {
    },
});

//make this component available to the app
export default Alert;
