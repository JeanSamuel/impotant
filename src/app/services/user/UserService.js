import config from '../../config/data/dataM';
import { Utils } from '../';

const BASEURL = config.ARIARY_BASE_URL;
let instance = null;
class UserService {
  static getInstance() {
    if (!instance) {
      instance = new UserService();
    }
    return instance;
  }
  /**
	 * 
	 * @param {*} account_id 
	 * @param {*} activity 
	 */
  getRoles(role) {
    switch (role) {
      case 'ROLE_CLIENT_TEMP':
        return 1;
        break;
      case 'ROLE_CLIENT_SIMPLE':
        return 2;
        break;
      case 'ROLE_CLIENT_VALIDE':
        return 3;
        break;
    }
  }
  /**
     * UpdateUserinfo
     * @param {*} dataUser 
     * @param {*} activity 
     */
  async updateUserInfo(dataUser, activity) {
    let updated = false;
    let url = BASEURL + 'update_user';
    if (dataUser != null) {
      try {
        let options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser),
        };
        await fetch(url, options)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
            if (responseJson.error_message != null) {
              throw responseJson.error_message;
            } else {
              updated = true;
            }
          })
          .catch(error => {
            throw error.toString();
          });
        if (updated) {
          await this.refreshData(dataUser.account_id, activity);
        }
      } catch (error) {
        throw error;
      }
    } else {
      throw 'Aucune information à changer!!!';
    }
    return updated;
  }
  /**
     * updateUserPass
     * @param {*} dataUser 
     * @param {*} activity 
     */
  async updateUserPass(dataUser, activity) {
    let msg = null;
    var success = false;
    let url = BASEURL + 'change_password';
    if (dataUser != null) {
      try {
        let options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUser),
        };
        await fetch(url, options)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.error_message != null) {
              throw responseJson.error_message;
            } else {
              success = true;
            }
          })
          .catch(error => {
            throw error.toString();
          });
        if (success) {
          await this.refreshData(dataUser.account_id, activity);
        }
      } catch (error) {
        throw error.toString();
      }
    } else {
      msg = 'Aucune information saisie!!!';
      throw msg;
    }
    return success;
  }
  async refreshData(account_id, activity) {
    await Utils.removeItem('userInfo');
    await Utils.removeItem('userData');
    let userInfo = await this.getUserInfo(account_id, activity);
    await Utils._saveItem('userData', JSON.stringify(userInfo));
    await Utils._saveItem('userInfo', JSON.stringify(userInfo));
  }
  /**
     * get User info by account_id
     * @param {*} account_id 
     * @param {*} activity 
     */
  async getUserInfo(account_id, activity) {
    let dataUser = null;
    try {
      let url = BASEURL + 'get_details/' + account_id;
      await fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          } else {
            dataUser = responseJson;
          }
        })
        .catch(error => {
          //console.log('erreur', error);
          throw error.toString();
        });
    } catch (error) {
      throw error.toString();
    }
    return dataUser;
  }
  async verifyUser(username, pass, activity) {
    let url = BASEURL + 'login';
    try {
      let params = {
        username: username,
        password: pass,
      };
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      await fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          }
        })
        .catch(error => {
          //console.log('erreur', error);
          throw error.toString();
        });
    } catch (error) {
      throw 'Erreur de verification : ' + error.toString();
    }
  }
  getSolde() {
    let solde = 0;
    return solde;
  }
  async loadConfig(activity) {
    activity.setState({ loading: true });
    try {
      let params = await this.getParamsConfig(activity);
      activity.setState({ loading: false });
      activity.props.navigation.navigate('Config', { dataUser: params });
    } catch (error) {
      activity.setState({ loading: false });
      throw error.toString();
    }
  }
  async getParamsConfig(activity) {
    let data = await Utils.getItem('userInfo');
    let userinfo = JSON.parse(data);
    let test = userinfo.roles[0];
    let params = {
      account_id: userinfo.code,
      pseudo: userinfo.username,
    };
    data = {
      dataUser: userinfo,
      params: params,
      isTemp: this.getRoles(test),
    };
    return data;
  }
  loadConf(activity) {
    try {
      const userinfo = activity.state.data;
      let test = userinfo.roles[0];
      let params = {
        account_id: userinfo.code,
        pseudo: userinfo.username,
      };
      let data = {
        dataUser: userinfo,
        params: params,
        isTemp: this.getRoles(test),
      };
      activity.props.navigation.navigate('Config', { dataUser: params });
    } catch (error) {
      throw error.toString();
    }
  }
}

export default UserService.getInstance();
