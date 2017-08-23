import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default {
  message: [
    "Prenez en photo avec l'application ClientAriary pour recevoir de l'argent",
    "Ariary.net, la solution simple, rapide, efficace et sécurisée",
    "Touchez l'image quelques secondes pour mettre en mode plein écran",
    "Si votre compte n'est pas encore activé, votre solde sera limité à  5000ar",
    "Partager votre identifiant à vos proches via d'autres applications"
  ],
  BUTTONS: [
    { text: "Facebook", icon: "logo-facebook", iconColor: "#ea943b" },
    { text: "WhatsApp", icon: "logo-whatsapp", iconColor: "#ea943b" },
    { text: "Twitter", icon: "logo-twitter", iconColor: "#ea943b" },
    { text: "Gmail", icon: "mail", iconColor: "#fa213b" },
    { text: "Copier dans le presse-Papier", icon: "copy", iconColor: "#25de5b" }
  ],
  notifications: [
    {
      title: "Bonjour et bienvenue sur AriaryPro",
      bodyText:
        "Nous vous remercions d'avoir utiliser notre application. Pour bien débuter, voici les principales fonctionnalités disponibles.",
      imageSource: require("../images/icons/logo-landscape.png")
    },
    {
      title: "Recevez de l'argent de vos proches",
      bodyText:
        "En utilisant l'application AriaryClient, prenez le code en photo. Et hop! Il ne vous rete plus qu'à attendre",
      imageSource: require("../images/icons/logo.png")
    },
    {
      title: "Editez la somme à recevoir",
      bodyText:
        "vous avez la possibilitez de spécifier vous-même le montant de la transaction",
      imageSource: require("../images/icons/logo.png")
    },
    {
      title: "Toutes les informations en un point",
      bodyText: "Acceder à votre solde et à toutes les menus rapidement",
      imageSource: require("../images/icons/logo.png")
    },
    {
      title: "Recevez de l'argent même de loin",
      bodyText:
        "Partagez votre identifiant par e-mail, reseaux sociaux et même plus pour recevoir encore plus d'argent",
      imageSource: require("../images/icons/logo.png")
    },
    {
      title: "Il est temps de commencer",
      bodyText:
        "Nous espérons que vous serez satisfait de votre expérience avec AriaryPro. Bonne chance",
      imageSource: require("../images/icons/logo.png")
    }
  ]
};
