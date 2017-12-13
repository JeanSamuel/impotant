import React, { Component } from "react";
import {
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  Alert,
  Text
} from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
const deviceWidth = Dimensions.get("window").width;
import DatePicker from "react-native-datepicker";

import { loginCss } from "../../../../../../assets/styles/index";

import styles from "./styles";

class Identite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      nom: "",
      prenom: "",
      date: "",
      loading: false,
      disabled: false
    };
  }
  updateIdentity() {
    let identity = null;
    if (!this._isEmptyField()) {
      identity = {
        pseudo: this.state.pseudo,
        nom: this.state.nom,
        prenom: this.state.prenom,
        datenaissance: this.state.date
      };
    } else {
      Alert.alert("Erreur", "Tous les champs sont requis");
    }
    this.props.updateIdentityState(identity);
  }
  componentWillMount() {
    let data = this.props.activity.props.navigation.state.params.data;
    this.setState({ disabled: true });
    if (data != null) {
      this.setState({ pseudo: data, disabled: false });
    }
  }

  _isEmptyField() {
    return (
      this.state.pseudo == null ||
      this.state.nom == null ||
      this.state.prenom == null ||
      this.state.date == null ||
      this.state.pseudo == "" ||
      this.state.nom == "" ||
      this.state.prenom == "" ||
      this.state.date == ""
    );
  }

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 40
          }}
        >
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Pseudo"
              style={[loginCss.input, { backgroundColor: "transparent" }]}
              editable={this.state.disabled}
              value={this.state.pseudo}
              onChangeText={pseudo => this.setState({ pseudo })}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Nom"
              onChangeText={nom => this.setState({ nom })}
              style={[loginCss.input, { backgroundColor: "transparent" }]}
            />
          </View>
          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="Prénom"
              onChangeText={prenom => this.setState({ prenom })}
              style={[loginCss.input, { backgroundColor: "transparent" }]}
            />
          </View>
          <View
            style={[
              loginCss.inputWrap,
              { alignItems: "center", alignSelf: "center" }
            ]}
          >
            <DatePicker
              style={{ width: deviceWidth - 22 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36,
                  alignSelf: "center"
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
                this.updateIdentity();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
Identite.propTypes = {
  updateIdentityState: PropTypes.func,
  activity: PropTypes.object
};
export default Identite;
