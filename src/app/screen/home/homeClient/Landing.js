import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  WebView,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { AuthSession, Constants} from 'expo'
import { Container } from '../../../components/ContainerC'
import { Logo } from '../../../components/Logo'
import { RoundedButton } from '../../../components/Buttons'
import { DoubleLineButton } from '../../../components/button'
import { Icon } from 'react-native-elements'
import { Login } from '../../login/index'

import styles from '../../starter/starterM/starterStyles'
import styleBase from '../../../assets/styles/styles'
import StarterButton from '../../starter/starterM/starterButton'
import moment from 'moment'
import { InscriptionService } from '../../../services'
const background = require('../../../assets/images/back3.jpg')
const mark = require('../../../assets/images/icons/logo-pro.png')
import { configStyles } from '../../../assets/styles'
import data from "../../../config/data/dataM";
import {NotificationServices} from '../../../services';
import Services from '../../../services/utils/services';
const { width } = Dimensions.get('window');
import {MessagePromptMini} from '../../../components/modal'

const uri = `${data.BASE_URL_Oauth}oauth2/authorize` +
  `?response_type=code&client_id=${data.client_id}&redirect_uri=${encodeURIComponent(data.redirect_uri)}&scope=all&state=xyz`;
export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      messageVisibleMini: false,
      error: false,
    }
  }

  componentWillMount(){

  }
  ChangeModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  getRefs(modal) {
    this.refs.modal.visible(false)
  }

  _handleResponse = (response)=>{
    console.log(response);
    try{
      console.log(response);
      if(response.type !== "success"){
        this.setState({
          loading: false,
          error: true,
          messageTitle: "Erreur",
          messageText: "Une erreur est survenue durant la tentative de connexion, ou la connexion a été annulée",
          color: "#FF9521",
          messageVisible: false,
          iconName: "info",
          messageVisibleMini :true,});
        return
      }
      let webstate = {url : response.event.url};
      let notif = new NotificationServices();
      let services = new Services();
      services
        .goLogin(webstate)
        .then(responseLogin => {
          this.setState({
            data: responseLogin,
          });
          this.setState({ loading: false });
          notif.loginForExpoToken(responseLogin.username);
          this.props.navigation.navigate('RegisterPin', responseLogin);
        })
        .catch(error => {
          throw error;
        });
    }catch(err){
      console.log(err);
      this.setState({
        loading: false,
        error: true,
        messageTitle: "Erreur",
        messageText: "Une erreur est survenue durant la tentative de connexion",
        color: "#FF9521",
        messageVisible: false,
        iconName: "info",
        messageVisibleMini :true,})
    }

  };
  async registerTemp() {
    this.setState({ loading: true })
    try {
      let response = await InscriptionService._registrationTemporaire(this)
      this.setState({ loading: false })
      this.props.navigation.navigate('RegisterPin', response)
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }
  _handleLogin (){
    let linkUri = AuthSession.getRedirectUrl();
    this.setState({loading: true});
    console.log(linkUri);
    AuthSession.startAsync({
     authUrl: uri
    }).then(result =>{
     this._handleResponse(result);
    })
  };
  removeModal() {
    this.setState({messageVisibleMini: false});
  }
  render() {
    return (
      <View>
        <Image
          source={background}
          style={[styles.background, styleBase.centered]}
          resizeMode='cover'
        >
          <ScrollView contentContainerStyle={[{ flex: 1 }, styleBase.centered]}>
            <ScrollView />
            <Logo />
            <ScrollView />
            <DoubleLineButton
              action={() => this.props.navigation.navigate('Register')}
              firstLine="Je m'inscris"
              secondLine="Je n'ai pas encore de compte"
              color='rgba(22, 160, 133,1.0)'
              navigation={this.props.navigation}
            />
            <DoubleLineButton
              action={()=> this._handleLogin()}
              firstLine='Je me connecte'
              secondLine='Je possède déjà un compte'
              color='rgba(41, 128, 185,1.0)'
            />
            <View style={{ height: 20 }} />
          </ScrollView>
        </Image>
        {this.state.loading &&
          <View style={configStyles.indicator}>
            <ActivityIndicator size='large' animating color='#00d07f' />
          </View>}
        {this.state.messageVisibleMini ? (
          <MessagePromptMini
            onRequestClose={() => this.removeModal()}
            iconName={this.state.iconName}
            loading={this.state.loading}
            text={this.state.messageText}
            title={this.state.messageTitle}
            error={this.state.error}
            color={this.state.color}
          />
        ) : null}
      </View>
    )
  }
}
