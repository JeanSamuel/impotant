import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
const { width } = Dimensions.get("window");
export default EStyleSheet.create({
  formContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "$white" //"#607D8B"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "$white" //"#607D8B"
  }
});
