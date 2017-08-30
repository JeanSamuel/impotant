//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ListView
} from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";
import Services from "../services/services";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Icon, Button } from "react-native-elements";
import data from "../../data/stepText";
import EStyleSheet from "react-native-extended-stylesheet";
import { Modal } from "../../components/modal";
import Login from "../login/login";

const vendorCheck = require("../../images/icons/vendorCheck.png");
const backHeader = require("../../images/backHeader.jpg");
const color = "rgba(52, 73, 94,1.0)";
// create a component
class Step2 extends Component {
  static navigationOptions = navigation => {
    return {
      title: ""
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(data.step2),
      modal: null,
      modalData: null,
      name: this.props.navigation.state.params.name
    };
  }

  removeModal() {
    this.setState({ modal: null });
  }

  closeAssistant() {
    this.props.navigation.goBack();
  }

  goToAssistant() {
    this.props.navigation.navigate("Assistant", {
      close: this.closeAssistant()
    });
  }

  createModal() {
    this.setState({
      modal: (
        <Modal
          visibility={true}
          remove={this.removeModal.bind(this)}
          data={
            <Login
              navigation={this.props.navigation}
              modal={this.removeModal.bind(this)}
              newUser={true}
            />
          }
        />
      )
    });
  }

  renderRow(data) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{"\u2022"}</Text>
        <Text style={styles.listText}>{data}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styleBase.containerBase}>
        <View>{this.state.modal}</View>
        <View style={styles.header}>
          <Image
            style={[styles.backHeader]}
            source={backHeader}
            resizeMode="cover"
          >
            <View
              style={[
                { flexDirection: "row", paddingHorizontal: "5%" },
                styleBase.centered
              ]}
            >
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
              </TouchableOpacity>
              <Text
                style={[
                  { fontSize: 25, paddingLeft: 15 },
                  styleBase.textWhiteCentered
                ]}
              >
                Configuration de compte
              </Text>
            </View>
          </Image>
        </View>
        <ScrollView
          contentContainerStyle={[styles.scrollContain, styleBase.centered]}
        >
          <View>
            <Text style={[styles.scrollText, styleBase.textCenter]}>
              Votre compte a été enregistré sous le nom de : {" "}
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {this.state.name}
              </Text>
            </Text>
          </View>
          <View style={[styles.vendorCheck, styleBase.centered]}>
            <View style={{ width: "100%", height: "40%" }}>
              <Image
                source={vendorCheck}
                style={{ width: "100%", height: "100%" }}
                resizeMode="center"
              />
            </View>
            <Text>Vous êtes maintenant un marchand AriaryPro</Text>
            <Text />
            <Text style={styleBase.textCenter}>
              Nous vous conseillons de configurer proprement votre compte dès
              maintenant mais vous pourrez aussi le faire plus tard et vous{" "}
              <Text style={{ fontWeight: "bold" }}>
                connectez tout de suite
              </Text>
            </Text>
            <View
              style={{
                marginTop: 20,
                borderBottomColor: "black",
                borderBottomWidth: 1
              }}
            >
              <Text style={styleBase.textCenter}>
                Votre mot de passe par défaut :{" "}
              </Text>
              <Text style={[styleBase.textCenter, { fontSize: 40 }]}>0000</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <View style={styleBase.centered}>
            <Button
              large
              icon={{ name: "cogs", type: "font-awesome" }}
              title="Je configure mon compte"
              onPress={() => this.goToAssistant()}
              backgroundColor="rgba(52, 73, 94,1.0)"
            />
          </View>

          <View style={styleBase.centered}>
            <Button
              large
              iconRight
              icon={{
                name: "angle-double-right",
                type: "font-awesome",
                color: color
              }}
              title="Je finalise mon inscription et je me connecte"
              color={color}
              backgroundColor="transparent"
              onPress={() => this.createModal()}
            />
          </View>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default Step2;
