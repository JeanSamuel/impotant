import { StyleSheet } from "react-native";

export default {
  client_id: "ariarynet",
  client_secret: "ariarynetpass",
  // BASE_URL: "http://54.229.79.45/ariary2API/web/api/",
  BASE_URL: "http://ariary.vola.mg/",
  BASE_URL_Oauth: "http://auth.vola.mg/",
  redirect_uri: "http://auth.vola.mg/index.php/",
  scope: "userinfo",
  grant_type: "authorization_code",
  uri:
    "http://auth.vola.mg/oauth2/authorize?response_type=code&state=xyz&client_id=ariarynet&redirect_uri=http://auth.vola.mg/index.php/&scope=userinfo"
};
