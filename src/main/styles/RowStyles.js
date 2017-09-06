import EStyleSheet from "react-native-extended-stylesheet";

export default {
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 5
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: "rgba(44, 62, 80,0.1)",
    justifyContent: "space-between"
  },
  otherUser: {
    fontSize: 15,
    fontWeight: "bold"
  },
  amount: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "right",
    color: "rgba(44, 62, 80,1.0)"
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  userContainer: {
    flexDirection: "row"
  },
  userInfoContainer: {},
  iconContainer: {
    justifyContent: "center"
  },
  date: {
    fontSize: 15,
    color: "rgba(149, 165, 166,1.0)"
  },
  type: {
    fontSize: 15,
    color: "rgba(149, 165, 166,1.0)"
  },
  currency: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
    color: "rgba(230, 126, 34,0.5)",
    paddingRight: 5,
    width: "100%"
  },
  currencyContainer: {
    width: "100%",
    justifyContent: "flex-end"
  },
  currencyNegative: {
    color: "rgba(44, 62, 80,1.0)"
  }
};
