//import liraries
import React, { Component } from 'react';
import config from "../../config/data/dataM";
import { Utils, UserService } from '../../services';

let instance = null;

const BASEURL = config.ARIARY_BASE_URL;
// create a component
class ServiceRetrait extends Component {
    static getInstance() {
        if (!instance) {
            instance = new ServiceRetrait();
        }
        return instance;
    }
    async doRetrait(dataRetrait) {
        let url = BASEURL + 'retrait';
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataRetrait),
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error_message != null) {
                        throw responseJson.error_message;
                    }
                })
                .catch(err => {
                    throw err.toString();
                });
            let userInfo = await UserService.getUserInfo(dataRetrait.account_id, null);
            await Utils._saveItem('userData', JSON.stringify(userInfo));
            await Utils._saveItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
            throw error.toString();
        }
    }
}
export default ServiceRetrait.getInstance();
