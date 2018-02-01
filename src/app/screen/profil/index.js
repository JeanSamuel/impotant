import React, { Component } from "react";
import PropTypes from "prop-types";
import { StackNavigator } from "react-navigation";
import Profile from "./Profile";
import Validation from "../validate";
import EditInfo from "./EditInfo";
import Services from "../../services/utils/services";
import { UserService, AchatService } from "../../services/index";
import Utils from "../../services/utils/Utils";
import { View } from "react-native-animatable";
import { MessagePrompt } from "../../components/modal";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: {},
      info: {},
      loading: false
    };
  }
  getRoles(role) {
    switch (role) {
      case "ROLE_CLIENT_TEMP":
        return "compte temporaire";
        break;
      case "ROLE_CLIENT_SIMPLE":
        return "compte simple";
        break;
      case "ROLE_VALIDATION":
        return "En attente de validation";
        break;
      case "ROLE_CLIENT_VALIDE":
        return "compte confirmé";
        break;
    }
  }
  async _onRefresh() {
    let user_id = this.props.navigation.state.params.user_id;
    await UserService.refreshData(user_id, null);
    this.getUserData();
  }
  getUserData() {
    let services = new Services();
    let role = null;
    let datasUSER = {};
    this.setState({ loading: true });
    services
      .getData("userInfo")
      .then(response => {
        if (response != null) {
          let data = JSON.parse(response);
          if (data.roles[0] == "ROLE_CLIENT_TEMP" || data.roles[0] == "ROLE_CLIENT_SIMPLE") {
            datasUSER = {
              code: data.code,
              username: data.username,
              name: data.username + " (" + data.code + ")",
              birthday: "Date de naissance...",
              maily: data.mail,
              phony: "Numéro téléphone...",
              solde: data.solde,
              avatar: "",
              ville: "En attente",
              pays: "En attente",
              adresse: "En attente",
              cin: "En attente"
            };
          } else {
            datasUSER = {
              cin: data.cin,
              code: data.code,
              ville: data.city,
              pays: data.country,
              adresse: data.address,
              username: data.username,
              name: data.nom + " (" + data.code + ")",
              birthday: data.birthday,
              maily: data.mail,
              phony: AchatService._parsePhone(data.phone, "mg"),
              solde: data.solde,
              avatar: data.avatar
            };
          }
          let info = {
            username: datasUSER.username,
            code: datasUSER.code,
            name: datasUSER.name,
            avatar: datasUSER.avatar,
            avatarBackground: "../../assets/images/profil-background.png",
            tels: datasUSER.phony,
            emails: datasUSER.maily,
            birthday: datasUSER.birthday,
            role: this.getRoles(data.roles[0]),
            solde: Utils.formatNumber(data.solde),
            test: data.roles[0],
            pays: (datasUSER.pays === undefined) ? "En attente" : datasUSER.pays,
            ville: (datasUSER.ville === undefined) ? "En attente" : datasUSER.ville,
            adresse: (datasUSER.adresse === undefined) ? "En attente" : datasUSER.adresse,
            cin: (datasUSER.cin === undefined) ? "En attente" : datasUSER.cin
          };
          this.setState({ info: info, datas: datasUSER });
        } else {
          console.log("Error", "null");
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log("Error", error);
      });
  }

  componentWillMount() {
    this.getUserData();
  }
  removeModal() {

  }
  close() {

  }
  render() {
    if (this.state.loading) {
      return <MessagePrompt
        onRequestClose={() => this.removeModal()}
        iconName={"ion-info"}
        loading={this.state.loading}
        text={"Chargement des informations encours,merci de patienter,ce ne sera pas long!!!"}
        title={"Chargement des données"}
        error={null}
        color={"green"}
      />
    } else {
      return <Profile {...this.state.info} navigation={this.props.navigation} refresh={this._onRefresh.bind(this)} />
    }
  }
}

const StackSettings = new StackNavigator(
  {
    Profil: {
      screen: ProfileScreen
    },
    Validation: {
      screen: Validation
    },
    EditInfo: {
      screen: EditInfo
    }
  },
  {
    initialRouteName: "Profil",
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
);

export default StackSettings;
