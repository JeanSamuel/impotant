import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Services from '../services/services';
import styles from '../../styles/LoginStyles';
import FormData from 'FormData';
import Spinner from 'react-native-loading-spinner-overlay';

const background = require("../../images/back.png");
const mark = require("../../images/icons/login1_mark.png");
const lockIcon = require("../../images/icons/login1_lock.png");
const personIcon = require("../../images/icons/login1_person.png");

// create a component
class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            error : null,
            spinnerVisibility : false
        }
    }

    changeVisibility(){
        this.setState({spinnerVisibility : !this.state.spinnerVisibility})
    }

    clearError(){
        this.setState({
            error : null
        })
    }

    goHome(parameter){
        this.props.navigation.navigate('DrawerExample', parameter)
    }

    async onLoginPressed(){
        this.changeVisibility()
        this.clearError()
        var url = 'http://ariary.vola.mg/UserRestController.php'
        var formData = new FormData();

        formData.append('accountId', this.state.username);
        let data = {
            method: 'POST',
            body: formData
        }
        fetch(url, data)
        .then((response) => response.json())
        .then((responseJson) => { 
            if(responseJson.accountId != null){
                // this.setState({username : responseJson.accountId})
                service = new Services()
                service.saveData('user', responseJson.accountId)
                console.log('accountIdParsed', parseInt(responseJson.accountId))
                this.goHome({
                    accountId : responseJson.accountId
                })
            }else{
                var erreur = Services.createError("les données sont vides")
                this.setState({error : erreur})
            }
            this.changeVisibility()
         })
        .catch((error) => { 
            var erreur = Services.createError(error)
            this.setState({error : erreur})
        });
    }


    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <View>
                        <Spinner visible={this.state.spinnerVisibility} textStyle={{color: '#FFF'}} />
                    </View>
                    <View>
                        {this.state.error}
                    </View>
                    <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput 
                        onChangeText = {(text) => this.setState({username : text})}
                        placeholder="Username" 
                        keyboardType = 'email-address'
                        placeholderTextColor="rgba(236, 240, 241,0.5)"
                        style={styles.input} 
                        underlineColorAndroid = 'transparent'
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        returnKeyType = 'next'
                    />
                    </View>
                    <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                    </View>
                    <TextInput 
                        onChangeText = {(text) => this.setState({password : text})}
                        placeholderTextColor="rgba(236, 240, 241,0.5)"
                        placeholder="Password" 
                        style={styles.input} 
                        secureTextEntry 
                        underlineColorAndroid = 'transparent'
                        returnKeyType = 'go'
                        ref = {(input) => this.passwordInput = input}
                        onSubmitEditing = {this.onLoginPressed.bind(this)}
                    />
                    </View>
                    <TouchableOpacity activeOpacity={.5}>
                    <View>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5}
                        onPress = {this.onLoginPressed.bind(this)}
                    >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }
}


//make this component available to the app
export default LoginForm;
