import React, { Component } from 'react';
import { Constants } from 'expo';
import { Permissions, Notifications } from 'expo';

const PUSH_INIT = 'https://phpnotificationserver.herokuapp.com/init.php';
const PUSH_STOP = 'https://phpnotificationserver.herokuapp.com/logout.php';
export default class NotifServices extends Component {
    
    async registerForPushNotificationsAsync(username) {
        const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        var token = await Notifications.getExponentPushTokenAsync();
        console.log('token', token)
        var formData = new FormData();
        formData.append('token', token);
        formData.append('username', username)
        var response = await fetch(PUSH_INIT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).catch((error) =>{
            console.log('error', error)
        });
        console.log('jsonData', response)
    }

    async stopNotification(username){
        var formData = new FormData();
        formData.append('username', username)
        var response = await fetch(PUSH_STOP, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).catch((error) =>{
            console.log('error', error)
        });
        console.log('jsonData', response)
    }
}