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
            <View>
                <Text>Bienvenue dans les configurations</Text>
            </View>
        );
    }
}



//make this component available to the app
export default Setting;
