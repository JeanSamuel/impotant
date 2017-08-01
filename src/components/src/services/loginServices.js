//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// create a component
class LoginServices extends Component {
    login(){
        axios({
            method : 'post',
            url : 'http://ariary.vola.mg/UserRestController.php',
            data : {
                accountId : 2
            }
        })
        .then((res) => res.json())
        .then(function (response) {
            console.log('data', response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    signin(){

    }
}


//make this component available to the app
export default LoginServices;
