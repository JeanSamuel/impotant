//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { RowValue } from "../../components/row";
import { UserInfo, Security, Confidentiality } from "./";
import Services from "../services/services";
import { Icon } from "react-native-elements";

// create a component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      user_id: this.props.navigation.state.params.user_id
    };
    this.manageData();
  }

  static navigationOptions = {
    headerRight: <Icon name="help" color="#ecf0f1" size={25} />
  };

  goBack() {
    this.props.navigation.navigate("Settings");
  }

  componentWillMount() {
    let services = new Services();
    services
      .getData("newAtSettings")
      .then(response => {
        if (response != null) {
          let navigation = this.props.navigation;
          navigation.navigate("Assistant", { return: "Fifth" });
        }
      })
      .catch(error => {
        console.log("ol efa membre hatry ny ela");
      });
  }

  async manageData() {
    let services = new Services();
    services
      .getData("user_id")
      .then(response => {
        this.createData(response);
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  createData(response) {
    this.setState({
      data: (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container}>
            <RowValue
              iconName="touch-app"
              noNext={true}
              menu="Lancer l'assistance de Configuration"
              value="Aide rapide à la configuration de compte"
              action={() => this.navigate("Assistant")}
            />
            <UserInfo user_id={this.state.user_id} />
            <Security />
            <Confidentiality />
          </ScrollView>
        </View>
      )
    });
  }

  render() {
    if (this.state.data === null) {
      return (
        <View style={styles.firstContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return this.state.data;
    }
  }
}

// define your styles
const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(236, 240, 241,1.0)"
  },
  container: {
    backgroundColor: "rgba(236, 240, 241,1.0)",
    paddingBottom: 20
  }
});

export default Settings;
