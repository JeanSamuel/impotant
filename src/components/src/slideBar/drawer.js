//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {DrawerNavigator, StackNavigator, NavigationActions, DrawerItems} from 'react-navigation'
import Home from '../pages/home';
import Style from '../../styles/MainStyles';
import { Icon } from 'react-native-elements';
import History from '../pages/history';
import Setting from '../pages/setting';
import Solde from '../pages/solde';
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
    },
    Solde : {
        screen : Solde,
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
        activeBackgroundColor : '#bdc3c7',
        activeTintColor : '#FFF',
        style : Style.drawerStyle
    },
    headerMode : 'screen',
    contentComponent: props => 
        <ScrollView>
            <DrawerContent />
            <DrawerItems {...props} />
        </ScrollView>
    
    
    // contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={drawerRoutes} />,
    
}

const DrawerExample  = DrawerNavigator(
    drawerRoutes,
    drawerConfigs,
);

export default DrawerExample;