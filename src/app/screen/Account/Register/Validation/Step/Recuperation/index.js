import React, { Component } from "react";
import {
  StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  Alert,
  Text,
  Modal
} from "react-native";

import PropTypes from "prop-types";
import { Icon, FormInput, FormLabel } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";

import { loginCss } from "../../../../../../assets/styles/index";

import styles from "./styles";

import { Utils } from "../../../../../../services";

const regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{6,}$/";

class Recuperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      beneficiaire: 'aa147',
      numrec: '+261 34 84 002 78',
      mailrec: 'dd@bb.com',
      loading: false,
      cca2: 'mg',
      haserror: false,
      erreur: '',
      modalVisible: false,
    };
  }
  updateRecuperation() {
    this.setState({modalVisible: false});
    this.updateStateRec();
  }
  validatePhone() {
    try {
      this.setState({haserror: false});
      let ret = Utils._parsePhone(this.state.numrec, 'mg');
      if (this.refs.phone.isValidNumber()) {
        this.setState({numrec: value});
      } else {
        this.setState({
          haserror: true,
          erreur: 'Veuillez entrer un numéro téléphone valide',
        });
      }
    } catch (error) {
      Alert.alert('Erreur',error.toString());
    }
  }
  changeTextPhone(text) {
    try {
      var ret = Utils._parsePhone(text, 'mg');
      this.setState({numrec: ret});
    } catch (error) {
      this.setState({numrec: text});
    }
  }
  validatePhoneNumer() {
    try {
      Utils.validatePhoneNumer(this.state.phone);
    } catch (error) {
      this.setState({numrec: null});
      Alert.alert('Erreur', error.toString());
    }
  }
  updateStateRec() {
    let profile = this.props.activity.state.profile;
    let addresse = this.props.activity.state.addresse;
    let account_id = this.props.activity.state.account_id;
    let data = null;
    data = {
      account_id: account_id,
      numadresses: addresse.numadresses,
      rue: addresse.rue,
      lot: addresse.lot,
      codepostal: addresse.codepostal,
      ville: addresse.ville,
      pays: addresse.pays,
      precision_addr: addresse.precision_addr,
      cin: profile.cin,
      image_cin: profile.image_cin,
      avatar: profile.avatar,
      beneficiaire: this.state.beneficiaire,
      numrec: this.state.numrec,
      mailrec: this.state.mailrec,
      pickerResultCin: profile.pickerResultCin,
      pickerResultAvatar: profile.pickerResultAvatar,
    };
    this.props.updateRecuperation(data);
  }
  render() {
    return (
      <View style={styles.cont}>
        <FormLabel containerStyle={{marginTop: 0}}>
          Téléphone de récupération
        </FormLabel>
        <FormInput
          keyboardType="phone-pad"
          placeholder="Entrer un numéro tél"
          onChangeText={this.changeTextPhone.bind(this)}
          onEndEditing={this.validatePhoneNumer.bind(this)}
          value={this.state.numrec}
          returnKeyLabel="next"
        />
        <FormLabel containerStyle={{marginTop: 8}}>
          Mail de récupération
        </FormLabel>
        <FormInput
          placeholder="Mail de récupération"
          keyboardType="email-address"
          style={[loginCss.input, {backgroundColor: 'transparent'}]}
          onChangeText={mailrec => this.setState({mailrec})}
          returnKeyType="next"
          onEndEditing={() => {
            this.updateStateRec();
          }}
        />
        <FormLabel containerStyle={{marginTop: 8}}>
          Personne/Compte bénéficiaire en cas de déces
        </FormLabel>
        <FormInput
          placeholder="Personne/Compte bénéficiaire en cas de déces"
          style={[loginCss.input, {backgroundColor: 'transparent'}]}
          onChangeText={beneficiaire => this.setState({beneficiaire})}
          returnKeyType="next"
          onEndEditing={() => {
            this.updateRecuperation();
          }}
        />
      </View>
    );
  }
}
Recuperation.propTypes = {
  updateRecuperation: PropTypes.func,
};
export default Recuperation;
