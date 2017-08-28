import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
const imageWidth = Dimensions.get("window").width / 1.2;

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
  },
  text: {
    color: "$white",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center"
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    paddingBottom: 10
  },
  images: {
    height: imageWidth,
    width: imageWidth
  },
  inline: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
    alignContent: "center"
  }
});
