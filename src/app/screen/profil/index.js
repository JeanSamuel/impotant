import React from "react";
import PropTypes from "prop-types";
import contactData from "./contact.json";
import { StackNavigator } from "react-navigation";
import Profile from "./Profile";

const ProfileScreen = () => <Profile {...contactData} />;

const StackSettings = new StackNavigator(
  {
    Profil: {
      screen: ProfileScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: () => null
    })
  }
);

export default StackSettings;
