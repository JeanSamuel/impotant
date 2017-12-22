//import liraries
import React from "react";
import {Button, Icon} from "react-native-elements";
import {Keyboard, RefreshControl, SectionList, Text, TouchableHighlight, View} from "react-native";
import colors from "color";
import EStyleSheet from "react-native-extended-stylesheet";
import {HistoryServices} from "../../services/index";
import Services from "../../services/utils/services";
import {styleBase} from "../../assets/styles/index";
import styles from "../../assets/styles/stylesC/historyStyle";
import moment from "moment";
import timer from "react-native-timer";
import SearchBar from "react-native-searchbar";
import {Notifications} from "expo";
import {StackNavigator} from "react-navigation";
import RowEmpty from "./rowEmpty";
import IconBadge from '../../components/icon/iconBadge'
import Error from "./errorHistory";
import _ from "lodash";
import "moment/locale/fr";
import MyHeader from "../../components/Header/Header";
import DrawerMenu from "../../components/drawerMenu/drawerMenu";
import HeaderRight from "./headerRight";

// create a component

class History extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      accountName: this.props.navigation.state.params.username,
      data: [],
      dataIn: [],
      dataOut: [],
      dataAll: [],
      loading: true,
      refreshing: false,
      online: true,
      syncing: true,
      dataBrute: null,
      error: null,
      extraMargin: null,
      emptyData: null,
      showAll: true,
      showIn: false,
      showOut: false
    };
    this._handleResults = this._handleResults.bind(this);
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    this.getOldHistory();
  }

  reinitialiseData() {
    this.setState({
      data: this.parseHistoryData(this.state.dataBrute),
      extraMargin: null
    });
    this.searchBar.hide();
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
    timer.clearTimeout(this);
  }

  parseHistoryData(historyData) {
    const historyServices = new HistoryServices();
    history = historyServices.refactHistory(historyData);
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

  _handleNotification = notification => {
    this._onRefresh();
  };

  showSearchBar() {
    this.searchBar.show();
    this.setState({
      extraMargin: { marginTop: 0 }
    });
  }

  setAccount(user_Id) {
    this.setState({
      user_id: user_Id
    });
  }

  waiting() {
    return (
      <View>
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
      </View>
    );
  }

  setData(response) {
    if (response.length == 0) {
      this.createEmptyText();
    } else {
      hServices = new HistoryServices();
      this.setState({
        syncing: false,
        loading: false,
        refreshing: false,
        dataBrute: response,
        data: this.parseHistoryData(response),
        dataAll: this.parseHistoryData(response),
        dataIn: this.parseHistoryData(
          hServices.getReceivedTransaction(response, this.state.user_id)
        ),
        dataOut: this.parseHistoryData(
          hServices.getSentTransactionData(response, this.state.user_id)
        )
      });
    }
  }

  createEmptyText() {
    this.setState({
      emptyData: (
        <View style={[style.dataEmpty, styleBase.centered]}>
          <Icon
            name="ios-close"
            reverse
            color="rgba(189, 195, 199,1.0)"
            size={30}
            type="ionicon"
          />
          <View style={styleBase.centered}>
            <Text style={style.dataEmptyText}>Liste de transaction vide</Text>
          </View>
          <Button
            small
            title="RECHARGER"
            buttonStyle={[style.refreshBtnStyle]}
            onPress={this._onRefresh.bind(this)}
          />
        </View>
      )
    });
  }

  _onRefresh() {
    this.searchBar.hide();
    this.isSynchronised();
    this.getHistory();
  }

  async getOldHistory() {
    let services = new HistoryServices();
    services
      .getOldHistory()
      .then(response => {
        if (response != null) {
          let dateChecked = services.checkHistoryError(response);
          this.setState({
            dataBrute: dateChecked,
            data: this.parseHistoryData(dateChecked)
          });
        }
        this.getHistory();
      })
      .catch(error => {
        this.getHistory();
        console.log("error error getting oldHistory", error);
      });
  }

  isSynchronised() {
    this.setState({
      emptyData: null
    });
  }

  stopSynchronised() {
    this.setState({ error: null });
  }

  async getHistory() {
    this.isSynchronised();
    let services = new HistoryServices();
    services
      .getHistory(this.state.user_id)
      .then(response => {
        console.log(response);
        this.setData(response);
        this.stopSynchronised();
      })
      .catch(error => {
        console.log("error response getting history", error);
        this.setState({
          online: false,
          syncing: false,
          loading: false,
          error: (
            <Error isSynchronised={false} text="Erreur de synchronisation" />
          )
        });
      });
  }

  _handleResults(results) {
    this.setState({ data: this.parseHistoryData(results) });
  }

  formatCurrencyAndAmount(currency, amount, senderId) {
    //#4caf50
    let sign = "+";
    console.log("ty le amount", amount);
    if (amount < 0) {
      sign = "-";
      amount = amount.replace("-", "");
    }
    if (senderId == this.state.user_id) {
      sign = "-";
    }
    let desired = amount.replace(/[^\w\s]/gi, "");
    return sign + " " + desired + " " + currency;
  }

  getColor(amount, senderId) {
    let color = "#4caf50";
    if (amount < 0) {
      color = "#0a0a0a";
    }
    if (senderId == this.state.user_id) {
      color = "#0a0a0a";
    }
    return color;
  }

  getIcon(amount, comment) {
    let iconName = "directions";
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
            <Text style={styles.listTitle}>
              {item.item.senderId == this.state.user_id
                ? item.item.recipientId
                : item.item.senderId}
            </Text>
            <Text style={styles.subtitle}>{item.item.type}</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text
            style={[
              styles.amount,
              { color: this.getColor(item.item.amount, item.item.senderId) }
            ]}
          >
            {this.formatCurrencyAndAmount(
              //item.item.currency,
              "Ar",
              Services.formatNumber(item.item.amount),
              item.item.senderId
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
          {moment(headerItem.section.key, "YYYY-MM-DD").format("Do MMMM YYYY")}
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
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

  _getAllHistory = () => {
    this.setState({
      data: this.state.dataAll,
      dataBrute: this.state.dataAll,
      showAll: true,
      showIn: false,
      showOut: false
    });
  };
  _getSentHistory = () => {
    this.setState({
      data: this.state.dataOut,
      dataBrute: this.state.dataOut,
      showAll: false,
      showIn: false,
      showOut: true
    });
  };
  _getReceivedHistory = () => {
    this.setState({
      data: this.state.dataIn,
      dataBrute: this.state.dataIn,
      showAll: false,
      showIn: true,
      showOut: false
    });
  };
  render() {
    let allActive = this.state.showAll
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };
    let inActive = this.state.showIn
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };
    let outActive = this.state.showOut
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };

    const underlayColor = colors("#fff").darken(0.1);
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <MyHeader
          leftComponent={<DrawerMenu navigation={this.props.navigation}/>}
          headerText={"Historique"}
          rightComponent={<HeaderRight action={()=>this.showSearchBar()}/> }
        />
        <View style={style.tab}>
          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getAllHistory}
            style={[style.tabButtonStyle, allActive.tab]}
          >
            <Text style={[style.tabTextStyle, allActive.text]}>Tout</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getSentHistory}
            style={[style.tabButtonStyle, outActive.tab]}
          >
            <Text style={[style.tabTextStyle, outActive.text]}>Envoyé</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getReceivedHistory}
            style={[style.tabButtonStyle, inActive.tab]}
          >
            <Text style={[style.tabTextStyle, inActive.text]}>Reçu</Text>
          </TouchableHighlight>
        </View>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={this.state.dataBrute}
          placeholder="Rechercher"
          handleResults={this._handleResults}
          allDataOnEmptySearch
          onSubmitEditing={() => Keyboard.dismiss()}
          onBack={() => this.reinitialiseData()}
          backButton={<Icon name="keyboard-arrow-up" size={30} />}
        />
        {this.state.online && this.state.loading ? (
          <View>
            {this.renderLoadingMessage()}
            <RowEmpty />
            <RowEmpty />
            <RowEmpty />
          </View>
        ) : null}
        {!this.state.online ? this.renderErrorMessage() : null}
        {this.state.online && !this.state.loading
          ? this.renderConnectedMessage()
          : null}
        <View style={[style.headerList, this.state.extraMargin]} />
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={this.state.data}
          keyExtractor={item => item.date}
        />
      </View>
    );
  }
}

