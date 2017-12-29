const React = require("react-native");
import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb10: {
    marginBottom: 10
  },
  header:{
    backgroundColor:"$darkColor",
    paddingVertical:15,
  },
  footer:{
    backgroundColor:"$darkColor"
  },
  textbienvenue:{
    flexDirection:'row',
    flex: 1
  },
  textInfo:{
    flexDirection:'row',
    flex: 1
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
  indicator:{
    backgroundColor: 'rgba(44, 62, 80,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textindicator:{
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    color: '#FFF',
  },
});
