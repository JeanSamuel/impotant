//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, Clipboard } from 'react-native';
import {StackNavigator} from 'react-navigation'
import QRCode from 'react-native-qrcode-svg';
import { Icon, Badge } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DrawerButton from '../slideBar/drawerButton';
import Solde from './solde';
import styles from '../../styles/HomeStyles';
import Toast from 'react-native-easy-toast';
 


// create a component
class Home extends Component {

    static navigationOptions = {
        title : 'Home',
        headerRight: <Icon name="share" color="#ecf0f1" size= {30} />,
        titleStyle : styles.headerTitle,
        drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
    }


    constructor(props){
        super(props)
        this.state = {
            type : 'vola',
            data : {
                'accesToken' : 'Azertyukjhgfd245SD3HBVS35FZF52EZ224SFGBVCHNBVC',
                'currency' :  'mga',
                'senderId' : '1'
            },
            amount : '0',
            jsonData : '0'
        }
    }

    
    componentDidMount() {
        this.setJsonData(this.generateQrCodeText())
    }

    generateQrCodeText(){
        let myData = {
            'type' : this.state.type,
            'data' : this.state.data,
            'amount' : this.state.amount
        }
        return JSON.stringify(myData)
    }

    setJsonData(jsonData){
        this.setState({jsonData})
    }

    setUpdate(amount){
        // amount = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
        this.setState({
            amount : amount,
            jsonData : this.generateQrCodeText()
        })
        // console.log(this.state)
    }
    copyToClipBoard(){
        Clipboard.setString(this.state.jsonData)
        this.refs.input.focus()
        this.refs.toast.show('Copié dans le presse-papier !!')

    }

    render() {
        let logoFromFile = require('../../images/icons/logo.png');
        return (
            <View  style={styles.container}>
                <Toast 
                    ref="toast"
                    position='top'
                    positionValue={20}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    activeOpacity={0.5}
                />
                <View style={styles.amountContainer}>
                    <View>
                        <Image
                            style = {{width : 70, height:70}}
                         source = {{uri : 'http://firebirdsql.org/file/about/firebird-logo300.png'}} 
                         />
                    </View>
                    <View>
                        <Text style={styles.amountLabel}>Amount</Text>
                            
                        <TextInput
                            ref="input"
                            value = {this.state.amount}
                            style={styles.amount}
                            autoFocus= {true}
                            keyboardType = 'numeric'  
                            onChangeText = {(text) => this.setUpdate(text)}
                        />
                    </View>
                </View>
                    
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onLongPress = {() => this.copyToClipBoard()}
                    >
                        <QRCode  
                            value={this.generateQrCodeText()}
                            logo = {logoFromFile}
                            size={170}
                        />    
                    </TouchableOpacity>  
                    <Text style={styles.qrText}>
                            Prenez en photo avec le ClientVola pour recevoir de l'argent ou Toucher 2 ou 3s pour copier dans le presse-papier
                    </Text>
                </View>   
                
                <KeyboardSpacer ref="keyboard"
                    
                />
            </View>
        );
    }
}



const navigationOptions = {
    headerStyle : styles.header,
    headerTitleStyle : styles.headerTitle
}

const stackHome = new StackNavigator({
    Home : {
        screen : Home,
        navigationOptions
    },
    Solde : {
        screen : Solde,
        navigationOptions
    }
},{
    navigationOptions : ({navigation}) => ({
        headerLeft : <DrawerButton navigation={navigation} />
    })
})


//make this component available to the app
export default stackHome;
