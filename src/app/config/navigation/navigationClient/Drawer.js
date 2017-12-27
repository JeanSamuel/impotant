//import liraries
import React from "react";
import {Dimensions, ScrollView} from "react-native";
import {DrawerItems, DrawerNavigator} from "react-navigation";
import {Logout, MainAchat, Offrir, ProfileAriary, Receive, Send, History} from "../../../screen/index";
import {Icon} from "react-native-elements";
import About from "../../../screen/about";
import DrawerContent from "../navigationMerch/drawerContent";

//make this component available to the app
const { width } = Dimensions.get("screen");
export default DrawerNavigator(
  {
    Profile: {
      screen: ProfileAriary,
      navigationOptions: ({ navigation }) => ({
        title: "Profil",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-contact-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },
    Home: {
      screen: Send,
      navigationOptions: ({ navigation }) => ({
        title: "Payer",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-qr-scanner"
            size={28}
            type="ionicon"
            color={tintColor}
          />
        ),
        header: () => null
      })
    },
    History: {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    Wallet: {
      screen: Receive,
      navigationOptions: ({ navigation }) => ({
        title: "Recevoir",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-rose-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },

    Achat: {
      screen: MainAchat,
      navigationOptions: ({ navigation }) => ({
        title: "Dépôt",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-filing-outline"
            type="ionicon"
            color={tintColor}
            size={28}
          />
        ),
        header: () => null
      })
    },
    Offrir: {
      screen: Offrir,
      navigationOptions: ({ navigation }) => ({
        title: "Offrir",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="present"
            type="simple-line-icon"
            color={tintColor}
            size={24}
          />
        ),
        header: () => null
      })
    },
    // Adresses: {
    //   screen: Adresses,
    //   navigationOptions: ({ navigation }) => ({
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="ios-book-outline" size={25} type="ionicon" />
    //     ),
    //     header: () => null
    //   })
    // },
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        title: "A propos",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="ios-information-circle-outline"
            type="ionicon"
            size={28}
          />
        ),
        header: () => null
      })
    },

    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        title: "Déconnexion",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-log-out" type="ionicon" size={28} />
        ),
        header: () => null
      })
    }
  },
  {
    initialRouteName: "Profile",
    drawerWidth: width - 50,
    contentOptions: {
      activeTintColor: "#00cf7e",
      // activeBackgroundColor: "",
      itemStyle: {
        paddingLeft: 15
      },
      labelStyle: {
        fontWeight: "200"
      }
    },
    contentComponent: props => (
      <ScrollView>
        <DrawerContent />
        <DrawerItems {...props} />
      </ScrollView>
    )
  }
);
