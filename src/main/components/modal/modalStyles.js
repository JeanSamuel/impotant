import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default {
  logoContainer: {
    paddingBottom: 20
  },
  mark: {
    width: 100,
    height: 100
  },
  markMini: {
    width: 60,
    height: 60
  },
  logoTextInline: {
    fontSize: 30
  },
  background: {
    width,
    height
  },
  logoText: {
    fontSize: 25
  },
  copyright: {
    marginBottom: 10
  },
  copyrightText: {
    color: "#FFF"
  },

  // ***********************************************************

  bouttonBase: {
    width: 250,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 50
  },
  buttonMainText: {
    fontSize: 25
  },
  buttonSecondtext: {
    fontSize: 13
  },
  loginButton: {
    backgroundColor: "rgba(41, 128, 185,1.0)"
  },
  signinButton: {
    backgroundColor: "rgba(22, 160, 133,1.0)"
  },
  loginButtonText: {
    color: "rgba(236, 240, 241,1.0)",
    fontSize: 15
  },
  signinButtonText: {
    color: "rgba(236, 240, 241,1.0)",
    fontSize: 20
  },

  // ****************************************************************
  closeText: {
    color: "rgba(236, 240, 241,1.0)",
    fontSize: 20,
    textAlign: "right"
  },
  closeTextObject: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 20
  },
  closeTextContainer: {
    height: 30
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 73, 94,0.5)"
  },
  webViewContainer: {
    flex: 1,
    width: width - 50,
    height: height - height / 10,
    marginVertical: 50,
    padding: 5,
    backgroundColor: "rgba(236, 240, 241,1.0)"
  },

  // ************************************************************
  header: {
    flexDirection: "row",
    height: 120,
    paddingHorizontal: 20
  },
  felicitation: {
    fontSize: 35
  },
  felicitationContainer: {
    marginTop: 20,
    paddingBottom: 10,
    width: width - 35,
    borderBottomWidth: 1
  },
  listChecked: {
    width: width - 45,
    paddingTop: 10
  },
  oneChecked: {
    flexDirection: "row"
  },
  checkImage: {
    width: 20,
    height: 20
  },
  checkText: {
    paddingHorizontal: 10,
    paddingBottom: 8
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "rgba(44, 62, 80,1.0)",
    textAlign: "center",
    fontSize: 30
  },
  inputWrap: {
    flexDirection: "row",
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(44, 62, 80,1.0)"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center"
  },

  // *****************************************************
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
  }
};
