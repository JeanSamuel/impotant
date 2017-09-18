import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
const imageWidth = Dimensions.get("window").width / 1.2;

export default EStyleSheet.create({
  listStyle: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderBottomColor: "rgba(44, 62, 80,0.1)",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center"
  },
  mainContent: {
    flexDirection: "row"
  },
  iconWrapper: {
    width: 60
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "400"
  },
  contentBody: {
    justifyContent: "center",
    paddingLeft: 5
  },
  subtitle: {
    color: "#757575"
  },
  contentRight: {
    flexDirection: "column",
    paddingRight: 10,
    minWidth: 70
  },
  amount: {
    fontSize: 16,
    textAlign: "right"
  }
});
