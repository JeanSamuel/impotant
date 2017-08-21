//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import styleBase from "../../styles/Styles";
import AppLink from "react-native-app-link";

// create a component
class About extends Component {
  static navigationOptions = navigation => {
    return {
      title: "AriaryPro",
      drawerLabel: "About",
      drawerIcon: ({ tintColor }) => <Icon name="info" size={25} />,
      titleStyle: styleBase.headerTitle,
      headerRight: <Icon name="help" color="#ecf0f1" size={30} />
    };
  };

  componentDidMount() {
    AppLink.openInStore("id529379082", "me.lyft.android")
      .then(() => {
        console.log("vita");
      })
      .catch(err => {
        // handle error
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
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
    backgroundColor: "#FFF"
  }
});

//make this component available to the app
export default About;
