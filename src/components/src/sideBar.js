//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class SideBar extends Component {
    render() {
        return (
            <View>
                <Text>SideBar</Text>
                <Text>SideBar1</Text>
                <Text>SideBar2</Text>
            </View>
        );
    }
}


//make this component available to the app
export default SideBar;
