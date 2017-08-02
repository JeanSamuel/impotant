//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon, } from 'react-native-elements';
import { WebView } from 'react-native';

// create a component
class Setting extends Component {

    static navigationOptions = {
        title : 'Settings',
        drawerIcon : ({tintColor}) => <Icon name="settings" size= {25} />,
        headerLeft : (
            <Text>eto</Text>
        )
    }

    render() {
        return (
        <WebView
            source={{uri: 'https://github.com/facebook/react-native'}}
            style={{marginTop: 20}}
        />
        );
    }
}



//make this component available to the app
export default Setting;
