import React, {Component} from 'react';
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
} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, FormInput, FormLabel, Button} from 'react-native-elements';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import {loginCss} from '../../../../../../assets/styles/index';
import styles from './styles';
import {Utils} from '../../../../../../services';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: 'mg',
      email: '',
      phone: '+261',
      loading: false,
      erreur: '',
      haserror: false,
      phoneNumber: '',
    };
  }

  updateContact(value) {
    let contact = null;
    try {
      Utils._isValidMail(this.state.email);
      contact = {
        email: this.state.email,
        tel: Utils.getNumeric(value),
      };
      this.props.updateContactState(contact);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    }
  }

  validateContact() {
    try {
      this.setState({haserror: false});
      let value = this.state.phone;
      let ret = Utils._parsePhone(value, 'mg');
      this.setState({phone: value});
      this.updateContact(value);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    }
  }

  changeTextPhone(text) {
    try {
      var ret = Utils._parsePhone(text, 'mg');
      this.setState({phone: ret});
    } catch (error) {
      this.setState({phone: text});
    }
  }
  validatePhoneNumer() {
    try {
      Utils.validatePhoneNumer(this.state.phone);
    } catch (error) {
      this.setState({phone: null});
      Alert.alert('Erreur', error.toString());
    }
  }
  render() {
    return (
      <View style={styles.viewIdentite}>
        <FormLabel containerStyle={{marginTop: 0}}>Numéro Téléphone</FormLabel>
        <FormInput
          keyboardType="phone-pad"
          placeholder="Entrer un numéro tél"
          onChangeText={this.changeTextPhone.bind(this)}
          onEndEditing={this.validatePhoneNumer.bind(this)}
          value={this.state.phone}
          returnKeyLabel="next"
          onEndEditing={() => {
            try {
              Utils._isValidMail(this.state.email);
              this.validateContact();
            } catch (error) {
              Alert.alert('Erreur Mail', error.toString());
            }
          }}
        />
        <FormLabel containerStyle={{marginTop: 8}}>E-mail</FormLabel>
        <FormInput
          onChangeText={email => this.setState({email})}
          placeholder="example@email.com"
          value={this.state.email}
          style={[loginCss.input, {backgroundColor: 'transparent'}]}
          onEndEditing={() => this.validateContact()}
        />
      </View>
    );
  }
}
Contact.propTypes = {
  updateContactState: PropTypes.func,
  activity: PropTypes.object,
};
export default Contact;
