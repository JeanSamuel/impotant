//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, AsyncStorage } from 'react-native';
import styleBase from '../../styles/Styles';
import data from '../../data/dataName';
import loginData from '../../data/loginData';
import {FormValidationMessage } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import FormData from 'FormData';


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

    static loginUrl(){
        var data = JSON.stringify({
            'response_type' : 'code',
            'state' : 'xyz',
            'client_id' : 'ariarynet',
            'redirect_uri' : 'http://auth.vola.mg/index.php/&scope=userinfo'
        })
        var dataURL = {
            uri : 'http://auth.vola.mg/oauth2/authorize',
            method : 'GET',
            body : data
        }
        return loginData.uri
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
        } catch (error) {
            throw ('something went wrong when saving data')
        }
        console.log('fin sauvegarde de données avec la clé : ', key)
    }

    async getData(key){
        console.log('début prise de donnée de la clé : ', key)
        try { 
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log("la clé n'existe pas")
        }
        console.log('fin prise de donnée avec clé ', key)
    }

    async removeData(key){
        console.log('début suppression de donnée')
        try { 
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log("la clé n'existe plus")
        }
        console.log('fin de la suppression avec clé ', key)
    }

    async goLogin(webViewState){
        
        var OauthCode = await this.extractOauthCode(webViewState.url)
        var token = await this.getToken(OauthCode)
        return await this.getUserInfo(token)
    }

    static getRandomIntoArray(myArray){
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    /**
     * 
     * @param {*} uri the url contains the Oauth Code 
     * then save this into storage
     */
    async extractOauthCode(uri){
        var data =  uri.replace('=', ' ').replace('&',' ')
        var dataArray = data.split(' ')
        await this.saveData('oauthCode', dataArray[1])
        return dataArray[1]
    }

    /**
     * get token using Oauth code stored into AsynStorage
     */
    async getToken(oauthCode){ 
        var url = 'http://auth.vola.mg/oauth2/token'
        var formData = new FormData();
        formData.append('code' , oauthCode,);
        formData.append('client_id' ,'ariarynet',);
        formData.append('client_secret' , 'ariarynetpass',);
        formData.append('redirect_uri' , 'http://auth.vola.mg/index.php/',);
        formData.append('grant_type' , 'authorization_code',);
        formData.append('scope' , 'userinfo',);
            var data = {
                method: 'POST',
                body: formData
            }
        const response = await fetch(url, data)
        const json = await response.json()
        await this.saveData('token',json.access_token)
        return json.access_token
    }

    /**
     * Take data user with token
     */
    async getUserInfo(token){
        var url = 'http://auth.vola.mg/oauth2/userinfo?access_token='+ token
        var response = await fetch(url, {method : 'GET'})
        var json =  await response.json()
        var userInfo = ''
        if(json.user_id !== null){
            await this.saveData('user_id', json.user_id)
            userInfo = json.user_id
        }else{
            throw 'user_id null'
        }
        return userInfo
    }


}


//make this component available to the app
export default Services;
