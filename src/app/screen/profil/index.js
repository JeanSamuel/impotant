import React, { Component } from "react";
import PropTypes from "prop-types";
import { StackNavigator } from "react-navigation";
import Profile from "./Profile";
import Validation from "../validate";
import Services from "../../services/utils/services";
import { UserService, AchatService } from "../../services/index";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: {},
      info: {}
    };
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
            "http://static8.viadeo-static.com/5V_x2FwPfjJBpZeHsEDrKKVSD8E=/300x300/member/0021ca47s0p4qnjg?ts=1476649888000"
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
        birthday: datasUSER.birthday
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
