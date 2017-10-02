//import liraries
import React, { Component } from "react";
import {
  Container,
  Content,
  Switch,
  Left,
  Right,
  Body,
  Button,
  Separator
} from "native-base";
import { List, ListItem, Icon } from "react-native-elements";
import {
  SectionList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  NetInfo
} from "react-native";
import headStyle from "../styles/stylesC/headerStyle";
import HistoiryServices from "../services/historyServices";
import Services from "../services/services";
import styles from "../styles/stylesC/historyStyle";
import moment from "moment";
import numeral from "numeral";
import TimerMixin from "react-timer-mixin";
import timer from "react-native-timer";
// create a component

class History extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      loading: true,
      refreshing: false,
      syncing: true,
      online: true,
      hideSuccess: false,
      user_id: this.props.navigation.state.params.user_id,
      history: []
    };
    this.getLocalHistory(this);
  }

  checkConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
      isConnected
        ? this.setState({ online: true })
        : this.setState({ online: false, syncing: false });
    });
  }

  parseHistoryData(historyData) {
    const historyServices = new HistoiryServices();
    history = historyServices.groupHistory(historyData);
    history = _.reduce(
      history,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    return history;
  }

  async getLocalHistory() {
    const services = new HistoiryServices();
    services
      .getOldHistory()
      .then(response => {
        try {
          let history = this.parseHistoryData(JSON.parse(response));
          this.setState({ history: history });
          this.getHistory();
        } catch (error) {
          console.log("Error when parsing history data");
          throw error;
        }
      })
      .catch(error => {
        this.getHistory();
        console.log("error fanindroany", error);
      });
  }

  async getHistory() {
    let historyServices = new HistoiryServices();
    historyServices
      .getHistory(this.state.user_id)
      .then(response => {
        let history = this.parseHistoryData(response);
        this.setState({
          history: history,
          syncing: false,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({
          online: false,
          syncing: false,
          loading: false
        });
      });
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "History",
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: "#fff"
    };
  };

  formatCurrencyAndAmount(currency, amount) {
    //#4caf50
    let sign = "+";
    console.log("ty le amount", amount);
    if (amount < 0) {
      sign = "-";
      amount = amount.replace("-", "");
    }
    let desired = amount.replace(/[^\w\s]/gi, "");
    return sign + " " + desired + " " + currency;
  }

  getColor(amount) {
    let color = "#4caf50";
    if (amount < 0) {
      color = "#0a0a0a";
    }
    return color;
  }

  getIcon(amount, comment) {
    let iconName = "directions";
    if (comment.trim() === "First Transaction") {
      iconName = "present";
    }
    color = "#e4795f";
    if (amount < 0) {
      color = "#e4795f";
      if (amount < -1000) {
        iconName = "present";
      }
    }
    return (
      <Icon
        name={iconName}
        iconStyle={{ margin: 0 }}
        type="simple-line-icon"
        reverse={true}
        size={20}
        color={color}
      />
    );
  }

  renderItem = item => {
    return (
      <View style={[styles.listStyle, { justifyContent: "space-between" }]}>
        <View style={styles.mainContent}>
          <View style={styles.iconWrapper}>
            {this.getIcon(item.item.amount, item.item.comment)}
          </View>
          <View style={[styles.contentBody]}>
            <Text style={styles.listTitle}>{item.item.senderId}</Text>
            <Text style={styles.subtitle}>{item.item.comment}</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text
            style={[styles.amount, { color: this.getColor(item.item.amount) }]}
          >
            {this.formatCurrencyAndAmount(
              item.item.currency,
              Services.formatNumber(item.item.amount)
            )}
          </Text>
          <Text style={[styles.subtitle, { textAlign: "right" }]}>
            {moment(item.item.date, "YYYY-MM-DD hh:mm:ss").format("HH:mm")}
          </Text>
          <View />
        </View>
      </View>
    );
  };

  renderHeader = headerItem => {
    return (
      <View
        style={{
          height: 30,
          marginTop: 10,
          justifyContent: "center",
          backgroundColor: "#fff"
        }}
      >
        <Text style={{ marginLeft: 10 }}>
          {moment(headerItem.section.key, "YYYY-MM-DD").format("DD MMM, YYYY")}
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, loading: true });
    this.getHistory();
  };

  renderLoadingMessage() {
    return (
      <View style={{ backgroundColor: "#FFCC00", paddingVertical: 5 }}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          En attente de syncronisation
        </Text>
      </View>
    );
  }

  renderErrorMessage() {
    return (
      <View style={{ backgroundColor: "red", paddingVertical: 5 }}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Vous êtes hors connection
        </Text>
      </View>
    );
  }

  renderConnectedMessage() {
    let component = null;
    timer.setTimeout(
      this,
      "hideSuccess",
      () => this.setState({ hideSuccess: true }),
      300
    );
    {
      this.state.hideSuccess
        ? (component = null)
        : (component = (
            <View style={{ backgroundColor: "#00cc00", paddingVertical: 5 }}>
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Syncronisation terminé
              </Text>
            </View>
          ));
    }

    return component;
  }
  render() {
    return (
      <Container>
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          {this.state.online && this.state.loading ? (
            this.renderLoadingMessage()
          ) : null}
          {!this.state.online ? this.renderErrorMessage() : null}
          {this.state.online && !this.state.loading ? (
            this.renderConnectedMessage()
          ) : null}
          <SectionList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
            sections={this.state.history}
            keyExtractor={item => item.date}
          />
        </View>
      </Container>
    );
  }
}

//make this component available to the app
export default History;
