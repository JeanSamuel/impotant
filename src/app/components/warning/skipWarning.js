//import liraries
import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { styleBase } from "../../assets/styles";
import { Icon, Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

// create a component
class SkipWarning extends Component {
  goHome() {
    this.props.action();
    this.props.navigation.navigate("DrawerExample", { user_id: "toavina" });
  }

  annuler() {
    this.props.action();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.title, styleBase.centered]}>
          <Icon name="warning" size={30} color="rgba(241, 196, 15,1.0)" />
          <Text style={styles.titleText}>{"  "}Il ne faut pas oublier</Text>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.bodyTitle}>
            Tant que votre compte n'est pas configuré :
          </Text>
          <View style={styles.listWarning}>
            <View style={{ flexDirection: "row" }}>
              <Text>{"\u2022"}</Text>
              <Text style={styles.listText}>
                Le solde sera limité à 5000 ar
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{"\u2022"}</Text>
              <Text style={styles.listText}>
                Vous perdrez votre compte si vous perdez ce mobile ou les
                données de l'application.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            buttonStyle={{ width: 200 }}
            title="Je continue"
            iconRight
            icon={{ name: "arrow-forward", color: "#FFF" }}
            backgroundColor="rgba(52, 73, 94,1.0)"
            onPress={() => this.goHome()}
          />
          <Button
            large
            title="Annuler"
            backgroundColor="transparent"
            color="rgba(127, 140, 141,1.0)"
            onPress={() => this.annuler()}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "1%"
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    width: "100%",
    backgroundColor: "rgba(149, 165, 166,1.0)"
  },
  titleText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold"
  },
  listText: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 14
  },
  body: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  bodyTitle: {
    fontSize: 18
  },
  listWarning: {
    marginLeft: 10
  }
});

//make this component available to the app
export default SkipWarning;
