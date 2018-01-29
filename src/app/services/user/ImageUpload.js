import Exponent, { Constants, ImagePicker, registerRootComponent } from "expo";
import { Alert } from "react-native";
import config from "../../config/data/dataM";
let instance = null;

const BASEURL = config.ARIARY_BASE_URL;
import { Utils } from "../";
// create a component
class ImageUpload {
  static getInstance() {
    if (!instance) {
      instance = new ImageUpload();
    }
    return instance;
  }
  async doUpload(uri_avatar, uri_dossier, connexion, user) {
    let apiUrl = BASEURL + "valider";
    console.log("============>valider "+apiUrl+"<============");
    let formData = new FormData();
    /**
     * Avatar Image config
     */
    let uriParts = uri_avatar.split(".");
    let fileType = uriParts[uriParts.length - 1];
    if (fileType != "png") {
      fileType = "jpeg";
    }
    let uri = uri_avatar;
    formData.append("avatar", {
      uri,
      name: `avatar.${fileType}`,
      type: `image/jpeg`
    });
    /**
     * Cin Image Config
     */
    let uriParts1 = uri_dossier.split(".");
    let fileType1 = uriParts1[uriParts1.length - 1];
    if (fileType1 != "png") {
      fileType1 = "jpeg";
    }
    uri = uri_dossier;
    formData.append("dossier", {
      uri,
      name: `cin.${fileType1}`,
      type: `image/${fileType1}`
    });

    /**
     * other datas for validation
     */
    // formData.append("email", connexion.email);
    // formData.append("pseudo", connexion.pseudo);
    // formData.append("password", connexion.password);

    // formData.append("nom", user.name);
    // formData.append("dateN", user.dateN);
    // formData.append("phone", user.phone);

    formData.append("account_id", connexion.identifiant);
    formData.append("cin", user.cin);
    formData.append("lot", user.adresse);
    formData.append("ville", user.ville);
    formData.append("pays", user.pays);
    formData.append("code_postal", user.postal);

    /**
     * set options upload
     */
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    };
    /**
     * execute validation process
     */

    return await fetch(apiUrl, options);
  }

  _takePhoto = async (grantTo, activity) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    return pickerResult;
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    return pickerResult;
  };

  _copyToClipboard = activity => {
    Clipboard.setString(activity.state.image);
    alert("Copied image URL to clipboard");
  };

  _handleImagePicked = async (pickerResult, grantTo, activity) => {
    let uploadResponse, uploadResult;
    try {
      activity.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        let location = pickerResult.uri;
        switch (grantTo) {
          case "cin":
            activity.setState({ image: location });
            activity.setState({ pickerResultCin: pickerResult });
            activity.setState({ showprofile: true });
            break;
          case "avatar":
            activity.setState({ profile: location });
            activity.setState({ pickerResultAvatar: pickerResult });
            activity.updateProfile();
            break;
        }
      }
    } catch (e) {
      Alert.alert("Erreur Upload", e.toString());
    } finally {
      activity.setState({ uploading: false });
    }
  };
}
export default ImageUpload.getInstance();
