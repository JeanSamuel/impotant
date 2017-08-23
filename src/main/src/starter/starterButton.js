//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";
import { Icon } from "react-native-elements";
import Login from "../login/login";
import { DoubleLineButton } from "../../components/button";
import { Modal } from "../../components/modal";
import services from "../services/services";

// create a component
const uri = services.loginUrl();
class StarterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      modalData: null
    };
  }

  createNewUser() {
    this.props.navigation.navigate("NewUser");
  }

  removeModal() {
    this.setState({ modal: null });
  }

  createModal() {
    this.setState({
      modal: (
        <Modal
          visibility={true}
          remove={this.removeModal.bind(this)}
          data={
            <Login
              navigation={this.props.navigation}
              modal={this.removeModal.bind(this)}
            />
          }
        />
      )
    });
  }

  render() {
    return (
      <View>
        <View>
          {this.state.modal}
        </View>
        <DoubleLineButton
          action={() => this.createNewUser()}
          firstLine="Je suis NOUVEAU"
          secondLine="Je n'ai pas encore de compte"
          color="rgba(22, 160, 133,1.0)"
          navigation={this.props.navigation}
        />
        <DoubleLineButton
          action={() => this.createModal(uri)}
          firstLine="J'ai déjà un compte"
          secondLine="Je me connecte sur Ariary.net"
          color="rgba(41, 128, 185,1.0)"
        />
      </View>
    );
  }
}

//make this component available to the app
export default StarterButton;
