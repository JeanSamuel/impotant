//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Services extends Component {
    static formatNumber(number){
        return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
    }
}


//make this component available to the app
export default Services;
