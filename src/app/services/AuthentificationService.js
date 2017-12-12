import { AsyncStorage } from "react-native";
import { UserService, Utils } from "./";
import config from "../config/data/dataM";

const BASEURL = config.ARIARY_BASE_URL;

let instance = null;
// create a component
class AuthentificationService {
  static getInstance() {
    if (!instance) {
      instance = new AuthentificationService();
    }
    return instance;
  }
  async _loginUser(dataUser, activity) {
    activity.setState({ loading: true });
    let url = BASEURL + "login";
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: dataUser.username,
          password: dataUser.password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message;
          } else {
            let users = {
              auth: "YHHTHTHHT12354885566",
              pseudo: responseJson.username,
              code: responseJson.code
            };
            Utils._saveItem("dataUser", JSON.stringify(users));
            activity.props.navigation.navigate("App");
          }
        });
      activity.setState({ loading: false });
    } catch (error) {
      activity.setState({ loading: false });
      throw error;
    }
  }
  async doLogin(activity) {
    try {
      let userInfo = await UserService.getUserInfo(
        activity.state.account_id,
        activity
      );
      await Utils._saveItem("userInfo", JSON.stringify(userInfo));
      let users = {
        token: activity.state.token,
        pseudo: userInfo.username,
        code: activity.state.account_id
      };
      await Utils._saveItem("dataUser", JSON.stringify(users));
    } catch (error) {
      throw error.toString();
    }
  }
  async _logout(status) {
    let loggedOut = false;
    let url = BASEURL + "expo/etat";
    let token = await Utils.registerForPushNotificationsAsync();
    try {
      const dataUser = await Utils.getItem("dataUser");
      let userData = JSON.parse(dataUser);
      let account_id = userData.code;
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          account_id: account_id,
          token: token,
          etat: status
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          loggedOut = true;
        });
      if (loggedOut) {
        if (status == 0) {
          await Utils.removeItem("dataUser");
          await Utils.removeItem("userInfo");
        }
      }
    } catch (error) {
      throw "test" + error;
    }
  }
}
export default AuthentificationService.getInstance();
