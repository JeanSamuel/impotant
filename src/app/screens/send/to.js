//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListView,
  Dimensions
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { List, ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import headStyle from "../../styles/headerStyle";
import UserServices from "../../utils/userServices";
import Services from "../../utils/services";
import Row from "./Row";
// create a component

const { width } = Dimensions.get("window");
const list = [
  {
    accountId: "Miorantsoa",
    date: "2017-08-21"
  },
  {
    accountId: "Solo",
    date: "2017-08-24"
  },
  {
    accountId: "Toavina",
    date: "2017-08-22"
  }
];
class To extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "A",
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: "#fff"
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      placeholder: null,
      loading: true
    };
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params.user_id);
    services = new Services();
    userServices = new UserServices();
    try {
      services.getData("adress").then(response => {
        console.log("jsonData", response);
        if (response == null) {
          userServices
            .getAdresses(this.props.navigation.state.params.user_id)
            .then(response => {
              if (response.status === 200) {
                console.log("Ato izyzyzyzyzyzy");
                response.json().then(responseJson => {
                  this.setState({ list: responseJson });
                  try {
                    services
                      .saveData("adress", JSON.stringify(this.state.list))
                      .then(respose => {
                        console.log("Nety le izy");
                      });
                  } catch (error) {
                    console.log(error);
                    throw "something went wrong when saving data";
                  }
                });
              }
              if (response.status === 405) {
                console.log("erreur", response.status);
                this.setState({
                  loading: false,
                  placeholder: services.renderPlaceholderPage
                });
              }
            });
        } else {
          this.setState({ list: JSON.parse(response) });
          this.setState({ loading: false });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: "#fafafa"
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.loading} size="large" />
        <View
          style={{
            height: 80,
            width: width,
            backgroundColor: "#34495e",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fafafa",
              fontSize: 20,
              fontWeight: "600"
            }}
          >
            Comptes enregistrés
          </Text>
          {this.state.placeholder}
        </View>
        <List
          containerStyle={{
            marginTop: 0,
            flex: 1,
            width: width,
            height: "auto",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
        >
          <FlatList
            data={this.state.list}
            style={{ margin: 0 }}
            //ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 4,
                  borderBottomColor: "#fafafa"
                }}
                title={item.adress_account_id}
                titleStyle={{ fontSize: 18 }}
                hideChevron={true}
                onPress={() => {
                  this.props.navigation.state.params.onGoBack(
                    item.adress_account_id
                  );
                  this.props.navigation.goBack();
                }}
              />
            )}
            keyExtractor={item => item.adress_account_id}
          />
        </List>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default To;
