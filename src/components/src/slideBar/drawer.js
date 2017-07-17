//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {DrawerNavigator, StackNavigator, NavigationActions} from 'react-navigation'
import Home from '../pages/home';
import Style from '../../styles/MainStyles';
import { Icon } from 'react-native-elements';
import History from '../pages/history';
import Setting from '../pages/setting';
import Login from '../pages/login';
import DrawerButton from './drawerButton';
import DrawerContent from './drawerContent';



const navigationOptions = {
    headerStyle : Style.header,
    headerTitleStyle : Style.headerTitle
}


const stackExemple = new StackNavigator({
    Home : {
        screen : Home,
        navigationOptions
    }
},{
    navigationOptions : ({navigation}) => ({
        headerLeft : <DrawerButton navigation={navigation} />
    })
})


// DrawerNavigator path

const drawerRoutes = {
    First : {
        path : '/',
        screen : stackExemple,
        
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
}

// DrawerNavigator configuration 

const drawerConfigs = {
    initialRouteName : 'First',
    drawerPosition : 'left',
    contentOptions : {
        activeBackgroundColor : '#34495e',
        activeTintColor : '#FFF',
        style : Style.drawerStyle
    },
    headerMode : 'screen',
    contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={drawerRoutes} />,
    
}

const DrawerExample  = DrawerNavigator(
    drawerRoutes,
    drawerConfigs,
);

export default DrawerExample;