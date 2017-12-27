import {Utils, UserService, ImageUpload, AuthentificationService} from '../';
import config from '../../config/data/dataM';

const BASEURL = config.ARIARY_BASE_URL;
let instance = null;
class InscriptionService {
  static getInstance() {
    if (!instance) {
      instance = new InscriptionService();
    }
    return instance;
  }
  /**
	 * Inscription Normale Ariary
	 * @param {*} dataInscription 
	 * @param {*} activity 
	 */
  async _registerUser(dataInscription, activity) {
    let url = BASEURL + 'register';
    let user_info=null;
    let resp=null;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataInscription),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          } else {
            //console.log('simpleInfo', responseJson);
            resp=responseJson;
            user_info = {
              username: responseJson.username,
              user_id: responseJson.code,
            };
          }
        })
        .catch(error => {
          //console.log('erreur', error);
          throw error.toString();
        });
        await AuthentificationService._logout(1);
        await Utils._saveItem('user_id', JSON.stringify(user_info));
        await Utils._saveItem('userData', JSON.stringify(responseJson));
        await Utils._saveItem('userInfo', JSON.stringify(responseJson));
    } catch (error) {
      throw error.toString();
    }
    return resp;
  }
  /**
	 * Etape de l'inscription Normale
	 * @param {*} dataUser 
	 * @param {*} activity 
	 */
  _goNext(activity) {
    let msg = null;
    try {
      switch (activity.state.page) {
        case 0:
          if (!activity.checkIdentity()) {
            activity.refs['viewpager'].goToPage(activity.state.page + 1);
          } else {
            msg =
              'Toutes les information sont obligatoires. Veuillez verifier si vos identité sont exactes!!!! ';
            throw msg;
          }
          break;
        case 1:
          if (!activity.checkContact()) {
            activity.refs['viewpager'].goToPage(activity.state.page + 1);
          } else {
            msg =
              'Assurez-vous que tous les champs de contact sont remplis et que toutes les information sont exactes!!!';
            throw msg;
          }
          break;

        case 2:
          if (activity.state.data != null) {
            activity.props.navigation.navigate('ValidationInscription', {
              data: activity.state.data,
            });
          } else {
            msg = "Merci de verifier vos informations d'inscriptions!!!";
            throw msg;
          }
          break;
      }
    } catch (error) {
      throw error;
    }
  }
  _goBack(activity) {
    try {
      switch (activity.state.page) {
        case 0:
          activity.props.navigation.goBack();
          break;
        case 1:
          activity.refs['viewpager'].goToPage(activity.state.page - 1);
          break;
        case 2:
          activity.refs['viewpager'].goToPage(activity.state.page - 1);
          break;
      }
    } catch (error) {
      throw error;
    }
  }
  _validationCompte(activity) {
    let msg = null;
    try {
      switch (activity.state.page) {
        case 0:
          if (!activity.checkProfile()) {
            activity.refs['viewpager'].goToPage(activity.state.page + 1);
          } else {
            msg =
              "Veuillez verifier tous les information avant de passer à l'étape suivante, toutes les informations sont obligatoires";
            throw msg;
          }
          break;
        case 1:
          if (!activity.checkAdresse()) {
            activity.refs['viewpager'].goToPage(activity.state.page + 1);
          } else {
            msg =
              'Assurez-vous que toutes les informations sont exactes et verifiées!!!';
            throw msg;
          }
          break;

        case 2:
          if (activity.state.data != null) {
            activity.props.navigation.navigate('ValidationCompte', {
              data: activity.state.data,
              pseudo: activity.state.username,
            });
          } else {
            msg = 'Assurez-vous que toutes informations sont exactes!!!';
            throw msg;
          }
          break;
      }
    } catch (error) {
      throw error.toString();
    }
  }
  /**
	 * Inscription Temporaire
	 * @param {*} activity 
	 */
  async _registrationTemporaire(activity) {
    let dataInscription = {
      username: activity.state.pseudo,
      password: activity.state.password,
    };
    let url = BASEURL + 'register1';
    let responseJson = null;
    let user_info = null;
    try {
      Utils._isValidPass(activity.state.password);
      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataInscription),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          } else {
            //console.log('tempInfo', responseJson);
            resp = responseJson;
            user_info = {
              username: responseJson.username,
              user_id: responseJson.code,
            };
          }
        })
        .catch(error => {
          //console.log('erreur', error);
          throw error.toString();
        });
      await AuthentificationService._logout(1);
      await Utils._saveItem('user_id', JSON.stringify(user_info));
      await Utils._saveItem('userData', JSON.stringify(resp));
      await Utils._saveItem('userInfo', JSON.stringify(resp));
    } catch (error) {
      throw error.toString();
    }
    return resp;
  }
  async _saveUserValidation(data, activity) {
    let uploadResponse, uploadResult;
    let dataValidation = {
      account_id: data.account_id,
      rue: data.rue,
      lot: data.lot,
      code_postal: data.codepostal,
      ville: data.ville,
      pays: data.pays,
      precision: data.precision_addr,
      cin: data.cin,
      beneficiaire: data.beneficiaire,
      num_recup: data.numrec,
      mail_recup: data.mailrec,
    };
    try {
      /**
			 * Upload Avatar,CIN/passport scan
			 */
      let uploadResponseAv, uploadResultaV;
      uploadResponseAv = await ImageUpload.doUpload(
        data.pickerResultAvatar.uri,
        data.pickerResultCin.uri,
        dataValidation
      );
      uploadResultaV = await uploadResponseAv.json();

      if (uploadResultaV.error_message != null) {
        throw uploadResultaV.error_message;
      }
      /**
			 * Update local user info if any error
			 */
      const userInfo = await UserService.getUserInfo(data.account_id, activity);
      await Utils.removeItem('userInfo');
      await Utils.removeItem('userData');
      await Utils._saveItem('userInfo', JSON.stringify(userInfo));
      await Utils._saveItem('userData', JSON.stringify(userInfo));
    } catch (error) {
      throw error.toString();
    }
  }
}

export default InscriptionService.getInstance();
