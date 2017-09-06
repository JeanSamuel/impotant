import React from "react";
import { Notifications } from "expo";
import { Text, View } from "react-native";

export default class AppContainer extends React.Component {
  state = {
    notification: {}
  };

  componentWillMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    console.log("====================================");
    console.log("notif", notification);
    console.log("====================================");
    this.setState({ notification: notification });
  };

  createTextNotif() {}

  render() {
    // if(this.state.notification){
    //     return <View />
    // }else{
    let data = this.createTextNotif();
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          backgroundColor: "white"
        }}
      >
        <Text> Nouvelle Notification</Text>
        <Text>Vous venz de reçevoir 15000 Ar de Aina</Text>
      </View>
    );
    // }
  }
}
