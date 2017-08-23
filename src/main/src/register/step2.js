//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styles from "../../styles/StarterStyles";
import styleBase from "../../styles/Styles";
import Services from "../services/services";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Icon, Button } from "react-native-elements";
import data from "../../data/dataName";
import EStyleSheet from "react-native-extended-stylesheet";
import { WarningInput } from "../../components/warning";

const settingImage = require("../../images/icons/settings.png");
const backHeader = require("../../images/backHeaderSetting.jpg");

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
      value: "",
      alreadyEdit: false,
      warning: null,
      withError: false
    };
  }

  render() {
    return (
      <View style={styleBase.containerBase}>
        <View style={style.header}>
          <Image
            style={[style.backHeader]}
            source={backHeader}
            resizeMode="cover"
          >
            <View style={styleBase.centered}>
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
        <ScrollView contentContainerStyle={[styles.data, styleBase.centered]}>
          <View style={styles.felicitationContainer}>
            <Text style={[styles.felicitation, styleBase.textCenter]}>
              Félicitation
            </Text>
          </View>
        </ScrollView>
        <View style={[styleBase.alignCentered, styles.newUserButtonContainer]}>
          <Button
            title="Précédent"
            icon={{ name: "arrow-back" }}
            backgroundColor="rgba(230, 126, 34,1.0)"
            onPress={console.log("meme")}
          />
          <Button
            title="Suivant"
            iconRight
            icon={{ name: "arrow-forward" }}
            backgroundColor="rgba(230, 126, 34,1.0)"
            onPress={console.log("meme")}
          />
        </View>
      </View>
    );
  }
}

const style = EStyleSheet.create({
  settingImageContainer: {
    width: "40%",
    height: "100%"
  },
  settingImage: {
    width: "100%",
    height: "100%"
  },
  backHeader: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    height: "10%",
    width: "100%"
  }
});
//make this component available to the app
export default Step2;
