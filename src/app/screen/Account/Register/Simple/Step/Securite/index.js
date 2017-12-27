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
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Icon,
  Button,
  FormInput,
  FormLabel,
  CheckBox,
} from 'react-native-elements';
import {loginCss, configStyles} from '../../../../../../assets/styles';
import styles from './styles';
import {UserService, Utils} from '../../../../../../services';

class Securite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmpassword: '',
      loading: false,
      description: null,
      checked: false,
    };
  }
  async updateSecurity() {
    let identity = this.props.activity.state.identity;
    let contact = this.props.activity.state.contact;
    let account_id = this.props.activity.state.account_id;
    let data = null;
    try {
      Utils._isValidPass(this.state.password);
      this._confirmPass();
      if (
        this.props.activity.props.navigation.state.params.data != null &&
        !this.state.checked
      ) {
        await UserService.verifyUser(
          identity.pseudo,
          this.state.password,
          this
        );
      }
      let security = {
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
      };
      data = {
        username: identity.pseudo,
        name: identity.nom,
        firstname: identity.prenom,
        birthday: identity.datenaissance,
        email: contact.email,
        phone: contact.tel,
        password: this.state.password,
      };
      if (account_id != null) {
        data = {
          account_id: account_id,
          username: identity.pseudo,
          role: 'simple',
          name: identity.nom,
          firstname: identity.prenom,
          birthday: identity.datenaissance,
          email: contact.email,
          phone: contact.tel,
          password: this.state.password,
        };
      }
      this.props.updateSecurityState(data);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    }
  }
  onCheckField() {
    this.setState({checked: !this.state.checked});
  }
  _confirmPass() {
    if (this.state.password != this.state.confirmpassword) {
      throw 'Les mots de passe ne correspondent pas';
    }
  }

  componentWillMount() {
    if (this.props.activity.props.navigation.state.params.data != null) {
      this.setState({
        description:
          'Entrez votre mot de passe lors de la création de votre compte temporaire et confirmer le',
      });
    }
  }

  render() {
    return (
        <View style={styles.viewContainer}>
          {this.state.description != null &&
            <CheckBox
              title="Enregistrer un nouveau mot de passe"
              checked={this.state.checked}
              onPress={() => this.onCheckField()}
            />}
          <FormLabel containerStyle={{marginTop: 8}}>Prénom</FormLabel>
          <FormInput
            placeholder="Entrer mot de passe"
            style={[loginCss.input, {backgroundColor: 'transparent'}]}
            secureTextEntry
            onChangeText={password => this.setState({password})}
            returnKeyType="done"
          />
          <FormLabel containerStyle={{marginTop: 8}}>
            Confirmation mot de passe
          </FormLabel>
          <FormInput
            placeholder="Entrer à nouveau votre mot de passe"
            onChangeText={confirmpassword => this.setState({confirmpassword})}
            style={[loginCss.input, {backgroundColor: 'transparent'}]}
            secureTextEntry
            returnKeyType="done"
            onEndEditing={() => this.updateSecurity()}
          />
        {this.state.loading &&
          <View style={configStyles.indicator}>
            <ActivityIndicator size="large" animating={true} color="#666" />
          </View>}
      </View>
    );
  }
}
Securite.propTypes = {
  updateSecurityState: PropTypes.func,
  activity: PropTypes.object,
};
export default Securite;
