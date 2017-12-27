const React = require("react-native");

const {Dimensions } = React;
import EStyleSheet from "react-native-extended-stylesheet";
const deviceWidth = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    backgroundColor: "#FFF"
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
    flexDirection: "row",
    flex: 1
  },
  textInfo: {
    flexDirection: "row",
    flex: 1
  },
  page: {
    width: deviceWidth,
  },
  button: {
    padding: 10,
    margin: 2,
    backgroundColor: '$darkColor',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenuebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalHeader: {
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeadertex: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  modalButton: {
    width: '49%',
    backgroundColor: 'white',
    margin: '0.5%',
  },
});
