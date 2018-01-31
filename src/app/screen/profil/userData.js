import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

import colors from "../../config/constants/colors";

class UserData extends Component {
  constructor(props) {
    super();
    this.state = {
      isHidden: true
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleHidden.bind(this)}>
        <View style={[styles.container]}>
          <View style={styles.iconRow}>
            <Icon
              name="person"
              underlayColor="transparent"
              iconStyle={styles.emailIcon}
              onPress={this.toggleHidden.bind(this)}
            />
          </View>
          <View style={styles.emailRow}>
            <View style={styles.emailColumn}>
              <Text style={styles.emailText}>{this.props.name}</Text>
            </View>
            <View style={styles.emailNameColumn}>
              <Text style={styles.emailNameText}>{this.props.birthday}</Text>
            </View>
            {/* {!this.state.isHidden && <Child />} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const Child = () => (
  <View style={styles.emailNameColumn}>
    <Text style={styles.emailNameText}>CIN - 123 432 234 111</Text>
  </View>
);

UserData.defaultProps = {
  containerStyle: {},
  name: null
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  emailColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  emailIcon: {
    color: colors.$secondaryColor,
    fontSize: 30
  },
  emailNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  emailNameText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "200"
  },
  emailRow: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center"
  },
  emailText: {
    fontSize: 16
  },
  iconRow: {
    flex: 2,
    justifyContent: "center"
  }
});
