//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Style from '../../styles/Styles';

// create a component
class List extends Component {

    static navigationOptions = {
        title : 'MontPellier',
    }

    render() {
        return (
            <View>
                <Text>MyClass</Text>
            </View>
        );
    }
}



//make this component available to the app
export default List;
