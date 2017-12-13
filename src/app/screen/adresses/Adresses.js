//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  ToastAndroid,
  NetInfo,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner } from "expo";
import { StackNavigator } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import { List, ListItem, Button, Header, Icon } from "react-native-elements";
import { RoundedButton } from "../../components/Buttons";
import Toast, { DURATION } from "react-native-easy-toast";
import headStyle from "../../assets/styles/stylesC/headerStyle";
import UserServices from "../../services/userServices";
import Services from "../../services/services";
import timer from "react-native-timer";

const { width, height } = Dimensions.get("window");
// create a component
class Adresses extends Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      flashOn: "off",
      refreshing: false,
      modalVisible: false,
      syncing: true,
      online: true,
      hideSuccess: false,
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
    console.log(this.props.navigation.state.params.user_id);
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

  toggleFlash = () => {
    toggleFlash = !this.state.isFlashOn;
    this.setState({ isFlashOn: toggleFlash });
    if (toggleFlash) {
      this.setState({ flashOn: "on", flashIcon: "flash-on" });
    } else {
      this.setState({ flashOn: "off", flashIcon: "flash-off" });
    }
  };

  changeModalVisibility(visible) {
    this.setState({ modalVisible: visible });
  }

  listContainObject(newAdress) {
    let jsonList = JSON.stringify(this.state.list);
    return jsonList.includes(newAdress);
  }

  _handleBarCodeRead = data => {
    console.log(JSON.stringify(data));
    userServices = new UserServices();
    qdata = data.data;
    if (qdata.includes("vola")) {
      readData = JSON.parse(qdata);
      if (readData.u === "") {
        console.log("Adresse invalide");
      } else {
        if (this.listContainObject(readData.u.trim())) {
          console.log("Efa misy io");
          Platform.OS == "android"
            ? ToastAndroid.show("Adress already exist", ToastAndroid.SHORT)
            : this.refs.toast.show("Adress already exist", 1000);
        } else {
          this.setState({ loading: true });
          console.log(this.state.list);
          tempList = [];
          tempList.push({
            account_id: this.props.navigation.state.params.user_id,
            adress_account_id: readData.u
          });
          this.setState({ list: tempList });
          userServices.saveAdress(
            this.state.navigation.state.params.user_id,
            readData.u
          );
        }
        this.setState({ loading: false });
        this.changeModalVisibility(false);
      }
    }
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchAdress();
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
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          {this.state.online && this.state.loading
            ? this.renderLoadingMessage()
            : null}
          {!this.state.online ? this.renderErrorMessage() : null}
          {this.state.online && !this.state.loading
            ? this.renderConnectedMessage()
            : null}
          <RoundedButton
            text="Importer une nouvelle adresse"
            buttonStyle={{ height: 40 }}
            color="#2980b9"
            icon="add"
            buttonStyle={{
              marginVertical: 15
            }}
            onPress={() => {
              console.log("Show modal");
              this.changeModalVisibility(true);
            }}
          />
          <View style={{ width: width, paddingHorizontal: 5, flex: 1 }}>
            <List
              containerStyle={{
                marginTop: 0,
                flex: 1,
                height: "auto",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                paddingHorizontal: 5
              }}
            >
              <FlatList
                data={this.state.list}
                style={{ margin: 0 }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
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
                  />
                )}
                keyExtractor={item => item.adress_account_id}
              />
            </List>
          </View>
          <Modal
            visible={this.state.modalVisible}
            onRequestClose={() => this.changeModalVisibility(false)}
          >
            <View>
              <Header
                style={[
                  headStyle.headerBackground,
                  {
                    height: 50,
                    alignContent: "center",
                    justifyContent: "center"
                  }
                ]}
                leftComponent={
                  <Button
                    transparent
                    onPress={() => {
                      this.changeModalVisibility(false);
                    }}
                    //buttonStyle={styles.controlButton}
                    buttonStyle={{
                      paddingLeft: 0,
                      height: 50,
                      width: 50
                    }}
                    icon={{ name: "arrow-back", size: 25, color: "#fff" }}
                  />
                }
                centerComponent={
                  <Text
                    style={{
                      paddingVertical: 11,
                      marginRight: 100,
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#fff"
                    }}
                  >
                    Scan Qr Code
                  </Text>
                }
                rightComponent={
                  <Button
                    transparent
                    onPress={this.toggleFlash}
                    //buttonStyle={styles.controlButton}
                    icon={{
                      name: "wb-sunny",
                      size: 25,
                      color: "#fff"
                    }}
                  />
                }
              />
              <BarCodeScanner
                torchMode={this.state.flashOn}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  height: height,
                  width: width,
                  alignSelf: "center"
                }}
              />
            </View>
          </Modal>
        </View>
        {Platform.OS == "ios" ? (
          <Toast
            ref="toast"
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa"
  },
  controlButton: {
    marginHorizontal: 50,
    marginVertical: 5,
    backgroundColor: "transparent" ///"rgba(52, 73, 94,1.0)" // "#448aff"
  }
});

const AdressStack = new StackNavigator(
  {
    Adresses: { screen: Adresses }
  },
  {
    navigationOptions: ({ navigation }) => ({
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-book-outline" size={25} type="ionicon" />
      ),
      title: navigation.state.routeName,
      headerStyle: headStyle.headerBackground,
      headerTitleStyle: headStyle.headerText,
      headerTintColor: { color: "#fff" },
      headerLeft: (
        <View
          style={{
            alignContent: "center",
            marginHorizontal: 10
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )
    })
  }
);
//make this component available to the app
export default AdressStack;
