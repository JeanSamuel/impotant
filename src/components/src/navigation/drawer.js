//import liraries
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation'
import Home from '../home/home';
import Style from '../../styles/MainStyles';
import History from '../history/history';
import Setting from '../settings/setting';
import Logout from '../logout/logout';
import About from '../about/about';
import UserInfo from '../userInfo/userInfo';
import DrawerButton from './drawerButton';
import DrawerContent from './drawerContent';



// DrawerNavigator path

const drawerRoutes = {
    First : {
        path : '/',
        screen : Home,
        
    },
    Second : {
        path : '/userinfo',
        screen : UserInfo,
        
    },
    Third : {
        path : '/sent',
        screen : History
    },
    
    Fourth : {
        path : '/',
        screen : About,
        
    },
    Fifth : {
        path : '/sent1',
        screen : Setting
    },
    Sixth : {
        path : '/sent2',
        screen : Logout,
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