import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";

const INPUT_HEIGHT = 40;
const BORDER_RADIUS = 3;
export default EStyleSheet.create({
  $buttonBackroundColorBase: "$white",
  $buttonBackroundColorModifier: 0.1,
  $iconColor: "$primaryBlue",
  container: {
    backgroundColor: "$white",
    width: "90%",
    height: INPUT_HEIGHT,
    // borderRadius: BORDER_RADIUS,
    borderBottomWidth: 1,
    borderBottomColor: "$border",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 11,
    alignSelf: "center"
  },
  myInputContainer: {
    backgroundColor: "$inputBG",
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "center"
  },
  myInput: {
    height: 40,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    fontSize: 24,
    color: "$inputText"
  },
  containerDisabled: {
    backgroundColor: "#F0F0F0"
  },
  button: {
    height: INPUT_HEIGHT,
    width: INPUT_HEIGHT + 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$white",
    borderBottomWidth: 1,
    borderBottomColor: "$border",
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS
  },
  iconButton: {
    height: INPUT_HEIGHT,
    width: INPUT_HEIGHT + 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "$border",
    alignContent: "center",
    backgroundColor: "$white"
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 10,
    color: "$primaryBlue"
  },
  input: {
    height: INPUT_HEIGHT,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    color: "$inputText"
  },
  inputTouch: {
    height: INPUT_HEIGHT,
    flex: 1,
    paddingHorizontal: 8
  },
  touchText: {
    fontSize: 16,
    color: "$inputText"
  },
  border: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: "$border"
  }
});
