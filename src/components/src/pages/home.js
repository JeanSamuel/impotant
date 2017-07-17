//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Style from '../../styles/MainStyles';
import QRCode from 'react-native-qrcode';
import {StackNavigator} from 'react-navigation';
import Board from '../keyboard/board'

// create a component
export default class Home extends Component {

    siding(){
        console.log('tonga ato oh')
        this.props.navigation.navigate('DrawerOpen')
    }


    static navigationOptions = {
        title : 'Home',
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
        titleStyle : Style.headerTitle,
        drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
    }

    constructor(props){
        super(props)
        this.state = {
            staticText : 'vola:1547865&num:',
            amount : '0',
            movies : [
                'http://www.eatlogos.com/alphabet_logos/png/vector_a_arrow_logo.png',
                'http://www.eatlogos.com/alphabet_logos/png/vector_a_arrow_logo.png',
                'http://www.eatlogos.com/alphabet_logos/png/vector_a_arrow_logo.png'
            ]
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
            
            <View style={Style.container}>
                <ScrollView style={Style.row}>
                    <View style = {Style.qrCodeContainer}> 
                        <Text style={Style.qrText}>
                            Toucher et copier ou prenez en photo avec le ClientVola pour recevoir de l'argent
                        </Text>

                        <QRCode
                        style = {Style.qrCodeData}
                        value={this.state.staticText + this.state.amount}
                        size={150}
                        bgColor='#000'
                        fgColor='white'/>
                    </View>

                    <View style = {Style.inputQrContainer}> 
                        <TextInput
                            autoFocus = {false}
                            keyboardType = {'numeric'}
                            style = {Style.input}
                            onChangeText={(text) => this.setAmount(text)}
                            value={this.state.amount}
                        />
                        
                    </View>
                    
                </ScrollView>
                <Board movies={this.state.movies}/>
            </View>
        );
    }
    
}

