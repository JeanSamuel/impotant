//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity
} from "react-native";
import { Notifications } from "expo";
import Landing from "./Landing";
import { Pin } from "../../login/loginC";
import Intro from "../../../components/WelcomeIntro/Welcome";
import Services from "../../../services/services";
import DropdownAlert from "react-native-dropdownalert";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newUser: null,
      modalVisible: false
    };
  }

  componentDidMount() {
    services = new Services();
    services.getData("user_id").then(user_id => {
      if (user_id !== null) {
        this.setState({ newUser: false, isLoading: false });
      } else {
        this.setState({ newUser: true, isLoading: false, modalVisible: true });
      }
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onDoneBtnClick = () => {
    console.log("done");
    this.setModalVisible(false);
  };

  onSkipBtnHandle = () => {
    console.log("skip");
    this.setModalVisible(false);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            />
          </View>
        ) : this.state.newUser ? (
          <Landing navigation={this.props.navigation} />
        ) : (
          <Pin navigation={this.props.navigation} />
        )}
        <Modal
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <Intro
            onSkipBtnHandle={this.onSkipBtnHandle}
            onDoneBtnClick={this.onDoneBtnClick}
          />
        </Modal>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default Handler;
