//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { Icon, } from 'react-native-elements';
import { WebView } from 'react-native';
import { Constants } from 'expo';
import styleBase from '../../styles/Styles';

import { Permissions, Notifications } from 'expo';



const TOKEN = 'ExponentPushToken[5AQ172ILixXkR3_9oM9uTh]'
const PUSH_ENDPOINT = 'https://pushreactnative.herokuapp.com/tokens';

async function registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExponentPushTokenAsync();
  console.log('eto le tokeh', token)
  // POST the token to our backend so we can use it to send pushes from there
  var response = await fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
       },
       user: {
        username: 'Brent',
       },
    })
  }).catch((error) =>{
    console.log('error', error)
  });
  console.log('jsonData', response)
}
export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            value : '0'
        }
    }

    static navigationOptions =(navigation) => {
        return {
            title : 'AriaryPro',
            drawerLabel: 'Setting',
            drawerIcon : ({tintColor}) => <Icon name="info" size= {25} />,
            titleStyle : styleBase.headerTitle,
            headerRight: <Icon name="settings" color="#ecf0f1" size= {30} />,
        }
    }
  
  componentWillMount(){
    // registerForPushNotificationsAsync()
  }

  suscribeMe(){
    registerForPushNotificationsAsync(this.state.value)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Test notification 
        </Text>
        <TextInput 
            style = {{width : 100}}
            value = {this.state.value}
            onChangeText = {(value) => this.setState({value})}
        />
        <TouchableOpacity
          onPress={() => this.suscribeMe()}
        >
            <Text>Touch me</Text>
          </TouchableOpacity>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});