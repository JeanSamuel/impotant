import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Dimensions
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
const deviceWidth = Dimensions.get("window").width;

const DatePick = ({ date
}) => (
  <View style={styles.formular}>
    <View style={styles.formular}>
    <FormLabel containerStyle={styles.inputLabel}>
      Date de naissance : *
    </FormLabel>
    <DatePicker
      date={this.state.date}
      mode="date"
      style={{ width: deviceWidth - 20 }}
      placeholder="Selectionner une date"
      format="DD-MM-YYYY"
      confirmBtnText="Confirmer"
      cancelBtnText="Annuler"
      maxDate="31-12-2018"
      minDate="01-01-1940"
      customStyles={{
        dateIcon: {
          position: "absolute",
          right: 1,
          top: 4,
          marginLeft: 5
        },
        dateInput: styles.input
      }}
      onDateChange={date}
    />
    <FormValidationMessage />
  </View>
  </View>
);

DatePick.propTypes = {
};

DatePick.defaultProps = {
    date = ""
};

export default DatePick;

const styles = StyleSheet.create({
  formular: { marginVertical: 0 },
  input: {
    backgroundColor: "rgba(189, 195, 199,0.1)",
    borderColor: "rgba(189, 195, 199,0.5)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginLeft: 20,
    marginVertical: 0,
    height: 40
  },
  inputLabel: {},
  buttonLeft: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
