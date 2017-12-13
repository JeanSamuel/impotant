import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from "react-native";
import PropTypes from "prop-types";
import { configStyles, loginCss } from "../../../../assets/styles";
import DatePicker from "react-native-datepicker";

import { Utils, UserService } from "../../../../services";

// create a component
class EditBirthday extends Component {
  constructor() {
    super();
    this.state = {
      oldbirthday: "",
      birthday: "",
      password: "",
      username: "",
      loading: false,
      userInfo: "",
      account_id: "",
      modalVisible: false
    };
  }
  async _validateChangeMail() {
    this.setState({ loading: true });
    this._isEmptyPass();
    try {
      let dataUser = {
        account_id: this.state.account_id,
        username: this.state.username,
        email: this.state.userInfo.mail,
        phone: this.state.userInfo.phone,
        name: this.state.userInfo.nom,
        firstname: this.state.userInfo.prenom,
        birthday: this.state.birthday
      };
      const updated = await UserService.updateUserInfo(dataUser, this);
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert("Erreur de modification", error.toString());
    }
  }
  async componentWillMount() {
    try {
      let account_id = this.props.navigation.state.params.account_id;
      let pseudo = this.props.navigation.state.params.pseudo;
      const userinfo = await UserService.getUserInfo(account_id, this);
      this.setState({
        oldbirthday: userinfo.birthday,
        account_id: account_id,
        userInfo: userinfo,
        username: pseudo
      });
    } catch (error) {
      console.log(error);
    }
  }
  _isEmptyField() {
    if (this.state.birthday == "" || this.state.birthday == null) {
      throw "";
    }
  }
  _isEmptyPass() {
    if (this.state.password == "" || this.state.password == null) {
      throw "Veuillez entrer votre mot de passe pour confirmer le changement";
    }
  }

  _renderPasswordView() {
    if (!this._isEmptyField()) {
      this.setState({ modalVisible: true });
    } else {
      Alert.alert(
        "Info",
        "Il semble qu'aucune information n'est saisie. Voulez-vous annuler le changement?",
        [
          { text: "Editer" },
          { text: "Oui", onPress: () => this.props.navigation.goBack() }
        ]
      );
    }
  }

  async closeModal() {
    try {
      await UserService.verifyUser(
        this.state.username,
        this.state.password,
        this
      );
      await this._validateChangeMail();
      this.setState({ modalVisible: false });
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  render() {
    return (
      <View style={configStyles.container}>
        <View style={configStyles.content}>
          <View style={configStyles.header}>
            <Text style={configStyles.textHeader}>Editer votre e-mail</Text>
          </View>
          <View style={{ padding: 15 }}>
            <TextInput
              value={this.state.oldbirthday}
              style={configStyles.input}
              editable={false}
            />
          </View>
          <View style={{ padding: 15 }}>
            <TextInput
              placeholder="Nouveau date de naissance"
              onChangeText={birthday => this.setState({ birthday })}
              style={configStyles.input}
              onEndEditing={() => {
                this._renderPasswordView();
              }}
            />
            <DatePicker
              style={{ width: deviceWidth - 22 }}
              date={this.state.date}
              mode="date"
              placeholder="Selectionner une date"
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
                this.setState({ birthday: date });
                this._renderPasswordView();
              }}
            />
          </View>
          <View style={configStyles.footer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={configStyles.touch}
            >
              <Text style={configStyles.touchtext}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this._renderPasswordView();
              }}
              style={configStyles.touch}
            >
              <Text style={configStyles.touchtext}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: false })}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)"
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 10
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "#eee",
                  paddingVertical: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                }}
              >
                <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>
                  Entrer votre mot de passe pour confirmer le changement de
                  votre date de naissance
                </Text>
              </View>
              <View style={[{ padding: 10, height: 60 }]}>
                <TextInput
                  placeholder="Mot de passe de confirmation"
                  autoFocus={true}
                  secureTextEntry
                  style={[
                    loginCss.input,
                    { textAlign: "center", borderRadius: 10, height: 50 }
                  ]}
                  onChangeText={password => {
                    this.setState({ password: password });
                  }}
                  onEndEditing={() => {
                    this.closeModal();
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {this.state.loading && (
            <View style={configStyles.indicator}>
              <ActivityIndicator size="large" animating={true} color="#666" />
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

//make this component available to the app
export default EditBirthday;
