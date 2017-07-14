//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { StackNavigator} from 'react-navigation';
import Style from '../../styles/Styles';
import {Icon} from 'react-native-elements';
import Launcher from '../launcher/Launcher';
import Newer from '../newer/Newer';
import Login2 from './Login2';

// create a component
class Login extends Component {

    static navigationOptions = {
        title : 'login here',
        tabBarLabel : 'Login',
        tabBarIcon : ({tintColor}) => <Icon name="list" size= {35} />
    }

    checkLogin(){
        this.props.navigation.navigate('Launcher')
    }

    setMail(email){
        this.setState({email})
    }

    setPassword(password){
        this.setState({password})
    }

    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
        }
    }



    render() {
        return (
            <View style={[Style.view, Style.login]}>
                <View >
                    <Text style= {Style.title}>Marchand vola</Text>
                </View>
                <View  style={Style.view}> 
                    <TextInput 
                        keyboardType = {'email-address'}
                        placeholder = "your email"
                        style={Style.input} 
                        value={this.state.mail}
                        onChangeText = {(text)=> this.setMail(text)}
                    />
                </View>
                <View  style={Style.view}>
                    <TextInput 
                        secureTextEntry = {true}
                        style={Style.input} 
                        placeholder = "your password"
                        value={this.state.password}
                        onChangeText = {(text)=> this.setPassword(text)}
                    />
                </View>
                <Button 
                    title="Se connecter" onPress = {() => this.checkLogin()} 
                    style = {Style.button}
                />
                <View   style={Style.view}>
                    <Button 
                        title = "Any account? let's create here"
                        style = {Style.link}
                        onPress = {() => this.createAccount()}
                    />
                </View>
                
            </View>
        );
    }
}


//make this component available to the app
export default StackNavigator({
    Login : {
        screen : Login,
    },
    Login2 : {
        screen : Login2,
    },
    Launcher : {
        screen : Launcher
    },
    Newer : {
        screen : Newer
    }
})
