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
import Login from '../login/login';
 

// create a component
class Home extends Component {
    
    static navigationOptions =({navigation}) => {
        console.log(navigation)
        return {
            title : 'Nouveau', //+ navigation.state.params.accountId,
            drawerLabel: 'Home',
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
                'userId' : ''
            },
            amount : '',
            jsonData : '0',
            modalVisible: false
        }
        // this.checkUserData()
    }

    generateQrCodeText(){
        let myData = {
            't' : this.state.type,
            'data' : {
                'c' : this.state.data.currency,
                'u' : this.state.data.userId
            },
            'a' : this.state.amount
        }
        var text = JSON.stringify(myData)
        return text
    }

    checkUserData(){
        this.setState({
            data : {
                currency : 'MGA',
                userId : 'azer' //this.props.navigation.state.params.accountId
            }
        })
    }

    componentDidMount() {
        this.checkUserData()
        this.setJsonData(this.generateQrCodeText())
        this.refs.input.focus()
        Keyboard.dismiss()
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
        // amount = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
        this.setState({
            amount : amount,
            jsonData : this.generateQrCodeText()
        })
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
                            ref="input"
                            value = {this.state.amount}
                            style={styles.amount}
                            keyboardType = 'numeric' 
                            onChangeText = {(text) => this.setUpdate(text)}
                            autoFocus= {false}
                        />
                    </View>
                </View>  

                {/* QR Code   */}
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
                        
                        />    
                    </TouchableOpacity>  
                    <Text style={styles.qrText}>
                            Prenez en photo avec le ClientVola pour recevoir de l'argent
                    </Text>
                </View>    
                
                <KeyboardSpacer ref="keyboard"   /> 

                {/* Modal signin or warning  */}
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.ChangeModalVisibility()}
                    >
                    <View style={styles.modalContainer}>
                        <View style = {styles.closeTextContainer}>
                            <TouchableOpacity 
                                style = {styles.closeTextObject}
                                onPress = {() => this.ChangeModalVisibility()}
                            >
                                <Icon name="close" size= {20}  color = {'rgba(236, 240, 241,1.0)'}/>
                                <Text style = {styles.closeText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.webViewContainer}>
                            
                            <Login />
                        </View> 
                    </View>
                </Modal>

                <View>
                    {/* Button for the  signupButton */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            style = {styles.loginButton}
                            onPress={() => {
                                this.ChangeModalVisibility()
                            }}>
                            <Icon name ='input'  size= {20} color={styleBase.silver}/>
                            <Text style = {styles.signinButtonText}> Save my new account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            style = {styles.signinButton}
                            onPress={() => {
                                this.ChangeModalVisibility()
                            }}>
                            <Icon name ='login' type ='material-community' size= {15} color={styleBase.silver}/>
                            <Text style = {styles.loginButtonText}> Login with Ariary.net</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                
                
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
