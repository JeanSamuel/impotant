import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  WebView
} from "react-native";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { RoundedButton } from "../components/Buttons";
import { Icon } from "react-native-elements";
import Login from "./Login";

const uri = "https://gist.github.com/noelboss/3fe13927025b89757f8fb12e9066f2fa";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  ChangeModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  getRefs(modal) {
    this.refs.modal.visible(false);
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <View>
          <Logo />
          <RoundedButton
            text="Je n'ai pas encore de compte"
            style={{
              backgroundColor: "#1e88ff",
              marginVertical: 10,
              height: 45
            }}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          />
          <RoundedButton
            text="Je possède déjà un compte"
            style={{
              backgroundColor: "#1e9228",
              marginVertical: 10,
              height: 45
            }}
            onPress={() => {
              this.ChangeModalVisibility();
            }}
          />
        </View>
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
