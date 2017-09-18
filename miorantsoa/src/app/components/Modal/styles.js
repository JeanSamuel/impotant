import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default {
  closeText: {
    color: "rgba(236, 240, 241,1.0)",
    fontSize: 20,
    textAlign: "right",
    fontWeight: "300"
  },
  closeTextObject: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 5
  },
  closeTextContainer: {
    height: 20
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
    width: width - 20,
    height: height - 20,
    marginVertical: 20,
    padding: 5
  }
};
