//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import Screen1 from './screen1';
import Screen2 from './screen2';

const DrawerExample  = DrawerNavigator(
    {
        First : {
            path : '/',
            screen : Screen1
        },
        Second : {
            path : '/sent',
            screen : Screen2
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