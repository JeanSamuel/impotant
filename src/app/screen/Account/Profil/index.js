import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native'

import PropTypes from 'prop-types'
import Mybutton from '../../../components/Buttons/SamButton'
import {Icon, Header, Button} from 'react-native-elements'
import {Notifications} from 'expo'
import {loginCss, configStyles, baseStyle} from '../../../assets/styles'
import {Utils, UserService, InscriptionService} from '../../../services'
const deviceWidth = Dimensions.get('window').width

// create a component
class ProfileAriary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      data: {
        code: '',
        username: '',
        name: '',
        firstname: '',
        birthday: '',
        mail: '',
        phone: '',
        password: '',
        solde: '0',
        avatar: null
      },
      isTemp: null,
      spinner: false
    }
  }
  async componentWillMount () {
    try {
      let data = await Utils.getItem('userInfo')
      data = JSON.parse(data)
      let role = UserService.getRoles(data.roles[0])
      this.setState({data: data, isTemp: role})
    } catch (error) {
      // console.log(error);
    }
  }
  getAmount () {
    return Utils.formatNumber(this.state.data.solde)
  }
  async loadConfig () {
    this.setState({loading: true})
    try {
      await UserService.loadConfig(this)
    } catch (error) {
      // console.log(error);
    } finally {
      this.setState({loading: false})
    }
  }
  async refreshData () {
    this.setState({spinner: true})
    try {
      await UserService.refreshData(this.state.data.code, this)
      let data = await Utils.getItem('userInfo')
      data = JSON.parse(data)
      let role = UserService.getRoles(data.roles[0])
      this.setState({data: data, isTemp: role, spinner: false})
    } catch (error) {
      this.setState({spinner: false})
      // console.log(error);
    }
  }
  loadInscription () {
    this.props.navigation.navigate('Inscription', {
      data: this.state.data.username
    })
  }
  loadValidCompteConfig () {
    this.props.navigation.navigate('Validation')
  }
  getRoles () {
    let ret = null
    switch (this.state.isTemp) {
      case 1:
        ret = 'Temporaire'
        break
      case 2:
        ret = 'Simple'
        break
      case 3:
        ret = 'Validé'
        break
    }
    return ret
  }
  handleActionLeft () {
    this.props.navigation.navigate('DrawerOpen')
  }
  renderCenterComponent () {
    return (
      <View style={baseStyle.headerBodyView}>
        <Text style={baseStyle.textHeader}>Mon Profil</Text>
      </View>
    )
  }
  renderRightComponent () {
    return (
      <View style={baseStyle.headerRightView}>
        <Mybutton
          iconName='settings'
          type='material-icon'
          onPress={() => this.loadConfig()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
        <Mybutton
          iconName='share-alt'
          type='font-awesome'
          size={25}
          onPress={() => Utils.ShareApp()}
          styleBtn={[baseStyle.btnLeftHeader]}
        />
      </View>
    )
  }
  renderLeftComponent () {
    return (
      <Mybutton
        iconName='ios-menu'
        type='ionicon'
        onPress={() => this.handleActionLeft()}
        styleBtn={[baseStyle.btnLeftHeader]}
      />
    )
  }
  render () {
    return (
      <View style={{backgroundColor: '#eee',flex:1}}>
        <Header
          style={baseStyle.header}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.spinner}
              onRefresh={() => this.refreshData()}
            />
          }
        >
          <View style={{backgroundColor: '#eee'}}>
            <View style={{marginTop: '0%'}}>
              <View
                style={[
                  configStyles.header,
                  {padding: 0, width: '100%', backgroundColor: 'transparent',borderBottomWidth:2,borderBottomColor:'#aaa'}
                ]}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15
                  }}
                >
                  <View style={loginCss.imageLogin}>
                    {this.state.data.avatar == null &&
                      <Icon
                        name='user-circle-o'
                        size={100}
                        color='#00d07f'
                        type='font-awesome'
                      />}
                    {this.state.data.avatar != null &&
                      <TouchableOpacity
                        onPress={() => {
                          // console.log('Avatar');
                        }}
                      >
                        <Image
                          source={{uri: this.state.data.avatar}}
                          style={{width: 150, height: 150, borderRadius: 75}}
                        />
                      </TouchableOpacity>}
                  </View>
                  <Text style={[configStyles.textHeader, {fontSize:22,fontWeight:'500',color:'#000'}]}>
                    Compte {this.getRoles()}
                  </Text>
                  <Text style={[configStyles.textHeader, {color: '#aaa',fontWeight:'500'}]}>
                    Solde : {this.getAmount()} Ar
                  </Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>Compte</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.code}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>Pseudo</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.username}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>Nom</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.nom}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>Date de naissance</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.birthday}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>E-mail</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.mail}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <View style={styles.w2}>
                    <Text>Téléphone</Text>
                  </View>
                  <View style={styles.w3}>
                    <Text style={{color: '#666', textAlign: 'right'}}>
                      {this.state.data.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[configStyles.footer, {flexDirection: 'column',justifyContent:'flex-end'}]}>
          {this.state.isTemp == 2 &&
            <TouchableOpacity
              onPress={() => this.loadValidCompteConfig()}
              style={[
                configStyles.touch,
                {
                  width: '100%',
                  backgroundColor: '#00d07f'
                }
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <Icon
                  size={30}
                  name='ios-settings-outline'
                  color='white'
                  style={{paddingVertical: 10}}
                  type='ionicon'
                />
                <Text style={[configStyles.touchtext, {color: 'white'}]}>
                  Valider mon compte
                </Text>
              </View>
            </TouchableOpacity>}
          {this.state.isTemp == 1 &&
            <TouchableOpacity
              onPress={() => this.loadInscription()}
              style={[
                configStyles.touch,
                {
                  width: '100%',
                  backgroundColor: '#00d07f'
                }
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}
              >
                <Image
                  source={require('../../..//assets/images/ariary.png')}
                  style={{width: 25, height: 25, marginVertical: 10}}
                  resizeMode='contain'
                />
                <Text style={[configStyles.touchtext, {color: 'white'}]}>
                  Inscription simple
                </Text>
              </View>
            </TouchableOpacity>}
        </View>
        {this.state.loading &&
          <View style={configStyles.indicator}>
            <ActivityIndicator size='large' animating color='#666' />
          </View>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  w1: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  w2: {
    width: '40%'
  },
  w3: {
    width: '50%'
  }
})

// make this component available to the app
export default ProfileAriary
