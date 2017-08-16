//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Services from '../services/services';
import LoginServices from '../services/loginServices';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import NotifServices from '../services/notificationServices'

// create a component
class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            errorUser : '',
            errorPassword : '',
            action : null,
            visible : false,
            username : '',
            password : ''
        }
    }

    getErrorUser(){
        return this.state.errorUser
    }

    getErrorPassword(){
        return this.state.errorPassword
    }

    changeVisibility(){
        this.setState({visible : !this.state.visible})
    }

    clearError(){
        this.setState({
            errorUser : '',
            errorPassword : '',
            action : null
        })
    }

    setUsername(username){
        this.setState({username})
    }

    setPassword(password){
        this.setState({password})
    }

    goLogin() {       
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
                var service = new Services()
                var notif = new NotifServices()
                service.saveData('user', responseJson.accountId)
                notif.registerForPushNotificationsAsync(responseJson.accountId)
                console.log('user_id', responseJson.accountId)
                // this.props.navigation.navigate('DrawerExample')
            }else{
                var erreur = Services.createError("les données sont vides")
                this.setState({action : erreur})
            }
            this.changeVisibility()
         })
        .catch((error) => { 
            var erreur = Services.createError(error)
            this.setState({action : erreur})
        });

    }

    render() {
        return (
            <View>
                <View style={styles.input}>
                    <View>
                        <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
                    </View>
                    <View>
                        {this.state.action}
                    </View>
                    <View style={styles.oneInput} > 
                        <FormLabel
                            labelStyle = {styles.inputLabel}
                        >Name</FormLabel>
                        <FormInput 
                            value = {this.state.username}
                            keyboardType = {'email-address'}
                            placeholder= 'your username here...'
                            inputStyle = {styles.inputText}
                            returnKeyType = 'next'
                            onChangeText = {(text) => this.setUsername(text)}
                            onSubmitEditing = {() => this.passwordInput.focus()}
                            placeholderTextColor = 'rgba(189, 195, 199,0.7)'
                        />
                        <FormValidationMessage>{this.getErrorUser()}</FormValidationMessage>
                    </View>   
                    <View style={styles.oneInput} > 
                        <FormLabel
                            labelStyle = {styles.inputLabel}
                        >Name</FormLabel>
                        <FormInput 
                            value = {this.state.password}
                            returnKeyType = 'go'
                            textInputRef = {(input) => this.passwordInput = input}
                            placeholder= 'your password '
                            onChangeText = {(text) => this.setPassword(text)}
                            inputStyle = {styles.inputText}
                            placeholderTextColor = 'rgba(189, 195, 199,0.7)'
                            secureTextEntry = {true}
                            
                        />
                        <FormValidationMessage>{this.getErrorPassword()}</FormValidationMessage>
                    </View>
                    
                    <Button
                        buttonStyle = {styles.button}
                        icon={{name: 'login', type : 'material-community' }}
                        title='LOGIN' 
                        onPress = {() => this.goLogin()}
                        fontWeight = 'bold'
                    />
                </View>

                 <KeyboardSpacer ref="keyboard"   />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    input : {
        marginHorizontal : 10,
    },
    inputText : {
        color : 'rgba(236, 240, 241,1.0)',
        paddingHorizontal : 15,
        fontSize : 20,
        opacity : 0.7
    },
    inputLabel : {
        color : 'rgba(236, 240, 241,1.0)',
    },
    button : {
        opacity : 0.7,
    },
    
});

//make this component available to the app
export default LoginForm;
