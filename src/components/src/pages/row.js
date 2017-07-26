//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

// create a component
class Row extends Component {


    static propTypes = {
        info : React.PropTypes.object,
        index : React.PropTypes.number,
    }


    render() {
        let reportFormated = String(this.props.info.amount).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
        let currency = (
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{reportFormated} </Text>
                <Text style={styles.currency}>{this.props.info.currency}</Text>
            </View>
        )
        let hour = this.props.info.date.split(" ")[1]
        let sourceImage = require('../../images/icons/receive.png') 
        let type = "Récéption d'argent"
        if(parseInt(this.props.info.amount) < 0){
            currency = (
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, styles.currencyNegative]}>{reportFormated} </Text>
                    <Text style={[styles.currency,styles.currencyNegative]}>{this.props.info.currency}</Text>
                </View>
            )
            sourceImage = require('../../images/icons/online-store.png') 
            type = "Achat"
            if(parseInt(this.props.info.amount) < -1000){
                sourceImage = require('../../images/icons/send.png') 
                type = "Envoi d'argent"
            }
            
        }
        let icon = (
            <Image source={sourceImage} style={{width : 40, height:40}}/>
        )
        

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.userContainer}>
                        <View style={styles.iconContainer}>
                            {icon}
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={styles.user}>Toavina Ralambosoa</Text>
                            <Text style={styles.date}>{type}</Text>
                            <Text style={styles.date}>{hour}</Text>
                        </View>
                    </View>
                    <View>{currency}</View>
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
        fontSize : 15
    },
    amount : {

        fontWeight : 'bold',
        fontSize : 22,
        textAlign : 'right',
        color : 'rgba(44, 62, 80,1.0)'
    },
    amountContainer : {
        justifyContent : 'center',
    },
    userContainer : {
        flexDirection :'row',
        paddingHorizontal : 10,
    },
    userInfoContainer : {
    },
    iconContainer : {
        padding : 5,
        justifyContent : 'center'
    },
    date : {
        fontSize : 15,
        color : 'rgba(149, 165, 166,1.0)',
    },
    currency : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'right',
        color : 'rgba(44, 62, 80,1.0)',
        paddingRight : 5
    }, 
    currencyNegative : {
        color : 'rgba(192, 57, 43,1.0)'
    }
});

//make this component available to the app
export default Row;
