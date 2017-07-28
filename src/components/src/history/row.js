//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../../styles/RowStyles';
import Services from '../services/services';

// create a component
class Row extends Component {

    static propTypes = {
        info : React.PropTypes.object,
        index : React.PropTypes.number,
    }

    render() {
        let reportFormated = Services.formatNumber(this.props.info.amount)
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
                            <Text style={styles.user}>{this.props.info.name}</Text>
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

//make this component available to the app
export default Row;
