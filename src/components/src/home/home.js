//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Clipboard, Keyboard, Modal,WebView} from 'react-native';
import {StackNavigator} from 'react-navigation'
import QRCode from 'react-native-qrcode-svg';
import { Icon} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DrawerButton from '../navigation/drawerButton';
import styles from '../../styles/HomeStyles';
import styleBase from '../../styles/Styles';
import Toast from 'react-native-easy-toast';
import Services from '../services/services';
import Sharing from '../sharing/sharing';
import WarningInput from './warningInput';
 

// create a component
const service = new Services()


class Home extends Component {


    static navigationOptions =({navigation}) => {
        return {
            title : navigation.state.params.user_id,
            drawerLabel: 'Home',
            headerRight: <Sharing />,
            titleStyle : styleBase.headerTitle,
            drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
        }
    }

    constructor(props){
        super(props)
        this.state = {
            type : 'vola',
            data : {
                'currency' :  'MGA',
                'userId' : ''
            },
            amount : '',
            jsonData : '0',
            modalVisible: false,
            isInvalidData : false,
            warning : null
        }
    }

    generateQrCodeText(){
        amount = '0'
        if(this.state.amount !== ''){
            amount = this.state.amount
        }
        let myData = {
            't' : this.state.type,
            'data' : {
                'c' : this.state.data.currency,
                'u' : this.state.data.userId
            },
            'a' : amount
        }
        var dataJSON = JSON.stringify(myData)
        return dataJSON

    }

    checkUserData(){
        this.setState({
            data : {
                currency : 'MGA',
                userId : this.props.navigation.state.params.user_id
            }
        })
    }

    componentDidMount() {
        this.checkUserData()
        this.setJsonData(this.generateQrCodeText())
    }

    setJsonData(jsonData){
        this.setState({jsonData})
    }

    setType(type){
        this.setState({type})
    }

    ChangeModalVisibility() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    setUpdate(amount){
        amount = amount.replace(/ /g, '')        
            if(isNaN(amount)){
                this.setState({
                    warning : (
                        <WarningInput />
                    )
                })
            }else{
                amount = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
                this.setState({
                amount : amount,
                jsonData : this.generateQrCodeText(),
                warning : null
            })
            }
    }

    getJsonData(){
        return this.state.jsonData
    }

    copyToClipBoard(){
        Clipboard.setString(this.generateQrCodeText())
        this.refs.toast.show('Copié dans le presse-papier!!')
        
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
                        <View style={styles.inputWarp}>
                            <TextInput          
                                ref="input"
                                value = {this.state.amount}
                                style={styles.amount}
                                keyboardType = 'numeric' 
                                underlineColorAndroid = 'transparent'
                                onChangeText = {(text) => this.setUpdate(text)}
                                autoFocus= {true}
                            />
                        </View>
                        <View>{this.state.warning}</View>
                    </View>
                </View>  

                {/* QR Code   */}
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onLongPress = {() => this.copyToClipBoard()}
                    >
                        <QRCode  
                            value={JSON.stringify('vola:"eto elah"')}
                            logo={logoFromFile}
                            size={160}
                            logoSize = {40}
                        
                        />    
                    </TouchableOpacity>  
                    <Text style={styles.qrText}>
                            Prenez en photo avec le ClientVola pour recevoir de l'argent
                    </Text>
                </View>    
                <KeyboardSpacer ref="keyboard"   />                 
            </View>
        );
    }
}

const navigationOptions = {
    headerStyle : styleBase.header,
    headerTitleStyle : styleBase.headerTitle
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
