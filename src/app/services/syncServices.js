//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Constants} from 'expo';

// create a component
class SyncServices extends Component {
    checkData(response){
        if(response.data.type == 'sync'){

            return true;
        }else{
            return false;
        }
    }

    synchronise($token, $pseudo){
        let deviceId = Constants.platform;
        let deviceName = Constants.deviceName;
        console.log('====================================')
        console.log(deviceId, deviceName)
        console.log('====================================')
    }

    getDeviceId(){
        
        return '';
    }

}


//make this component available to the app
export default SyncServices;
