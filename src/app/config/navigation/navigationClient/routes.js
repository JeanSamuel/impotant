import React, {Component} from "react";
import {Alert, StyleSheet, View} from "react-native";
import {StackNavigator} from "react-navigation";
import {
  CustomKey, Handler, Landing, Login, Pin, Register, RegisterName, RegisterPin, RegisterPwd, Review
} from "../../../screen/index";
import Drawer from "./Drawer";
import {Notifications} from "expo";
import DropdownAlert from "react-native-dropdownalert";
import {Utils} from '../../../services';
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

  showAlert(notification) {
    let data = notification.data;
    if (data.type == "reception") {
      let title = "Nouveau transfert";
      let amount = data.amount;
      let sender = data.from;
      let debutMessage = "Vous avez reçu ";
      let finMessage = "Ar de la part de ";
      const message = debutMessage + amount + finMessage + sender;
      this.dropdown.alertWithType("info", title, message);
    }else{
      let ret = this._generateMessage(data);
			this.dropdown.alertWithType('success', ret.title, ret.str);
			Alert.alert(ret.strtitle, ret.str);
    }
  }
  _generateMessage(data) {
		let type = data.type;
		let title = data.title;
		let amount = data.amount;
		let tel = data.tel;
		let balance = data.balance;
		let result = data.result;
		let str = null;
		switch (type) {
			case 'achat':
				if (result == 'success') {
					str = 'Votre compte a été credité de ' + Utils.formatNumber(amount);
					str = str + ' Ariary';
				} else {
					str = "L'achat de " + Utils.formatNumber(amount) + ' Ariary à echoué';
				}
				break;

			case 'transfert':
				if (result == 'success') {
					let expo = this.state.notification.data.expo;
					if (expo == 'sent') {
						str = 'Vous avez reçu une somme de ' + Utils.formatNumber(amount);
						str = str + " Ariary, veuillez consulter l'historique pour voir le détail";
					} else {
						str = "Le transfert d'une somme de" + Utils.formatNumber(amount);
						str = str + ' Ariary vers le compte ';
						str = str + tel + ' est effectué  avec succès';
					}
				} else {
					str = 'Le transfert  de ' + Utils.formatNumber(amount) + ' à echoué';
				}
				break;
		}
		return {
			title,
			str
		};
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
        header:()=>null
      })
    },
    Review: {
      screen: Review,
      navigationOptions: ({ navigation }) => ({
        header:()=>null
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
