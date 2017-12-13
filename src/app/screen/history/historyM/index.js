//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ListView,
  RefreshControl,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon, List, Button } from "react-native-elements";
import { StackNavigator } from "react-navigation";
import { styleBase } from "../../../assets/styles";
import { HistoryServices } from "../../../services";
import Row from "./row";
import HeaderHistory from "./header";
import Error from "./errorHistory";
import HeaderRight from "./headerRight";
import { DrawerMenu } from "../../../components/drawerMenu";
import { Download } from "../../../components/icon";
import SearchBar from "react-native-searchbar";
import { Notifications } from "expo";
import RowEmpty from "./rowEmpty";

// create a component
const self = null;

class History extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      user_id: this.props.navigation.state.params.user_id,
      accountName: this.props.navigation.state.params.username,
      data: null,
      dataBrute: null,
      refreshing: false,
      error: null,
      extraMargin: null,
      emptyData: null
    };
    this._handleResults = this._handleResults.bind(this);
  }

  static navigationOptions = {
    title: "Historique",
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-paper-outline" size={25} type="ionicon" />
    ),
    titleStyle: styleBase.headerTitle,
    headerRight: <HeaderRight action={() => self.showSearchBar()} />
  };

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    this.getOldHistory();
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
      user_id: user_Id
    });
  }

  waiting() {
    return (
      <View>
        <Error isSynchronised={true} text="Synchronisation..." />
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
      </View>
    );
  }

  isSynchronised() {
    this.setState({
      error: this.waiting(),
      emptyData: null
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
        if (response != null) {
          let dateChecked = services.checkHistoryError(response);
          this.setState({
            dataBrute: dateChecked,
            data: this.refactHistory(dateChecked)
          });
        }
        this.getHistory();
      })
      .catch(error => {
        this.getHistory();
        console.log("error error getting oldHistory", error);
      });
  }

  async getHistory() {
    this.isSynchronised();
    let services = new HistoryServices();
    services
      .getHistory(this.state.user_id)
      .then(response => {
        this.setData(response);
        this.stopSynchronised();
      })
      .catch(error => {
        console.log("error response getting history", error);
        this.setState({
          error: (
            <Error isSynchronised={false} text="Erreur de synchronisation" />
          )
        });
      });
  }

  setData(response) {
    if (response.length == 0) {
      this.createEmptyText();
    } else {
      this.setState({
        dataBrute: response,
        data: this.refactHistory(response)
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
      return this.waiting();
    } else {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      return (
        <View style={style.listView}>
          <ScrollView>
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

            <View>{this.state.error}</View>
            <View style={[style.headerList, this.state.extraMargin]} />

            <View>{this.state.emptyData}</View>

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
          </ScrollView>
          <View style={style.downloadContainer}>
            <Download source={this.state.dataBrute} />
          </View>
        </View>
      );
    }
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
