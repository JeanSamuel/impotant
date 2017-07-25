//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
class Row extends Component {


    static propTypes = {
        info : React.PropTypes.object,
        index : React.PropTypes.number,
    }


    render() {
        let reportFormated = String(this.props.info.amount).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.userContainer}>
                        <Text style={styles.user}>Nivo SA</Text>
                        <Text style={styles.date}>{this.props.info.date}</Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={styles.amount}>{reportFormated} </Text>
                        <Text style={styles.currency}>{this.props.info.currency}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(236, 240, 241,1.0)',
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
    row : {
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderBottomColor : 'rgba(44, 62, 80,0.5)',
        justifyContent : 'space-between',
    },
    user : {
        fontSize : 20
    },
    amount : {
        fontWeight : 'bold',
        fontSize : 22,
        color : 'rgba(44, 62, 80,1.0)'
    },
    amountContainer : {
        justifyContent : 'center'
    },
    userContainer : {
        paddingHorizontal : 10,
    },
    date : {
        color : 'rgba(149, 165, 166,1.0)',
        paddingBottom : 10
    },
    currency : {
        fontSize : 20,
        textAlign : 'right',
        color : 'rgba(149, 165, 166,1.0)',
    }
});

//make this component available to the app
export default Row;
