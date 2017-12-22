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
import { Icon, FormLabel, FormInput } from "react-native-elements";
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
      cin: '',
      loading: false,
      image: null,
      profile: null,
      uploading: false,
      showprofile: false,
      showCin: false,
      account_id: 'photos',
      pickerResultCin: null,
      pickerResultAvatar: null,
      error: null,
    };
  }
  updateProfile() {
    let profile = null;
    profile = {
      cin: this.state.cin,
      pickerResultCin: this.state.pickerResultCin,
      pickerResultAvatar: this.state.pickerResultAvatar,
      image_cin: this.state.image + '',
      avatar: this.state.profile + '',
    };
    console.log(profile);
    this.props.updateProfile(profile);
  }
  componentWillMount() {
    this.setState({account_id: this.props.activity.state.account_id});
  }
  setCIN() {
    let cin = this.state.cin;
    if (cin.length != 12) {
      Alert.alert('Erreur', 'Veuillez entrez un numéro cin valide');
    } else {
      this.setState({cin: cin, error: null});
      this.setState({showCin: true});
    }
  }
  render() {
    return (
      <View style={styles.width}>
        <View style={styles.viewP}>
          <FormLabel containerStyle={{marginTop: 8}}>
            N° CIN ou Passeport
          </FormLabel>
          <FormInput
            placeholder="N° CIN ou Passeport"
            keyboardType="numeric"
            style={[
              loginCss.input,
              {backgroundColor: 'transparent'},
            ]}
            onChangeText={cin => this.setState({cin})}
            onEndEditing={() => {
              this.setCIN();
            }}
            returnKeyType="done"
          />
          {this.state.showCin &&
          <View style={{backgroundColor: '#00BF9A'}}>
            <Text style={styles.textCin}>
              CIN ou Passeport recto-verso(JPEG,PNG)
            </Text>
            <View style={styles.renderViewIm}>
              {this._maybeRenderImage()}
            </View>

            {!this.state.showprofile &&
            <View style={styles.btn}>
              <TouchableOpacity
                style={[style.button]}
                onPress={() => ImageUpload._pickImage('cin', this)}
              >
                <View style={style.contenuebtn}>
                  <Icon
                    type="material-icon"
                    name="photo-album"
                    size={40}
                    color="#fff"
                  />
                  <Text style={{color: 'white'}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.button]}
                onPress={() => ImageUpload._takePhoto('cin', this)}
              >
                <View style={style.contenuebtn}>
                  <Icon
                    type="material-icon"
                    name="photo-camera"
                    size={40}
                    color="#fff"
                  />
                  <Text style={{color: 'white'}} />
                </View>
              </TouchableOpacity>
            </View>}
          </View>}

          {this.state.showprofile &&
          <View style={{backgroundColor: '#00BF9A', marginTop: 10}}>
            <Text style={styles.text}>Ajouter votre Photo de profile</Text>
            <View style={styles.viewrender}>
              {this._maybeRenderImageProfile()}
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={[style.button]}
                onPress={() => ImageUpload._pickImage('avatar', this)}
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
                onPress={() => ImageUpload._takePhoto('avatar', this)}
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
          </View>}
        </View>
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }
  _maybeRenderImage = () => {
    let {image} = this.state;
    if (!image) {
      return;
    }

    return (
      <View style={styles.imagerend}>
        <View style={styles.imgo}>
          <Image
            source={{uri: image}}
            style={{width: 300, height: 250, borderRadius: 10}}
          />
          {/* <Text style={{textAlign:'center',color:'white',padding:20}}>Image cin/pasport</Text> */}
        </View>
      </View>
    );
  };
  _maybeRenderImageProfile = () => {
    let {profile} = this.state;
    if (!profile) {
      return;
    }
    return (
      <View style={styles.imagerend}>
        <View style={styles.imgo}>
          <Image
            source={{uri: profile}}
            style={{width: 300, height: 250, borderRadius: 10}}
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
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            },
          ]}
        >
          <ActivityIndicator color="white" animating size="large" />
          <Text style={{color: 'white'}}>Upload encours</Text>
        </View>
      );
    }
  };
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: deviceWidth,
  },
  button: {
    padding: 5,
    margin: '1%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'center',
    width: '49%',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    padding: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenuebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
Profile.propsTypes = {
  activity: PropTypes.object,
  updateProfile: PropTypes.func,
};
export default Profile;
