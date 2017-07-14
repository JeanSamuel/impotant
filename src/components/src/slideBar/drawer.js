//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import Home from '../pages/home';
import History from '../pages/history';
import Setting from '../pages/setting';
import Login from '../pages/login';

const DrawerExample  = DrawerNavigator(
    {
        First : {
            path : '/',
            screen : Home
        },
        Second : {
            path : '/sent',
            screen : History
        },
        Third : {
            path : '/sent1',
            screen : Setting
        },
        Fourth : {
            path : '/sent2',
            screen : Login
        }
    },
    {
        initialRouteName : 'First',
        drawerPosition : 'left',
        contentOptions : {
            activeBackgroundColor : '#34495e',
            activeTintColor : '#FFF'
        }
    }
);



export default DrawerExample;