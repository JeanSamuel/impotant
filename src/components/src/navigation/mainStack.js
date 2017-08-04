//import liraries
import React, { Component } from 'react';
import {} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DrawerExample from './drawer';
import Login from '../login/login2';
import Starter from '../starter/starter';
import NewUser from '../starter/newUser';


const MainStack = new StackNavigator({
    
    Starter : {
        screen : Starter
    },
    NewUser : {
        screen : NewUser
    },
    DrawerExample : {
        screen : DrawerExample
    },
    
},{
    navigationOptions : ({
        header: null,
    })
})
//make this component available to the app
export default MainStack;
