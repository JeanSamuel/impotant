//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import Style from '../../styles/MainStyles';
import QRCode from 'react-native-qrcode';

// create a component
class Home extends Component {

    static navigationOptions = {
        title : 'Home',
        headerLeft: <Icon name="menu" color="#ecf0f1" size= {35} onPress={() => this.drawerOpen()} />,
        headerRight: <Icon name="help" color="#ecf0f1" size= {30} />,
        titleStyle : Style.headerTitle,
        drawerIcon : ({tintColor}) => <Icon name="help" size= {35} />,
        headerLeft : (
            <Button title = "me"  />
        )
    }

    constructor(props){
        super(props)
        this.state = {
        staticText : 'vola:1547865&num:',
        amount : '0'
        }
    }

 

  setAmount(amount){
    if(amount == ''){
      this.state.amount = '0'
    }
    this.setState({amount})

  }

    render() {
        return (
            
            <View style={Style.container}>
                <View style={Style.row}>
                    <View style = {Style.qrCodeContainer}> 
                        <Text style={Style.qrText}>
                            Toucher et copier ou prenez en photo avec le ClientVola pour recevoir de l'argent
                        </Text>

                        <QRCode
                        style = {Style.qrCodeData}
                        value={this.state.staticText + this.state.amount}
                        size={150}
                        bgColor='#000'
                        fgColor='white'/>
                    </View>

                    <View style = {Style.inputQrContainer}> 
                        <TextInput
                            autoFocus = {true}
                            keyboardType = {'numeric'}
                            style = {Style.input}
                            onChangeText={(text) => this.setAmount(text)}
                            value={this.state.amount}
                        />
                        
                    </View>
                </View>
                <Button
                    onPress = { () =>this.props.navigation.navigate('DrawerOpen')}
                    title = "Open DrawerNavigator"
                 />
            </View>
        );
    }
}

const navigationOptions = {
    headerStyle : Style.header,
    headerTitleStyle : Style.headerTitle
}

//make this component available to the app
export default StackNavigator({
    Home : {
        screen : Home,
        navigationOptions
    }
})



//make this component available to the app
