import React, { Component } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import SearchBar from "react-native-searchbar";
import DrawerButton from "../navigation/drawerButton";
import styleBase from "../../styles/Styles";
import { Icon } from "react-native-elements";
import { StackNavigator } from "react-navigation";

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

const self = null;

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      items,
      results: []
    };
    this._handleResults = this._handleResults.bind(this);
  }

  static navigationOptions = {
    title: "Search",
    drawerIcon: ({ tintColor }) => <Icon name="search" size={25} />,
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

  _handleResults(results) {
    console.log("====================================");
    console.log("result", results);
    console.log("====================================");
    this.setState({ results });
  }

  showSearchBar() {
    this.searchBar.show();
  }

  render() {
    return (
      <View>
        <View style={{ marginTop: 110 }}>
          {this.state.results.map((result, i) => {
            return (
              <Text key={i}>
                {typeof result === "object" && !(result instanceof Array) ? (
                  result.name
                ) : (
                  result.toString()
                )}
              </Text>
            );
          })}
        </View>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={items}
          handleResults={this._handleResults}
        />
      </View>
    );
  }
}

const navigationOptions = {
  headerStyle: styleBase.header,
  headerTitleStyle: styleBase.headerTitle
};

const stackSearch = new StackNavigator(
  {
    SearchContainer: {
      screen: SearchContainer,
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
export default stackSearch;
