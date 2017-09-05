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
  ToastAndroid
} from "react-native";
import {
  Header,
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content
} from "native-base";

import { BarCodeScanner } from "expo";
import Spinner from "react-native-loading-spinner-overlay";
import { List, ListItem } from "react-native-elements";
import { RoundedButton } from "../../components/Buttons/RoundedButton";
import Toast, { DURATION } from "react-native-easy-toast";
import headStyle from "../../styles/headerStyle";
import UserServices from "../../utils/userServices";
import Services from "../../utils/services";

const { width, height } = Dimensions.get("window");
// create a component
class Adresses extends Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      flashOn: "off",
      modalVisible: false,
      loading: true
    };
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params.user_id);
    userServices = new UserServices();
    services = new Services();
    services
      .getData2("adress")
      .then(response => JSON.parse(response))
      .then(responseJson => {
        this.setState({ list: responseJson });
        this.setState({ loading: false });
      });
    userServices
      .getAdresses(this.props.navigation.state.params.user_id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ list: responseJson });
        try {
          services
            .saveData2("adress", JSON.stringify(this.state.list))
            .then(respose => {
              console.log("Nety le izy");
            });
        } catch (error) {
          console.log(error);
          throw "something went wrong when saving data";
        }
      });
  }

  toggleFlash = () => {
    this.setState({ isFlashOn: !this.state.isFlashOn });
    if (this.state.isFlashOn) {
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
          tempList = this.state.list;
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

  render() {
    console.log(this.listContainObject("toavina"));
    return (
      <Container>
        <Header style={headStyle.headerBackground}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{this.props.navigation.state.routeName}</Title>
          </Body>
        </Header>
        <Spinner visible={this.state.loading} size="large" />
        <Button
          rounded
          style={{
            alignSelf: "center",
            alignItems: "center",
            marginVertical: 10,
            height: 40,
            backgroundColor: "#2980b9"
          }}
          onPress={() => {
            console.log("Show modal");
            this.changeModalVisibility(true);
          }}
        >
          <Text style={{ color: "#fafafa" }}>
            Importer une nouvelle addresse
          </Text>
          <Icon name="add" />
        </Button>
        <Content contentContainerStyle={{ width: width, paddingHorizontal: 5 }}>
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
        </Content>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => this.changeModalVisibility(false)}
        >
          <View>
            <Header style={headStyle.headerBackground}>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.changeModalVisibility(false);
                  }}
                >
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Scan Qr Code</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.toggleFlash}>
                  <Icon name="bulb" size={30} color="#fafafa" />
                </Button>
              </Right>
            </Header>
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
      </Container>
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
  }
});

//make this component available to the app
export default Adresses;
