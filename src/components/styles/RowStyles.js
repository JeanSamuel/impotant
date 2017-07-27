import { StyleSheet } from 'react-native';  

export default {
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
}