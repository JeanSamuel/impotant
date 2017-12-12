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
  WebView,
  Dimensions
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

const background = require("../../../assets/images/back3.jpg");
const mark = require("../../../assets/images/icons/logo-pro.png");

const { width } = Dimensions.get("window");
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
    return (
      <View>
        <Image
          source={background}
          style={[styles.background, styleBase.centered]}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={[{ flex: 1 }, styleBase.centered]}>
            <ScrollView />
            <Logo />
            <ScrollView />
            <DoubleLineButton
              action={() => this.props.navigation.navigate("Register")}
              firstLine="Je m'inscris"
              secondLine="Je n'ai pas encore de compte"
              color="rgba(22, 160, 133,1.0)"
              navigation={this.props.navigation}
            />
            <DoubleLineButton
              action={() => this.props.navigation.navigate("Login")}
              firstLine="Je me connecte"
              secondLine="Je possède déjà un compte"
              color="rgba(41, 128, 185,1.0)"
            />
            <View style={{ height: 20 }} />
          </ScrollView>
        </Image>
      </View>
    );
  }
}
