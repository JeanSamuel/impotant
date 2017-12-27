import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from 'react-native'
import PropTypes from 'prop-types'
import {configStyles, loginCss} from '../../../../assets/styles'
import {Utils, UserService} from '../../../../services'

// create a component
class EditMail extends Component {
  constructor () {
    super()
    this.state = {
      oldmail: '',
      mail: '',
      password: '',
      username: '',
      loading: false,
      userInfo: '',
      account_id: '',
      modalVisible: false
    }
  }
  async _validateChangeMail () {
    this.setState({loading: true})
    this._isEmptyPass()
    try {
      let dataUser = {
        account_id: this.state.account_id,
        username: this.state.username,
        email: this.state.mail,
        phone: this.state.userInfo.phone,
        name: this.state.userInfo.nom,
        firstname: this.state.userInfo.prenom,
        birthday: this.state.userInfo.birthday
      }
      const updated = await UserService.updateUserInfo(dataUser, this)
    } catch (error) {
      this.setState({loading: false})
      Alert.alert('Erreur de modification', error.toString())
    }
  }
  async componentWillMount () {
    try {
      let account_id = this.props.navigation.state.params.account_id
      let pseudo = this.props.navigation.state.params.pseudo
      const userinfo = await UserService.getUserInfo(account_id, this)
      this.setState({
        oldmail: userinfo.mail,
        account_id: account_id,
        userInfo: userinfo,
        username: pseudo
      })
    } catch (error) {
      // console.log(error);
    }
  }
  _isEmptyField () {
    if (this.state.mail == '' || this.state.mail == null) {
      throw ''
    }
  }
  _isEmptyPass () {
    if (this.state.password == '' || this.state.password == null) {
      throw 'Veuillez entrer votre mot de passe pour confirmer le changement'
    }
  }

  _renderPasswordView () {
    if (!this._isEmptyField()) {
      this.setState({modalVisible: true})
    } else {
      Alert.alert(
        'Info',
        "Il semble qu'aucune information n'est saisie. Voulez-vous annuler le changement?",
        [
          {text: 'Editer'},
          {text: 'Oui', onPress: () => this.props.navigation.goBack()}
        ]
      )
    }
  }

  async closeModal () {
    try {
      await UserService.verifyUser(
        this.state.username,
        this.state.password,
        this
      )
      await this._validateChangeMail()
      this.setState({modalVisible: false})
    } catch (error) {
      Alert.alert('Erreur', error.toString())
    }
  }
  render () {
    return (
      <View style={{}}>
        <View style={{}}>
          <View style={configStyles.header}>
            <Text style={configStyles.textHeader}>Editer votre e-mail</Text>
          </View>
          <View style={{padding: 15}}>
            <TextInput
              value={this.state.oldmail}
              style={configStyles.input}
              editable={false}
            />
          </View>
          <View style={{padding: 15}}>
            <TextInput
              placeholder='Nouveau mail'
              onChangeText={mail => this.setState({mail})}
              keyboardType='email-address'
              style={configStyles.input}
              onEndEditing={() => {
                this._renderPasswordView()
              }}
            />
          </View>
          <View
            style={[
              configStyles.footer
            ]}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[configStyles.touch,{marginLeft: '1%'}]}
            >
              <Text style={configStyles.touchtext}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this._renderPasswordView()
              }}
              style={configStyles.touch}
            >
              <Text style={configStyles.touchtext}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false})
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: false})}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}
          >
            <View
              style={{
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 10
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#eee',
                  paddingVertical: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                }}
              >
                <Text style={{textAlign: 'center', paddingHorizontal: 20}}>
                  Entrer votre mot de passe pour confirmer le changement de
                  votre mail
                </Text>
              </View>
              <View style={[{padding: 10, height: 60}]}>
                <TextInput
                  placeholder='Mot de passe de confirmation'
                  autoFocus
                  secureTextEntry
                  style={[
                    loginCss.input,
                    {textAlign: 'center', borderRadius: 10, height: 50}
                  ]}
                  onChangeText={password => {
                    this.setState({password: password})
                  }}
                  onEndEditing={() => {
                    this.closeModal()
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {this.state.loading &&
            <View style={configStyles.indicator}>
              <ActivityIndicator size='large' animating color='#666' />
            </View>}
        </Modal>
      </View>
    )
  }
}

// make this component available to the app
export default EditMail
