import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default {
  row: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  qrText: {
    textAlign: "center",
    fontSize: 15,
    margin: 15,
    width: 300
  },
  input: {},
  invalidInput: {
    flexDirection: "row"
  },
  invalidInputText: {
    color: "red",
    paddingHorizontal: 5
  },
  amount: {
    fontSize: 30,
    textAlign: "center",
    width: 200,
    marginBottom: 10
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  amountLabel: {
    fontSize: 25,
    textAlign: "center",
    color: "rgba(142, 68, 173,1.0)"
  },
  inputWarp: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(44, 62, 80,1.0)"
  }
};
