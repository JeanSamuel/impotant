//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ListView,
  RefreshControl,
  Keyboard
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import { StackNavigator } from "react-navigation";
import styleBase from "../../styles/Styles";
import HistoryServices from "../services/historyServices";
import Row from "./row";
import HeaderHistory from "./header";
import Error from "./errorHistory";
import DrawerButton from "../navigation/drawerButton";
import axios from "axios";
import SearchBar from "react-native-searchbar";

const items = [
  {
    id: "676",
    date: "2017-08-31 17:44:42",
    senderId: "miorantsoa",
    recipientId: "manitra",
    amount: "6000",
    currency: "MGA",
    comment: "Transfert",
    name: "USERmiorantsoa"
  },
  {
    id: "488",
    date: "2017-08-30 17:59:26",
    senderId: "miorantsoa",
    recipientId: "manitra",
    amount: "135",
    currency: "MGA",
    comment: "Transfert",
    name: "USERmiorantsoa"
  },
  {
    id: "97",
    date: "2017-08-06 17:56:09",
    senderId: "1",
    recipientId: "manitra",
    amount: "-79",
    currency: "USD",
    comment: "Nivo.mg online payment",
    name: "USER1"
  }
];
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
      error: null
    };
    this.getHistory(this);
    this._handleResults = this._handleResults.bind(this);
  }

  static navigationOptions = {
    title: "Historique",
    drawerIcon: ({ tintColor }) => <Icon name="list" size={25} />,
    titleStyle: styleBase.headerTitle,
    headerRight: (
      <Icon
        name="search"
        color="#ecf0f1"
        size={30}
        onPress={() => self.showSearchBar()}
      />
    )
  };

  showSearchBar() {
    this.searchBar.show();
  }

  hideSearchBar() {
    this.searchBar.hide();
    this.setState({
      data: this.refactHistory(this.state.dataBrute)
    });
  }

  setAccount(user_Id) {
    this.setState({
      accountId: user_Id
    });
  }

  async isSyncError() {
    let services = new HistoryServices();
    services
      .getOldHistory()
      .then(response => {
        this.setState({
          dataBrute: JSON.parse(response),
          data: this.refactHistory(JSON.parse(response)),
          error: (
            <Error isSynchronised={false} text="Erreur de synchronisation" />
          )
        });
      })
      .catch(error => {
        console.log("error fanindroany", error);
      });
  }

  async getHistory() {
    let services = new HistoryServices();
    services
      .getHistory(this.state.accountId)
      .then(response => {
        this.setState({
          dataBrute: response,
          data: this.refactHistory(response)
        });
      })
      .catch(error => {
        this.isSyncError();
      });
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      data: null,
      error: null
    });
    this.getHistory()
      .then(this.setState({ refreshing: false }))
      .catch(
        this.setState({
          refreshing: false
        })
      );
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
    if (results.length != 0) {
      this.setState({ data: this.refactHistory(results) });
    } else {
      this.setState({
        data: this.refactHistory(this.state.dataBrute)
      });
    }
  }

  render() {
    if (this.state.data === null) {
      return (
        <View style={styleBase.containerBase}>
          <View>
            <Error isSynchronised={true} text="Synchronisation ..." />
          </View>
          <ActivityIndicator />
        </View>
      );
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
              handleResults={this._handleResults}
              onX={() => this.hideSearchBar()}
              hideBack
            />
          </View>
          <View>{this.state.error}</View>
          <View style={style.headerList}>
            <Text style={style.greyText}>Nom | Type</Text>
            <Text style={style.greyText}>Montant</Text>
          </View>
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
  headerList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(52, 73, 94,1.0)"
  },
  greyText: {
    color: "rgba(52, 73, 94,1.0)"
  },
  listView: {
    marginBottom: 20
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
      headerLeft: <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
  }
);

//make this component available to the app
export default stackHistory;
