// import liraries
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import PropTypes from 'prop-types'
import { loginCss, configStyles } from '../../../../assets/styles'
import { Utils, UserService } from '../../../../services'
import DatePicker from 'react-native-datepicker'
const deviceWidth = Dimensions.get('window').width
// create a component
class EditAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nom: '',
      prenom: '',
      datenaissance: '',
      email: '',
      tel: '',
      accound_id: '',
      password: '',
      username: '',
      loading: false,
      username: '',
      userInfo: null,
      modalVisible: false
    }
  }
  async _validateChange() {
    this.setState({ loading: true })
    if (!this._isEmptyPass()) {
      try {
        let dataUser = {
          account_id: this.state.account_id,
          username: this.state.username,
          email: this.state.userInfo.mail,
          phone: this.state.tél,
          name: this.state.nom,
          firstname: this.state.prenom,
          birthday: this.state.birthday
        }
        dataUser = {
          account_id: this.state.userInfo.code,
          username: this.state.userInfo.username,
          email: this.state.userInfo.mail,
          phone: this.state.userInfo.phone,
          name: this.state.userInfo.nom,
          firstname: this.state.prenom,
          birthday: this.state.userInfo.birthday
        }
        const updated = await UserService.updateUserInfo(dataUser, this)
      } catch (error) {
        Alert.alert('Erreur', error)
      }
    } else {
      Alert.alert(
        'Erreur mot de passe',
        'Veuillez entrer votre mot de passe pour confirmer le changement'
      )
    }
  }
  async componentWillMount() {
    try {
      let account_id = this.props.navigation.state.params.account_id
      let pseudo = this.props.navigation.state.params.pseudo
      const userinfo = await UserService.getUserInfo(account_id, this)
      this.setState({
        account_id: userinfo.code,
        nom: userinfo.nom,
        prenom: '',
        datenaissance: userinfo.birthday,
        email: userinfo.mail,
        tel: userinfo.phone,
        accound_id: userinfo.code,
        username: userinfo.username,
        userInfo: userinfo
      })
    } catch (error) {
      // console.log(error);
    }
  }
  _isEmptyPass() {
    return this.state.password == '' || this.state.password == null
  }
  _isEmptyField() {
    return (
      this.state.nom == '' ||
      this.state.prenom == '' ||
      this.state.username == '' ||
      this.state.nom == null ||
      this.state.prenom == null ||
      this.state.username == null
    )
  }
  _renderPasswordView() {
    if (!this._isEmptyField()) {
      this.setState({ modalVisible: true })
    } else {
      Alert.alert(
        'Info',
        'Des infromation sont videsn. Voulez-vous annulez le changement?',
        [
          { text: 'Editer' },
          { text: 'Oui', onPress: () => this.props.navigation.goBack() }
        ]
      )
    }
  }

  async closeModal() {
    try {
      await UserService.verifyUser(
        this.state.username,
        this.state.password,
        this
      )
      await this._validateChange()
      this.setState({ modalVisible: false })
    } catch (error) {
      Alert.alert('Erreur', error.toString())
    }
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View style={configStyles.header}>
          <Text style={configStyles.textHeader}>Editer votre nom</Text>
        </View>
        <ScrollView>
          <FormLabel containerStyle={{ marginTop: 2 }}>Nom</FormLabel>
          <FormInput
            value={this.state.nom}
            placeholder='Entrer votre nom'
            onChangeText={nom => this.setState({ nom })}
            onEndEditing={() => {
              if (this.state.nom == '' || this.state.nom == null) {
                this.setState({ nom: this.state.userInfo.nom })
              }
            }}
            style={[loginCss.input, { backgroundColor: 'transparent' }]}
          />
          <FormLabel containerStyle={{ marginTop: 2 }}>Prénom</FormLabel>
          <FormInput
            value={this.state.prenom}
            placeholder='Entrer votre prénom'
            onChangeText={prenom => this.setState({ prenom })}
            style={[loginCss.input, { backgroundColor: 'transparent' }]}
          />
          <FormLabel containerStyle={{ marginTop: 2 }}>Email</FormLabel>
          <FormInput
            value={this.state.email}
            placeholder='Entrer votre email'
            onChangeText={email => this.setState({ email })}
            style={[loginCss.input, { backgroundColor: 'transparent' }]}
            onEndEditing={() => {
              if (this.state.email == '' || this.state.email == null) {
                this.setState({ email: this.state.userInfo.mail })
              }
            }}
          />
          <FormLabel containerStyle={{ marginTop: 2 }}>Téléphone</FormLabel>
          <FormInput
            value={this.state.tel}
            placeholder='Entrer votre téléphone'
            onChangeText={tel => this.setState({ tel })}
            style={[loginCss.input, { backgroundColor: 'transparent' }]}
            onEndEditing={() => {
              if (this.state.tel == '' || this.state.tel == null) {
                this.setState({ tel: this.state.userInfo.phone })
              }
            }}
          />
          <FormLabel containerStyle={{ marginTop: 2 }}>
            Date de naissance
            </FormLabel>
          <DatePicker
            date={this.state.datenaissance}
            style={{ width: deviceWidth - 40 }}
            mode='date'
            placeholder='Selectionner une date'
            format='YYYY-MM-DD'
            confirmBtnText='Confirmer'
            cancelBtnText='Annuler'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 15,
                top: 4,
                marginLeft: 5
              },
              dateInput: {
                marginLeft: 50,
                alignSelf: 'center'
              }
            }}
            onDateChange={datenaissance => {
              this.setState({ datenaissance })
            }}
          />
        </ScrollView>
        <View style={configStyles.footer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={configStyles.touch}
          >
            <Text style={configStyles.touchtext}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._renderPasswordView()}
            style={configStyles.touch}
          >
            <Text style={configStyles.touchtext}>Valider</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType='slide'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: false })}
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
                <Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
                  Entrer votre mot de passe pour confirmer le changement
                </Text>
              </View>
              <View style={[{ padding: 10, height: 60 }]}>
                <TextInput
                  placeholder='Mot de passe de confirmation'
                  autoFocus
                  secureTextEntry
                  style={[
                    loginCss.input,
                    { textAlign: 'center', borderRadius: 10, height: 50 }
                  ]}
                  onChangeText={password => {
                    this.setState({ password: password })
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
export default EditAll
