import React, {Component} from "react";
import {
  StatusBar,
  TouchableOpacity,
  Platform,
  View,
  Button,
  StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import {
  Senf,
  History,
  Login,
  Logout,
  Pin,
  To,
  Adresses,
  AppStarter,
  Landing,
  Send,
  CustomKey,
  Handler,
  Review
} from "../../../screen/indexScreen";
import headStyle from "../../../styles/stylesC/headerStyle";
import RegisterPin from "../../../screen/register/registerC/RegisterPin";
import Register from "../../../screen/register/registerC/Register";
import RegisterName from "../../../screen/register/registerC/RegisterName";
import RegisterPwd from "../../../screen/register/registerC/RegisterPwd";
import Drawer from "./Drawer";
import { Notifications } from "expo";
import DropdownAlert from "react-native-dropdownalert";

const MAIN_INFO_COLOR = "rgba(52, 73, 94,1.0)";
const data = {
  backgroundColor: MAIN_INFO_COLOR,
  type: "info",
  title: "Nouveau transfert",
  amount : 2000,
  sender : 'Toavina',
  message:
    "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online."
};

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
      console.log('====================================');
      console.log('ty le notificatoin', notification);
      console.log('====================================');
    const title = data.title;
    const amount = data.amount;
    const sender = data.sender;
    let debutMessage = "Vous venez d'envoyer' ";
    let finMessage = " Ar à ";
    const message = debutMessage + amount + finMessage + sender;
    this.dropdown.alertWithType(data.type, title, message);
  }
  dismissAlert = () => {
    this.dropdown.onClose();
  };

  onClose(data) {
    console.log(data);
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
        headerTitle: "Envoyer à " + navigation.state.params.user,
        headerStyle: headStyle.headerBackground,
        headerTintColor: { color: "#fff" },
        headerTitleStyle: { color: "#fff" },
        headerLeft: (
          <View
            style={{
              alignContent: "center",
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="navigate-before" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )
      })
    },
    Review: {
      screen: Review,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Vérifier et envoyer ",
        headerStyle: { backgroundColor: "#193441" },
        headerTintColor: { color: "#fff" },
        headerTitleStyle: { color: "#fff" },
        headerLeft: (
          <View
            style={{
              alignContent: "center",
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="navigate-before" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )
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
      screen: RegisterPin
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
    }
  },
  { initialRouteName: "Handler" }
);
