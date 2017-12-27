import config from '../../config/data/dataM'
import {Utils} from '../'
const BASEURL = config.ARIARY_BASE_URL

// create a component
let instance = null
class OffrirService {
  static getInstance () {
    if (!instance) {
      instance = new OffrirService()
    }
    return instance
  }
  async _validerOffre (activity) {
    let url = BASEURL + 'transaction'
    var type_expo = 'expo'
    let success = null
    try {
      let device_token = await Utils.registerForPushNotificationsAsync()
      let param_to_send = {
        senderId: activity.state.sender,
        recipientId: activity.state.recipient,
        amount: activity.state.amount,
        comment: activity.state.message,
        type: type_expo,
        token: device_token
      }
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param_to_send)
      }
      await fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error_message != null) {
            throw responseJson.error_message
          } else {
            success = responseJson
          }
        })
        .catch(error => {
          //console.log('erreur', error)
          throw error
        })
    } catch (error) {
      throw error.toString()
    }
    return success
  }
}
// make this component available to the app
export default OffrirService.getInstance()