const style = EStyleSheet.create({
  downloadContainer: {
    flex: 1,
    position: "absolute",
    bottom: 1,
    width: "100%",
    paddingVertical: 8,
    backgroundColor: "rgba(236, 240, 241,1.0)",
    marginBottom: -1
  },
  headerList: {},
  greyText: {
    color: "rgba(52, 73, 94,1.0)"
  },
  tab: {
    flexDirection: "row",
    height: 50,
    // justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "$border"
  },
  tabButtonStyle: {
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "$border"
  },
  tabTextStyle: {
    color: "$border",
    fontWeight: "bold"
  },
  tabTextActive: {
    color: "#000"
  },
  listView: {
    flex: 1
  },
  connexionError: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 76, 60,1.0)",
    paddingVertical: 3
  },
  connexionErrorText: {
    color: "white",
    textAlign: "center"
  },
  dataEmpty: {
    marginTop: 20
  },
  dataEmptyText: {
    fontSize: 25
  },
  refreshBtnStyle: {
    marginTop: 10,
    backgroundColor: "$darkColor"
  }
});

const stackHistory = new StackNavigator({
  History: {
    screen: History,
    navigationOptions: ({ navigation }) => ({
      title: "Historique",
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-clock-outline" size={28} type="ionicon" color={tintColor} />
      ),
      header: () =>null
    })
  }
});

//make this component available to the app
export default stackHistory;
