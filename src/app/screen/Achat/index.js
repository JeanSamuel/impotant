//import liraries
import React, {Component} from "react";
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from "react-native";
import {Header} from "react-native-elements";
import {baseStyle, configStyles} from "../../assets/styles";
import styles from "./Styles";
import {UserService, Utils} from "../../services";
import ViaMobileMoney from "./Mobile";
import Mybutton from "../../components/Buttons/SamButton";

// create a component
class MainAchat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible: false,
      result: ""
    };
  }
  async loadConfig() {
    this.setState({loading: true});
    try {
      await UserService.loadConfig(this);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
    }
  }s
  handleActionLeft() {
    this.props.navigation.navigate("DrawerOpen");
  }
  renderCenterComponent() {
    return (
      <View style={baseStyle.headerBodyView}>
        <Text style={baseStyle.textHeader}>Achat</Text>
      </View>
    );
  }
  renderRightComponent() {
    return (
      <View style={baseStyle.headerRightView}>
        <Mybutton
          iconName="settings"
          type="material-icon"
          onPress={() => this.loadConfig()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
        <Mybutton
          iconName="share-alt"
          type="font-awesome"
          size={35}
          onPress={() => Utils.ShareApp()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
      </View>
    );s
  }
  renderLeftComponent() {
    return (
      <Mybutton
        iconName="ios-menu"
        type="ionicon"
        onPress={() => this.handleActionLeft()}
        styleBtn={[baseStyle.btnLeftHeader]}
      />
    );
  }
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff", flex: 1 }]}>
        <StatusBar hidden={true} />
        <Header
          style={baseStyle.header}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ViaMobileMoney navigation={this.props.navigation} activity={this} />
        {this.state.loading && (
          <View style={configStyles.indicator}>
            <ActivityIndicator size="large" animating={true} color="#666" />
          </View>
        )}
      </View>
    );
  }
}

//make this component available to the app
const modal = StyleSheet.create({
  annuler: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#FFC107",
    paddingHorizontal: 20
  },
  header: {
    backgroundColor: "#009688",
    padding: 10,
    width: "90%"
  },
  content: {
    flex: 1,
    backgroundColor: "#eee"
  },
  footer: {
    backgroundColor: "#009688",
    padding: 20
  },
  contenuemodal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});
export default MainAchat;
