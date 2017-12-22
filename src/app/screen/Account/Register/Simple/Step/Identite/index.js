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
  Text
} from "react-native";
import PropTypes from "prop-types";
import { Icon, FormLabel, FormInput, Button } from "react-native-elements";
const deviceWidth = Dimensions.get("window").width;
import DatePicker from "react-native-datepicker";

import { loginCss } from "../../../../../../assets/styles/index";

import styles from "./styles";

class Identite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      nom: '',
      prenom: '',
      datenaissance: '',
      loading: false,
      disabled: false,
    };
  }
  updateIdentity() {
    let identity = null;
    identity = {
      pseudo: this.state.pseudo,
      nom: this.state.nom,
      prenom: this.state.prenom,
      datenaissance: this.state.datenaissance,
    };
    this.props.updateIdentityState(identity);
  }
  componentWillMount() {
    let data = this.props.activity.props.navigation.state.params.data;
    this.setState({disabled: true});
    if (data != null) {
      this.setState({pseudo: data, disabled: false});
    }
  }

  render() {
    return (
      <View style={styles.viewIdentite}>
        <FormLabel containerStyle={{marginTop: 2}}>Pseudo</FormLabel>
        <FormInput
          placeholder="Entrer votre pseudo"
          tyle={[loginCss.input, {backgroundColor: 'transparent'}]}
          editable={this.state.disabled}
          value={this.state.pseudo}
          onChangeText={pseudo => this.setState({pseudo})}
          onEndEditing={() => this.updateIdentity()}
        />
        <FormLabel containerStyle={{marginTop: 2}}>Nom</FormLabel>
        <FormInput
          placeholder="Entrer votre nom"
          onChangeText={nom => this.setState({nom})}
          style={[loginCss.input, {backgroundColor: 'transparent'}]}
          onEndEditing={() => this.updateIdentity()}
        />
        <FormLabel containerStyle={{marginTop: 2}}>Prénom</FormLabel>
        <FormInput
          placeholder="Entrer votre prénom"
          onChangeText={prenom => this.setState({prenom})}
          style={[loginCss.input, {backgroundColor: 'transparent'}]}
          onEndEditing={() => this.updateIdentity()}
        />
        <FormLabel containerStyle={{marginTop: 2}}>Date de naissance</FormLabel>
        <DatePicker
          date={this.state.datenaissance}
          style={{width: deviceWidth - 40}}
          mode="date"
          placeholder="Selectionner une date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 15,
              top: 4,
              marginLeft: 5,
            },
            dateInput: {
              marginLeft: 50,
              alignSelf: 'center',
            },
          }}
          onDateChange={datenaissance => {
            this.setState({datenaissance});
            this.updateIdentity();
          }}
        />
      </View>
    );
  }
}
Identite.propTypes = {
  updateIdentityState: PropTypes.func,
  activity: PropTypes.object,
};
export default Identite;
