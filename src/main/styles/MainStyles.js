import { StyleSheet } from "react-native";

export default {
  container: {
    backgroundColor: "#FFF",
    flex: 1
  },
  row: {},
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  TextQrContainer: {
    backgroundColor: "rgba(189, 195, 199,0.5)",
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  amount: {
    fontSize: 50,
    textAlign: "center"
  },
  input: {
    paddingHorizontal: 25,
    width: 200,
    fontSize: 40,
    alignItems: "flex-start"
  },
  qrText: {
    textAlign: "center",
    fontSize: 15,
    marginVertical: 15
  },
  qrCodeData: {
    marginVertical: 20
  },
  header: {
    backgroundColor: "#1abc9c",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  headerTitle: {
    color: "#ecf0f1",
    fontSize: 25
  },
  icon: {
    color: "#ecf0f1"
  },
  drawerStyle: {
    marginTop: 0
  },

  greyText: {
    color: "rgba(149, 165, 166,1.0)"
  },
  sectionHeader: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(127, 140, 141,0.2)"
  },
  sectionHeaderTitle: {
    textAlign: "center",
    fontSize: 15
  },
  sectionHeaderTitleNow: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF"
  },
  sectionHeaderNow: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgba(127, 140, 141,0.8)"
  },
  listView: {
    marginBottom: 20
  }
};
