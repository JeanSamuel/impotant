//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
class HomeServices extends Component {
  static createNotif() {}

  static refactAmount(amount) {
    amount = amount.replace(/ /g, "");
    if (amount < 0) {
      amount = -1 * amount;
    }
    amount = String(amount).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
    return amount;
  }
}
export default HomeServices;
