//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './keyStyles';

// create a component
export default class Key extends Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired
    };

    render() {
        const {handler} = this.props;
        return (
            <TouchableOpacity style={styles.pinKey} onPress={() => {
                //call GrandParent handler when press
                handler(this.props.label)
            }}>
                <Text style={{fontSize: 26}}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }

}