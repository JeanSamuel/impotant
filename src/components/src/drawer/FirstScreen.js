//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements';

// create a component
class FirstScreen extends Component {

    static navigationOptions = {
        // title : "FirstScreen",
        tabBarLabel :  'Screen 1',
        drawerIcon : ({tintColor}) => <Icon name="list" size= {35} />
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FirstScreen</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

//make this component available to the app
export default FirstScreen;
