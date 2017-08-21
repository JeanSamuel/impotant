//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {FormValidationMessage } from 'react-native-elements'

// create a component
class Error extends Component {

    static propTypes = {
        text : React.PropTypes.string
    }

    constructor(props){
        super(props)
        this.state = {
            text : this.props.text,
            isError : false
        }
    }

    render() {
        return (
            <View style={styles.error} ref = 'error'>
                <Icon name="warning" size= {15} color = {'red'}/>
                <FormValidationMessage>{this.props.text}</FormValidationMessage>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    error : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    }
});

//make this component available to the app
export default Error;
