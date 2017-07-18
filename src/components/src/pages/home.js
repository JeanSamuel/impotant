//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import Style from '../../styles/MainStyles';
import QRCode from 'react-native-qrcode';
import {StackNavigator} from 'react-navigation';
import Board from '../keyboard/board';
import NumberFormat from 'react-number-format';

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

    
    formatAmount(){

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
                            value='MGA'
                        />
                        <Text style = {Style.amount}>
                            {this.state.amount}
                        </Text>
                        <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                        <Icon
                            raised
                            name='remove'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => this.reinitializeAmount()} 
                        />
                    </View>
                    
                </ScrollView>
                <Board handler={this.handleKeyPress}/>
            </View>
        );
    }
    
}

