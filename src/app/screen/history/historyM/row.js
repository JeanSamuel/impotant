//import liraries
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Icon, Badge } from "react-native-elements";
import styles from "./RowStyles";
import { styleBase } from "../../../styles";
import Services from "../../../services/services";

// create a component
class Row extends Component {
  getCurrencyAndAmount(amount, currency, date) {
    let styleNegative = null;
    let hour = date.split(" ")[1];
    if (amount < 0) {
      styleNegative = styles.currencyNegative;
    }
    return (
      <View style={styles.amountContainer}>
        <View style={styles.currencyContainer}>
          <Text style={[styles.amount, styleNegative]}>
            {Services.formatNumberM(amount)}{" "}
            <Text
              style={{
                color: "rgba(44, 62, 80,1.0)",
                textAlign: "right",
                fontSize: 14
              }}
            >
              {currency}
            </Text>
          </Text>
        </View>
        <View style={[styles.currencyContainer]}>
          <Text style={styles.date}>{hour}</Text>
        </View>
      </View>
    );
  }

  // getTypeOfTransaction(amount) {
  //   let type = "Récéption d'argent";
  //   if (amount < 0) {
  //     type = "Envoi d'argent";
  //     if (amount < -1000) type = "Achat";
  //   }
  //   return type;
  // }

  getIcon(amount) {
    let iconName = "directions";
    let iconColor = "rgba(211, 84, 0,1.0)";
    // if (amount < 0) {
    //   iconName = "ion-paper-airplane";
    //   iconColor = "rgba(52, 73, 94,1.0)";
    //   if (amount < -1000) {
    //     iconName = "ion-paper-airplane";
    //     iconColor = "#517fa4";
    //   }
    // }
    return (
      <Icon
        reverse
        name={iconName}
        color={iconColor}
        type={"simple-line-icon"}
        size={20}
      />
    );
  }

  render() {
    let reportFormated = Services.formatNumber(this.props.info.amount);
    let currency = this.getCurrencyAndAmount(
      this.props.info.amount,
      this.props.info.currency,
      this.props.info.date
    );
    // let type = this.getTypeOfTransaction(this.props.info.amount);
    let type = this.props.info.comment;
    let icon = this.getIcon(this.props.info.amount);

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.userContainer}>
            <View style={[styles.iconContainer, styleBase.centered]}>
              {icon}
            </View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.otherUser}>{this.props.info.senderId}</Text>
              <Text style={styles.type}>{type}</Text>
            </View>
          </View>
          <View>{currency}</View>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Row;
