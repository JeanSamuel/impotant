import React, { Component } from "react";
import PropTypes from "prop-types";
import contactData from "./contact.json";
import { StackNavigator } from "react-navigation";
import Profile from "./Profile";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Profile {...contactData} navigation={this.props.navigation} />;
  }
}

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
