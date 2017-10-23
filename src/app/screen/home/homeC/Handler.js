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
import { MinimLoading } from "../../../components/loader";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notLoggedIn: null,
      modalVisible: false
    };
  }

  componentDidMount() {
    services = new Services();
    services.getData("user_id").then(response => {
      if (response !== null) {
        dataParsed = JSON.parse(response)
        this.setState({ notLoggedIn: false, isLoading: false });
        this.props.navigation.navigate("Drawer", dataParsed);
      } else {
        this.setState({ notLoggedIn: true, isLoading: false });
        this.props.navigation.navigate("Landing");
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
            <MinimLoading
              loadingText="En attente de chargement"
              visible={this.state.isLoading}
              onRequestClose={() => {
                console.log("Fermer");
              }}
            />
          </View>
        ) : null}
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
