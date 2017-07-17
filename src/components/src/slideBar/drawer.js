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

const DrawerExample  = DrawerNavigator(
    {
        First : {
            path : '/',
            screen : Home
        // },
        // Second : {
        //     path : '/sent',
        //     screen : History
        // },
        // Third : {
        //     path : '/sent1',
        //     screen : Setting
        // },
        // Fourth : {
        //     path : '/sent2',
        //     screen : Login
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

const navigationOptions = {
    headerStyle : Style.header,
    headerTitleStyle : Style.headerTitle
}

const MenuButton = (
	<View>
		<TouchableOpacity onPress={() => this.props.navigate('DrawerOpen') }>
			<Icon name="menu"/>
		</TouchableOpacity>
	</View>
);

const stackExemple = new StackNavigator({
    Home : {
        screen : DrawerExample,
        navigationOptions
    },
    History : {
        screen : History,
        navigationOptions
    },
    Setting : {
        screen : Setting,
        navigationOptions
    }
},{
    navigationOptions : ({navigation}) => ({
        headerLeft : (
            <View navigate = {navigation.navigate}>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate('DrawerOpen')} >
                    <Icon 
                        name="menu" 
                        color="#ecf0f1" 
                        size= {30}
                        
                    />
                </TouchableOpacity> 
            </View>    
            
        )
    })
})




export default stackExemple;