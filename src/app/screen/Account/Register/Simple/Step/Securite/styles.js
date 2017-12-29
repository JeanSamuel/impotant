const React = require("react-native");
import EStyleSheet from "react-native-extended-stylesheet";
const {Dimensions } = React;
const {height, width} = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  mb10: {
    marginBottom: 10
  },
  header:{
    backgroundColor:"$darkColor"
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
  viewContainer:{
    width:width,
    paddingHorizontal: 10,
    paddingVertical: 50
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
