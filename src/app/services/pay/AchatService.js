import TimerMixin from 'react-timer-mixin';
let PNF = require('google-libphonenumber').PhoneNumberFormat;
import {Notifications} from 'expo';
import {Alert, AlertIOS} from 'react-native';
import config from '../../config/data/dataM';

let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import {Utils} from '../';
const BASEURL = config.ARIARY_BASE_URL;

// create a component
const phoneRegex = /[0-9 -()+]+$/;

let instance = null;

class AchatService {
  static getInstance() {
    if (!instance) {
      instance = new AchatService();
    }
    return instance;
  }
  /**
	 * 
	 * @param {*} account_id 
	 * @param {*} amount 
	 * @param {*} phone 
	 */
  async _initAchat(activity, act) {
    activity.setState({loading: true});
    let url = BASEURL + 'achat';
    let ret = false;
    try {
      this._validate(act.state.montant, act.state.phone, act.state.password);
      let device_token = await Utils.registerForPushNotificationsAsync();
      let params_to_send = {
        account_id: act.state.account_id,
        token: device_token,
        amount: Utils.getNumeric(act.state.montant),
        phone: this.getPhoneNumber(act.state.phone),
      };
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params_to_send),
      };
      await fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          } else {
            ret = true;
          }
        })
        .catch(error => {
          //console.log('erreur', error);
          throw error;
        });
      activity.setState({loading: false});
    } catch (error) {
      activity.setState({loading: false});
      throw error;
    }
    return ret;
  }
  /**
	 * 
	 * @param {*} amount 
	 * @param {*} phone 
	 * @param {*} password 
	 */
  _validate(amount, phone, password) {
    try {
      this._checkMontant(amount);
      this.checkPhoneNumber(phone);
      this._parsePhone(phone, 'mg');
      this.validatePhoneNumer(phone);
      this._checkPassword(password);
    } catch (error) {
      throw error.toString();
    }
  }
  getInstructionByMobileMoneyPhoneNumber(phone) {
    let sms = {};
    let op = Utils.getNumeric(phone);
    let a = op.charAt(5);
    a = a;
    switch (a) {
      case 3 + '':
        sms = {
          title: 'Astuce Airtel Money:' + op,
          contenue:
            'Veuillez composer #436#,puis choisissez le menu paiement facture. Le surnom est "ariarynet", suivez les instructions démandées pour la suite' +
            '. Vous allez recevoir une notification sur votre téléphone une fois que la transaction aura terminée',
        };
        break;
      case 2 + '':
        sms = {
          title: 'Astuce Orange Money:' + op,
          contenue:
            "Veuillez composer #144# puis choisissez le menu paiement marchand. Le code marchand est 103102 et suivez les instructions démandées jusqu'au bout" +
            '. Vous allez recevoir une notification sur votre téléphone une fois que la transaction aura terminée',
        };
        break;
      case 4 + '':
        sms = {
          title: 'Astuce Mvola:' + op,
          contenue:
            'Veuillez vérifier votre téléphone. Un message Mobile Money est envoyé au numéro ' +
            phone +
            '. Vous allez recevoir une notification sur votre téléphone une fois que la transaction aura terminée',
        };
        break;
    }
    return sms;
  }
  /**
	 * 
	 * @param {*} number 
	 * @param {*} iso 
	 */
  _parsePhone(number, iso) {
    var phone = null;
    try {
      var phoneNumber = phoneUtil.parse(number, iso);
      phone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
    } catch (err) {
      throw err.toString();
    }
    return phone;
  }
  /**
	 * 
	 * @param {*} number 
	 */
  getPhoneNumber(number) {
    var tel = this.getNumeric(number);
    return '0' + tel.substr(4, tel.length);
  }
  /**
	 * 
	 * @param {*} str 
	 */
  getNumeric(str) {
    return str.replace(/ /g, '');
  }
  /**
	 * check password null
	 * @param {*} password 
	*/
  _checkPassword(password) {
    if (password == '' || password == null) {
      throw 'Vous devez entrer votre mot de passe pour confirmer votre achat';
    }
  }
  /**
	 * check Phone Number Null
	 * @param {*} phone 
	 */
  checkPhoneNumber(phone) {
    if (phone == '' || phone == null) {
      throw 'Le numero téléphone ne doit pas être vide ou null';
    }
  }
  /**
	 * check valid amount
	 * @param {*} montant 
	 */
  _checkMontant(montant) {
    if (montant == '' || montant == null || isNaN(montant) || montant <= 0) {
      throw 'Veuillez entrer un montant valide(nombre positif different de 0)';
    }
  }
  /**
	 * 
	 * @param {*} phone 
	 */
  validatePhoneNumer(phone) {
    try {
      var num = this.getNumeric(phone);
      var b = num.charAt(5) != 2 && num.charAt(5) != 3 && num.charAt(5) != 4;
      if (num.charAt(4) != 3 || b || num.length != 13) {
        throw 'Veuillez entrer un numéro Telma,Airtel ou Orange pour la transaction mobile';
      }
    } catch (error) {
      throw error.toString();
    }
  }
}
//make this component available to the app
export default AchatService.getInstance();
