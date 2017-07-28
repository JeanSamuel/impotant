//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Icon } from 'react-native-elements';

// create a component
class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            errorUser : '',
            errorPassword : '',
            errorLogin : ''
        }
    }

    getErrorUser(){
        return this.state.errorUser
    }

    getErrorPassword(){
        return this.state.errorPassword
    }

    goLogin(){
        this.props.navigator.push({
            id :'home'
        })
        console.log('mankato v')
    }

    render() {
        return (
            <View>
                <View style={styles.input}>
                    <View style={styles.oneInput} > 
                        <FormLabel
                            labelStyle = {styles.inputLabel}
                        >Name</FormLabel>
                        <FormInput 
                            onChangeText={console.log('aaaa')}
                            keyboardType = {'email-address'}
                            placeholder= 'your username here...'
                            inputStyle = {styles.inputText}
                            returnKeyType = 'next'
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
                            onChangeText={console.log('aaaa')}
                            returnKeyType = 'go'
                            ref = {(input) => this.passwordInput = input}
                            placeholder= 'your password '
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
    }
});

//make this component available to the app
export default LoginForm;
