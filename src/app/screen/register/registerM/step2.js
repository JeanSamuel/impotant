//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ListView,
  TouchableOpacity
} from "react-native";
import styles from "./registerStyles";
import { styleBase } from "../../../assets/styles";
import { RegisterServices } from "../../../services";
import Services from "../../../services/utils/services";
import { Icon, Button } from "react-native-elements";
import data from "../../../config/data/dataM";
import EStyleSheet from "react-native-extended-stylesheet";
import { MyButton } from "../../../components/button";

const vendorCheck = require("../../../assets/images/icons/vendorCheck.png");
const backHeader = require("../../../assets/images/backHeader.jpg");
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
      user_id: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getDataUser();
  }

  getDataUser() {
    let services = new Services();
    services
      .getData("user_id")
      .then(response => {
        this.setState({
          user_id: response
        });
      })
      .catch(error => {
        this.props.navigation.goBack();
      });
  }

  goToAssistant() {
    this.props.navigation.navigate("Assistant", { return: "Step2" });
  }

  goToHome() {
    let data = {
      user_id: this.state.user_id
    };
    let services = new Services();
    services
      .isNewUser(this.state.user_id)
      .then(response => {
        this.props.navigation.navigate("Drawer", data);
      })
      .catch(error => {
        //console.log("error", error);
      });
  }

  render() {
    return (
      <View style={styleBase.containerBase}>
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
                  {
                    fontSize: 25,
                    paddingLeft: 15,
                    backgroundColor: "transparent"
                  },
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
              Votre compte a été enregistré sous le nom de :{" "}
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {this.state.user_id}
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
              Vous pouvez passer tout de suite à l'accueil et reçevoir de
              l'argent mais vous pouvez aussi configurez votre compte dès
              maintenant
            </Text>
          </View>
        </ScrollView>
        <View>
          <View style={[style.buttonContainer]}>
            <MyButton
              text="Je passe à l'accueil"
              action={() => this.goToHome()}
              color="rgba(230, 126, 34,1.0)"
            />
            <Button
              title="Je configure mon compte"
              icon={{ name: "cogs", type: "font-awesome", color: "black" }}
              backgroundColor="transparent"
              textStyle={style.retourButtonText}
              onPress={() => this.goToAssistant()}
              underlayColor="#FFF"
              buttonStyle={{ marginTop: 10 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  retourButtonText: {
    color: "rgba(52, 73, 94,1.0)",
    fontSize: 18
  },
  webview: { flex: 1 },
  buttonContainer: {
    marginBottom: 20
  }
});

//make this component available to the app
export default Step2;
