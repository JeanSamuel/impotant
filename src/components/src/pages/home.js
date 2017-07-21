//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';
import { Icon, Badge } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';



// define your styles
const styles = StyleSheet.create({
    row : {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow : 1,
        paddingBottom : 40
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        
    },
    headerTitle : {
        color : "#ecf0f1",
        fontSize : 25
    },
    qrText : {
        textAlign : 'center',
        fontSize : 15,
        margin : 15,
        width : 300

    },
    input : {

    },
    amount : {
        fontSize : 45,
        textAlign : 'right',
    },
    amountContainer : {
        // justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'flex-end',
        paddingRight : 20,
        width : 400
    },
    amountLabel : {
        fontSize : 25,
        color : 'rgba(142, 68, 173,1.0)'
    }
});

// create a component
class MyClass extends Component {

    static navigationOptions = {
        title : 'Home',
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
        titleStyle : styles.headerTitle,
        drawerIcon : ({tintColor}) => <Icon name="home" size= {25} />,
    }


    constructor(props){
        super(props)
        this.state = {
            staticText : 'vola:1547865&num:',
            amount : '0',
        }
    }

    setAmount(amount){
        console.log(this.state.amount)
        // console.log(String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1,'))
        // this.setState({amount})
        this.setState({amount : 5})
    }

    render() {
        return (
            <View  style={styles.container}>
                
                <View style={styles.amountContainer}>
                    <View>
                        <Text style={styles.amountLabel}>Amount</Text>
                        {/* <Text style={styles.amount}>
                            Ar {this.state.amount}
                        </Text> */}
                        <TextInput
                            style={styles.amount}
                            autoFocus= {true}
                            keyboardType = 'numeric'
                            defaultValue = '0'   
                            onChange = {(amount) => this.setAmount(amount)}
                        />
                    </View>
                </View>
                    
                <View style={styles.row}>
                    <QRCode  
                        value={this.state.staticText + this.state.amount}
                        size={150}
                        bgColor='#000'
                        fgColor='white'
                    />
                    <Text style={styles.qrText}>
                            Toucher et copier ou prenez en photo avec le ClientVola pour recevoir de l'argent 
                    </Text>
                </View>
                
                <KeyboardSpacer />
            </View>
        );
    }
}


//make this component available to the app
export default MyClass;
