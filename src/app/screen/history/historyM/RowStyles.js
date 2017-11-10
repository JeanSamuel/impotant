import EStyleSheet from "react-native-extended-stylesheet";

export default (styles = EStyleSheet.create({
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
    fontWeight: "bold",
    color: "rgba(44, 62, 80,1.0)",
    textAlign: "left"
  },
  amount: {
    justifyContent: "center",
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
  userInfoContainer: {
    justifyContent: "center"
  },
  iconContainer: {
    justifyContent: "center"
  },
  date: {
    fontSize: 15,
    color: "rgba(149, 165, 166,1.0)",
    textAlign : 'right'
  },
  type: {
    fontSize: 15,
    color: "rgba(149, 165, 166,1.0)",
    textAlign: "left"
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
    flexDirection: "row",
    width: "100%"
  },
  currencyNegative: {
    color: "rgba(44, 62, 80,1.0)"
  }
}));
