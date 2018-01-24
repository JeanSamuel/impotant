import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

import colors from "../../config/constants/colors";

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

const Email = ({ containerStyle, onPressEmail, name, email, index }) => (
  <TouchableOpacity onPress={() => onPressEmail(email)}>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconRow}>
        {+index === 0 && (
          <Icon
            name="email"
            underlayColor="transparent"
            iconStyle={styles.emailIcon}
            onPress={() => onPressEmail()}
          />
        )}
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{name}</Text>
        </View>
        <View style={styles.emailNameColumn}>
          {name.trim().length !== 0 && (
            <Text style={styles.emailNameText}>{email}</Text>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Email.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

Email.defaultProps = {
  containerStyle: {},
  name: null
};

export default Email;
