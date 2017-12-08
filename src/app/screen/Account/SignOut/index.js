//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { AuthentificationService } from "../../../services";
import configStyles from "../../../styles";

// create a component
class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToken: true,
      loading: false
    };
  }
  async _logOut() {
    this.setState({ loading: true });
    try {
      let status = 0;
      await AuthentificationService._logout(status);
      this.props.navigation.navigate("Loader");
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    } finally {
      this.setState({ loading: false });
    }
  }
  Cancel() {
    this.props.navigation.navigate("Achat");
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            width: "90%",
            backgroundColor: "#eee"
          }}
        >
          <View style={{ padding: 15, backgroundColor: "green" }}>
            <Text
              style={{
                textAlign: "center",
                textAlign: "center",
                fontSize: 25,
                color: "#fff"
              }}
            >
              Se déconnecter
            </Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ textAlign: "center" }}>
              Vous allez être déconnecté,Voulez-vous continuer?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              alignContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.Cancel.bind(this)}
              style={{
                width: "49%",
                backgroundColor: "#fff",
                marginRight: "1%"
              }}
            >
              <Text style={{ textAlign: "center", padding: 15 }}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._logOut.bind(this)}
              style={{
                width: "49%",
                backgroundColor: "#fff",
                marginLeft: "1%"
              }}
            >
              <Text style={{ textAlign: "center", padding: 15 }}>
                Je confirme
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading && (
          <View
            style={[
              configStyles.indicator,
              { backgroundColor: "rgba(54,34,30,0.7)" }
            ]}
          >
            <ActivityIndicator size="large" animating={true} color="#fff" />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "900",
                fontSize: 20,
                color: "#fff"
              }}
            >
              Déconnexion encours...
            </Text>
          </View>
        )}
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
    backgroundColor: "rgba(54,34,30,0.4)"
  }
});
export default LogOut;
