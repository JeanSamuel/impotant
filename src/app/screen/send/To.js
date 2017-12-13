//import liraries
import React, {Component} from "react";
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {List, ListItem} from "react-native-elements";
import headStyle from "../../assets/styles/stylesC/headerStyle";
import UserServices from "../../services/utils/userServices";
import Services from "../../services/utils/services";
import timer from "react-native-timer";
// create a component

const { width } = Dimensions.get("window");

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
      online: true,
      loading: true
    };
  }

  fetchLocalAdress() {
    services = new Services();
    services.getData("adress").then(response => {
      if (response !== null) {
        responseJson = JSON.parse(response);
        this.setState({ list: responseJson });
      }
    });
  }

  fetchAdress() {
    userServices = new UserServices();
    userServices
      .getAdresses(this.props.navigation.state.params.user_id)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          response.json().then(responseJson => {
            this.setState({
              list: responseJson,
              refreshing: false,
              loading: false
            });
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
            online: false,
            refreshing: false
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          online: false,
          refreshing: false
        });
      });
  }

  componentDidMount() {
    services = new Services();
    services.getData("adress").then(response => {
      if (response !== null) {
        this.setState({ list: JSON.parse(response) });
        this.setState({ loading: false });
      } else {
        console.log("Empty adress from local storage");
      }
    });
    this.fetchAdress();
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
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
      600
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
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {this.state.online && this.state.loading
          ? this.renderLoadingMessage()
          : null}
        {!this.state.online ? this.renderErrorMessage() : null}
        {this.state.online && !this.state.loading
          ? this.renderConnectedMessage()
          : null}
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
