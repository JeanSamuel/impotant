// 1.0.3
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Modal,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";
import Services from "../services/services";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";
import NotifServices from "../services/notificationServices";
import LogoutText from "./logoutText";
const { width, height } = Dimensions.get("window");
// 0.6.1

class Logout extends Component {
  static navigationOptions = {
    title: "Déconnexion",
    drawerIcon: ({ tintColor }) => (
      <Icon name="logout" size={25} type={"material-community"} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true
    };
  }

  ChangeModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  disconnect() {
    this.ChangeModalVisibility();
    let user_id = this.props.navigation.state.params.user_id;
    let services = new Services();
    let notif = new NotifServices();

    notif.stopNotification(user_id);
    services
      .logout()
      .then(() => {
        this.props.navigation.navigate("Loader");
      })
      .catch(error => {
        console.log("====================================");
        console.log("erruer ato disconnect", erreur);
        console.log("====================================");
      });
  }

  cancel() {
    this.ChangeModalVisibility();
    this.props.navigation.navigate("First");
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          ref="modal"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.cancel()}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.webViewContainer, styleBase.centered]}>
              <LogoutText
                disconnect={() => this.disconnect()}
                cancel={() => this.cancel()}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,0.5)"
  },
  webViewContainer: {
    width: width - 50,
    height: 180,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#FFF"
  }
});

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackLogout = new StackNavigator(
  {
    Logout: {
      screen: Logout,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);

export default stackLogout;
