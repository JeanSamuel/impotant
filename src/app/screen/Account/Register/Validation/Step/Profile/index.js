import React, { Component } from "react";
import {
  StyleSheet,
  PixelRatio,
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Clipboard,
  TextInput,
  Alert,
  Text,
  ActivityIndicator,
  ScrollView
} from "react-native";

import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import Exponent, { Constants, ImagePicker, registerRootComponent } from "expo";
const deviceWidth = Dimensions.get("window").width;
import DatePicker from "react-native-datepicker";
import { loginCss } from "../../../../../../assets/styles";
import { ImageUpload } from "../../../../../../services";
import styles from "./styles";

const avatar = "avatar/";
const cinpasport = "personne/";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      cin: "",
      loading: false,
      image: null,
      profile: null,
      uploading: false,
      showprofile: false,
      showCin: false,
      account_id: "photos",
      pickerResultCin: null,
      pickerResultAvatar: null,
      error: null
    };
  }
  _isEmptyField() {
    return (
      this.state.cin == null ||
      this.state.image == null ||
      this.state.profile == null ||
      this.state.cin == "" ||
      this.state.image == "" ||
      this.state.profile == ""
    );
  }
  updateProfile() {
    let profile = null;
    if (!this._isEmptyField()) {
      profile = {
        cin: this.state.cin,
        pickerResultCin: this.state.pickerResultCin,
        pickerResultAvatar: this.state.pickerResultAvatar,
        image_cin: this.state.image + "",
        avatar: this.state.profile + ""
      };
    } else {
      Alert(
        "Erreur",
        "Veuillez compléter les informations démandées s'il vous plait!!!!"
      );
    }
    this.props.updateProfile(profile);
  }
  componentWillMount() {
    this.setState({ account_id: this.props.activity.state.account_id });
  }
  setCIN() {
    let cin = this.state.cin;
    if (cin.length != 12) {
      this.setState({ cin: "", error: "Veuillez entrez un numéro cin valide" });
    } else {
      this.setState({ cin: cin, error: null });
      this.setState({ showCin: true });
    }
  }
  render() {
    return (
      <View>
        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 30
          }}
        >
          <Text style={{ color: "#666", alignSelf: "center" }}>
            N° CIN ou Passeport
          </Text>
          {this.state.error != null && (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                alignSelf: "center",
                padding: 10
              }}
            >
              {this.state.error}
            </Text>
          )}

          <View style={loginCss.inputWrap}>
            <TextInput
              placeholder="N° CIN ou Passeport"
              autoFocus={true}
              keyboardType="numeric"
              style={[
                loginCss.input,
                { backgroundColor: "transparent", textAlign: "center" }
              ]}
              onChangeText={cin => this.setState({ cin })}
              onEndEditing={() => {
                this.setCIN();
              }}
              returnKeyType="done"
            />
          </View>

          {this.state.showCin && (
            <View style={{ backgroundColor: "#00BF9A" }}>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  padding: 10,
                  backgroundColor: "transparent",
                  fontWeight: "800",
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  width: "100%"
                }}
              >
                CIN ou Passeport recto-verso(JPEG,PNG)
              </Text>
              <View
                style={{
                  alignItems: "center",
                  alignItems: "center",
                  paddingVertical: 10
                }}
              >
                {this._maybeRenderImage()}
              </View>

              {!this.state.showprofile && (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "#00BF9A",
                    width: "100%"
                  }}
                >
                  <TouchableOpacity
                    style={[style.button]}
                    onPress={() => ImageUpload._pickImage("cin", this)}
                  >
                    <View style={style.contenuebtn}>
                      <Icon
                        type="material-icon"
                        name="photo-album"
                        size={40}
                        color="#fff"
                      />
                      <Text style={{ color: "white" }} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[style.button]}
                    onPress={() => ImageUpload._takePhoto("cin", this)}
                  >
                    <View style={style.contenuebtn}>
                      <Icon
                        type="material-icon"
                        name="photo-camera"
                        size={40}
                        color="#fff"
                      />
                      <Text style={{ color: "white" }} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {this.state.showprofile && (
            <View style={{ backgroundColor: "#00BF9A", marginTop: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  padding: 10,
                  backgroundColor: "transparent",
                  fontWeight: "800",
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  width: "100%"
                }}
              >
                Ajouter votre Photo de profile
              </Text>
              <View
                style={{
                  alignItems: "center",
                  alignItems: "center",
                  paddingTop: 10
                }}
              >
                {this._maybeRenderImageProfile()}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  backgroundColor: "#00BF9A",
                  width: "100%"
                }}
              >
                <TouchableOpacity
                  style={[style.button]}
                  onPress={() => ImageUpload._pickImage("avatar", this)}
                >
                  <View style={style.contenuebtn}>
                    <Icon
                      type="material-icon"
                      name="photo-album"
                      size={40}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.button]}
                  onPress={() => ImageUpload._takePhoto("avatar", this)}
                >
                  <View style={style.contenuebtn}>
                    <Icon
                      type="material-icon"
                      name="photo-camera"
                      size={40}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }
  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          width: 300,
          borderRadius: 3,
          shadowColor: "rgba(0,0,0,1)",
          shadowOpacity: 0.2,
          shadowOffset: { width: 10, height: 10 },
          shadowRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: 10
        }}
      >
        <View
          style={{
            overflow: "hidden",
            justifyContent: "center",
            backgroundColor: "#00BF9A",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 10
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 250, borderRadius: 10 }}
          />
          {/* <Text style={{textAlign:'center',color:'white',padding:20}}>Image cin/pasport</Text> */}
        </View>
      </View>
    );
  };
  _maybeRenderImageProfile = () => {
    let { profile } = this.state;
    if (!profile) {
      return;
    }
    return (
      <View
        style={{
          width: 300,
          borderRadius: 10,
          shadowColor: "rgba(0,0,0,1)",
          shadowOpacity: 0.2,
          shadowOffset: { width: 10, height: 10 },
          shadowRadius: 5,
          justifyContent: "center",
          backgroundColor: "#00BF9A",
          alignItems: "center",
          alignSelf: "center"
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 10
          }}
        >
          <Image
            source={{ uri: profile }}
            style={{ width: 300, height: 250, borderRadius: 10 }}
          />
          {/* <Text style={{textAlign:'center',color:'white',padding:20}}>Photos de Profil</Text> */}
        </View>
      </View>
    );
  };
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }
          ]}
        >
          <ActivityIndicator color="white" animating size="large" />
          <Text style={{ color: "white" }}>Upload encours</Text>
        </View>
      );
    }
  };
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    width: deviceWidth
  },
  button: {
    padding: 5,
    margin: "1%",
    backgroundColor: "transparent",
    borderRadius: 5,
    justifyContent: "center",
    width: "49%"
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center",
    padding: 20
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
Profile.propsTypes = {
  activity: PropTypes.object,
  updateProfile: PropTypes.func
};
export default Profile;
