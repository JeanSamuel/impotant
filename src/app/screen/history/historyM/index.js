//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ListView,
  RefreshControl,
  Keyboard,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon, List } from "react-native-elements";
import { StackNavigator } from "react-navigation";
import { styleBase } from "../../../styles";
import { HistoryServices } from "../../../services";
import Row from "./row";
import HeaderHistory from "./header";
import Error from "./errorHistory";
import { DrawerMenu } from "../../../components/drawerMenu";
import SearchBar from "react-native-searchbar";
import { Notifications } from "expo";

// create a component
const self = null;

class History extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      accountId: this.props.navigation.state.params.user_id,
      accountName: "",
      data: null,
      dataBrute: null,
      refreshing: false,
      error: null,
      extraMargin: null
    };
    this.getOldHistory(this);
    this._handleResults = this._handleResults.bind(this);
  }

  static navigationOptions = {
    title: "Historique",
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-paper-outline" size={25} type="ionicon" />
    ),
    titleStyle: styleBase.headerTitle,
    headerRight: (
      <TouchableOpacity
        onPress={() => self.showSearchBar()}
        activeOpacity={0.3}
      >
        <Icon
          name="ios-search-outline"
          color="#ecf0f1"
          size={30}
          type="ionicon"
        />
      </TouchableOpacity>
    )
  };

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this._onRefresh();
  };

  showSearchBar() {
    this.searchBar.show();
    this.setState({
      extraMargin: { marginTop: 60 }
    });
  }

  setAccount(user_Id) {
    this.setState({
      accountId: user_Id
    });
  }

  isSynchronised() {
    this.setState({
      error: <Error isSynchronised={true} text="Synchronisation..." />
    });
  }

  stopSynchronised() {
    this.setState({ error: null });
  }

  async getOldHistory() {
    let services = new HistoryServices();
    services
      .getOldHistory()
      .then(response => {
        this.setState({
          dataBrute: JSON.parse(response),
          data: this.refactHistory(JSON.parse(response))
        });
        this.getHistory();
      })
      .catch(error => {
        this.getHistory();
        console.log("error fanindroany", error);
      });
  }

  async getHistory() {
    this.isSynchronised();
    let services = new HistoryServices();
    services
      .getHistory(this.state.accountId)
      .then(response => {
        this.setData(response);
        this.stopSynchronised();
      })
      .catch(error => {
        this.setState({
          error: (
            <Error isSynchronised={false} text="Erreur de synchronisation" />
          )
        });
      });
  }

  setData(response) {
    this.setState({
      dataBrute: response,
      data: this.refactHistory(response)
    });
  }

  _onRefresh() {
    this.isSynchronised();
    this.getHistory();
  }

  refactHistory(data) {
    let service = new HistoryServices();
    return service.refactHistory(data);
  }

  renderSectionHeader(sectionData, sectionID) {
    let service = new HistoryServices();
    return <HeaderHistory sectionData={sectionData} sectionID={sectionID} />;
  }

  _handleResults(results) {
    this.setState({ data: this.refactHistory(results) });
  }

  reinitialiseData() {
    this.setState({
      data: this.refactHistory(this.state.dataBrute),
      extraMargin: null
    });
    this.searchBar.hide();
  }

  render() {
    if (this.state.data == null) {
      return <Error isSynchronised={true} text="Synchronisation..." />;
    } else {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      return (
        <View style={style.listView}>
          <View>
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
          </View>

          <View>{this.state.error}</View>
          <View style={[style.headerList, this.state.extraMargin]} />
          {this.state.data.length == 0 ? (
            <Text style={{ fontSize: 30 }}>Pas de résultat</Text>
          ) : (
            <View />
          )}
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            dataSource={ds.cloneWithRowsAndSections(this.state.data)}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={(row, j, k) => (
              <Row
                info={row}
                index={parseInt(k)}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      );
    }
  }
}

const style = EStyleSheet.create({
  headerList: {},
  greyText: {
    color: "rgba(52, 73, 94,1.0)"
  },
  listView: {
    // marginBottom: 20
  },
  connexionError: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 76, 60,1.0)",
    paddingVertical: 3
  },
  connexionErrorText: {
    color: "white",
    textAlign: "center"
  }
});

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackHistory = new StackNavigator(
  {
    History: {
      screen: History,
      navigationOptions
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerMenu navigation={navigation} keyboard={Keyboard} />
    })
  }
);

//make this component available to the app
export default stackHistory;
