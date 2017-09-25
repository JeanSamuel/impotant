import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  WebView
} from "react-native";
import { Container } from "../../../components/ContainerC";
import { Logo } from "../../../components/Logo";
import { RoundedButton } from "../../../components/Buttons";
import { Icon } from "react-native-elements";
import { Login } from "../../login/loginC";

import styles from "../../starter/starterM/starterStyles";
import styleBase from "../../../styles/styles";
import StarterButton from "../../starter/starterM/starterButton";
import moment from "moment";

const background = require("../../../images/back3.jpg");
const mark = require("../../../images/icons/logo-pro.png");

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  ChangeModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  getRefs(modal) {
    this.refs.modal.visible(false);
  }

  render() {
    console.log(this.props.navigation);
    return (
      <View>
        <Image
          source={background}
          style={[styles.background, styleBase.centered]}
          resizeMode="cover"
        >
          <ScrollView
            contentContainerStyle={[{ flexGrow: 1 }, styleBase.centered]}
          >
            <Logo />
            <RoundedButton
              text="Je n'ai pas encore de compte"
              backgroundColor="#1e88ff"
              buttonStyle={{
                paddingHorizontal: 20,
                height: 45,
                marginVertical: 15
              }}
              style={{
                backgroundColor: "#1e88ff",
                paddingHorizontal: 20,
                marginVertical: 10,
                height: 45
              }}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
            <RoundedButton
              text="Je possède déjà un compte"
              backgroundColor="#1e9228"
              buttonStyle={{ paddingHorizontal: 20, height: 45 }}
              style={{
                backgroundColor: "#1e9228",
                paddingHorizontal: 20,
                marginVertical: 10,
                height: 45
              }}
              onPress={() => {
                this.ChangeModalVisibility();
              }}
            />
          </ScrollView>
        </Image>
        <Modal
          animationType={"slide"}
          ref="modal"
          visible={this.state.modalVisible}
          onRequestClose={() => this.ChangeModalVisibility()}
        >
          <View style={{ flex: 1 }}>
            <Login
              navigation={this.props.navigation}
              modal={this.ChangeModalVisibility.bind(this)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
