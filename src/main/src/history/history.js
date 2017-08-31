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

// create a component
class History extends Component {
  static navigationOptions = {
    title: "Historique",
    drawerIcon: ({ tintColor }) => <Icon name="list" size={25} />,
    titleStyle: styleBase.headerTitle,
    headerRight: <Icon name="help" color="#ecf0f1" size={30} />
  };

  constructor(props) {
    super(props);
    this.state = {
      accountId: this.props.navigation.state.params.user_id,
      accountName: "Toavina",
      data: null,
      refreshing: false,
      loadingError: false
    };
    this.getHistory(this);
  }

  setAccount(user_Id) {
    this.setState({
      accountId: user_Id
    });
  }

  async getHistory() {
    var url = "http://ariary.vola.mg/transaction/" + this.state.accountId;
    axios
      .get(url)
      .then(response => {
        this.setState({ data: this.refactHistory(response.data) });
      })
      .catch(error => {
        this.setState({
          loadingError: true
        });
        console.log(error);
      });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getHistory()
      .then(this.setState({ refreshing: false }))
      .catch(
        this.setState({
          refreshing: false,
          loadingError: true
        })
      );
  }

  refactHistory(data) {
    let service = new HistoryServices();
    return service.refactHistory(data);
  }

  renderSectionHeader(sectionData, sectionID) {
    let service = new HistoryServices();
    // return service.renderSectionHeader(sectionData, sectionID);
    return <HeaderHistory sectionData={sectionData} sectionID={sectionID} />;
  }

  render() {
    if (this.state.data === null && !this.state.loadingError) {
      return (
        <View style={styleBase.containerBase}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (this.state.data === null && this.state.loadingError) {
      return (
        <View>
          <Error />
        </View>
      );
    } else {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      return (
        <View style={style.listView}>
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
