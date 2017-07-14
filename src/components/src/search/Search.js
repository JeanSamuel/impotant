//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native';
import Style from '../../styles/Styles';
import {StackNavigator} from 'react-navigation';
import List from './List';
import {Icon} from 'react-native-elements';
import Login from '../login/Login';

// create a component
class Search extends Component {

    static navigationOptions = {
        title : 'Rechercher une ville',
        tabBarLabel : 'Search',
        tabBarIcon : ({tintColor}) => <Icon name="account-circle" size= {35} />

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
                <View>
                    <TextInput
                    style={Style.input} 
                    value={this.state.city}
                    onChangeText = {(text)=> this.setCity(text)}
                    />
                    <Button style = {Style.button} onPress = {() => this.submit()} title="rechercher"/>
                </View>
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
