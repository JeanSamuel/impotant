import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Icon,
  Avatar
} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { NavigationActions } from "react-navigation";
import { Header } from "../allSteps";
import { ImageUpload } from "../../../services";
import Colors from "../../../config/constants/colors";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  goToNextStep = () => {
    let info = this.props.navigation.state.params;
    console.log(this.props);

    let data = {
      connexion: info.connexion,
      user: info.user,
      pieces: {
        userPhoto:
          "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg",
        cinPhoto:
          "http://img.over-blog-kiwi.com/1/21/51/02/20140916/ob_0c7fd9_cni.jpg"
      }
    };
    this.props.navigation.navigate("Step4", data);
  };

  uploadPhoto = () => {
    console.log("zrezr");
    ImageUpload._pickImage("cin", this);
  };

  uploadCIN = () => {
    console.log("ezrt");
    ImageUpload._pickImage("avatar", this);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header position={2} title="Pièces justificatifs" />
        <ScrollView behavior="padding" style={styles.body}>
          <View style={styles.piecesjointesContainer}>
            <TouchableOpacity
              style={styles.piecesjointes}
              onPress={this.uploadPhoto}
            >
              <View>
                <Avatar
                  medium
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
                  }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              </View>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importer votre photo d'identité
                </Text>
              </View>
            </TouchableOpacity>
            <FormValidationMessage />
          </View>
          <View style={styles.piecesjointesContainer}>
            <TouchableOpacity
              style={styles.piecesjointes}
              onPress={this.uploadCIN}
            >
              <View>
                <Avatar
                  medium
                  source={{
                    uri:
                      "http://img.over-blog-kiwi.com/1/21/51/02/20140916/ob_0c7fd9_cni.jpg"
                  }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              </View>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importer votre CIN ou Passeport
                </Text>
                <Text style={styles.pieceText}>(Recto-Verso)</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={this.goToNextStep}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Validation"
            backgroundColor={Colors.$secondaryColor}
            onPress={this.goToNextStep}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  buttonLeft: {
    backgroundColor: "rgba(189, 195, 199,0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  piecesjointes: {
    flexDirection: "row",
    backgroundColor: "rgba(189, 195, 199,0.3)",

    padding: 10
  },
  piecesjointesContainer: {
    margin: 20
  },
  pieceTextCOntainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  pieceText: {
    fontWeight: "bold",
    fontSize: 15
  }
});
