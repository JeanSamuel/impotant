import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';
import Style from '../../styles/Styles';
import {Icon} from 'react-native-elements';

import {AppRegistry,StyleSheet,View,TextInput, Text, Image} from 'react-native';
 
export default class Main extends Component {

    static navigationOptions = {
        title : 'Main',
        
        tabBarLabel : 'Main',
        tabBarIcon : ({tintColor}) => <Icon name="list" size= {35} />
    }

  constructor(props){
    super(props)
    this.state = {
      staticText : 'vola:1547865&num:',
      amount : '0'
    }
  }

  setAmount(amount){
    if(amount == ''){
      this.state.amount = '0'
    }
    this.setState({amount})

  }

  render() {
    return (
      <View style = {Style.view}>
        
        <View style = {Style.qrCode}>
            <QRCode
            value={this.state.staticText + this.state.amount}
            size={200}
            bgColor='#000'
            fgColor='white'/>
        </View>
        <TextInput
            keyboardType = {'numeric'}
            style = {Style.input}
            onChangeText={(text) => this.setAmount(text)}
            value={this.state.amount}
        />
        
      </View>
    );
  };
}
 
