//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import Style from '../../styles/MainStyles';
import QRCode from 'react-native-qrcode';
import {StackNavigator} from 'react-navigation';


// create a component
export default class Home extends Component {

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
        }
    }

    handleKeyPress = (label) => {
        if(this.state.amount == '0'){
            this.setState({amount : label})
        }else{
            this.setState({amount : this.state.amount + label})
        }  
    }

    
    setAmount(amount){
        var test = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1,')
        console.log(test)
        this.setAmount({amount})
    }

    formatNumber(number){
        
    }

    reinitializeAmount(){
        this.setState({amount : '0'})
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

                   
                    <View style = {Style.TextQrContainer}> 
                    <Badge
                        containerStyle={{ backgroundColor: 'violet'}}
                        value='Amount'
                    />
                    <TextInput
                        style = {Style.input}
                        keyboardType = 'numeric'
                        autoFocus = {true}
                        value = {this.setState.amount}
                        onChange = {(text) => this.setAmount(text)}
                        />
                    <Icon
                        raised
                        name='remove'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.reinitializeAmount()} 
                    />
                </View>
                </ScrollView>
                 
            </View>
        );
    }
    
}

