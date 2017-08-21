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
import { Icon } from "react-native-elements";
import data from "../../data/dataName";

const check = require("../../images/icons/Check.png");
const mark = require("../../images/icons/login2_mark.png");
const backHeader = require("../../images/backHeader.jpg");

// create a component
class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      alreadyEdit: false
    };
  }

  componentDidMount() {
    var type = Services.getRandomIntoArray(data.type);
    var name = Services.getRandomIntoArray(data.name);
    this.setState({ value: type + " " + name });
  }

  editFinished() {
    Keyboard.dismiss();
  }

  setValue(value) {
    this.setState({ value });
  }

  setEdited() {
    this.setState({ alreadyEdit: true });
  }

  editValue() {
    this.refs.input.focus();
    if (!this.state.alreadyEdit) {
      this.setValue("");
      this.setEdited();
    }
  }

  returnStarter() {
    this.props.navigation.navigate("Starter");
  }

  render() {
    return (
      <View style={styleBase.containerBase}>
        <Image style={[styles.header]} source={backHeader} resizeMode="cover">
          <View style={styleBase.centered}>
            <Image source={mark} style={styles.markMini} />
          </View>
          <View style={styleBase.centered}>
            <Text style={[styles.logoTextInline, styleBase.textWhiteCentered]}>
              {" "}Ariary.net
            </Text>
          </View>
        </Image>
        <ScrollView contentContainerStyle={[styles.data, styleBase.centered]}>
          <View style={styles.felicitationContainer}>
            <Text style={[styles.felicitation, styleBase.textCenter]}>
              Félicitation
            </Text>
          </View>
          <TouchableOpacity
            style={styles.listChecked}
            onPress={this.editFinished.bind(this)}
            activeOpacity={1}
          >
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  Nous venons de créer un compte pour vous
                </Text>
              </View>
            </View>
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  Nous avons aussi donné un nom à votre entreprise. Vous pouvez
                  le modifier si vous le souhaiter
                </Text>
              </View>
            </View>
            <View style={[styles.oneChecked]}>
              <Image source={check} style={styles.checkImage} />
              <View style={styles.checkTextContainer}>
                <Text style={styles.checkText}>
                  D'ici quelques secondes, vous pourrez déjà recevoir de
                  l'argent
                </Text>
              </View>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                ref="input"
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                style={styles.input}
                underlineColorAndroid="transparent"
                onSubmitEditing={this.editFinished.bind(this)}
                returnKeyType="go"
              />
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={this.editValue.bind(this)}
                activeOpacity={0.7}
              >
                <Icon name="edit" size={30} />
              </TouchableOpacity>
            </View>
            <KeyboardSpacer />
          </TouchableOpacity>
        </ScrollView>
        <View style={[styleBase.alignCentered, styles.newUserButtonContainer]}>
          <TouchableOpacity
            style={[
              styles.newUserButton,
              { backgroundColor: "rgba(230, 126, 34,1.0)" }
            ]}
            activeOpacity={0.7}
            onPress={this.returnStarter.bind(this)}
          >
            <View style={[styles.buttonContent]}>
              <Icon
                name="arrow-back"
                size={20}
                color="#FFF"
                style={{ marginHorizontal: 5 }}
              />
              <Text style={[styleBase.textWhite, styles.buttonText]}>
                Précédent
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.newUserButton,
              { backgroundColor: "rgba(230, 126, 34,1.0)" }
            ]}
            activeOpacity={0.7}
            onPress={this.editValue.bind(this)}
          >
            <View style={[styles.buttonContent]}>
              <Text style={[styleBase.textWhite, styles.buttonText]}>
                Je continue
              </Text>
              <Icon
                name="arrow-forward"
                size={20}
                style={{ marginHorizontal: 5 }}
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default NewUser;
