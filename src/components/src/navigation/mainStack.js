//import liraries
import React, { Component } from 'react';
import {} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DrawerExample from './drawer';
import Login from '../login/login2';

const MainStack = new StackNavigator({
    Login : {
        screen : Login
    },
    DrawerExample : {
        screen : DrawerExample
    }
},{
    navigationOptions : ({
        header: null,
    })
})
//make this component available to the app
export default MainStack;
