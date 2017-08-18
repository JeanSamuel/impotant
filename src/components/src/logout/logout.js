// 1.0.3
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Popup from "react-native-popup";
import { Icon } from "react-native-elements";
import Services from "../services/services";
import styleBase from "../../styles/Styles";
import { StackNavigator } from "react-navigation";
import DrawerButton from "../navigation/drawerButton";
import NotifServices from "../services/notificationServices";
const { width, height } = Dimensions.get("window");
// 0.6.1

class Logout extends Component {
  static navigationOptions = {
    title: "Logout",
    drawerIcon: ({ tintColor }) =>
      <Icon name="logout" size={25} type={"material-community"} />
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
    var services = new Services();
    var notif = new NotifServices();
    services.logout().then(() => {
      notif.stopNotification();
      this.props.navigation.navigate("Loader");
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
              <ScrollView contentContainerStyle={[styleBase.centered]}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    Déconnecter votre compte de ce mobile
                  </Text>
                </View>
                <View style={[styles.content]}>
                  <Text style={styles.contentText}>
                    Une perte pourrait survenir si votre compte n'est pas encore
                    complet
                  </Text>

                  <Text style={styles.contentText}>
                    Voulez vous vraiment vous déconnecter?
                  </Text>
                </View>
              </ScrollView>
              <View style={[{ flexDirection: "row" }, styleBase.centered]}>
                <TouchableOpacity
                  onPress={() => this.cancel()}
                  style={[styleBase.centered, styles.button]}
                >
                  <Text style={[styles.buttonText, styles.no]}>Non</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.disconnect.bind(this)}
                  style={[styleBase.centered, styles.button]}
                >
                  <Text style={[styles.buttonText, styles.yes]}>Oui</Text>
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
  title: {},
  titleText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    flex: 1
  },
  contentText: {
    textAlign: "left",
    paddingVertical: 2
  },
  button: {
    width: width / 2,
    height: 50,
    flex: 1
  },
  buttonText: {
    fontSize: 20
  },
  yes: {
    textAlign: "right"
  },
  no: {
    textAlign: "left"
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
