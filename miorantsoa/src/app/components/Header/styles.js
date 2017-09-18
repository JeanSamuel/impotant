import EStyleSheet from "react-native-extended-stylesheet";
import { StatusBar } from "react-native";
export default EStyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "$white",
    letterSpacing: 1
  }
});
