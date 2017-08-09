//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../../styles/RowStyles';
import styleBase from '../../styles/Styles';
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
        let iconName = 'file-download'
        let iconColor = 'rgba(22, 160, 133,1.0)'
        let type = "Récéption d'argent"
        if(parseInt(this.props.info.amount) < 0){
            currency = (
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, styles.currencyNegative]}>{reportFormated} </Text>
                    <Text style={[styles.currency,styles.currencyNegative]}>{this.props.info.currency}</Text>
                </View>
            )

                iconName = 'shopping-cart'
                type = "Envoi d'argent"
                iconColor = 'rgba(211, 84, 0,1.0)'            
            if(parseInt(this.props.info.amount) < -1000){
                iconName='file-upload'
                type = "Achat"
                iconColor = '#517fa4'
                
            } 
        }
        let icon = (
            <Icon
                reverse
                name={iconName}
                color={iconColor}
            />
        )
        
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.userContainer}>
                        <View style={[styles.iconContainer,styleBase.centered]}>
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
