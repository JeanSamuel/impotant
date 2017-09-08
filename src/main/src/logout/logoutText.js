//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import styleBase from "../../styles/Styles";
const { width, height } = Dimensions.get("window");

// create a component
class LogoutText extends Component {
  disconnect() {
    this.props.disconnect();
  }

  cancel() {
    this.props.cancel();
  }

  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={[styleBase.centered]}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Déconnexion</Text>
          </View>
          <View style={[styles.content]}>
            <Text style={styles.contentText}>
              Voulez vous vraiment vous déconnecter de ce mobile?
            </Text>
          </View>
        </ScrollView>
        <View style={[{ flexDirection: "row" }, styleBase.centered]}>
          <TouchableOpacity
            onPress={() => this.cancel()}
            style={[styleBase.centered, styles.button]}
          >
            <Text style={[styles.buttonText, styles.no]}>Non</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.disconnect.bind(this)}
            style={[styleBase.centered, styles.button]}
          >
            <Text style={[styles.buttonText, styles.yes]}>Oui</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  title: {},
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentText: {
    textAlign: "left",
    paddingVertical: 2
  },
  button: {
    width: width / 2,
    height: 50,
    flex: 1
  },
  buttonText: {
    fontSize: 20
  },
  yes: {
    textAlign: "right"
  },
  no: {
    textAlign: "left"
  }
});

//make this component available to the app
export default LogoutText;
