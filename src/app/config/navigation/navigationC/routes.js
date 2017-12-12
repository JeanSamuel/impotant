import React, { Component } from "react";
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
  MainValidation,
  Validation,
  ValidationCompte,
  MainConfig,
  EditPassword,
  EditBirthday,
  EditMail,
  EditName,
  EditPhone,
  EditPseudo,
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
import StartStack from "./StartStack";

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
    console.log("====================================");
    console.log(notification);
    console.log("====================================");
    let data = notification.data;
    if (data.type == "reception") {
      let title = "Nouveau transfert";
      let amount = data.amount;
      let sender = data.from;
      let debutMessage = "Vous avez reçu ";
      let finMessage = "Ar de la part de ";
      const message = debutMessage + amount + finMessage + sender;
      this.dropdown.alertWithType("info", title, message);
    }
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
        headerTitle: "Envoyer à " + navigation.state.params.receiver_name,
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
            <TouchableOpacity
              onPress={() => {
                navigation.state.params.onGoBack();
                navigation.goBack();
              }}
            >
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
    Validation: {
      screen: MainValidation,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    ValidationCompte: {
      screen: ValidationCompte,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    ValidationInscription: {
      screen: Validation,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Config: {
      screen: MainConfig,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    EditPassword: {
      screen: EditPassword,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    EditPhone: {
      screen: EditPhone,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    EditPseudo: {
      screen: EditPseudo,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    EditMail: {
      screen: EditMail,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    EditName: {
      screen: EditName,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    StartAriary: {
      screen: StartStack,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    }
  },
  { initialRouteName: "Handler" }
);
