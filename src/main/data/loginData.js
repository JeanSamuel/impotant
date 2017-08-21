import { StyleSheet } from 'react-native';  

export default {
  client_id : 'ariarynet',
  client_secret : 'ariarynetpass',
  redirect_uri : 'http://auth.vola.mg/index.php/',
  scope : 'userinfo',
  grant_type: 'authorization_code',
  uri : 'http://auth.vola.mg/oauth2/authorize?response_type=code&state=xyz&client_id=ariarynet&redirect_uri=http://auth.vola.mg/index.php/&scope=userinfo'
  
}