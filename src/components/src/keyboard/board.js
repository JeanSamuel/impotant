//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Key from './key';
import styles from './keyStyles';

// create a component
class Board extends Component {

    render() {
        const {handler} = this.props;
        return (
            <View style={styles.pinKeyboard}>
                <Key label='1' handler={handler}/>
                <Key label='2' handler={handler}/>
                <Key label='3' handler={handler}/>
                <Key label='4' handler={handler}/>
                <Key label='5' handler={handler}/>
                <Key label='6' handler={handler}/>
                <Key label='7' handler={handler}/>
                <Key label='8' handler={handler}/>
                <Key label='9' handler={handler}/>
                <Key label='0' handler={handler}/>
                <Key label='00' handler={handler}/>
                <Key label='000' handler={handler}/>
            </View>
        );
    }
}


//make this component available to the app
export default Board;
