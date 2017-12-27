import React, {Component} from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Button,
  Icon,
  FormInput,
  FormLabel,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import Mybutton from '../../../../components/Buttons/SamButton';
import {baseStyle, loginCss} from '../../../../assets/styles/index';
import styles from './styles';
import {Utils, InscriptionService} from '../../../../services';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: '',
      phoneNumber: '',
      password: '',
      confpassword: '',
      email: '',
      compte: '',
      solde: 500,
      error: '',
      haserror: false,
      loading: false,
    };
  }

  loadInscription() {
    this.props.navigation.navigate('Inscription', {data: null});
  }
  componentDidMount() {
    this.setState({
      email: this.state.pseudo + '@ariary.net',
    });
  }

  async _loginTemp() {
    this.setState({loading: true});
    if (this._isEmptyField()) {
      try {
        let response=await InscriptionService._registrationTemporaire(this);
        this.setState({loading: false});
        this.props.navigation.navigate("RegisterPin", response);
      } catch (error) {
        this.setState({loading: false});
        Alert.alert("Erreur d'inscription", error.toString());
      }
    } else {
      this.setState({loading: false});
      Alert.alert('Erreur', 'Tous les champs sont requis');
    }
  }
  _isEmptyField() {
    return (
      this.state.pseudo != null ||
      this.state.password != null ||
      this.state.pseudo != '' ||
      this.state.confpassword != null ||
      this.state.confpassword != '' ||
      this.state.password != ''
    );
  }
  _validatePass() {
    try {
      Utils._isValidPass(this.state.password);
      this.setState({haserror: false});
    } catch (error) {
      Alert.alert('Erreur mot de passe', error.toString());
    }
  }
  _confirmPass() {
    if (this.state.password == this.state.confpassword) {
      this.setState({haserror: false});
    } else {
      Alert.alert(
        'Erreur mot de passe',
        'Les mots de passe ne correspondent pas'
      );
    }
  }

  handleActionLeft() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        
        <Header
          style={baseStyle.header}
          leftComponent={
            <Mybutton
              iconName="arrow-back"
              type="material-icon"
              onPress={() => this.handleActionLeft()}
              styleBtn={baseStyle.btnLeftHeader}
            />
          }
          centerComponent={
            <View style={baseStyle.headerBodyView}>
              <Text style={baseStyle.textHeader}>Ariary.net</Text>
            </View>
          }
        />
        <ScrollView>
          <View style={styles.contenuetmp}>
            <View style={styles.headingContainer}>
              <Icon
                name="user-circle-o"
                size={80}
                color="#FFF"
                type="font-awesome"
              />
              <Text style={styles.heading}>Compte temporaire</Text>
            </View>
            <FormLabel containerStyle={{marginTop: 8}}>Votre pseudo</FormLabel>
            <FormInput
              placeholder="Entrer votre pseudo"
              value={this.state.pseudo}
              style={loginCss.input}
              autoFocus={false}
              onChangeText={pseudo => this.setState({pseudo})}
              returnKeyType="next"
            />
            <FormLabel containerStyle={{marginTop: 8}}>Mot de passe</FormLabel>
            <FormInput
              placeholder="Entrer votre mot de passe"
              onChangeText={password => this.setState({password})}
              secureTextEntry
              style={loginCss.input}
              onEndEditing={() => {
                this._validatePass();
              }}
            />
            <FormLabel containerStyle={{marginTop: 8}}>
              Confirmer votre mot de passe
            </FormLabel>
            <FormInput
              placeholder="Entrer à nouveau votre mot de passe"
              onChangeText={confpassword => this.setState({confpassword})}
              secureTextEntry
              style={loginCss.input}
              onEndEditing={() => {
                this._confirmPass();
              }}
            />
            <Button
              onPress={() => this._loginTemp()}
              icon={{name: 'done'}}
              buttonStyle={{marginTop: 15, backgroundColor: '#00d07f'}}
              title="Continuer"
            />
            <Button
              onPress={() => this.loadInscription()}
              buttonStyle={{marginTop: 15, backgroundColor: '#00d07f'}}
              title="Je veux m'inscrire"
            />
          </View>
        </ScrollView>
        {this.state.loading &&
          <View style={styles.load}>
            <ActivityIndicator size="large" animating={true} color="#FFF" />
            <Text style={styles.textLoad}>Enregistrement encours...</Text>
          </View>}
      </View>
    );
  }
}

export default Main;
