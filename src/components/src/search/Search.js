//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native';
import Style from '../../styles/Styles';
import {StackNavigator} from 'react-navigation';
import List from './List';

// create a component
class Search extends Component {

    static navigationOptions = {
        title : 'Rechercher une ville',
        tabBarIcon :() => {
            return <Image source={require('../../images/icons/sun.png')} />
        }
    }

    constructor(props){
        super(props)
        this.state = { 
            city : 'MontPellier'
        }
    }

    setCity(city){
        this.setState({city})
    }

    submit(){
        this.props.navigation.navigate('Result', {city : this.state.city})
    }

    render() {
        return (
            <View style={Style.view}>
                <TextInput
                    style={Style.input} 
                    value={this.state.city}
                    onChangeText = {(text)=> this.setCity(text)}
                />
                <Button color = {Style.color} onPress = {() => this.submit()} title="rechercher"/>
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
    Search : {
        screen : Search,
        navigationOptions
    },
    Result : {
        screen : List,
        navigationOptions

    }
})
