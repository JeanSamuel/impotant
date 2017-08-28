import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

width = Dimensions.get("window").width / 2;
export default EStyleSheet.create({
  button: {
    marginVertical: 10,
    height: 50
  },
  text: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
  containerButton: {
    height: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    alignContent: "center"
  },
  simpleButton: {
    width: width
  }
});
