//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import Historique from '../receptor/Historique';
import Main from '../receptor/Main';
import Style from '../../styles/MainStyles';
import {DrawerNavigator, StackNavigator} from 'react-navigation';





const DrawerExample = DrawerNavigator(
    {
        First : {
            path : '/',
            screen : Main,
        },
        Second : {
            path : '/sent',
            screen : SecondScreen
        }

    },{
        initialRouteName  : 'First',
        drawerPosition : 'left',
        drawerWidth : 300,
        contentOptions : {
            activeTintColor : 'red'
        }
    }


);




const navigationOptions = {
    headerStyle : Style.header,
    headerTitleStyle : Style.headerTitle,
}



export default DrawerExample;