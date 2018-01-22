import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import {
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
import Services from "../validationservices";

const deviceWidth = Dimensions.get("window").width;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhoto: "",
      cinPhoto: "",
      cinError: false,
      userError: false
    };
  }

  uploadPhoto = () => {
    ImageUpload._pickImage()
      .then(value => {
        this.setState({
          userPhoto: value.uri,
          userError: false
        });
      })
      .catch(error => {});
  };

  uploadCIN = () => {
    ImageUpload._pickImage()
      .then(value => {
        this.setState({
          cinPhoto: value.uri,
          cinError: false
        });
        this.checkValidation();
      })
      .catch(error => {});
  };

  takePhoto = () => {
    let photo = ImageUpload._takePhoto();
  };

  takeCIN = () => {
    let cin = ImageUpload._takePhoto();
  };

  goToNextStep = () => {
    let info = this.props.navigation.state.params;

    let data = {
      // connexion: info.connexion,
      // user: info.user,
      pieces: {
        userPhoto: this.state.userPhoto,
        cinPhoto: this.state.cinPhoto
      }
    };
    this.props.navigation.navigate("Step4", data);
  };

  checkValidation = () => {
    let services = new Services();
    this.setState({ cinError: services.checkSimpleData2(this.state.cinPhoto) });
    this.setState({
      userError: services.checkSimpleData2(this.state.userPhoto)
    });
  };

  sommeError = () => {
    if (this.state.userError === 0 && this.state.cinError === 0) {
      return true;
    }
    return false;
  };

  validAll() {
    this.checkValidation();
    let somme = this.sommeError();

    if (somme) {
      this.goToNextStep();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header position={2} title="Pièces justificatifs" />
        <ScrollView behavior="padding" style={styles.body}>
          <View style={styles.piecesjointesContainer}>
            <View style={styles.avatar}>
              {this.state.userPhoto ? (
                <Avatar
                  xlarge
                  rounded
                  source={{
                    uri: this.state.userPhoto
                  }}
                  activeOpacity={0.7}
                />
              ) : (
                <Icon
                  reverse
                  name="user-o"
                  type="font-awesome"
                  color="grey"
                  size={40}
                  onPress={this.uploadPhoto}
                />
              )}
            </View>
            <View style={styles.piecesjointes}>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importez ou prenez une photo
                </Text>
                <Text style={styles.pieceText}>de profil</Text>
                {this.state.userError ? (
                  <FormValidationMessage>
                    <Text style={styles.pieceText}>{this.state.userError}</Text>
                  </FormValidationMessage>
                ) : null}
              </View>
              <View style={styles.iconContainer}>
                <View>
                  <Icon
                    raised
                    name="upload"
                    type="font-awesome"
                    color="#f50"
                    onPress={this.uploadPhoto}
                    size={15}
                  />
                </View>
                <View>
                  <Icon
                    raised
                    name="camera"
                    type="font-awesome"
                    color="#f50"
                    onPress={this.takePhoto}
                    size={15}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.piecesjointesContainer}>
            <View style={styles.avatar}>
              {this.state.cinPhoto ? (
                <Avatar
                  xlarge
                  source={{
                    uri: this.state.cinPhoto
                  }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              ) : (
                <Icon
                  reverse
                  name="id-card-o"
                  type="font-awesome"
                  color="grey"
                  size={40}
                  onPress={this.uploadCIN}
                />
              )}
            </View>
            <View style={styles.piecesjointes}>
              <View style={styles.pieceTextCOntainer}>
                <Text style={styles.pieceText}>
                  Importer votre CIN ou Passeport
                </Text>
                <Text style={styles.pieceText}>(Recto-Verso)</Text>
                {this.state.cinError ? (
                  <FormValidationMessage>
                    <Text style={styles.pieceText}>{this.state.cinError}</Text>
                  </FormValidationMessage>
                ) : null}
              </View>
              <View style={styles.iconContainer}>
                <View>
                  <Icon
                    raised
                    name="upload"
                    type="font-awesome"
                    color="#f50"
                    onPress={this.uploadCIN}
                    size={15}
                  />
                </View>
                <View>
                  <Icon
                    raised
                    name="camera"
                    type="font-awesome"
                    color="#f50"
                    onPress={this.takeCIN}
                    size={15}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonLeft}>
          <Button
            small
            title="Retour"
            backgroundColor="transparent"
            onPress={() => this.props.navigation.goBack()}
            color="rgba(44, 62, 80,0.5)"
            fontSize={18}
            fontWeight={"bold"}
          />
          <Button
            small
            iconRight={{ name: "arrow-forward" }}
            title="Validation"
            backgroundColor={Colors.$secondaryColor}
            onPress={this.validAll.bind(this)}
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
    // flexDirection: "row",
    // justifyContent: "space-between",

    padding: 5
  },
  piecesjointesContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  pieceTextCOntainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  pieceText: {
    fontWeight: "bold",
    fontSize: 15
  },
  iconContainer: {
    backgroundColor: "rgba(189, 195, 199,0.3)",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  avatar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  }
});
