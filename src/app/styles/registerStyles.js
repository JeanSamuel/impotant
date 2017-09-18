import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
const imageWidth = Dimensions.get("window").width / 2;
const { width } = Dimensions.get("window");
export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center"
  },
  textWidth: {
    width: width - 90
  },
  text: {
    // color: "$white",
    fontSize: 14,
    fontWeight: "300",
    textAlign: "center",
    backgroundColor: "transparent"
  },
  containerWidth: {
    width: width - 70
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    color: "#2963ff",
    fontWeight: "300",
    paddingBottom: 10
  },
  titleText: {
    fontSize: 20,
    width: imageWidth - 20,
    fontWeight: "500",
    alignSelf: "center",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  images: {
    alignSelf: "center",
    height: imageWidth,
    width: imageWidth
  },
  inline: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
    alignContent: "center"
  }
});
