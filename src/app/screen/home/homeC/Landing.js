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
import { DoubleLineButton } from "../../../components/button";
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
            <DoubleLineButton
              action={() => this.props.navigation.navigate("Register")}
              firstLine="Je suis NOUVEAU"
              secondLine="Je n'ai pas encore de compte"
              color="rgba(22, 160, 133,1.0)"
              navigation={this.props.navigation}
            />
            <DoubleLineButton
              action={() => this.props.navigation.navigate("Login")}
              firstLine="J'ai déjà un compte"
              secondLine="Je me connecte sur Ariary.net"
              color="rgba(41, 128, 185,1.0)"
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
