import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default {
  // Simple Boutton
  newUserButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newUserButton: {
    width: width / 2 - 40,
    height: 50,
    margin: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonImageContent: {},
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 20
  },

  // *********************************************************************
  // Boutton arrondi avec 2 lignes

  bouttonBase: {
    width: width - 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 70,
    paddingBottom: 5
  },
  buttonMainText: {
    fontSize: 25
  },
  buttonSecondtext: {
    fontSize: 13
  },
  loginButtonText: {
    color: "rgba(236, 240, 241,1.0)",
    fontSize: 15
  },
  textWhiteCentered: {
    textAlign: "center",
    color: "#FFF"
  },
  textWhite: {
    color: "#FFF"
  },
  textWhiteBold: {
    color: "#FFF",
    fontWeight: "bold"
  },
  textCenter: {
    textAlign: "center"
  }
};
