//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';

// create a component
class MyClass extends Component {
    render() {
        return (
            <ModalDropdown options={['option 1', 'option 2']} >
                <Icon name="help" color="#ecf0f1" size= {30} />
            </ModalDropdown>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyClass;
