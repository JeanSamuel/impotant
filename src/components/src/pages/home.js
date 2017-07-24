//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
// import QRCode from 'react-native-qrcode-logo';
import { Icon, Badge } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
 


// define your styles
const styles = StyleSheet.create({
    row : {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow : 1,

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
        fontSize : 30,
        textAlign : 'right',
        width : 200

    },
    amountContainer : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginHorizontal : 20,
    },
    amountLabel : {
        fontSize : 25,
        textAlign : 'right',
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
            type : 'vola',
            data : {
                'accesToken' : 'Azertyukjhgfd245SD3HBVS35FZF52EZ224SFGBVCHNBVC',
                'currency' :  'mga',
                'senderId' : '1'
            },
            amount : '0',
            jsonData : '0'
        }
    }

    
    componentDidMount() {
        this.setJsonData(this.generateQrCodeText())
        console.log(this.state.jsonData)
    }

    goCheckSolde(){
        this.props.navigation.navigate('Solde')
    }

    generateQrCodeText(){
        let myData = {
            'type' : this.state.type,
            'data' : this.state.data,
            'amount' : this.state.amount
        }
        return JSON.stringify(myData)
    }

    setJsonData(jsonData){
        this.setState({jsonData})
    }

    setUpdate(amount){
        // amount = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
        this.setState({
            amount : amount,
            jsonData : this.generateQrCodeText()
        })
        // console.log(this.state)
    }

    render() {
        let logoFromFile = require('../../images/icons/real.png');
        return (
            <View  style={styles.container}>
                
                <View style={styles.amountContainer}>
                    <View>
                        <Image
                            style = {{width : 70, height:70}}
                         source = {{uri : 'http://firebirdsql.org/file/about/firebird-logo300.png'}} 
                         />
                    </View>
                    <View>
                        <Text style={styles.amountLabel}>Amount</Text>
                            
                        <TextInput
                            value = {this.state.amount}
                            style={styles.amount}
                            autoFocus= {true}
                            keyboardType = 'numeric'  
                            onChangeText = {(text) => this.setUpdate(text)}
                        />
                    </View>
                </View>
                    
                <View style={styles.row}>
                    <QRCode  
                        value={this.generateQrCodeText()}
                        logo = {logoFromFile}
                        size={170}
                    />
                    <Text style={styles.qrText}>
                            Toucher et copier ou prenez en photo avec le ClientVola pour recevoir de l'argent 
                    </Text>

                    <Button 
                        title="solde"
                        onPress = {() => this.goCheckSolde()}
                    />
                </View>
                
                <KeyboardSpacer />
            </View>
        );
    }
}


//make this component available to the app
export default MyClass;
