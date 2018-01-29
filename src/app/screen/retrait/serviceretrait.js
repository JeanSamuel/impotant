//import liraries
import React, { Component } from 'react';
import config from "../../config/data/dataM";
import { Utils } from '../../services';

let instance = null;

const BASEURL = config.ARIARY_BASE_URL;
// create a component
class ServiceRetrait extends Component {
    static getInstance() {
        if (!instance) {
            instance = new ImageUpload();
        }
        return instance;
    }
    async doRetrait(dataRetrait) {
        let url = BASEURL + 'retrait';
        let hdrs = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            await fetch(url, {
                method: 'POST',
                headers: hdrs,
                body: JSON.stringify(dataRetrait),
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error_message != null) {
                        throw responseJson.error_message;
                    } else {
                        resp = responseJson;
                        user_info = {
                            username: responseJson.username,
                            user_id: responseJson.code,
                        };
                    }
                })
                .catch(error => {
                    throw error.toString();
                });
            await AuthentificationService._logout(1);
            await Utils._saveItem('user_id', JSON.stringify(user_info));
            await Utils._saveItem('userData', JSON.stringify(responseJson));
            await Utils._saveItem('userInfo', JSON.stringify(responseJson));
        } catch (error) {
            throw error.toString();
        }
    }
}
export default ServiceRetrait.getInstance();
