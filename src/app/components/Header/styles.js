import EStyleSheet from "react-native-extended-stylesheet";
import { StatusBar, Platform} from "react-native";
export default EStyleSheet.create({
  header: {
    backgroundColor: "$darkColor",
    paddingVertical: 15,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "$white"
  }
});
