//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './keyStyles';

// create a component
export default class Key extends Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired
    };

    constructor(props){
        super(props)
        this.state = {
            value : 100,
        }
    }

    changeValue(value){
        this.props.changeValue(this.state.value)
        thi.setState(value = value)
    }


  render() {
    return (
      <TouchableOpacity style={styles.pinKey} onPress={() => console.log(this.props.label)}>
        <Text style={{fontSize: 26}}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }

}