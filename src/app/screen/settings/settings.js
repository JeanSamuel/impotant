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
import Services from "../../services/services";
import { Assistant } from "../assistance";
import { styleBase } from "../../styles";
import { StackNavigator } from "react-navigation";
import { DrawerMenu } from "../../components/drawerMenu";
import { Icon } from "react-native-elements";
import { IconBadge } from "../../components/icon";

// create a component
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      user_id: ""
    };
    this.manageData();
  }

  componentWillMount() {
    let services = new Services();
    services
      .getData("newAtSettings")
      .then(response => {
        if (response != null) {
          this.goToAssistant();
        }
      })
      .catch(error => {
        console.log("ol efa membre hatry ny ela");
      });
  }

  goToAssistant() {
    this.props.navigation.navigate("Myassistant", {
      return: "Settings"
    });
  }

  async manageData() {
    let services = new Services();
    services
      .getData("user_id")
      .then(response => {
        if (response != null) {
          this.setState({ user_id: response });
          this.createData(response);
        }
      })
      .catch(error => {
        console.log("error", error);
      });
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
              action={() => this.goToAssistant()}
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
const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const StackSettings = new StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions
    },
    Myassistant: {
      screen: Assistant,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerMenu navigation={navigation} keyboard={Keyboard} />,
      headerRight: <IconBadge navigation={navigation} />,
      title: "Paramètres",
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-settings-outline" size={25} type="ionicon" />
      ),
      titleStyle: styleBase.headerTitle
    })
  }
);
export default StackSettings;
