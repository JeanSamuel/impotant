//import liraries
import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import styles from "../../styles/RowStyles";
import styleBase from "../../styles/Styles";
import Services from "../services/services";

// create a component
class Row extends Component {
  static propTypes = {
    info: React.PropTypes.object,
    index: React.PropTypes.number
  };

  getCurrencyAndAmount(amount, currency) {
    let styleNegative = null;
    if (amount < 0) {
      styleNegative = styles.currencyNegative;
    }
    return (
      <View style={styles.amountContainer}>
        <View style={styles.currencyContainer}>
          <Text style={[styles.amount, styleNegative]}>
            {Services.formatNumber(amount)}{" "}
          </Text>
        </View>
        <View style={styles.currencyContainer}>
          <Text style={[styles.currency, styleNegative]}>{currency}</Text>
        </View>
      </View>
    );
  }

  getTypeOfTransaction(amount) {
    let type = "Récéption d'argent";
    if (amount < 0) {
      type = "Envoi d'argent";
      if (amount < -1000) type = "Achat";
    }
    return type;
  }

  getIcon(amount) {
    let iconName = "file-download";
    let iconColor = "rgba(230, 126, 34,1.0)";
    if (amount < 0) {
      iconName = "file-upload";
      iconColor = "rgba(52, 73, 94,1.0)";
      if (amount < -1000) {
        iconName = "file-uploadshopping-cart";
        iconColor = "#517fa4";
      }
    }
    return <Icon name={iconName} color={iconColor} />;
  }

  render() {
    let reportFormated = Services.formatNumber(this.props.info.amount);
    let currency = this.getCurrencyAndAmount(
      this.props.info.amount,
      this.props.info.currency
    );
    let type = this.getTypeOfTransaction(this.props.info.amount);
    let icon = this.getIcon(this.props.info.amount);
    let hour = this.props.info.date.split(" ")[1];

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
              <Text style={styles.date}>{hour}</Text>
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
