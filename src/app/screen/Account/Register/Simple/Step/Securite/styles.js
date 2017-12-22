const React = require("react-native");

const { StyleSheet,Dimensions } = React;
const {height, width} = Dimensions.get('window');
export default {
  container: {
    backgroundColor: "transparent"
  },
  mb10: {
    marginBottom: 10
  },
  header:{
    backgroundColor:"#00BF9A"
  },
  footer:{
    backgroundColor:"#00BF9A"
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
    backgroundColor: "#00BF9A"
  },
  heading: {
    color: "white",
    marginTop: 10,
    fontSize: 22,
    textAlign: "center"
  },
};
