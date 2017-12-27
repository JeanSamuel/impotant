import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
const deviceWidth = Dimensions.get("window").width;
import { configStyles } from "../../../../../../assets/styles";

import { UserService, InscriptionService } from "../../../../../../services";

// create a component
class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      password: "",
      data: {
        username: "",
        name: "",
        firstname: "",
        birthday: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  }
  componentWillMount() {
    let data = this.props.navigation.state.params.data;
    this.setState({ data: data });
  }
  loadConfig() {
    this.props.navigation.navigate("Profile");
  }
  componentWillUnmount() {
    this.setState({ loading: false });
  }
  async _registerUser() {
    this.setState({ loading: true });
    try {
      if (this.state.data.role != null) {
        await UserService.updateUserInfo(this.state.data, this);
      } else {
        await InscriptionService._registerUser(this.state.data, this);
        this.props.navigation.navigate('Pin');
      }
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }finally{
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <View style={{ flex:1,backgroundColor: "green" }}>
        
        <View style={{}}>
          <View style={{}}>
            <View style={configStyles.header}>
              <Text style={configStyles.textHeader}>Mes informations</Text>
            </View>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Pseudo</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.username}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Nom</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.name}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Prénom</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.firstname}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Date de naissance</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.birthday}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Email</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.email}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Téléphone</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.phone}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={styles.w1}>
                  <Icon
                    type="material-icon"
                    name="done"
                    size={20}
                    color="green"
                  />
                </View>
                <View style={styles.w2}>
                  <Text>Mot de passe</Text>
                </View>
                <View style={styles.w3}>
                  <Text style={{ color: "#666", textAlign: "right" }}>
                    {this.state.data.password}
                  </Text>
                </View>
              </View>
            </View>
            <View style={configStyles.footer}>
              <TouchableOpacity
                onPress={() => this.loadConfig()}
                style={configStyles.touch}
              >
                <Text style={configStyles.touchtext}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._registerUser()}
                style={configStyles.touch}
              >
                <Text style={configStyles.touchtext}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.loading && (
            <View style={configStyles.indicator}>
              <ActivityIndicator size="large" animating={true} color="#666" />
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  w1: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  w2: {
    width: "40%"
  },
  w3: {
    width: "50%"
  }
});
Validation.propTypes = {
  activity: PropTypes.func
};
//make this component available to the app
export default Validation;
