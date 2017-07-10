import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';
import Style from '../../styles/Styles';

import {AppRegistry,StyleSheet,View,TextInput, Text, Image} from 'react-native';
 
export default class Main extends Component {

    static navigationOptions = {
        tabBarIcon : () =>{
            return <Image source={require('../../images/icons/sun.png')} />
        }
    }

  state = {
    text: 'Toavina - 20000',
  };
 
  render() {
    return (
      <View style = {Style.view}>
        
        <View style = {Style.qrCode}>
            <QRCode
            value={this.state.text}
            size={200}
            bgColor='#000'
            fgColor='white'/>
        </View>
        <TextInput
            style = {Style.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        
      </View>
    );
  };
}
 
