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
      case 'ROLE_CLIENT_TEMP':
        return "à confirmer";
        break;
      case 'ROLE_CLIENT_SIMPLE':
        return "à confirmer";
        break;
      case 'ROLE_CLIENT_VALIDE':
        return "confirmé";
        break;
    }
  }
  async componentWillMount() {
    let user_id = this.props.navigation.state.params.user_id;
    let role = null;
    let datasUSER = {};
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
          avatar:
            "https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232442-stock-illustration-male-default-placeholder-avatar-profile.jpg"
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
        avatarBackground:
          "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
        tels: datasUSER.phony,
        emails: datasUSER.maily,
        birthday: datasUSER.birthday,
        role:this.getRoles(data.roles[0]),
        solde:Utils.formatNumber(1500000)
      }
      this.setState({ info: info,datas:datasUSER });
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
    EditInfo:{
      screen:EditInfo
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
