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
import { Container } from "../components/ContainerC";
import { Logo } from "../components/Logo";
import { RoundedButton } from "../components/Buttons";
import { Icon } from "react-native-elements";
import Login from "./Login";

export default class Home extends React.Component {
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
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <View>
          <Logo />
          <RoundedButton
            text="Je n'ai pas encore de compte"
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
