const React = require("react-native");

const { Dimensions } = React;
import EStyleSheet from "react-native-extended-stylesheet";
const { height, width } = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  mb10: {
    marginBottom: 10
  },
  header: {
    backgroundColor: "$darkColor"
  },
  footer: {
    backgroundColor: "$darkColor"
  },
  textbienvenue: {
    flexDirection: 'row',
    flex: 1
  },
  textInfo: {
    flexDirection: 'row',
    flex: 1
  },
  ctn: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  errorText: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ef9a9a',
    marginBottom: 10,
  },
  textInfo: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#1de9b6',
    marginBottom: 10,
  },
  viewForm: {
  },
  viewIdentite: {
    width: width,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "$darkColor"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22,
    textAlign: "center"
  },
});
