import Exponent, { Constants, ImagePicker, registerRootComponent } from "expo";
import { Alert } from "react-native";
import config from "../config/data/dataM";
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
  async doUpload(uri_avatar, uri_dossier, dataValidation) {
    let apiUrl = BASEURL + "valider";
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
    formData.append("account_id", dataValidation.account_id);
    formData.append("pays", dataValidation.pays);
    formData.append("code_postal", dataValidation.code_postal);
    formData.append("ville", dataValidation.ville);
    formData.append("rue", dataValidation.rue);
    formData.append("lot", dataValidation.lot);
    formData.append("precision", dataValidation.precision);
    formData.append("cin", dataValidation.cin);
    formData.append("beneficiaire", dataValidation.beneficiaire);
    formData.append("num_recup", Utils.getNumeric(dataValidation.num_recup));
    formData.append("mail_recup", dataValidation.mail_recup);

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
    return fetch(apiUrl, options);
    console.log("Tonga eto");
  }

  _takePhoto = async (grantTo, activity) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    await this._handleImagePicked(pickerResult, grantTo, activity);
  };

  _pickImage = async (grantTo, activity) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    await this._handleImagePicked(pickerResult, grantTo, activity);
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
