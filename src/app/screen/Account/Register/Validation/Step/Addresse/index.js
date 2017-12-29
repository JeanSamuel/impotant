/**
 * Jean Samuel RANDRIANASOLO
 */
import React, { Component } from 'react';
import { View, ScrollView, Text, Modal } from 'react-native';
import { Icon, FormInput, FormLabel, Button } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import PropTypes from 'prop-types';
import { loginCss } from '../../../../../../assets/styles/index';

import styles from './styles';

class Addresse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numadresses: '',
      rue: '',
      lot: '',
      codepostal: '101',
      ville: 'Antananarivo',
      pays: 'Madagascar',
      precision_addr: '',
      loading: false,
      cca2: 'mg',
      modalVisible: false,
    };
  }

  showCountries() {
    this.refs.countryPicker.openModal();
  }

  selectCountry(country) {
    this.setState({ pays: country.name });
  }

  updateAddresse() {
    this.setState({ modalVisible: false });
    this.updateStateAdresse();
  }
  updateStateAdresse() {
    let addresse = {
      numadresses: this.state.numadresses,
      rue: this.state.rue,
      lot: this.state.lot,
      codepostal: this.state.codepostal,
      ville: this.state.ville,
      pays: this.state.pays,
      precision_addr: this.state.precision_addr,
    };
    this.props.updateAddresse(addresse);
  }
  render() {
    return (
      <View style={styles.viewContainer}>
        <FormLabel containerStyle={{ marginTop: 8 }}>Pays</FormLabel>
        <FormInput
          placeholder="Entrer votre pays"
          onChangeText={pays => this.setState({ pays })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Ville</FormLabel>
        <FormInput
          placeholder="Entrer votre ville"
          onChangeText={ville => this.setState({ ville })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Code postale</FormLabel>
        <FormInput
          placeholder="Code Postal"
          keyboardType="numeric"
          onChangeText={codepostal => this.setState({ codepostal })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Rue</FormLabel>
        <FormInput
          placeholder="Entrer la rue"
          onChangeText={rue => this.setState({ rue })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>Lot</FormLabel>
        <FormInput
          placeholder="Entrer votre lot"
          onChangeText={lot => this.setState({ lot })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />

        <FormLabel containerStyle={{ marginTop: 8 }}>
          Numéro de l'adresse
        </FormLabel>
        <FormInput
          placeholder="Entrer votre numéro de l'adresse"
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          keyboardType="numeric"
          onChangeText={numadresses => this.setState({ numadresses })}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
        <FormLabel containerStyle={{ marginTop: 8 }}>
          Precision de l'adresse
        </FormLabel>
        <FormInput
          placeholder="Entrer la précision de l'adresse"
          onChangeText={precision_addr => this.setState({ precision_addr })}
          style={[
            loginCss.input,
            { backgroundColor: 'transparent' },
          ]}
          returnKeyType="done"
          onEndEditing={() => {
            this.updateStateAdresse();
          }}
        />
      </View>
    );
  }
}
Addresse.propTypes = {
  updateAddresse: PropTypes.func,
};
export default Addresse;
