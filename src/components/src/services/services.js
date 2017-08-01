//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, AsyncStorage } from 'react-native';
import styleBase from '../../styles/Styles';
import {FormValidationMessage } from 'react-native-elements';
import { Icon } from 'react-native-elements';

// create a component
class Services extends Component {
    static formatNumber(number){
        return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
    }

    static waiting(){
        return (
            <View style={styleBase.error}>
                <ActivityIndicator size="large"  />  
            </View>
        )
    }

    static createError(text){
        return (
            <View style={styleBase.error}>
                <Icon name="warning" size= {15} color = {styleBase.color}/>
                <Text style = {styleBase.errorText}>{text}</Text>
            </View>
        )
    }

    async saveData(key, value){
        console.log('début sauvegarde de données avec la clé : ', key)
        try {
            await AsyncStorage.setItem(key, value);
            this.getData(key);
        } catch (error) {
            throw ('something went wrong when saving data')
        }
    }

    async getData(key){
        console.log('début prise de donnée')
        try { 
            let value = await AsyncStorage.getItem(key);
            console.log('this is the value of the key ' + key + ' ' ,value);
        } catch (error) {
            console.log("la clé n'existe pas")
        }
    }

    async removeData(key){
        console.log('début suppression de donnée')
        try { 
            await AsyncStorage.removeItem(key);
            this.getData(key)
        } catch (error) {
            console.log("la clé n'existe plus")
        }
    }
}


//make this component available to the app
export default Services;
