//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Clipboard, Keyboard} from 'react-native';
import {StackNavigator} from 'react-navigation'
import QRCode from 'react-native-qrcode-svg';
import { Icon} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DrawerButton from '../navigation/drawerButton';
import styles from '../../styles/HomeStyles';
import Toast from 'react-native-easy-toast';
import Services from '../services/services';
 

// create a component
class Home extends Component {

    
    static navigationOptions =({navigation}) => {
        console.log(navigation)
        return {
            title : navigation.state.params.accountId,
            headerRight: <Icon name="share" color="#ecf0f1" size= {30} />,
            titleStyle : styles.headerTitle,
            drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
        }
    }


    constructor(props){
        super(props)
        this.state = {
            type : 'vola',
            data : {
                'currency' :  'MGA',
                'userId' : '0'
            },
            amount : '',
            jsonData : '0'
        }
        // this.checkUserData()
    }

    checkUserData(){
        this.setState({
            data : {
                currency : 'MGA',
                userId : this.props.navigation.state.params.accountId
            }
        })
    }


    componentDidMount() {
        this.checkUserData()
        this.setJsonData(this.generateQrCodeText())
    }



    generateQrCodeText(){
        let myData = {
            'type' : this.state.type,
            'data' : this.state.data,
            'amount' : this.state.amount
        }
        var text = JSON.stringify(myData)
        return text
    }

    setJsonData(jsonData){
        this.setState({jsonData})
    }

    setType(type){
        this.setState({type})
    }

    setUpdate(amount){
        // amount = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
        this.setState({
            amount : amount,
            jsonData : this.generateQrCodeText()
        })
        // console.log(this.state)
    }

    getJsonData(){
        return this.state.jsonData
    }

    copyToClipBoard(){
        Clipboard.setString(this.generateQrCodeText())
        this.refs.toast.show('Copié dans le presse-papier!!')
        Keyboard.dismiss()
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
                <View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Amount (Ar)</Text> 
                        <TextInput
                            autoFocus= {true}
                            ref="input"
                            value = {this.state.amount}
                            style={styles.amount}
                            keyboardType = 'numeric' 
                            onChangeText = {(text) => this.setUpdate(text)}
                        />
                    </View>
                </View>    
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        onLongPress = {() => this.copyToClipBoard()}
                    >
                        <QRCode  
                            value={this.generateQrCodeText()}
                            logo = {logoFromFile}
                            size={170}
                            logoSize={70}
                            logoBackgroundColor='transparent'
                        />    
                    </TouchableOpacity>  
                    <Text style={styles.qrText}>
                            Prenez en photo avec le ClientVola pour recevoir de l'argent ou Toucher 2 ou 3s pour copier dans le presse-papier
                    </Text>
                </View>    
                <KeyboardSpacer ref="keyboard"   />
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
    }
},{
    navigationOptions : ({navigation}) => ({
        headerLeft : <DrawerButton navigation={navigation} keyboard={Keyboard} />
    })
})


//make this component available to the app
export default stackHome;
