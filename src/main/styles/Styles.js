import { StyleSheet } from "react-native";

export default {
  yellow: "rgba(241, 196, 15,1.0)",
  silver: "rgba(236, 240, 241,1.0)",
  containerBase: {
    flex: 1
  },
  error: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    color: "#FFF",
    marginHorizontal: 5
  },
  centered: {
    alignItems: "center",
    justifyContent: "center"
  },
  textWhiteCentered: {
    textAlign: "center",
    color: "#FFF"
  },
  textWhite: {
    color: "#FFF"
  },
  textWhiteBold: {
    color: "#FFF",
    fontWeight: "bold"
  },
  textCenter: {
    textAlign: "center"
  },
  alignCentered: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "#ecf0f1",
    fontSize: 25
  },
  header: {
    backgroundColor: "rgba(41, 128, 185,1.0)",
    justifyContent: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
};
