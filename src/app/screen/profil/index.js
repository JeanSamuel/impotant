import React, { Component } from "react";
import PropTypes from "prop-types";
import { StackNavigator } from "react-navigation";
import Profile from "./Profile";
import Validation from "../validate";
import EditInfo from "./EditInfo";
import Services from "../../services/utils/services";
import { UserService, AchatService } from "../../services/index";
import Utils from "../../services/utils/Utils";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: {},
      info: {}
    };
  }
  getRoles(role) {
    switch (role) {
      case "ROLE_CLIENT_TEMP":
        return "compte temporaire";
        break;
      case "ROLE_CLIENT_SIMPLE":
        return "à confirmé";
        break;
      case "ROLE_CLIENT_VALIDE":
        return "confirmé";
        break;
    }
  }
  async componentWillMount() {
    let user_id = this.props.navigation.state.params.user_id;
    let role = null;
    let datasUSER = {};
    let imageHolder = "../";
    try {
      let data = await UserService.getUserInfo(user_id, null);
      if (data.roles[0] == "ROLE_CLIENT_TEMP") {
        datasUSER = {
          code: data.code,
          username: data.username,
          name: data.username + " (" + data.code + ")",
          birthday: "Date de naissance...",
          maily: data.mail,
          phony: "Numéro téléphone...",
          solde: data.solde,
          avatar: ""
        };
      } else {
        datasUSER = {
          code: data.code,
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
        address: {
          city: "Antananarivo",
          country: "Madagascar"
        },
        avatar: datasUSER.avatar,
        avatarBackground: "../../assets/images/profil-background.png",
        tels: datasUSER.phony,
        emails: datasUSER.maily,
        birthday: datasUSER.birthday,
        role: this.getRoles(data.roles[0]),
        solde: Utils.formatNumber(data.solde)
      };
      this.setState({ info: info, datas: datasUSER });
    } catch (error) {
      console.log("Error", error);
    }
  }
  render() {
    return <Profile {...this.state.info} navigation={this.props.navigation} />;
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
