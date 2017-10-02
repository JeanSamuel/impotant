import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

width = Dimensions.get("window").width / 2;
export default EStyleSheet.create({
  button: {
    marginVertical: 10,
    height: 50
  },
  text: {
<<<<<<< HEAD
    fontFamily: "Arial",
=======
>>>>>>> 47f74c47e7b6d8b565d5b7732edc5586dabec80a
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
