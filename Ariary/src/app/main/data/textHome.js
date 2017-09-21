import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default {
  message: [
    "Prenez en photo avec l'application ClientAriary pour recevoir de l'argent",
    "Ariary.net, la solution simple, rapide, efficace et sécurisée",
    "Si votre compte n'est pas configuré, votre solde sera limité à  5000ar",
    "Partager votre identifiant à vos proches via d'autres applications"
  ],
  BUTTONS: [
    { text: "Facebook", icon: "logo-facebook", iconColor: "#ea943b" },
    { text: "WhatsApp", icon: "logo-whatsapp", iconColor: "#ea943b" },
    { text: "Twitter", icon: "logo-twitter", iconColor: "#ea943b" },
    { text: "Gmail", icon: "mail", iconColor: "#fa213b" },
    { text: "Copier dans le presse-Papier", icon: "copy", iconColor: "#25de5b" }
  ],
  intro: [
    {
      title: "Bonjour et bienvenue sur AriaryPro",
      Description:
        "Nous vous remercions",
      img: require("../images/icons/bonus.png"),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
        marginTop : 20
      },
      fontColor: '#fff',
      textAlign : 'center',
      level: 10,
      backgroundColor: '#34495e',
    },
    {
      title: "Recevez de l'argent de vos proches",
      Description:
        "En utilisant l'application AriaryClient, prenez le code en photo. Et hop! Il ne vous rete plus qu'à attendre",
        img: require("../images/icons/logo.png"),
        imgStyle: {
          height: 80 * 2.5,
          width: 109 * 2.5,
          marginTop : 20
        },
        fontColor: '#fff',
        level: 10,
        backgroundColor: '#34495e',
    },
    {
      title: "Recevez de l'argent même de loin",
      Description:
        "Partagez votre identifiant par e-mail, reseaux sociaux et même plus pour recevoir encore plus d'argent",
      img: require("../images/icons/logo.png"),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
        marginTop : 20
      },
      fontColor: '#fff',
      level: 10,
      backgroundColor: '#34495e',
    }
  ]
};
