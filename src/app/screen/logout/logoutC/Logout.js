//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Modal,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import { styleBase } from "../../../styles";
import regStyles from "../../../styles/stylesC/registerStyles";
import Services from "../../../services/services";
import NotificationServices from "../../../services/notificationServices";
import LogoutText from "../logoutM/logoutText";
const { width, height } = Dimensions.get("window");

// create a component
class Logout extends Component {
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
    let notif = new NotificationServices();

    notif.stopNotification(user_id);
    services
      .logout()
      .then(() => {
        this.props.navigation.navigate("Landing");
      })
      .catch(error => {
        console.log("====================================");
        console.log("erruer ato disconnect", erreur);
        console.log("====================================");
      });
  }

  cancel() {
    this.ChangeModalVisibility();
    this.props.navigation.navigate("Drawer", {
      user_id: this.props.navigation.state.params.user_id
    });
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
            <View style={styles.webViewContainer}>
              <View style={[styles.top]}>
                <Text style={styles.topText}>Déconnexion</Text>
              </View>
              <Text style={[styles.text, regStyles.textWidth]}>
                Voullez vous vraimenent vous déconnecter de ce compte?
              </Text>
              <View style={[styles.bottom, { justifyContent: "space-around" }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.cancel();
                  }}
                >
                  <Text style={styles.bottomText}>Annuler</Text>
                </TouchableOpacity>
                <View style={styles.sep} />
                <TouchableOpacity
                  onPress={() => {
                    this.disconnect();
                  }}
                >
                  <Text style={styles.bottomText}>Oui</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "rgba(52, 73, 94,0.9)"
  },
  webViewContainer: {
    width: width - 50,
    height: 200,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingTop: 10,
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#000"
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: width - 50,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#e2e2e2",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    padding: 10
  },
  top: {
    height: 30,
    borderBottomWidth: 1,
    alignSelf: "center",
    width: width - 50,
    justifyContent: "center",
    // alignItems: "center",
    borderBottomColor: "#e2e2e2"
  },
  topText: {
    marginLeft: 20,
    fontSize: 20
  },
  bottomText: {
    fontSize: 18,
    color: "#409bff"
  },
  sep: {
    height: 50,
    backgroundColor: "#e2e2e2"
  }
});

//make this component available to the app
export default Logout;
