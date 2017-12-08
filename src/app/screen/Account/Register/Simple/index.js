import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import ViewPager from "react-native-viewpager";
import { Header, Icon } from "react-native-elements";
import StepIndicator from "react-native-step-indicator";
import Indentite from "./Step/Identite/";
import Contact from "./Step/Contact";
import Securite from "./Step/Securite";
import Validation from "./Step/Recap";
import styles from "./styles";

import { nbaseStyle } from "../../../../styles";
import MyButton from "../../../../components/Buttons/SamButton";
import { InscriptionService, Utils } from "../../../../services";

const deviceWidth = Dimensions.get("window").width;

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  separatorFinishedColor: "#4aae4f",
  separatorUnFinishedColor: "#a4d4a5",
  stepIndicatorFinishedColor: "#4aae4f",
  stepIndicatorUnFinishedColor: "#a4d4a5",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 15,
  currentStepLabelColor: "#4aae4f"
};
class MainInscription extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      text: "Suivant",
      next: true,
      back: false,
      account_id: null,
      identity: null,
      contact: null,
      security: null,
      data: {
        username: "",
        name: "",
        firstname: "",
        birthday: "",
        email: "",
        phone: "",
        password: ""
      },
      loading: false
    };
  }

  _getPage() {
    return this.state.page;
  }
  _goNext() {
    try {
      InscriptionService._validateUser(this);
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  _goBack() {
    try {
      InscriptionService._goBack(this);
    } catch (error) {
      Alert.alert("Erreur", error.toString());
    }
  }
  updateIdentity(identity) {
    this.setState({ identity: identity });
  }
  updateContact(contact) {
    this.setState({ contact: contact });
  }
  updateSecurity(data) {
    this.setState({ data: data });
  }
  renderViewPagerPage(data) {
    return data;
  }
  getDataUser() {
    return this.state.data;
  }
  getDataPages() {
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });
    const PAGES = [
      <Indentite
        updateIdentityState={this.updateIdentity.bind(this)}
        activity={this}
      />,
      <Contact
        updateContactState={this.updateContact.bind(this)}
        activity={this}
      />,
      <Securite
        updateSecurityState={this.updateSecurity.bind(this)}
        activity={this}
      />
    ];
    return dataSource.cloneWithPages(PAGES);
  }
  renderPageIndicators() {
    return <View />;
  }
  async componentWillMount() {
    try {
      let data = await Utils.getItem("dataUser");
      if (data != null) {
        let datajson = JSON.parse(data);
        this.setState({ account_id: datajson.code });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleActionLeft() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View stylez={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: "#fff" }}>
          <StatusBar hidden={true} />
          <View style={baseStyle.header}>
            <Mybutton
              iconName="arrow-back"
              type="font-awesome"
              onPress={this.handleActionLeft}
              styleBtn={{ marginLeft: 5 }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={baseStyle.textHeader}>Inscription Ariary.net</Text>
            </View>
          </View>
          <View style={[style.container, { backgroundColor: "#eee" }]}>
            <View style={style.stepIndicator}>
              <StepIndicator
                customStyles={firstIndicatorStyles}
                currentPosition={this._getPage()}
                labels={["Identité", "Contact", "Sécurité"]}
                stepCount={3}
              />
            </View>

            <ViewPager
              ref="viewpager"
              style={{ flex: 1 }}
              dataSource={this.getDataPages()}
              renderPageIndicator={this.renderPageIndicators}
              onChangePage={page => {
                this.setState({ page: page });
              }}
              locked
              renderPage={this.renderViewPagerPage.bind(this)}
            />
            <View style={style.bottom}>
              <TouchableOpacity
                style={style.button}
                onPress={() => {
                  this._goBack();
                }}
              >
                <View style={style.contenuebtn}>
                  <Icon
                    type="material-icon"
                    name="keyboard-arrow-left"
                    size={30}
                    color="#fff"
                  />
                  <Text style={style.buttonText}>Précédent</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.button}
                onLongPress={() => {
                  this._goNext();
                }}
                onPress={() => {
                  this._goNext();
                }}
                disabled={!this.state.next}
              >
                <View style={style.contenuebtn}>
                  <Text style={style.buttonText}>Suivant</Text>
                  <Icon
                    type="material-icon"
                    name="keyboard-arrow-right"
                    size={30}
                    color="#fff"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.loading && (
            <View
              style={{
                backgroundColor: "rgba(44, 62, 80,0.5)",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <ActivityIndicator size="large" animating={true} color="blue" />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "900",
                  fontSize: 20,
                  color: "#FFF"
                }}
              >
                Enregistrement encours...
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  },
  page: {
    width: deviceWidth
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    backgroundColor: "#00BF9A"
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center"
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  contenuebtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MainInscription;
